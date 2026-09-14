// Genererer de lokale landingssidene (elkontroll-<sted>.html) og omrader.html.
//
// Header og footer hentes fra en eksisterende side, slik at navigasjonen alltid er
// identisk med resten av siden og ikke må vedlikeholdes to steder.
//
// Kjør fra repo-roten:  node tools/bygg-lokalsider.js

const fs = require('fs');
const path = require('path');

const ROT = path.join(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'steder.json'), 'utf8'));
const innhold = require('./innhold-steder.js');

const MAL = fs.readFileSync(path.join(ROT, 'om-oss.html'), 'utf8');
const HEADER = MAL.match(/<header>[\s\S]*?<\/header>/)[0].replace(/ class="current"/g, '');
const FOOTER = MAL.match(/<footer>[\s\S]*?<\/footer>/)[0];

const BASE = 'https://elkontrollen.no';
const MERKE = '<!-- TRENGER LOKALKUNNSKAP -->';
const faktasjekk = [];

const nf = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const pst = (del, hel) => Math.round((100 * del) / hel);

const ORG = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Elkontrollen AS',
  url: BASE + '/',
  logo: BASE + '/assets/favicon.svg',
  telephone: '+4798019154',
  email: 'post@elkontrollen.no',
  address: { '@type': 'PostalAddress', streetAddress: 'Lorangløkka 1', postalCode: '1782', addressLocality: 'Halden', addressCountry: 'NO' }
};

function head({ tittel, beskrivelse, url, bilde }) {
  return `<!DOCTYPE html>
<html lang="nb">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${tittel}</title>
<meta name="description" content="${beskrivelse}">
<link rel="preload" href="assets/fonts/ibm-plex-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/style.css">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${tittel.split(' | ')[0]}">
<meta property="og:description" content="${beskrivelse}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${BASE}/assets/img/${bilde}">
<meta property="og:locale" content="nb_NO">
<meta property="og:site_name" content="Elkontrollen">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${tittel.split(' | ')[0]}">
<meta name="twitter:description" content="${beskrivelse}">
<meta name="twitter:image" content="${BASE}/assets/img/${bilde}">`;
}

const ld = o => `<script type="application/ld+json">\n${JSON.stringify(o)}\n</script>`;

function faqBlokk(faq) {
  const html = faq.map(([q, a]) =>
    `      <div class="faq-item"><div class="faq-q"><span>${q}</span><span class="plus">+</span></div><div class="faq-a"><p>${a}</p></div></div>`
  ).join('\n');
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
  };
  return { html, schema };
}

// Tjenestekort som vises på hver lokalside. Rekkefølgen justeres per sted.
const TJENESTER = {
  bolig: ['elkontroll-bolig.html', 'Elkontroll bolig', 'NEK 405-2 med termografering. Fastpris 5 000 kr, rapport samme dag.'],
  boligsalg: ['elkontroll-boligsalg.html', 'Ved kjøp og salg', 'Dokumentert tilstand før visning eller bud — før det blir en tvist.'],
  borettslag: ['/borettslag/', 'Borettslag og sameie', 'Trygt Borettslag: el, brann og ladeanlegg i én årsavtale for styret.'],
  landbruk: ['landbruk.html', 'Elkontroll landbruk', 'NEK 405-3 med landbrukstillegg. Godkjent av landbruksforsikringen.'],
  naering: ['naering.html', 'Elkontroll næring', 'NEK 405-3 tilpasset bygningstype og FG-1400.'],
  internkontroll: ['internkontroll.html', 'Internkontroll elektro', 'Lovpålagt for alle virksomheter med ansatte.'],
  ladeanlegg: ['elbillading-kontroll.html', 'Kontroll av ladeanlegg', 'Årlig kontroll med termografi under last.'],
  brann: ['brannalarm-nodlys.html', 'Brannalarm og nødlys', 'FG-750/760-sertifisert årlig kontroll.'],
  avvik: ['fatt-avvik.html', 'Fått avvik?', 'Pålegg fra eltilsynet eller krav fra forsikringen — slik går du frem.'],
  kontrollavtale: ['kontrollavtale.html', 'Kontrollavtale', 'Alle lovpålagte kontroller for bygget i én avtale.']
};

