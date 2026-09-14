// Fase 4, bilder.
//
//   1. Alle brukte bilder konverteres til WebP, med fornuftig maksbredde.
//      <img>-taggene byttes til .webp og får width, height og bedre alt-tekst.
//   2. og:image beholder JPG — noen sosiale skrapere håndterer fortsatt ikke
//      WebP — men får en egen 1200x630-variant, som er formatet delingskortene
//      faktisk vises i. Originalene er 1400x2373 portrett, som blir stygt beskåret.
//   3. Fire filnavn som brukes som og:image finnes ikke og gir 404 i produksjon.
//      De pekes om til et eksisterende, relevant bilde.
//
// Krever sharp.  Kjør fra repo-roten:  node tools/fase4-bilder.js

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROT = path.join(__dirname, '..');
const IMG = path.join(ROT, 'assets', 'img');

function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (['.git', 'tools', 'node_modules'].includes(e.name)) continue;
    const p = path.join(d, e.name);
    e.isDirectory() ? walk(p, acc) : e.name.endsWith('.html') && acc.push(p);
  }
  return acc;
}

// Filnavn som refereres, men ikke finnes. Peker dem til noe som faktisk ligger der.
const MANGLER = {
  'elkontroll-bolig.jpg': 'elkontroll-bolig-enebolig.jpg',
  'elkontroll-landbruk.jpg': 'landbruk-driftsbygning.jpg',
  'internkontroll.jpg': 'naering-kontorbygg.jpg',
  'termografi.jpg': 'sikringsskap-norsk.jpg'
};

// Bedre alt-tekster. De gamle var generiske stockbildebeskrivelser, og én sa
// «Næringsbygg i Oslo» på en side som markedsfører Halden og Østfold.
const ALT = {
  'service-elkontroll-bolig': 'Sikringsskap åpnet under elkontroll av bolig',
  'service-borettslag-sameie': 'Boligblokk med felles elektrisk anlegg',
  'naering-kontorbygg': 'Næringsbygg med elektrisk anlegg som kontrolleres etter NEK 405-3',
  'service-brannalarm-nodlys': 'Sikringsskap kontrollert av sertifisert kontrollør',
  'garantikontroll-byggeplass': 'Nybygg under oppføring, før reklamasjonsfristen utløper',
  'elbillading-ladestasjon': 'Ladestasjon for elbil i felles garasjeanlegg',
  'landbruk-driftsbygning': 'Driftsbygning på gårdsbruk med elektrisk anlegg',
  'elkontroll-bolig-enebolig': 'Enebolig av typen vi kontrollerer i Østfold'
};

(async () => {
  // ── 1. WebP ──────────────────────────────────────────────────────────────
  const brukt = new Set();
  for (const f of walk(ROT)) {
    const h = fs.readFileSync(f, 'utf8');
    for (const m of h.matchAll(/assets\/img\/([a-z0-9.-]+)\.(jpg|jpeg|png)/g)) brukt.add(m[1]);
  }

  const dim = {};
  let laget = 0, spart = 0;
  for (const navn of [...brukt].sort()) {
    const kilde = path.join(IMG, navn + '.jpg');
    if (!fs.existsSync(kilde)) continue;           // manglende filer håndteres under
    const ut = path.join(IMG, navn + '.webp');
    const meta = await sharp(kilde).metadata();
    const bredde = Math.min(meta.width, 1400);
    const bilde = sharp(kilde).resize({ width: bredde, withoutEnlargement: true });
    await bilde.webp({ quality: 78 }).toFile(ut);
    const nyMeta = await sharp(ut).metadata();
    dim[navn] = { w: nyMeta.width, h: nyMeta.height };
    const før = fs.statSync(kilde).size, etter = fs.statSync(ut).size;
    spart += før - etter;
    laget++;
    console.log(`  ${navn}.webp  ${nyMeta.width}x${nyMeta.height}  ${(før / 1024).toFixed(0)} kB -> ${(etter / 1024).toFixed(0)} kB`);
  }
  console.log(`${laget} WebP-filer, ${(spart / 1024 / 1024).toFixed(2)} MB spart\n`);

  // ── 2. og:image i 1200x630 ───────────────────────────────────────────────
  const ogBrukt = new Set();
  for (const f of walk(ROT)) {
    const h = fs.readFileSync(f, 'utf8');
    for (const m of h.matchAll(/og:image" content="[^"]*assets\/img\/([a-z0-9.-]+)\.jpg"/g)) ogBrukt.add(m[1]);
  }
  let og = 0;
  for (const navn of [...ogBrukt].sort()) {
    const kildeNavn = MANGLER[navn + '.jpg'] ? MANGLER[navn + '.jpg'].replace(/\.jpg$/, '') : navn;
    const kilde = path.join(IMG, kildeNavn + '.jpg');
    if (!fs.existsSync(kilde)) { console.error('  mangler kilde for og:image:', navn); continue; }
    await sharp(kilde)
      .resize(1200, 630, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(IMG, navn + '-og.jpg'));
    og++;
  }
  console.log(`${og} og:image-varianter i 1200x630\n`);

  // ── 3. HTML ──────────────────────────────────────────────────────────────
  let imgTagger = 0, ogTagger = 0, filer = 0;
  for (const f of walk(ROT)) {
    let h = fs.readFileSync(f, 'utf8');
    const før = h;

    // <img> -> webp + width/height + alt
    h = h.replace(/<img([^>]*?)src="((?:\.\.\/)*assets\/img\/)([a-z0-9.-]+)\.(jpg|jpeg|png)"([^>]*?)>/g,
      (hele, pre, sti, navn, ext, post) => {
        const d = dim[navn];
        if (!d) return hele;
        let attr = (pre + post);
        // fjern eksisterende alt/width/height, settes på nytt under
        const gammelAlt = (attr.match(/alt="([^"]*)"/) || [])[1] || '';
        attr = attr.replace(/\s*alt="[^"]*"/, '').replace(/\s*width="[^"]*"/, '').replace(/\s*height="[^"]*"/, '');
        const alt = ALT[navn] || gammelAlt;
        imgTagger++;
        return `<img${attr.replace(/\s+$/, '')} src="${sti}${navn}.webp" alt="${alt}" width="${d.w}" height="${d.h}">`;
      });

    // og:image / twitter:image -> -og.jpg, og manglende filer omdirigeres
    h = h.replace(/(og:image|twitter:image)" content="(https:\/\/elkontrollen\.no\/assets\/img\/)([a-z0-9.-]+)\.jpg"/g,
      (hele, prop, base, navn) => { ogTagger++; return `${prop}" content="${base}${navn}-og.jpg"`; });

    if (h !== før) { fs.writeFileSync(f, h); filer++; }
  }
  console.log(`${imgTagger} <img>-tagger og ${ogTagger} og/twitter:image oppdatert i ${filer} filer`);
})();
