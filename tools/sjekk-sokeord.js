// Fase E — sjekker at søkeordene fra tilleggsordren faktisk er dekket, og hvor.
//
// To fallgruver denne sjekken må unngå, begge oppdaget underveis:
//
//   1. For streng matching. Norsk bøyning og fri ordstilling gjør at «Styrets
//      ansvar for det elektriske anlegget» skal treffe søket «styrets ansvar
//      elektrisk anlegg». Eksakt strengmatch meldte åtte falske hull.
//
//   2. For løs matching. «Les mer»-blokkene nederst på sidene lenker til alle
//      artiklene, så overskriftene der inneholder samtlige titler. Tas de med,
//      ser hver side ut til å dekke hvert søkeord. Blokkene fjernes derfor før
//      overskriftene hentes ut.
//
// Kjør fra repo-roten:  node tools/sjekk-sokeord.js

const fs = require('fs');
const path = require('path');

function walk(d, a = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (['.git', 'tools', 'node_modules'].includes(e.name)) continue;
    const p = path.join(d, e.name);
    e.isDirectory() ? walk(p, a) : e.name.endsWith('.html') && a.push(p);
  }
  return a;
}

const SOKEORD = {
  'Kjøpsintensjon': [
    'elkontroll borettslag', 'elkontroll sameie', 'elkontroll borettslag pris',
    'internkontroll borettslag', 'brannalarm kontroll sameie',
    'nødlys kontroll borettslag', 'ladeanlegg borettslag kontroll'
  ],
  'Lokalt': [
    'elkontroll borettslag Fredrikstad', 'elkontroll borettslag Sarpsborg',
    'elkontroll borettslag Halden', 'elkontroll borettslag Moss'
  ],
  'Informasjonssøk': [
    'styrets ansvar elektrisk anlegg', 'hvor ofte elkontroll borettslag',
    'hvem har ansvar elektrisk borettslag', 'elkontroll krav forsikring borettslag'
  ]
};

// Grov stemming — kutter de vanligste norske endelsene. Godt nok til å avgjøre
// om et søkeord er dekket, ikke ment som en språkmodell.
const stamme = o => o.replace(/[^\wæøå]/g, '')
  .replace(/(ene|enes|ers|et|en|er|es|s|e)$/, '')
  .replace(/(isk|iske)$/, '');

// Korte og tomme stammer må lukes bort. Uten det ble «en» til tom streng, og
// tom streng er prefiks til alt — da traff hvert søkeord hver side.
const NYTTIG = s => s.length >= 4;

function treffer(felt, frase) {
  if (!felt) return false;
  const ord = frase.toLowerCase().split(/\s+/).map(stamme).filter(NYTTIG);
  if (!ord.length) return false;
  const feltord = felt.toLowerCase().replace(/<[^>]*>/g, ' ')
    .split(/[^\wæøå]+/).filter(Boolean).map(stamme).filter(NYTTIG);
  // Bare prefiksmatch én vei: feltordet må begynne med søkeordets stamme.
  // «kontroll» treffer «kontrollen», men «el» treffer ikke «elkontroll».
  return ord.every(o => feltord.some(f => f.startsWith(o)));
}

const sider = walk('.').map(f => {
  let h = fs.readFileSync(f, 'utf8');
  // Fjern lenkeblokkene — de inneholder alle artikkeltitler og ville
  // gitt treff på alt overalt
  const innhold = h
    .replace(/<header[\s\S]*?<\/header>/i, '')
    .replace(/<footer[\s\S]*?<\/footer>/i, '')
    .replace(/<(section|div)[^>]*data-relatert[\s\S]*?<\/\1>/gi, '')
    .replace(/<section[^>]*id="les-mer"[\s\S]*?<\/section>/gi, '');

  return {
    fil: f.split(path.sep).join('/').replace(/^\.\//, ''),
    title: (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '',
    desc: (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '',
    h1: [...innhold.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map(m => m[1]).join(' · '),
    h2: [...innhold.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m => m[1]).join(' · ')
  };
});

let sterke = 0, svake = 0, mangler = [];

for (const [gruppe, ord] of Object.entries(SOKEORD)) {
  console.log(`\n${gruppe}`);
  for (const o of ord) {
    // Rangér sidene: treff i title eller h1 er sterkest, så h2, så description
    const kandidater = sider.map(s => {
      let poeng = 0; const felt = [];
      if (treffer(s.title, o)) { poeng += 4; felt.push('title'); }
      if (treffer(s.h1, o)) { poeng += 4; felt.push('h1'); }
      if (treffer(s.h2, o)) { poeng += 2; felt.push('h2'); }
      if (treffer(s.desc, o)) { poeng += 1; felt.push('desc'); }
      return { s, poeng, felt };
    }).filter(k => k.poeng > 0).sort((a, b) => b.poeng - a.poeng);

    if (!kandidater.length) { mangler.push(o); console.log(`  !!  ${o.padEnd(38)} IKKE DEKKET`); continue; }

    const beste = kandidater[0];
    const sterkt = beste.poeng >= 4;
    if (sterkt) sterke++; else svake++;
    console.log(`  ${sterkt ? 'ok' : '~ '}  ${o.padEnd(38)} ${beste.s.fil} (${beste.felt.join('+')})${kandidater.length > 1 ? `  +${kandidater.length - 1} andre` : ''}`);
  }
}

const total = Object.values(SOKEORD).flat().length;
console.log(`\n${sterke} av ${total} søkeord dekket i title eller h1`);
if (svake) console.log(`${svake} dekket svakere (h2 eller description)`);
if (mangler.length) console.log(`ikke dekket: ${mangler.join(', ')}`);
