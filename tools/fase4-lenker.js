// Fase 4, steg 4 — interne lenker til mappesider skal peke på den kanoniske formen.
//
// Canonical på mappesidene er /blogg/ og /borettslag/…/ uten index.html, og på
// forsiden er den /. De interne lenkene pekte på index.html. Det er den samme
// konflikten som er beskrevet i REVISJON.md seksjon 5, bare for mappesidene:
// lenkekraften gikk til en URL canonical sier ikke er den riktige.
//
// Her byttes de til absolutte stier, som er entydige uansett hvor i mappetreet
// fila ligger. Filnavnene er uendret — ingen URL forsvinner.
//
// Idempotent. Kjør fra repo-roten:  node tools/fase4-lenker.js

const fs = require('fs');
const path = require('path');

function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (['.git', 'tools', 'node_modules'].includes(e.name)) continue;
    const p = path.join(d, e.name);
    e.isDirectory() ? walk(p, acc) : e.name.endsWith('.html') && acc.push(p);
  }
  return acc;
}

// Rekkefølgen betyr noe: de dypeste stiene først, ellers spiser en kortere regel
// begynnelsen av en lengre.
const REGLER = [
  [/(href|src)="(?:\.\.\/)*borettslag\/(brannvern|elkontroll|kartlegging|ladeanlegg|leiligheter|pris)\/index\.html"/g,
   (m, attr, mappe) => `${attr}="/borettslag/${mappe}/"`],
  [/(href|src)="(?:\.\.\/)*(brannvern|elkontroll|kartlegging|ladeanlegg|leiligheter|pris)\/index\.html"/g,
   (m, attr, mappe) => `${attr}="/borettslag/${mappe}/"`],
  [/(href|src)="(?:\.\.\/)*borettslag\/index\.html"/g, (m, attr) => `${attr}="/borettslag/"`],
  [/(href|src)="(?:\.\.\/)*blogg\/index\.html"/g, (m, attr) => `${attr}="/blogg/"`]
];

let endret = 0, treff = 0;

for (const f of walk('.')) {
  const r = path.relative('.', f).split(path.sep).join('/');
  let h = fs.readFileSync(f, 'utf8');
  const før = h;

  for (const [re, fn] of REGLER) {
    h = h.replace(re, (...a) => { treff++; return fn(...a); });
  }

  // "index.html" uten mappe betyr ulike ting avhengig av hvor fila ligger.
  const iMappe = r.includes('/');
  const mappe = iMappe ? r.slice(0, r.lastIndexOf('/') + 1) : '';
  h = h.replace(/(href|src)="index\.html"/g, (m, attr) => {
    treff++;
    return `${attr}="/${mappe}"`;
  });
  // ../index.html fra en undermappe er forsiden når mappa ligger i roten
  h = h.replace(/(href|src)="\.\.\/index\.html"/g, (m, attr) => {
    treff++;
    const opp = mappe.split('/').filter(Boolean).slice(0, -1).join('/');
    return `${attr}="/${opp ? opp + '/' : ''}"`;
  });
  h = h.replace(/(href|src)="\.\.\/\.\.\/index\.html"/g, (m, attr) => {
    treff++;
    const opp = mappe.split('/').filter(Boolean).slice(0, -2).join('/');
    return `${attr}="/${opp ? opp + '/' : ''}"`;
  });

  if (h !== før) { fs.writeFileSync(f, h); endret++; }
}

console.log(`${treff} lenker rettet i ${endret} filer`);
