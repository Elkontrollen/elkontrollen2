// Finner overskriftsnivåer som hopper over et trinn (h2 -> h4), som er det
// Lighthouse flagger som heading-order. Header og footer holdes utenfor —
// de er like på alle sider og vurderes for seg.
//
// Kjør fra repo-roten:  node tools/sjekk-overskrifter.js

const fs = require('fs');
const path = require('path');

function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (['.git', 'tools', 'node_modules', '.lh'].includes(e.name)) continue;
    const p = path.join(d, e.name);
    e.isDirectory() ? walk(p, acc) : e.name.endsWith('.html') && acc.push(p);
  }
  return acc;
}

let sider = 0, medHopp = 0;
const teller = {};

for (const f of walk('.').sort()) {
  const h = fs.readFileSync(f, 'utf8')
    .replace(/<head[\s\S]*?<\/head>/i, '')
    .replace(/<header[\s\S]*?<\/header>/i, '')
    .replace(/<footer[\s\S]*?<\/footer>/i, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '');

  // Match hele elementet. En tidligere versjon lette bare 60 tegn framover etter
  // neste «<», og overså dermed overskrifter med lang, ren tekst — noe som ga
  // falske treff på hopp.
  const funnet = [...h.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/g)]
    .map(m => ({ n: +m[1][1], tekst: m[2].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() }));

  sider++;
  let forrige = 0, hopp = [];
  for (const o of funnet) {
    if (forrige && o.n > forrige + 1) {
      hopp.push(`h${forrige} -> h${o.n} ved «${o.tekst.slice(0, 38)}»`);
      teller[`h${forrige}->h${o.n}`] = (teller[`h${forrige}->h${o.n}`] || 0) + 1;
    }
    forrige = o.n;
  }
  if (hopp.length) {
    medHopp++;
    console.log(f.split(path.sep).join('/').replace(/^\.\//, ''));
    hopp.forEach(x => console.log('    ' + x));
  }
}

console.log(`\n${medHopp} av ${sider} sider har hopp i overskriftsnivå`);
console.log(Object.entries(teller).map(([k, v]) => `  ${k}: ${v}`).join('\n') || '  ingen');
