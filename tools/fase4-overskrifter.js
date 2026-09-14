// Fase 4 — retter hopp i overskriftsnivå (Lighthouse: heading-order).
//
// To mønstre gikk igjen:
//   * h1 -> h3   «Elkontroll bolig» i prisboksen i heroen, rett etter sidens h1
//   * h2 -> h4   stegkort, why-celler og liknende inne i en seksjon
//
// Nivået justeres til nærmeste tillatte, og CSS-selektorene utvides så
// utseendet er nøyaktig som før. Ingen tekst endres.
//
// Kjør fra repo-roten:  node tools/fase4-overskrifter.js

const fs = require('fs');
const path = require('path');

const ROT = path.join(__dirname, '..');
const CSS = path.join(ROT, 'assets', 'css', 'style.css');

function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (['.git', 'tools', 'node_modules', '.lh'].includes(e.name)) continue;
    const p = path.join(d, e.name);
    e.isDirectory() ? walk(p, acc) : e.name.endsWith('.html') && acc.push(p);
  }
  return acc;
}

// ── 1. CSS: la reglene treffe både gammelt og nytt nivå ─────────────────────
// .step h4  ->  .step h4, .step h3   osv. Utseendet blir uendret uansett
// hvilket nivå elementet ender på.
{
  let s = fs.readFileSync(CSS, 'utf8');
  if (!s.includes('/* heading-order: reglene treffer')) {
    const linjer = s.split('\n');
    const ut = [];
    for (const l of linjer) {
      const m = l.match(/^(\.[a-z0-9 .-]*?)\s(h[3-5])\{/);
      if (m && !/^footer/.test(l)) {
        const [, velger, tag] = m;
        const nyTag = 'h' + (+tag[1] - 1);
        ut.push(l.replace(`${velger} ${tag}{`, `${velger} ${tag}, ${velger} ${nyTag}{`));
      } else ut.push(l);
    }
    s = ut.join('\n');
    s = s.replace('/* Selvhostede fonter',
      '/* heading-order: reglene treffer både gammelt og nytt overskriftsnivå, se tools/fase4-overskrifter.js */\n/* Selvhostede fonter');
    fs.writeFileSync(CSS, s);
    console.log('CSS-selektorer utvidet');
  } else console.log('CSS allerede utvidet');
}

// ── 2. HTML: senk nivået der det hoppes ────────────────────────────────────
let endret = 0, rettelser = 0;

for (const f of walk(ROT)) {
  const h0 = fs.readFileSync(f, 'utf8');

  // Del opp slik at header/footer holdes utenfor
  const iH = h0.indexOf('</header>');
  const iF = h0.lastIndexOf('<footer>');
  if (iH === -1 || iF === -1) continue;
  const foran = h0.slice(0, iH + 9);
  let midt = h0.slice(iH + 9, iF);
  const bak = h0.slice(iF);

  let forrige = 0, n = 0;
  midt = midt.replace(/<(h[1-6])([^>]*)>([\s\S]*?)<\/\1>/g, (hele, tag, attr, innhold) => {
    const niva = +tag[1];
    let nytt = niva;
    if (forrige && niva > forrige + 1) { nytt = forrige + 1; n++; }
    forrige = nytt;
    if (nytt === niva) return hele;
    return `<h${nytt}${attr}>${innhold}</h${nytt}>`;
  });

  if (n) {
    fs.writeFileSync(f, foran + midt + bak);
    endret++; rettelser += n;
  }
}

console.log(`${rettelser} overskrifter justert i ${endret} filer`);
