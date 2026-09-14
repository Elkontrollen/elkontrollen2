// Fase 4 — setter inn nye <title> og <meta description>, og holder
// og:title / og:description / twitter:* i synk med dem.
//
// Kjør fra repo-roten:  node tools/fase4-meta.js

const fs = require('fs');
const path = require('path');

const ROT = path.join(__dirname, '..');
const NYE = require('./meta-tekster.js');

const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

let tittel = 0, besk = 0, avvik = [];

for (const [fil, ny] of Object.entries(NYE)) {
  const p = path.join(ROT, fil);
  if (!fs.existsSync(p)) { console.error('MANGLER', fil); continue; }
  let h = fs.readFileSync(p, 'utf8');
  const før = h;

  if (ny.t) {
    if (ny.t.length > 60) avvik.push(`${fil}: title ${ny.t.length} tegn`);
    h = h.replace(/<title>[\s\S]*?<\/title>/, `<title>${ny.t}</title>`);
    // og:title og twitter:title skal følge tittelen, uten merkevaresuffiks
    const kort = ny.t.split(/\s+\|\s+/)[0];
    h = h.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(kort)}">`);
    h = h.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${esc(kort)}">`);
    tittel++;
  }

  if (ny.d) {
    if (ny.d.length > 155) avvik.push(`${fil}: description ${ny.d.length} tegn`);
    const d = esc(ny.d);
    h = h.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${d}">`);
    h = h.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${d}">`);
    h = h.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${d}">`);
    besk++;
  }

  if (h !== før) fs.writeFileSync(p, h);
}

console.log(`${tittel} titler og ${besk} beskrivelser oppdatert`);
if (avvik.length) { console.log('\nfortsatt for lange:'); avvik.forEach(a => console.log('  ', a)); }
