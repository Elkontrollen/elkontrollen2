// Fase 4, steg 1 — strukturelle og tilgjengelighetsrettelser på alle sider.
//
//   1. lang="no"  ->  lang="nb"
//   2. <main>-landemerke rundt sideinnholdet   (Lighthouse: landmark-one-main)
//   3. footer <h5>  ->  <h2>                   (Lighthouse: heading-order)
//   4. main.js lastes med defer                (render-blocking)
//
// Idempotent. Kjør fra repo-roten:  node tools/fase4-struktur.js

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

const tall = { lang: 0, main: 0, h5: 0, defer: 0 };
const utenMain = [];

for (const f of walk('.')) {
  let h = fs.readFileSync(f, 'utf8');
  const før = h;

  // 1) lang
  if (h.includes('<html lang="no">')) { h = h.replace('<html lang="no">', '<html lang="nb">'); tall.lang++; }

  // 2) <main> mellom </header> og <footer>
  if (!/<main[\s>]/.test(h)) {
    const i = h.indexOf('</header>');
    const j = h.lastIndexOf('<footer>');
    if (i !== -1 && j !== -1 && j > i) {
      const start = i + '</header>'.length;
      h = h.slice(0, start) + '\n<main id="innhold">' + h.slice(start, j) + '</main>\n' + h.slice(j);
      tall.main++;
    } else {
      utenMain.push(f);
    }
  }

  // 3) footer h5 -> h2 (kun i footeren, ikke .trust-item h5 / .report-row h5 ellers på siden)
  const fi = h.lastIndexOf('<footer>');
  if (fi !== -1) {
    const fslutt = h.indexOf('</footer>', fi);
    let footer = h.slice(fi, fslutt);
    if (footer.includes('<h5>')) {
      const nyFooter = footer.replace(/<h5>/g, '<h2>').replace(/<\/h5>/g, '</h2>');
      h = h.slice(0, fi) + nyFooter + h.slice(fslutt);
      tall.h5++;
    }
  }

  // 4) defer på main.js
  const m = h.match(/<script src="((?:\.\.\/)*assets\/js\/main\.js)"><\/script>/);
  if (m) { h = h.replace(m[0], `<script src="${m[1]}" defer></script>`); tall.defer++; }

  if (h !== før) fs.writeFileSync(f, h);
}

console.log(`lang="nb": ${tall.lang}   <main>: ${tall.main}   footer h5→h2: ${tall.h5}   defer: ${tall.defer}`);
if (utenMain.length) {
  console.log('\nikke wrappet i <main> (mangler header eller footer) — håndteres manuelt:');
  utenMain.forEach(x => console.log('  ', x));
}
