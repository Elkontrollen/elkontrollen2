// Fase 4, steg 2 — all JSON-LD på siden, bygget ett sted.
//
//   1. LocalBusiness (type Electrician) på alle sider, med @id, org.nr, geo,
//      areaServed for alle dekkede kommuner, sameAs og evt. openingHours.
//      Erstatter den gamle Organization-blokka og den ugyldige ElectricianService.
//   2. BreadcrumbList på alle sider unntatt forsiden, 404 og skjema.
//   3. Article-blokkene får dateModified, mainEntityOfPage, image og en author
//      med NEK 405 som kvalifikasjon.
//   4. Service- og FAQPage-blokker beholdes, men provider/publisher peker nå
//      på foretakets @id i stedet for å gjenta navnet.
//
// Idempotent. Kjør fra repo-roten:  node tools/fase4-schema.js

const fs = require('fs');
const path = require('path');

const ROT = path.join(__dirname, '..');
const BASE = 'https://elkontrollen.no';
const ID = BASE + '/#elkontrollen';
const F = JSON.parse(fs.readFileSync(path.join(__dirname, 'foretak.json'), 'utf8'));
const STEDER = JSON.parse(fs.readFileSync(path.join(__dirname, 'steder.json'), 'utf8')).steder;

function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (['.git', 'tools', 'node_modules'].includes(e.name)) continue;
    const p = path.join(d, e.name);
    e.isDirectory() ? walk(p, acc) : e.name.endsWith('.html') && acc.push(p);
  }
  return acc;
}

const rel = f => f.split(path.sep).join('/').replace(/^\.\//, '');
const urlFor = r => BASE + '/' + r.replace(/(^|\/)index\.html$/, '$1');

// ─────────────────────────────────────────────── LocalBusiness / Electrician ──

function foretak() {
  const o = {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    '@id': ID,
    name: F.navn,
    url: BASE + '/',
    logo: BASE + '/assets/favicon.svg',
    image: BASE + '/assets/img/om-oss-elektriker.jpg',
    telephone: F.telefon,
    email: F.epost,
    vatID: 'NO' + F.orgnr + 'MVA',
    identifier: { '@type': 'PropertyValue', propertyID: 'Organisasjonsnummer', value: F.orgnr },
    address: {
      '@type': 'PostalAddress', streetAddress: F.gate, postalCode: F.postnr,
      addressLocality: F.poststed, addressRegion: 'Østfold', addressCountry: F.land
    },
    geo: { '@type': 'GeoCoordinates', latitude: F.lat, longitude: F.lon },
    // Fylkene først, så kommunene. Dekningsområdet er Østfold, Oslo, Akershus
    // og Buskerud — «Østlandet» er tatt ut fordi det er videre enn det faktiske
    // området, og Google vekter samsvar med tjenesteområdet i Bedriftsprofilen.
    areaServed: (() => {
      const navn = ['Østfold', 'Oslo', 'Akershus', 'Buskerud',
        ...STEDER.slice().sort((a, b) => a.prioritet - b.prioritet).map(s => s.navn)];
      // Oslo er både fylke og kommune — skal bare stå én gang
      return [...new Set(navn)].map(n => ({ '@type': 'AdministrativeArea', name: n }));
    })(),
    priceRange: F.prisnivaa,
    currenciesAccepted: 'NOK',
    knowsAbout: ['Elkontroll', 'Termografering', 'NEK 405', 'Internkontroll elsikkerhet', 'FG-750', 'FG-760']
  };
  if (F.apningstider && F.apningstider.length) o.openingHours = F.apningstider;
  if (F.sameAs && F.sameAs.length) o.sameAs = F.sameAs;
  return o;
}

// ────────────────────────────────────────────────────────── BreadcrumbList ──

// Menneskelig navn på hvert nivå. Uten treff brukes <title> før skilletegn.
const NIVA = {
  'blogg/': 'Blogg',
  'borettslag/': 'Trygt Borettslag',
  'tjenester.html': 'Tjenester'
};

function sidenavn(fil, h) {
  const t = (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  return t.split(/\s+[—|]\s+/)[0].trim() || fil;
}

function brodsmuler(r, h) {
  if (r === 'index.html' || r === '404.html' || r.startsWith('skjema/')) return null;

  const ledd = [{ name: 'Hjem', item: BASE + '/' }];
  const deler = r.split('/');

  if (deler.length > 1) {
    const mappe = deler[0] + '/';
    ledd.push({ name: NIVA[mappe] || deler[0], item: BASE + '/' + mappe });
    // borettslag/index.html er selve mappesiden — ikke legg den inn to ganger
    if (r === mappe + 'index.html') {
      return liste(ledd);
    }
  }
  ledd.push({ name: sidenavn(r, h), item: urlFor(r) });
  return liste(ledd);
}

function liste(ledd) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: ledd.map((l, i) => ({
      '@type': 'ListItem', position: i + 1, name: l.name, item: l.item
    }))
  };
}

