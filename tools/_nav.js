// Legger /priser i hovedmenyen og /forsikringsrabatt i Bolig-nedtrekket,
// på alle sider. Håndterer at relative stier har ulik dybde.
const fs = require('fs'), path = require('path');
function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (['.git', 'tools', 'node_modules'].includes(e.name)) continue;
    const p = path.join(d, e.name);
    e.isDirectory() ? walk(p, acc) : e.name.endsWith('.html') && acc.push(p);
  }
  return acc;
}

let nav = 0, drop = 0, foot = 0, hoppet = [];

for (const f of walk('.')) {
  let h = fs.readFileSync(f, 'utf8');
  const før = h;

  // 1) Hovedmeny: "Priser" rett før "Fått avvik?"
  if (!/<a href="(?:\.\.\/)*priser\.html">Priser<\/a>/.test(h)) {
    const m = h.match(/(\s*)<a href="((?:\.\.\/)*)fatt-avvik\.html">F&#229;tt avvik\?<\/a>/);
    if (m) {
      h = h.replace(m[0], `${m[1]}<a href="${m[2]}priser.html">Priser</a>${m[0]}`);
      nav++;
    }
  }

  // 2) Bolig-nedtrekket: "Forsikringsrabatt" etter "Elkontroll ved kjøp og salg"
  if (!/nav-drop-panel-inner[\s\S]{0,400}forsikringsrabatt\.html/.test(h)) {
    const m = h.match(/(\s*)<a href="((?:\.\.\/)*)elkontroll-boligsalg\.html">Elkontroll ved kj&#248;p og salg<\/a>/);
    if (m) {
      h = h.replace(m[0], `${m[0]}${m[1]}<a href="${m[2]}forsikringsrabatt.html">Forsikringsrabatt</a>`);
      drop++;
    }
  }

  // 3) Footer, Bolig-gruppa: begge sidene
  if (!/<li><a href="(?:\.\.\/)*priser\.html">Priser<\/a><\/li>/.test(h)) {
    const m = h.match(/(\s*)<li><a href="((?:\.\.\/)*)elkontroll-boligsalg\.html">Elkontroll ved kj&#248;p og salg<\/a><\/li>/);
    if (m) {
      h = h.replace(m[0],
        `${m[0]}${m[1]}<li><a href="${m[2]}priser.html">Priser</a></li>` +
        `${m[1]}<li><a href="${m[2]}forsikringsrabatt.html">Forsikringsrabatt</a></li>`);
      foot++;
    }
  }

  if (h !== før) fs.writeFileSync(f, h);
  else hoppet.push(f);
}

console.log(`hovedmeny: ${nav}  bolig-nedtrekk: ${drop}  footer: ${foot}`);
if (hoppet.length) { console.log('uendret:'); hoppet.forEach(x => console.log('  ', x)); }
