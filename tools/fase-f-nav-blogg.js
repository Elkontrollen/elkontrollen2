// Fase F — borettslag tydelig i hovedmenyen, og de nye artiklene inn i
// bloggoversikten og sitemap.
//
// Nedtrekket «Borettslag & sameie» gjøres om til en direkte lenke til
// /borettslag/ med et nedtrekk under. Tilleggsordren krever at borettslag
// ligger tydelig i hovedmenyen, ikke bare i en nedtrekksmeny.
//
// Idempotent. Kjør fra repo-roten:  node tools/fase-f-nav-blogg.js

const fs = require('fs');
const path = require('path');

const ROT = path.join(__dirname, '..');
const NYE = require('./borettslag-artikler.js');

function walk(d, a = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (['.git', 'tools', 'node_modules'].includes(e.name)) continue;
    const p = path.join(d, e.name);
    e.isDirectory() ? walk(p, a) : e.name.endsWith('.html') && a.push(p);
  }
  return a;
}

// ── 1. Hovedmenyen ─────────────────────────────────────────────────────────
// Erstatt knappen med en lenke til /borettslag/, slik at punktet både er
// klikkbart direkte og fortsatt har undermenyen.
let nav = 0;
for (const f of walk(ROT)) {
  let h = fs.readFileSync(f, 'utf8');
  const før = h;

  h = h.replace(
    /<button class="nav-drop-trigger" type="button">Borettslag &amp; sameie <span class="care">&#9662;<\/span><\/button>/g,
    '<a class="nav-drop-trigger" href="/borettslag/">Borettslag &amp; sameie <span class="care">&#9662;</span></a>'
  );

  // Legg de nye undersidene i nedtrekket
  const gammelPanel = `          <a href="/borettslag/">Trygt Borettslag</a>`;
  if (h.includes(gammelPanel) && !h.includes('>Elkontroll fellesanlegg<')) {
    h = h.replace(gammelPanel,
      `          <a href="/borettslag/">Elkontroll for borettslag</a>
          <a href="/borettslag/elkontroll/">Elkontroll fellesanlegg</a>
          <a href="/borettslag/leiligheter/">Leilighetskontroll</a>
          <a href="/borettslag/pris/">Pris</a>`);
  }

  if (h !== før) { fs.writeFileSync(f, h); nav++; }
}
console.log(`hovedmeny oppdatert på ${nav} sider`);

// ── 2. Bloggoversikten ─────────────────────────────────────────────────────
{
  const fil = path.join(ROT, 'blogg', 'index.html');
  let h = fs.readFileSync(fil, 'utf8');
  const før = h;

  // Bruk et eksisterende kort som mal for markupen
  const mal = h.match(/[ \t]*<a class="blog-card" href="[^"]+">[\s\S]*?<\/a>/);
  if (!mal) { console.error('  fant ikke blog-card-malen'); }
  else {
    const innrykk = (mal[0].match(/^[ \t]*/) || [''])[0];
    // Overskriftsnivået i kortene ble senket fra h3 til h2 da heading-order ble rettet
    const felter = mal[0].match(/<h([23])>/);
    if (!felter) { console.error('  malen har uventet struktur:\n' + mal[0].slice(0, 300)); }
    else {
      const MND = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'];
      const dato = iso => { const [å, m, d] = iso.split('-').map(Number); return `${d}. ${MND[m - 1]} ${å}`; };

      let lagt = 0, kort = '';
      for (const a of NYE) {
        if (h.includes(`href="${a.slug}.html"`)) continue;
        kort += mal[0]
          .replace(/href="[^"]+"/, `href="${a.slug}.html"`)
          .replace(/<span class="date">[^<]*<\/span>/, `<span class="date">${dato(a.dato)}</span>`)
          .replace(new RegExp(`<h${felter[1]}>[\\s\\S]*?</h${felter[1]}>`), `<h${felter[1]}>${a.tittel}</h${felter[1]}>`)
          .replace(/<p>[\s\S]*?<\/p>/, `<p>${a.beskrivelse}</p>`) + '\n' + innrykk;
        lagt++;
      }
      if (lagt) {
        h = h.replace(mal[0], kort.trimEnd() + '\n' + mal[0]);
        fs.writeFileSync(fil, h);
      }
      console.log(`bloggoversikten: ${lagt} nye kort lagt inn øverst`);
    }
  }
}

// ── 3. sitemap.xml ─────────────────────────────────────────────────────────
{
  const fil = path.join(ROT, 'sitemap.xml');
  let s = fs.readFileSync(fil, 'utf8');
  let lagt = 0, blokk = '';
  for (const a of NYE) {
    const u = `blogg/${a.slug}.html`;
    if (s.includes(`/${u}<`)) continue;
    blokk += `  <url>\n    <loc>https://elkontrollen.no/${u}</loc>\n    <lastmod>${a.dato}</lastmod>\n    <priority>0.7</priority>\n  </url>\n`;
    lagt++;
  }
  if (lagt) { s = s.replace('</urlset>', blokk + '</urlset>'); fs.writeFileSync(fil, s); }
  console.log(`sitemap: ${lagt} nye URL-er, totalt ${(s.match(/<loc>/g) || []).length}`);
}

// ── 4. llms.txt ────────────────────────────────────────────────────────────
{
  const fil = path.join(ROT, 'llms.txt');
  let s = fs.readFileSync(fil, 'utf8');
  if (!s.includes('## Borettslag')) {
    const linjer = NYE.map(a => `- [${a.tittel}](https://elkontrollen.no/blogg/${a.slug}.html): ${a.beskrivelse}`).join('\n');
    const blokk = `
## Borettslag og sameier

Elkontroll for borettslag og sameier samles i årsavtalen Trygt Borettslag: elkontroll av fellesanlegget (NEK 405-3), termografering (NEK 405-1), brannalarm og nødlys (FG-750/760), kontroll av ladeanlegg, og dokumentasjon til internkontrollen. Pris settes etter gratis kartlegging av bygget. Andelseiere kan bestille kontroll av egen leilighet til rabattert pris når kontrolløren er i bygget.

- [Elkontroll for borettslag og sameier](https://elkontrollen.no/borettslag/): Hovedsiden, med pakkeinnhold, prismodell og prosess.
${linjer}
`;
    s = s.replace('\n## Om selskapet', blokk + '\n## Om selskapet');
    fs.writeFileSync(fil, s);
    console.log('llms.txt: borettslagsseksjon lagt til');
  } else console.log('llms.txt: finnes alt');
}
