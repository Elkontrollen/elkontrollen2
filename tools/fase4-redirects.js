// Fase 4, steg 3 — samler hver side på én URL.
//
// Problemet (REVISJON.md seksjon 5): hver side svarer 200 på to URL-er,
// /elkontroll-bolig og /elkontroll-bolig.html, mens canonical peker på .html og
// Netlifys «Pretty URLs» skriver om de interne lenkene til den andre varianten.
//
// Løsningen holder de eksisterende .html-URL-ene — arbeidsordren sier uttrykkelig
// at URL-er ikke skal endres — og gjør to ting:
//
//   1. netlify.toml: slår av pretty_urls, slik at interne lenker blir stående som
//      .html i det som faktisk serveres, i samsvar med canonical.
//   2. _redirects: 301 fra den utvidelsesløse varianten til .html, slik at
//      duplikatet forsvinner hvis Google allerede har funnet det.
//
// Kjør fra repo-roten:  node tools/fase4-redirects.js

const fs = require('fs');
const path = require('path');

const ROT = path.join(__dirname, '..');

function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (['.git', 'tools', 'node_modules'].includes(e.name)) continue;
    const p = path.join(d, e.name);
    e.isDirectory() ? walk(p, acc) : e.name.endsWith('.html') && acc.push(p);
  }
  return acc;
}

const sider = walk(ROT)
  .map(f => path.relative(ROT, f).split(path.sep).join('/'))
  .filter(r => !/(^|\/)index\.html$/.test(r))   // mappesider har allerede /-form
  .filter(r => r !== '404.html')
  // takk.html er malet for skjemaenes action="/takk". En 301 her ville truffet
  // POST-en foer Netlify rakk aa behandle skjemaet, og innsendingen ville gaatt
  // tapt uten at brukeren merket noe - de hadde landet paa takkesiden uansett.
  .filter(r => r !== 'takk.html')
  .sort();

const linjer = [
  '# Hver side skal svare på én URL.',
  '#',
  '# Netlify serverer /elkontroll-bolig og /elkontroll-bolig.html som to URL-er som',
  '# begge gir 200. Canonical peker på .html-varianten, så her sendes den andre dit',
  '# med 301. Utropstegnet tvinger regelen foran Netlifys egen filoppslag.',
  '#',
  '# Generert av tools/fase4-redirects.js — ikke rediger for hånd.',
  ''
];

for (const r of sider) {
  const uten = '/' + r.replace(/\.html$/, '');
  linjer.push(`${uten}  /${r}  301!`);
}

// Mappesidene har med vilje INGEN regler her.
//
// En regel som '/borettslag/pris  /borettslag/pris/  301!' ser riktig ut, men Netlify
// behandler kilden med og uten avsluttende skrastrek som samme sti. Forespørselen mot
// /borettslag/pris/ traff da sin egen regel, og med utropstegnet gikk den foran
// filoppslaget. Resultatet var en uendelig omdirigeringsløkke som slo ut blogg-indeksen
// og hele Trygt Borettslag-seksjonen i produksjon.
//
// Netlify håndterer mappesider riktig på egen hånd: /borettslag/pris uten skråstrek
// sendes til formen med skråstrek, som er den canonical peker på.

// Sikring mot løkker: ingen regel får peke på seg selv, på samme sti med eller uten
// avsluttende skråstrek, eller på en mappe. Det var nettopp det som slo ut blogg- og
// borettslag-seksjonen i produksjon første gang denne fila ble generert.
for (const l of linjer) {
  if (!l.trim() || l.startsWith('#')) continue;
  const [fra, til] = l.trim().split(/\s+/);
  const n = x => x.replace(/\/$/, '');
  if (n(fra) === n(til)) throw new Error('Omdirigeringsløkke: ' + l);
  if (til.endsWith('/')) throw new Error('Regelen peker på en mappe, som gir løkke: ' + l);
}

fs.writeFileSync(path.join(ROT, '_redirects'), linjer.join('\n') + '\n');
console.log('_redirects skrevet:', sider.length, 'sider + mappesider');

// netlify.toml
const toml = `[build]
  publish = "."

# Netlifys «Pretty URLs» skriver om interne lenker fra x.html til /x etter deploy.
# Canonical på sidene peker på .html, så omskrivingen sendte all intern lenkekraft
# til den varianten canonical sier ikke er den riktige. Se REVISJON.md seksjon 5.
[build.processing.html]
  pretty_urls = false
`;
fs.writeFileSync(path.join(ROT, 'netlify.toml'), toml);
console.log('netlify.toml oppdatert: pretty_urls = false');
