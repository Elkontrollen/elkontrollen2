// Legger nye FAQ-spørsmål inn i HTML og oppdaterer/oppretter FAQPage-schema.
//
// Idempotent: et spørsmål som allerede står på siden legges ikke inn på nytt.
//
// Kjør fra repo-roten:  node tools/bygg-faq.js

const fs = require('fs');
const path = require('path');

const ROT = path.join(__dirname, '..');
const tillegg = require('./faq-tillegg.js');

// Bygger markup for ett FAQ-element, med samme innrykk som de eksisterende.
function faqItem(q, a, innrykk) {
  return `${innrykk}<div class="faq-item"><div class="faq-q"><span>${q}</span><span class="plus">+</span></div><div class="faq-a"><p>${a}</p></div></div>`;
}

// Schema-tekst skal være ren tekst, ikke HTML.
const rentekst = s => s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

function oppdaterSchema(h, alleSpm) {
  const blokker = [...h.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)];
  const nyttSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: alleSpm.map(([q, a]) => ({
      '@type': 'Question', name: rentekst(q),
      acceptedAnswer: { '@type': 'Answer', text: rentekst(a) }
    }))
  };
  const ny = `<script type="application/ld+json">\n${JSON.stringify(nyttSchema)}\n</script>`;

  for (const b of blokker) {
    let o;
    try { o = JSON.parse(b[1]); } catch (e) { continue; }
    if (o['@type'] === 'FAQPage') return h.replace(b[0], ny);
  }
  // Fantes ikke: legg den inn rett før </head>
  return h.replace('</head>', ny + '\n</head>');
}

const FAQ_RE = /<div class="faq-item"><div class="faq-q"><span>([\s\S]*?)<\/span><span class="plus">\+<\/span><\/div><div class="faq-a"><p>([\s\S]*?)<\/p><\/div><\/div>/g;

// Leser spørsmål + svar som står i HTML-en, i rekkefølge.
function eksisterende(h) {
  return [...h.matchAll(FAQ_RE)].map(m => [m[1], m[2]]);
}

// Bare spørsmålene i den SISTE seksjonen som inneholder faq-item skal inn i
// FAQPage-schema. `.faq-item` brukes nemlig også som trekkspill for innhold som
// ikke er spørsmål og svar — for eksempel tilleggstjenestene på borettslag/pris.
function schemaSpm(h) {
  const seksjoner = [...h.matchAll(/<section[\s\S]*?<\/section>/g)]
    .map(m => m[0])
    .filter(s => s.includes('class="faq-item"'));
  const kilde = seksjoner.length ? seksjoner[seksjoner.length - 1] : h;
  return eksisterende(kilde);
}

let endret = 0, hoppet = [];

for (const [fil, nye] of Object.entries(tillegg)) {
  const p = path.join(ROT, fil);
  if (!fs.existsSync(p)) { console.error('MANGLER', fil); continue; }
  let h = fs.readFileSync(p, 'utf8');

  const finnes = eksisterende(h);
  const finnesNavn = new Set(finnes.map(x => x[0]));
  const skalInn = nye.filter(([q]) => !finnesNavn.has(q));

  if (!skalInn.length) {
    // Ingen nye spørsmål, men schemaet bygges likevel på nytt slik at det holder
    // seg i synk med HTML-en.
    const oppdatert = oppdaterSchema(h, schemaSpm(h));
    if (oppdatert !== h) { fs.writeFileSync(p, oppdatert); console.log(fil + ': schema synkronisert'); endret++; }
    else hoppet.push(fil + ' (uendret)');
    continue;
  }

  if (finnes.length) {
    // Legg de nye etter det siste eksisterende FAQ-elementet.
    const alle = [...h.matchAll(/([ \t]*)<div class="faq-item"><div class="faq-q">[\s\S]*?<\/p><\/div><\/div>/g)];
    const siste = alle[alle.length - 1];
    if (!siste) { console.error('fant ikke siste faq-item i', fil); continue; }
    const innrykk = siste[1];
    const lagt = skalInn.map(([q, a]) => faqItem(q, a, innrykk)).join('\n');
    h = h.replace(siste[0], siste[0] + '\n' + lagt);
  } else {
    // Ingen FAQ fra før: lag en hel seksjon rett før <footer>.
    const seksjon = `
<section class="section" style="border-top:1px solid var(--line);">
  <div class="wrap">
    <div class="sec-head"><h2>Spørsmål og svar</h2></div>
${skalInn.map(([q, a]) => faqItem(q, a, '      ')).join('\n')}
  </div>
</section>

`;
    if (!h.includes('<footer>')) { console.error('fant ingen <footer> i', fil); continue; }
    h = h.replace('<footer>', seksjon + '<footer>');
  }

  h = oppdaterSchema(h, schemaSpm(h));
  fs.writeFileSync(p, h);
  console.log(`${fil}: ${finnes.length} → ${eksisterende(h).length} spørsmål (+${skalInn.length})`);
  endret++;
}

console.log(`\n${endret} sider oppdatert`);
if (hoppet.length) { console.log('uendret:'); hoppet.forEach(x => console.log('  ', x)); }