const TJENESTEVALG = {
  fredrikstad: ['bolig', 'boligsalg', 'borettslag', 'naering', 'ladeanlegg', 'avvik'],
  sarpsborg: ['bolig', 'boligsalg', 'borettslag', 'landbruk', 'naering', 'avvik'],
  halden: ['bolig', 'boligsalg', 'borettslag', 'landbruk', 'naering', 'avvik'],
  moss: ['bolig', 'boligsalg', 'borettslag', 'naering', 'ladeanlegg', 'avvik'],
  'indre-ostfold': ['landbruk', 'bolig', 'naering', 'internkontroll', 'boligsalg', 'avvik'],
  rakkestad: ['landbruk', 'bolig', 'naering', 'internkontroll', 'boligsalg', 'avvik'],
  hvaler: ['bolig', 'boligsalg', 'borettslag', 'naering', 'avvik', 'kontrollavtale'],
  aremark: ['bolig', 'landbruk', 'boligsalg', 'naering', 'avvik', 'kontrollavtale']
};

// Artikler å lenke til fra hver lokalside (Fase 4 krever minst to per tjenesteside).
const ARTIKLER = {
  standard: [
    ['blogg/hva-koster-elkontroll-full-prisguide.html', 'Hva koster elkontroll? Full prisguide'],
    ['blogg/el-sjekk-vs-elkontroll-hva-er-egentlig-forskjellen.html', 'El-sjekk vs. elkontroll — hva er forskjellen?'],
    ['blogg/10-tegn-pa-at-det-elektriske-anlegget-bor-kontrolleres.html', '10 tegn på at anlegget bør kontrolleres']
  ],
  landbruk: [
    ['blogg/forsikringskrav-elkontroll-landbruk.html', 'Hva krever forsikringen av elkontroll i landbruket?'],
    ['blogg/temperatursensor-sikringsskap.html', 'Temperatursensor i sikringsskapet — slik gir det rabatt'],
    ['blogg/hva-koster-elkontroll-full-prisguide.html', 'Hva koster elkontroll? Full prisguide']
  ],
  kyst: [
    ['blogg/hva-koster-elkontroll-full-prisguide.html', 'Hva koster elkontroll? Full prisguide'],
    ['blogg/hvordan-oppstar-boligbranner-forebygg-med-elkontroll.html', 'Hvordan oppstår boligbranner?'],
    ['blogg/10-tegn-pa-at-det-elektriske-anlegget-bor-kontrolleres.html', '10 tegn på at anlegget bør kontrolleres']
  ]
};

const ARTIKKELVALG = {
  fredrikstad: 'standard', sarpsborg: 'standard', halden: 'standard', moss: 'standard',
  'indre-ostfold': 'landbruk', rakkestad: 'landbruk', hvaler: 'kyst', aremark: 'kyst'
};

