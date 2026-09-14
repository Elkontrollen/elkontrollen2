// Korrigerer dekningsområdet overalt: Østfold, Oslo, Akershus og Buskerud.
//
// Siden sa «Østfold og hele Østlandet» 67 steder, hovedsakelig i footeren.
// «Østlandet» er tatt ut som dekningsbeskrivelse — det er videre og vagere enn det
// faktiske området, og Google vekter samsvar mellom det som står på siden og
// tjenesteområdet i Google Bedriftsprofil.
//
// Idempotent. Kjør fra repo-roten:  node tools/dekningsomrade.js

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

// Rekkefølgen betyr noe — lengste først, ellers spiser en kort regel begynnelsen
// av en lengre.
const ERSTATT = [
  // Footer, 67 sider
  ['Halden-basert kontrollforetak som dekker Østfold og hele Østlandet. Sertifisert, kvalitet og sikkerhet.',
   'Halden-basert kontrollforetak som dekker Østfold, Oslo, Akershus og Buskerud. Sertifisert, kvalitet og sikkerhet.'],
  ['Halden-basert kontrollforetak som dekker Østfold og hele Østlandet.',
   'Halden-basert kontrollforetak som dekker Østfold, Oslo, Akershus og Buskerud.'],

  // Meta-beskrivelser og ingresser
  ['Halden-basert, dekker Østfold og Østlandet.', 'Dekker Østfold, Oslo, Akershus og Buskerud.'],
  ['Halden-basert, vi utfører elkontroll i Østfold og hele Østlandet.',
   'Halden-basert, vi utfører elkontroll i Østfold, Oslo, Akershus og Buskerud.'],
  ['Ja. Vi er Halden-basert og dekker Østfold og hele Østlandet.',
   'Ja. Vi er Halden-basert og dekker Østfold, Oslo, Akershus og Buskerud.'],
  ['Vi dekker Østfold og hele Østlandet.', 'Vi dekker Østfold, Oslo, Akershus og Buskerud.'],
  ['Dekker Østfold og hele Østlandet.', 'Dekker Østfold, Oslo, Akershus og Buskerud.'],
  ['for boliger, borettslag, næringsbygg og landbruk i Østfold og hele Østlandet.',
   'for boliger, borettslag, næringsbygg og landbruk i Østfold, Oslo, Akershus og Buskerud.'],

  // Stempler og småtekst
  ['Sertifisert kontrollforetak · Halden · dekker Østfold og Østlandet',
   'Sertifisert kontrollforetak · Halden · Østfold, Oslo, Akershus og Buskerud'],
  ['NEK 405-2 sertifisert · Halden · Østfold og Østlandet',
   'NEK 405-2 sertifisert · Halden · Østfold, Oslo, Akershus, Buskerud'],
  ['Halden-basert · dekker Østfold og Østlandet',
   'Halden-basert · Østfold, Oslo, Akershus og Buskerud'],
  ['Halden-basert, kjenner styrer og forretningsførere i Østfold og Østlandet.',
   'Halden-basert, kjenner styrer og forretningsførere i Østfold, Oslo, Akershus og Buskerud.'],
  ['Halden-basert, og ute i hele Østfold.', 'Halden-basert, og ute i hele dekningsområdet.'],

  // Områdetagger på kontakt og om-oss
  ['<div class="area-tags"><span>Østfold</span><span>Akershus</span><span>Oslo</span></div>',
   '<div class="area-tags"><span>Østfold</span><span>Oslo</span><span>Akershus</span><span>Buskerud</span></div>'],
  ['<div class="area-tags" style="margin-top:12px;"><span>Østfold</span><span>Akershus</span><span>Oslo</span></div>',
   '<div class="area-tags" style="margin-top:12px;"><span>Østfold</span><span>Oslo</span><span>Akershus</span><span>Buskerud</span></div>'],

  // Restformuleringer med «Østlandet» som dekningsområde
  ['dekker Østfold og hele Østlandet', 'dekker Østfold, Oslo, Akershus og Buskerud'],
  ['dekker Østfold og Østlandet', 'dekker Østfold, Oslo, Akershus og Buskerud'],
  ['i Østfold og hele Østlandet', 'i Østfold, Oslo, Akershus og Buskerud'],
  ['i Østfold og Østlandet', 'i Østfold, Oslo, Akershus og Buskerud'],
  ['Østfold og hele Østlandet', 'Østfold, Oslo, Akershus og Buskerud'],
  ['Østfold og Østlandet', 'Østfold, Oslo, Akershus og Buskerud']
];

let filer = 0, treff = 0;
const perRegel = {};

for (const f of walk('.')) {
  let h = fs.readFileSync(f, 'utf8');
  const før = h;
  for (const [a, b] of ERSTATT) {
    const n = h.split(a).length - 1;
    if (n) { h = h.split(a).join(b); treff += n; perRegel[a.slice(0, 48)] = (perRegel[a.slice(0, 48)] || 0) + n; }
  }
  if (h !== før) { fs.writeFileSync(f, h); filer++; }
}

// llms.txt og README har samme formuleringer
for (const f of ['llms.txt', 'README.md']) {
  if (!fs.existsSync(f)) continue;
  let s = fs.readFileSync(f, 'utf8');
  const før = s;
  for (const [a, b] of ERSTATT) s = s.split(a).join(b);
  if (s !== før) { fs.writeFileSync(f, s); console.log('  ' + f + ' oppdatert'); }
}

console.log(`${treff} forekomster rettet i ${filer} HTML-filer\n`);
Object.entries(perRegel).sort((x, y) => y[1] - x[1]).forEach(([k, v]) => console.log(`  ${String(v).padStart(3)}  ${k}…`));
