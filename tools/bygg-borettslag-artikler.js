// Fase C — bygger de åtte nye borettslagsartiklene.
//
// Header og footer hentes fra en eksisterende artikkel, så navigasjonen alltid
// følger resten av siden. Alle artiklene lenker tilbake til /borettslag/.
//
// Idempotent. Kjør fra repo-roten:  node tools/bygg-borettslag-artikler.js

const fs = require('fs');
const path = require('path');

const ROT = path.join(__dirname, '..');
const BASE = 'https://elkontrollen.no';
const ARTIKLER = require('./borettslag-artikler.js');
const TILLEGG = require('./borettslag-artikler-tillegg.js');

// Slå sammen hovedseksjonene med tilleggsseksjonene og FAQ-en
ARTIKLER.forEach(a => {
  const t = TILLEGG[a.slug];
  if (!t) return;
  a.seksjoner = a.seksjoner.concat(t.ekstra || []);
  a.faq = t.faq || [];
});

const MAL = fs.readFileSync(path.join(ROT, 'blogg', 'hvor-ofte-elkontroll-borettslag.html'), 'utf8');
const HEADER = MAL.match(/<header>[\s\S]*?<\/header>/)[0].replace(/ class="current"/g, '');
const FOOTER = MAL.match(/<footer>[\s\S]*?<\/footer>/)[0];
const MOBIL = (MAL.match(/<div class="mobile-cta-bar">[\s\S]*?<\/div>/) || [''])[0];

const MND = ['januar', 'februar', 'mars', 'april', 'mai', 'juni',
  'juli', 'august', 'september', 'oktober', 'november', 'desember'];

function norskDato(iso) {
  const [å, m, d] = iso.split('-').map(Number);
  return `${d}. ${MND[m - 1]} ${å}`;
}

const faktasjekk = [];

function bygg(a) {
  const fil = `blogg/${a.slug}.html`;
  const url = `${BASE}/${fil}`;

  let brød = `<p>${a.ingress}</p>\n`;
  a.seksjoner.forEach(([tittel, avsnitt, usikker]) => {
    brød += `\n<h2>${tittel}</h2>\n`;
    if (usikker) {
      faktasjekk.push({ fil, seksjon: tittel, tekst: avsnitt[0].replace(/<[^>]*>/g, '') });
      brød += `<!-- TRENGER FAKTASJEKK -->\n`;
    }
    avsnitt.forEach(p => { brød += `<p>${p}</p>\n`; });
  });

  if (a.faq && a.faq.length) {
    brød += `
<h2>Vanlige spørsmål</h2>
`;
    a.faq.forEach(([q, sv]) => {
      brød += `      <div class="faq-item"><div class="faq-q"><span>${q}</span><span class="plus">+</span></div><div class="faq-a"><p>${sv}</p></div></div>
`;
    });
  }

  const rentekst = x => x.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  const schema = [
    {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: a.tittel,
      datePublished: a.dato,
      description: a.beskrivelse
    }
  ];
  if (a.faq && a.faq.length) schema.push({
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: a.faq.map(([q, sv]) => ({ '@type': 'Question', name: rentekst(q),
      acceptedAnswer: { '@type': 'Answer', text: rentekst(sv) } }))
  });

  const html = `<!DOCTYPE html>
<html lang="nb">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${a.metaTittel}</title>
<meta name="description" content="${a.beskrivelse}">
<link rel="preload" href="../assets/fonts/ibm-plex-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../assets/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="../assets/css/style.css">
<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:title" content="${a.tittel}">
<meta property="og:description" content="${a.beskrivelse}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${BASE}/assets/img/service-borettslag-sameie-og.jpg">
<meta property="og:locale" content="nb_NO">
<meta property="og:site_name" content="Elkontrollen">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${a.tittel}">
<meta name="twitter:description" content="${a.beskrivelse}">
<meta name="twitter:image" content="${BASE}/assets/img/service-borettslag-sameie-og.jpg">
${schema.map(o => `<script type="application/ld+json">\n${JSON.stringify(o)}\n</script>`).join('\n')}
</head>
<body>
${HEADER}
<main id="innhold">

<article class="article">
  <a href="/blogg/" class="back-link">← Tilbake til bloggen</a>
  <span class="date">${norskDato(a.dato)}</span>
  <h1>${a.tittel}</h1>

${brød}
  <div data-relatert style="margin-top:40px; padding-top:24px; border-top:1px solid var(--line);">
    <h2 style="font-size:17px; margin-bottom:12px;">Les mer</h2>
    <ul class="bullet-list" style="display:block;">
      <li><a href="/borettslag/">Trygt Borettslag — samlet kontroll for styret</a></li>
${a.relatert.map(([h, t]) => `      <li><a href="${h}">${t}</a></li>`).join('\n')}
    </ul>
  </div>

  <div style="margin-top:32px; padding-top:24px; border-top:1px solid var(--line);">
    <a href="/borettslag/" class="link-arrow">Se Trygt Borettslag — samlet kontroll for styret →</a>
  </div>
</article>

</main>
${FOOTER}
${MOBIL}
<script src="../assets/js/main.js" defer></script>
</body>
</html>
`;

  fs.writeFileSync(path.join(ROT, fil), html);
  const ord = brød.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
  return { fil, ord };
}

// Krysslenking mellom artiklene i klyngen — hver får tre naboer
const ALLE = ARTIKLER.map(a => [`/blogg/${a.slug}.html`, a.tittel]);
const EKSISTERENDE = [
  ['/blogg/styrets-ansvar-for-det-elektriske-anlegget-dette-bor-dere-vite.html', 'Styrets ansvar for det elektriske anlegget'],
  ['/blogg/hvor-ofte-elkontroll-borettslag.html', 'Hvor ofte må borettslag ha elkontroll?'],
  ['/blogg/ladeanlegg-borettslag-kontroll.html', 'Må ladeanlegget i borettslaget kontrolleres?'],
  ['/blogg/arlig-kontroll-av-brannalarm-og-nodlys-i-sameier-dette-er-lovpalagt.html', 'Brannalarm og nødlys i sameier — lovpålagt årlig kontroll']
];

ARTIKLER.forEach((a, i) => {
  const naboer = [ALLE[(i + 1) % ALLE.length], ALLE[(i + 2) % ALLE.length], EKSISTERENDE[i % EKSISTERENDE.length]];
  a.relatert = naboer;
});

const resultat = ARTIKLER.map(bygg);
resultat.forEach(r => console.log(`  ${r.fil.padEnd(52)} ${r.ord} ord`));

fs.writeFileSync(path.join(__dirname, 'faktasjekk-borettslag.json'), JSON.stringify(faktasjekk, null, 1));
console.log(`\n${resultat.length} artikler, ${faktasjekk.length} avsnitt merket TRENGER FAKTASJEKK`);
