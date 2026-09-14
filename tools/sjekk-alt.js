// Full validering av hele nettstedet. Kjøres fra repo-roten:
//
//   node tools/sjekk-alt.js
//
// Fanger de fire feiltypene som faktisk har oppstått under arbeidet:
// brutte interne lenker, JSON-LD som ikke parser, ubalanserte tagger og
// sider uten nøyaktig én h1.

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

const filer = walk('.');
const finnes = new Set(filer.map(f => f.split(path.sep).join('/').replace(/^\.\//, '')));

// Tagger som ikke lukkes, og som derfor ikke skal telles i balansesjekken.
const TOMME = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr']);

let lenker = 0, brutte = [], jsonld = 0, jsonfeil = [], ubalanse = [], h1feil = [];

for (const f of filer) {
  const rel = f.split(path.sep).join('/').replace(/^\.\//, '');
  const h = fs.readFileSync(f, 'utf8');

  // ── interne lenker ──────────────────────────────────────────────────────
  for (const m of h.matchAll(/(?:href|src)="([^"]+)"/g)) {
    let u = m[1];
    if (/^(https?:|mailto:|tel:|data:|#|\/\/)/.test(u)) continue;
    lenker++;
    u = u.split('#')[0].split('?')[0];
    if (!u) continue;

    // Løs opp relativt mot mappa fila ligger i
    let mal = u.startsWith('/')
      ? u.slice(1)
      : path.posix.normalize(path.posix.join(path.posix.dirname(rel), u));
    if (mal === '.' || mal === '') mal = 'index.html';

    const kandidater = [mal, mal + '.html', mal.replace(/\/$/, '') + '/index.html',
      mal + '/index.html'];
    const treff = kandidater.some(k => finnes.has(k) || fs.existsSync(k));
    if (!treff) brutte.push(rel + ' -> ' + m[1]);
  }

  // ── JSON-LD ─────────────────────────────────────────────────────────────
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    jsonld++;
    try { JSON.parse(m[1]); } catch (e) { jsonfeil.push(rel + ': ' + e.message); }
  }

  // ── tagbalanse ──────────────────────────────────────────────────────────
  const tell = {};
  for (const m of h.matchAll(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?(\/?)>/g)) {
    const [, slutt, navn, selvlukkende] = m;
    const t = navn.toLowerCase();
    if (TOMME.has(t) || selvlukkende) continue;
    tell[t] = (tell[t] || 0) + (slutt ? -1 : 1);
  }
  const skjeve = Object.entries(tell).filter(([, n]) => n !== 0);
  if (skjeve.length) ubalanse.push(rel + ': ' + skjeve.map(([t, n]) => t + ' ' + (n > 0 ? '+' : '') + n).join(', '));

  // ── nøyaktig én h1 ──────────────────────────────────────────────────────
  const n = (h.match(/<h1\b/g) || []).length;
  if (n !== 1) h1feil.push(rel + ' (' + n + ')');
}

const linje = (navn, feil, total) => {
  console.log((feil.length ? '  !!  ' : '  ok  ') + navn.padEnd(24) +
    (feil.length ? feil.length + ' feil' : (total !== undefined ? total + ', ingen feil' : 'ingen feil')));
  feil.slice(0, 15).forEach(x => console.log('        ' + x));
  if (feil.length > 15) console.log('        … og ' + (feil.length - 15) + ' til');
};

linje('interne lenker', brutte, lenker);
linje('JSON-LD', jsonfeil, jsonld);
linje('tagbalanse', ubalanse, filer.length + ' sider');
linje('nøyaktig én h1', h1feil, filer.length + ' sider');

const sum = brutte.length + jsonfeil.length + ubalanse.length + h1feil.length;
console.log('\n' + filer.length + ' sider | ' + lenker + ' interne lenker | ' +
  jsonld + ' JSON-LD-blokker | ' + (sum ? sum + ' FEIL' : 'ingen feil'));
process.exit(sum ? 1 : 0);