function byggSide(sted) {
  const c = innhold[sted.slug];
  if (!c) throw new Error('Mangler innhold for ' + sted.slug);
  const fil = `elkontroll-${sted.slug}.html`;
  const url = `${BASE}/${fil}`;
  const erHalden = sted.slug === 'halden';

  const faq = faqBlokk(c.faq);

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: `Elkontroll i ${sted.navn}`,
    provider: { '@type': 'Organization', name: 'Elkontrollen AS', url: BASE + '/' },
    areaServed: [
      { '@type': 'AdministrativeArea', name: sted.navn },
      ...sted.omrader.slice(0, 6).map(o => ({ '@type': 'Place', name: o }))
    ],
    description: c.metaBeskrivelse,
    offers: { '@type': 'Offer', name: 'Elkontroll bolig', price: '5000', priceCurrency: 'NOK', availability: 'https://schema.org/InStock' }
  };

  // Avsnitt med usikre påstander pakkes i markør-kommentar og føres i FAKTASJEKK.md
  const funnHtml = c.funn.map((f, i) => {
    if (f.usikker) {
      faktasjekk.push({ fil, sted: sted.navn, seksjon: c.funnIngress, nr: i + 1, tekst: f.tekst.replace(/<[^>]*>/g, '') });
      return `      ${MERKE}\n      <li><span class="chk">→</span>${f.tekst}</li>`;
    }
    return `      <li><span class="chk">→</span>${f.tekst}</li>`;
  }).join('\n');

  const tjenesterHtml = TJENESTEVALG[sted.slug].map(k => {
    const [href, tittel, tekst] = TJENESTER[k];
    return `        <a href="${href}" class="card"><h3>${tittel} →</h3><p>${tekst}</p></a>`;
  }).join('\n');

  const artiklerHtml = ARTIKLER[ARTIKKELVALG[sted.slug]].map(([href, tittel]) =>
    `          <li><a href="${href}">${tittel}</a></li>`).join('\n');

  const omraderHtml = sted.omrader.map(o => `<span>${o}</span>`).join('');

  const reiseTekst = erHalden
    ? `Vi holder til i Lorangløkka 1 i Halden. Det betyr korte avstander i egen kommune, og at vi som regel kan rykke ut på kort varsel når noe haster — for eksempel når Det lokale eltilsyn har gitt et pålegg med frist.`
    : `${sted.navn} ligger rundt <strong>${sted.km} km</strong> fra basen vår i Lorangløkka 1 i Halden — ${sted.minTekst} med bil. Vi er i området jevnlig, og setter gjerne opp flere oppdrag samme dag hvis naboen, borettslaget eller nabogården også vurderer kontroll. Prisen på boligkontroll er den samme som i Halden; vi tar ikke kjøretillegg innenfor Østfold.`;

  faktasjekk.push({
    fil, sted: sted.navn, seksjon: 'Fra Halden til ' + sted.navn, nr: 0,
    tekst: erHalden
      ? 'Påstanden om at dere kan rykke ut på kort varsel i Halden må bekreftes av eier.'
      : `Kjøreavstand ${sted.km} km / ${sted.min} min er beregnet med OSRM (fri flyt) fra Halden sentrum. Bekreft at «${sted.minTekst}» og påstanden om at dere er i området jevnlig stemmer.`
  });

  const statBand = erHalden
    ? [[nf(sted.boliger), 'boliger i kommunen'], [nf(sted.for1901), 'bygget i 1900 eller tidligere'], ['Lorangløkka 1', 'her holder vi til']]
    : [[nf(sted.boliger), 'boliger i kommunen'],
       [pst(sted.for1961, sted.boliger) + ' %', 'bygget før 1961'],
       [sted.km + ' km', 'fra basen i Halden']];

  const body = `
<section class="page-hero">
  <div class="wrap hero-inner" style="align-items:start;">
    <div>
      <span class="stamp"><span class="dot"></span>NEK 405-sertifisert · Halden · dekker ${sted.navn}</span>
      <h1>Elkontroll i ${sted.iNavn} <span>— ${c.h1Hale}</span></h1>
      <p class="lead">${c.lead}</p>
      <div class="bullet-list">
        <div class="bullet"><span class="chk">✓</span>Termografering inkludert, ingen tilleggspris</div>
        <div class="bullet"><span class="chk">✓</span>Skriftlig rapport samme dag</div>
        <div class="bullet"><span class="chk">✓</span>Uavhengig kontrollforetak — vi selger ikke utbedringen</div>
      </div>
    </div>
    <div class="buybox">
      <div class="badge"><span class="d"></span>Vi dekker ${sted.navn}</div>
      <h3>Elkontroll bolig</h3>
      <p style="font-family:'Space Grotesk'; font-size:28px; font-weight:600; color:var(--ink); margin-bottom:4px;">5 000 kr</p>
      <p style="margin-bottom:18px;">Fastpris · ingen skjulte tillegg · ingen kjøretillegg i Østfold. Betaling via faktura etter utført kontroll.</p>
      <a class="btn btn-solid" href="elkontroll-bolig.html#bestill" style="width:100%;">Bestill elkontroll</a>
      <a class="btn btn-outline" href="tel:+4798019154" style="width:100%; margin-top:10px;">Ring 980 19 154</a>
      <div class="fine">NEK 405-sertifisert kontrollør · svar &lt; 24t</div>
    </div>
  </div>
</section>

<section class="section tight" style="border-top:1px solid var(--line);">
  <div class="wrap">
    <div class="stats-band">
${statBand.map(([n, l]) => `      <div class="stat-card"><span class="num">${n}</span><span class="lbl">${l}</span></div>`).join('\n')}
    </div>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line);">
  <div class="wrap">
    <div class="sec-head"><h2>Områdene vi dekker i ${sted.navn}</h2><p>${c.omradeIngress}</p></div>
    <div class="area-tags" style="margin-bottom:24px;">${omraderHtml}</div>
    <p style="max-width:760px; color:var(--muted); line-height:1.75;">${c.omradeTekst}</p>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line); background:var(--paper-2);">
  <div class="wrap">
    <div class="sec-head"><h2>Boligmassen i ${sted.navn} — og hva den betyr for anlegget</h2></div>
    <div style="max-width:760px;">
${c.boligmasse.map(p => `      <p style="color:var(--muted); line-height:1.75; margin-bottom:18px;">${p}</p>`).join('\n')}
      <p style="font-size:12.5px; color:var(--muted); margin-top:24px; padding-top:14px; border-top:1px solid var(--line);">Tall for boliger og fritidsbygg: SSB tabell 06266 og 03174 (2026). Tall for jordbruksbedrifter: SSB tabell 08646 (2025).</p>
    </div>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line);">
  <div class="wrap">
    <div class="sec-head"><h2>${c.funnIngress}</h2></div>
    <ul class="checklist" style="max-width:760px;">
${funnHtml}
    </ul>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line);">
  <div class="wrap">
    <div class="sec-head"><h2>${erHalden ? 'Vi holder til i Halden' : 'Fra Halden til ' + sted.navn}</h2></div>
    <p style="max-width:760px; color:var(--muted); line-height:1.75;">${reiseTekst}</p>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line); background:var(--paper-2);">
  <div class="wrap">
    <div class="sec-head"><h2>Tjenester i ${sted.navn}</h2><p>Vi tar oppdrag på bolig, borettslag, landbruk og næringsbygg i hele kommunen.</p></div>
    <div class="card-grid">
${tjenesterHtml}
    </div>
    <div style="margin-top:32px; max-width:760px;">
      <h3 style="font-size:17px; margin-bottom:10px;">Les mer før du bestiller</h3>
      <ul class="bullet-list" style="display:block;">
${artiklerHtml}
      </ul>
    </div>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line);">
  <div class="wrap">
    <div class="sec-head"><h2>Spørsmål om elkontroll i ${sted.navn}</h2></div>
${faq.html}
  </div>
</section>

<section class="cta-final centered section">
  <div class="wrap">
    <div class="box">
      <h2>Skal vi ta en kikk på anlegget i ${sted.navn}?</h2>
      <p>Fastpris 5 000 kr for bolig, termografering inkludert. Tilbud på borettslag, landbruk og næringsbygg.</p>
      <div class="actions">
        <a class="btn btn-solid" href="elkontroll-bolig.html#bestill">Bestill elkontroll</a>
        <a class="btn btn-outline-light" href="kontakt.html">Be om tilbud</a>
      </div>
    </div>
  </div>
</section>

<section class="section tight" style="border-top:1px solid var(--line); background:var(--paper-2);">
  <div class="wrap">
    <p style="font-size:13.5px; color:var(--muted);">Vi dekker også <a href="omrader.html">disse områdene i Østfold</a>.</p>
  </div>
</section>
`;

  const html = head({ tittel: c.metaTittel, beskrivelse: c.metaBeskrivelse, url, bilde: 'elkontroll-bolig-enebolig.jpg' })
    + '\n' + ld(ORG) + '\n' + ld(service) + '\n' + ld(faq.schema)
    + '\n</head>\n<body>\n' + HEADER + body + FOOTER
    + '\n<script src="assets/js/main.js" defer></script>\n</body>\n</html>\n';

  fs.writeFileSync(path.join(ROT, fil), html);
  return fil;
}

