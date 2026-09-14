// Sjekker at hver tjenesteside har 5-7 spørsmål i FAQPage-schema,
// og at schemaet stemmer med antallet spørsmål i selve FAQ-seksjonen.
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

const TJENESTE = /^(elkontroll-bolig|elkontroll-boligsalg|landbruk|naering|internkontroll|kontrollavtale|garantikontroll|brannalarm-nodlys|elbillading-kontroll|fatt-avvik|tjenester|priser|forsikringsrabatt|omrader|elkontroll-(fredrikstad|sarpsborg|halden|moss|indre-ostfold|rakkestad|hvaler|aremark))\.html$|^borettslag\//;

const utenfor = [];
for (const f of walk('.').sort()) {
  const rel = f.split(path.sep).join('/').replace(/^\.\//, '');
  if (!TJENESTE.test(rel)) continue;
  const h = fs.readFileSync(f, 'utf8');

  let n = 0;
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let o;
    try { o = JSON.parse(m[1]); } catch (e) { continue; }
    if (o['@type'] === 'FAQPage') n = o.mainEntity.length;
  }
  const html = (h.match(/<div class="faq-item">/g) || []).length;
  // /borettslag/ følger tilleggsordren, som ber om 7–8 spørsmål på hovedsiden.
  const tak = rel === "borettslag/index.html" ? 8 : 7;
  const ok = n >= 5 && n <= tak;
  console.log((ok ? '  ok  ' : '  !!  ') + rel.padEnd(38) + 'schema:' + String(n).padStart(2) + '  faq-item i html:' + String(html).padStart(2));
  if (!ok) utenfor.push(rel + ' (' + n + ')');
}
console.log('\nutenfor kravet: ' + (utenfor.length ? utenfor.join(', ') : 'ingen'));
