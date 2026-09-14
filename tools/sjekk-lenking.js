// Måler redaksjonell intern lenking — altså lenker i brødteksten, ikke i
// header, footer eller nav, som er like på alle sider og derfor ikke sier noe.
//
// Fase 4 krever at hver bloggartikkel lenker til minst én tjenesteside, og at
// hver tjenesteside lenker til minst to artikler.
//
// Kjør fra repo-roten:  node tools/sjekk-lenking.js

const fs = require('fs');
const path = require('path');

const TJENESTER = [
  'elkontroll-bolig', 'elkontroll-boligsalg', 'landbruk', 'naering', 'internkontroll',
  'kontrollavtale', 'garantikontroll', 'brannalarm-nodlys', 'elbillading-kontroll',
  'fatt-avvik', 'tjenester', 'borettslag', 'priser', 'forsikringsrabatt', 'omrader',
  'elkontroll-fredrikstad', 'elkontroll-sarpsborg', 'elkontroll-halden', 'elkontroll-moss',
  'elkontroll-indre-ostfold', 'elkontroll-rakkestad', 'elkontroll-hvaler', 'elkontroll-aremark'
];

// /kontakt er en generisk oppfordring, ikke en tematisk tjenestelenke.
const IKKE_TEMATISK = new Set(['kontakt', 'om-oss', 'skjemaer', 'takk']);

function brodtekst(h) {
  return h
    .replace(/<head[\s\S]*?<\/head>/i, '')
    .replace(/<header[\s\S]*?<\/header>/i, '')
    .replace(/<footer[\s\S]*?<\/footer>/i, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<div class="mobile-cta-bar">[\s\S]*?<\/div>/gi, '');
}

function lenker(h) {
  return [...brodtekst(h).matchAll(/href="([^"]+)"/g)]
    .map(m => m[1])
    .filter(x => !/^(#|tel:|mailto:|https?:)/.test(x))
    .map(x => x.split('#')[0].split('?')[0]
      .replace(/^\/+/, '').replace(/^(\.\.\/)+/, '').replace(/^\.\//, '')
      .replace(/index\.html$/, '').replace(/\.html$/, '').replace(/\/$/, ''))
    .filter(Boolean);
}

const artikler = fs.readdirSync('blogg')
  .filter(f => f.endsWith('.html') && f !== 'index.html')
  .map(f => 'blogg/' + f).sort();

const tjenestesider = [
  ...TJENESTER.filter(t => t !== 'borettslag').map(t => t + '.html'),
  'borettslag/index.html', 'borettslag/elkontroll/index.html', 'borettslag/ladeanlegg/index.html',
  'borettslag/brannvern/index.html', 'borettslag/leiligheter/index.html', 'borettslag/pris/index.html',
  'borettslag/kartlegging/index.html'
].filter(f => fs.existsSync(f));

console.log('BLOGG -> tjenesteside (tematisk, ikke /kontakt)\n');
const utenTjeneste = [];
for (const f of artikler) {
  const l = lenker(fs.readFileSync(f, 'utf8'));
  const tj = [...new Set(l.filter(x => TJENESTER.some(t => x === t || x.startsWith(t + '/')) && !IKKE_TEMATISK.has(x)))];
  const status = tj.length ? 'ok  ' : '!!  ';
  console.log(`  ${status}${path.basename(f).slice(0, 62).padEnd(64)}${tj.join(', ') || '(bare generisk CTA)'}`);
  if (!tj.length) utenTjeneste.push(f);
}

console.log('\nTJENESTESIDE -> bloggartikler (krav: minst 2)\n');
const forFaa = [];
for (const f of tjenestesider) {
  const l = lenker(fs.readFileSync(f, 'utf8'));
  const bl = [...new Set(l.filter(x => x.startsWith('blogg/') && x !== 'blogg'))];
  const status = bl.length >= 2 ? 'ok  ' : '!!  ';
  console.log(`  ${status}${f.padEnd(44)}${bl.length}`);
  if (bl.length < 2) forFaa.push(f + ' (' + bl.length + ')');
}

console.log('\n─────');
console.log(`artikler uten tematisk tjenestelenke: ${utenTjeneste.length} av ${artikler.length}`);
utenTjeneste.forEach(x => console.log('   ', x));
console.log(`tjenestesider med under 2 bloggenker: ${forFaa.length} av ${tjenestesider.length}`);
forFaa.forEach(x => console.log('   ', x));
