// Fase 4 — selvhoster fontene.
//
// Google Fonts-stilarket var den enkeltressursen som blokkerte rendringen mest:
// Lighthouse målte 893 ms på mobil. Kjeden var HTML -> fonts.googleapis.com (CSS)
// -> fonts.gstatic.com (woff2), altså to ekstra opphav med hver sin DNS- og
// TLS-runde før første tekst kunne tegnes.
//
// Her lastes woff2-filene ned til assets/fonts/, @font-face legges inn øverst i
// style.css, og <link> til Google droppes. font-display:swap beholdes, så tekst
// vises umiddelbart i reservefont mens fila lastes.
//
// To ting gjøres i tillegg:
//   * Bare latin og latin-ext hentes. Kyrillisk, gresk og vietnamesisk trengs
//     ikke på en norsk side, og utgjorde over halvparten av filene.
//   * Google leverer variable fonter, så alle vektene av samme familie og subsett
//     peker på nøyaktig samme fil. De slås sammen til én @font-face med
//     vektområde, ellers laster nettleseren de samme bytene flere ganger.
//
// Kjør fra repo-roten:  node tools/fase4-fonter.js

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROT = path.join(__dirname, '..');
const FONTDIR = path.join(ROT, 'assets', 'fonts');
const CSS = path.join(ROT, 'assets', 'css', 'style.css');
const KILDE = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const SUBSETT = ['latin', 'latin-ext'];

const hent = (url, binaer) => new Promise((ok, feil) => {
  https.get(url, { headers: { 'User-Agent': UA } }, res => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) return hent(res.headers.location, binaer).then(ok, feil);
    if (res.statusCode !== 200) return feil(new Error(url + ' ga ' + res.statusCode));
    const b = [];
    res.on('data', c => b.push(c));
    res.on('end', () => ok(binaer ? Buffer.concat(b) : Buffer.concat(b).toString('utf8')));
  }).on('error', feil);
});

function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (['.git', 'tools', 'node_modules'].includes(e.name)) continue;
    const p = path.join(d, e.name);
    e.isDirectory() ? walk(p, acc) : e.name.endsWith('.html') && acc.push(p);
  }
  return acc;
}

const enLinje = s => s
  .replace(/\s*\n\s*/g, ' ')
  .replace(/^@font-face \{\s*/, '@font-face{')
  .replace(/\s*\}$/, '}');

(async () => {
  fs.mkdirSync(FONTDIR, { recursive: true });
  const css = await hent(KILDE, false);

  const blokker = [...css.matchAll(/\/\* ([a-z-]+) \*\/\s*(@font-face \{[\s\S]*?\})/g)]
    .map(m => ({ subsett: m[1], regel: m[2] }))
    .filter(b => SUBSETT.includes(b.subsett));

  // Grupper på familie + subsett, slik at variable fonter blir én fil
  const grupper = new Map();
  for (const b of blokker) {
    const familie = (b.regel.match(/font-family:\s*'([^']+)'/) || [])[1];
    const vekt = +(b.regel.match(/font-weight:\s*(\d+)/) || [])[1];
    const url = (b.regel.match(/url\((https:\/\/[^)]+)\)/) || [])[1];
    if (!familie || !vekt || !url) continue;

    const fil = `${familie.toLowerCase().replace(/\s+/g, '-')}-${b.subsett}.woff2`;
    const g = grupper.get(fil);
    if (g) { g.min = Math.min(g.min, vekt); g.maks = Math.max(g.maks, vekt); }
    else grupper.set(fil, { regel: b.regel, url, min: vekt, maks: vekt, familie, subsett: b.subsett });
  }

  let bytes = 0;
  const regler = [];
  for (const [fil, g] of grupper) {
    const mal = path.join(FONTDIR, fil);
    if (!fs.existsSync(mal)) fs.writeFileSync(mal, await hent(g.url, true));
    const st = fs.statSync(mal).size;
    bytes += st;
    regler.push(enLinje(g.regel
      .replace(/url\(https:\/\/[^)]+\)/, `url(../fonts/${fil})`)
      .replace(/font-weight:\s*\d+/, `font-weight: ${g.min} ${g.maks}`)));
    console.log(`  ${fil.padEnd(34)} vekt ${g.min}-${g.maks}  ${(st / 1024).toFixed(0)} kB`);
  }

  // Rydd bort filer fra tidligere kjøringer som ikke lenger brukes
  for (const f of fs.readdirSync(FONTDIR)) {
    if (f.endsWith('.woff2') && !grupper.has(f)) { fs.unlinkSync(path.join(FONTDIR, f)); console.log('  slettet ubrukt', f); }
  }

  const blokk = '/* Selvhostede fonter. Generert av tools/fase4-fonter.js — ikke rediger for hånd. */\n'
    + regler.join('\n') + '\n\n';

  let s = fs.readFileSync(CSS, 'utf8');
  s = s.replace(/\/\* Selvhostede fonter[\s\S]*?\n\n/, '');
  fs.writeFileSync(CSS, blokk + s);

  // <link> til Google ut av alle sider, og forhåndslast den viktigste fonten
  let sider = 0;
  for (const f of walk(ROT)) {
    let h = fs.readFileSync(f, 'utf8');
    const før = h;
    h = h.replace(/\s*<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">/g, '');
    h = h.replace(/\s*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>/g, '');
    h = h.replace(/\s*<link href="https:\/\/fonts\.googleapis\.com\/css2[^"]*" rel="stylesheet">/g, '');
    h = h.replace(/\s*<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com\/css2[^"]*">/g, '');
    if (h !== før) { fs.writeFileSync(f, h); sider++; }
  }

  console.log(`\n${regler.length} @font-face fra ${grupper.size} filer, ${(bytes / 1024).toFixed(0)} kB totalt`);
  console.log(`Google Fonts-lenker fjernet fra ${sider} sider`);
})();