function byggOversikt(steder) {
  const url = BASE + '/omrader.html';
  const tittel = 'Områder vi dekker i Østfold | Elkontrollen';
  const beskrivelse = 'Elkontrollen dekker Halden, Fredrikstad, Sarpsborg, Moss, Indre Østfold, Rakkestad, Hvaler og Aremark. Fastpris 5 000 kr, ingen kjøretillegg.';

  const kort = steder.map(s => {
    const c = innhold[s.slug];
    const avstand = s.km === 0 ? 'Vi holder til her' : `${s.km} km fra Halden`;
    return `        <a href="elkontroll-${s.slug}.html" class="card">
          <h3>Elkontroll i ${s.navn} →</h3>
          <p>${nf(s.boliger)} boliger · ${avstand}</p>
          <p style="margin-top:8px; font-size:13px;">${s.omrader.slice(0, 4).join(', ')} m.fl.</p>
        </a>`;
  }).join('\n');

  const rader = steder.map(s => `        <tr><td><a href="elkontroll-${s.slug}.html">${s.navn}</a></td><td>${nf(s.boliger)}</td><td>${nf(s.fritidsbygg)}</td><td>${nf(s.gardsbruk)}</td><td>${s.km === 0 ? '—' : s.km + ' km'}</td></tr>`).join('\n');

  const faq = faqBlokk([
    ['Tar dere kjøretillegg?', 'Nei. Fastprisen på 5 000 kr for elkontroll av bolig gjelder i hele Østfold, uavhengig av hvor i fylket du bor.'],
    ['Dekker dere andre steder enn Østfold?', 'Ja. Vi er Halden-basert og dekker Østfold og hele Østlandet. Sidene her beskriver Østfold-kommunene vi jobber mest i — ta kontakt hvis du er utenfor, så finner vi ut av det.'],
    ['Hvor raskt kan dere komme?', 'Det avhenger av hvor du er og hvor mye vi har inne. Vi svarer på henvendelser innen 24 timer og avtaler tidspunkt da. I Halden og nabokommunene kan vi ofte rykke ut på kort varsel.'],
    ['Kan flere naboer bestille samtidig?', 'Ja, og det er en god idé. Vi setter gjerne opp flere oppdrag i samme område på samme dag. Det gir oss bedre logistikk og dere raskere tid.'],
    ['Hva koster det, og varierer prisen med avstand?', 'Elkontroll av bolig koster 5 000 kr som fastpris, med termografering inkludert, og prisen er den samme i hele Østfold. Borettslag, landbruk og næringsbygg får tilbud fordi omfanget varierer for mye til at én pris gir mening. Se prissiden for hele oversikten.']
  ]);

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Elkontroll og termografering',
    provider: { '@type': 'Organization', name: 'Elkontrollen AS', url: BASE + '/' },
    areaServed: steder.map(s => ({ '@type': 'AdministrativeArea', name: s.navn })),
    description: beskrivelse,
    offers: { '@type': 'Offer', name: 'Elkontroll bolig', price: '5000', priceCurrency: 'NOK', availability: 'https://schema.org/InStock' }
  };

  const body = `
<section class="page-hero">
  <div class="wrap">
    <span class="stamp"><span class="dot"></span>Halden-basert · dekker Østfold og Østlandet</span>
    <h1>Områder vi dekker <span>i Østfold.</span></h1>
    <p class="lead">Vi holder til i Lorangløkka 1 i Halden og tar oppdrag i hele fylket. Samme fastpris uansett hvor i Østfold du bor — vi tar ikke kjøretillegg.</p>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line);">
  <div class="wrap">
    <div class="sec-head"><h2>Velg kommune</h2><p>Hver side beskriver bygningsmassen i området og hva den betyr for det elektriske anlegget.</p></div>
    <div class="card-grid">
${kort}
    </div>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line); background:var(--paper-2);">
  <div class="wrap">
    <div class="sec-head"><h2>Bygningsmassen i tall</h2><p>Grunnlaget for hvordan vi planlegger oppdrag i hver kommune.</p></div>
    <div class="data-table-wrap">
      <table class="data-table">
        <thead><tr><th>Kommune</th><th>Boliger</th><th>Fritidsbygg</th><th>Gårdsbruk</th><th>Fra Halden</th></tr></thead>
        <tbody>
${rader}
        </tbody>
      </table>
    </div>
    <p style="font-size:12.5px; color:var(--muted); margin-top:16px;">Kilder: SSB tabell 06266 (boliger, 2026), 03174 (fritidsbygg, 2026) og 08646 (jordbruksbedrifter, 2025). Avstand er kjøreavstand fra Halden sentrum.</p>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line);">
  <div class="wrap">
    <div class="sec-head"><h2>Spørsmål om dekningsområde</h2></div>
${faq.html}
  </div>
</section>

<section class="cta-final centered section">
  <div class="wrap">
    <div class="box">
      <h2>Finner du ikke stedet ditt?</h2>
      <p>Vi dekker Østfold og hele Østlandet. Ta kontakt, så sier vi fra om vi kan ta oppdraget.</p>
      <div class="actions">
        <a class="btn btn-solid" href="kontakt.html">Kontakt oss</a>
        <a class="btn btn-outline-light" href="tel:+4798019154">Ring 980 19 154</a>
      </div>
    </div>
  </div>
</section>
`;

  const html = head({ tittel, beskrivelse, url, bilde: 'elkontroll-bolig-enebolig.jpg' })
    + '\n' + ld(ORG) + '\n' + ld(service) + '\n' + ld(faq.schema)
    + '\n</head>\n<body>\n' + HEADER + body + FOOTER
    + '\n<script src="assets/js/main.js" defer></script>\n</body>\n</html>\n';

  fs.writeFileSync(path.join(ROT, 'omrader.html'), html);
  return 'omrader.html';
}

// ---- kjør ----
const steder = data.steder.sort((a, b) => a.prioritet - b.prioritet);
const filer = steder.map(byggSide);
filer.push(byggOversikt(steder));
filer.forEach(f => console.log('skrev', f));

fs.writeFileSync(path.join(__dirname, 'faktasjekk-data.json'), JSON.stringify(faktasjekk, null, 1));
console.log('\n' + faktasjekk.length + ' punkter til FAKTASJEKK.md');