// ────────────────────────────────────────────────────────────────── Article ──

function forfatter() {
  const kvalifikasjon = {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'Sertifisering',
    name: 'NEK 405-sertifisert kontrollør'
  };
  if (F.forfatter && F.forfatter.navn) {
    return {
      '@type': 'Person',
      name: F.forfatter.navn,
      jobTitle: F.forfatter.stilling || 'Sertifisert kontrollør',
      worksFor: { '@id': ID },
      hasCredential: kvalifikasjon
    };
  }
  // Ingen personnavn oppgitt — foretaket står som forfatter, med kvalifikasjonen på seg.
  return { '@id': ID, '@type': 'Electrician', name: F.navn, hasCredential: kvalifikasjon };
}

function oppdaterArticle(o, r, h) {
  o.author = forfatter();
  o.publisher = { '@id': ID };
  o.mainEntityOfPage = { '@type': 'WebPage', '@id': urlFor(r) };
  if (!o.dateModified) o.dateModified = o.datePublished;
  const og = (h.match(/<meta property="og:image" content="([^"]*)"/) || [])[1];
  if (og) o.image = og;
  o.inLanguage = 'nb-NO';
  return o;
}

// ──────────────────────────────────────────────────────────────────── kjør ──

const FORETAK = foretak();
const tall = { electrician: 0, fjernet: 0, brodsmuler: 0, article: 0, service: 0, faq: 0 };

for (const f of walk('.')) {
  const r = rel(f);
  let h = fs.readFileSync(f, 'utf8');
  const før = h;

  const blokker = [...h.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)];
  const beholdt = [];
  let harForetak = false;

  for (const b of blokker) {
    let o;
    try { o = JSON.parse(b[1]); } catch (e) { beholdt.push(b[1]); continue; }
    const t = o['@type'];

    if (t === 'Organization' || t === 'ElectricianService' || t === 'Electrician' || t === 'LocalBusiness') {
      if (!harForetak) { beholdt.push(JSON.stringify(FORETAK)); harForetak = true; tall.electrician++; }
      else tall.fjernet++;
      continue;
    }
    if (t === 'BreadcrumbList') continue;           // bygges på nytt under
    if (t === 'Article' || t === 'BlogPosting') { beholdt.push(JSON.stringify(oppdaterArticle(o, r, h))); tall.article++; continue; }
    if (t === 'Service') {
      o.provider = { '@id': ID };
      // Tjenestesider uten eget stedsomfang skal speile dekningsområdet.
      // Lokalsidene har sin egen, mer spesifikke areaServed og røres ikke.
      const generisk = JSON.stringify((o.areaServed || []).map(a => typeof a === 'string' ? a : a.name));
      if (generisk === JSON.stringify(['Østfold', 'Østlandet']) || !o.areaServed) {
        o.areaServed = ['Østfold', 'Oslo', 'Akershus', 'Buskerud']
          .map(n => ({ '@type': 'AdministrativeArea', name: n }));
      }
      beholdt.push(JSON.stringify(o)); tall.service++; continue;
    }
    if (t === 'FAQPage') { beholdt.push(JSON.stringify(o)); tall.faq++; continue; }
    beholdt.push(JSON.stringify(o));
  }

  if (!harForetak && !(r === '404.html' || r.startsWith('skjema/'))) {
    beholdt.unshift(JSON.stringify(FORETAK)); tall.electrician++;
  }

  const bc = brodsmuler(r, h);
  if (bc) { beholdt.splice(1, 0, JSON.stringify(bc)); tall.brodsmuler++; }

  // Fjern alle gamle blokker og skriv de nye samlet rett før </head>
  h = h.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  if (beholdt.length) {
    const ny = beholdt.map(x => `<script type="application/ld+json">\n${x}\n</script>`).join('\n');
    h = h.replace('</head>', ny + '\n</head>');
  }

  if (h !== før) fs.writeFileSync(f, h);
}

console.log(`Electrician: ${tall.electrician}   fjernet duplikat: ${tall.fjernet}   BreadcrumbList: ${tall.brodsmuler}   Article: ${tall.article}   Service: ${tall.service}   FAQPage: ${tall.faq}`);
if (!F.apningstider.length) console.log('\nMERK: openingHours er utelatt — tools/foretak.json har tom liste. Se FAKTASJEKK.md.');
if (!F.forfatter.navn) console.log('MERK: author er Elkontrollen AS, ikke en Person — tools/foretak.json mangler navn. Se FAKTASJEKK.md.');
