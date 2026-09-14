// Fase 4 — setter inn de redaksjonelle lenkene fra tools/lenking.js.
//
// Bloggartikler får en «Relevante tjenester»-blokk rett før </article>.
// Tjenestesider får en «Les mer»-blokk rett før <footer>.
//
// Idempotent. Kjør fra repo-roten:  node tools/fase4-lenking.js

const fs = require('fs');
const path = require('path');

const ROT = path.join(__dirname, '..');
const { artikkelTilTjeneste, tjenesteTilArtikkel } = require('./lenking.js');

const MARKOR = 'data-relatert';

// Relativ sti fra en fil til en annen, begge oppgitt fra repo-roten.
function sti(fra, til) {
  const opp = fra.split('/').length - 1;
  return '../'.repeat(opp) + til;
}

let art = 0, tj = 0;

// ── Bloggartikler ───────────────────────────────────────────────────────────
for (const [fil, lenker] of Object.entries(artikkelTilTjeneste)) {
  const p = path.join(ROT, 'blogg', fil);
  if (!fs.existsSync(p)) { console.error('MANGLER blogg/' + fil); continue; }
  let h = fs.readFileSync(p, 'utf8');
  if (h.includes(MARKOR)) continue;

  const punkter = lenker
    .map(([href, tekst]) => `      <li><a href="${sti('blogg/' + fil, href)}">${tekst}</a></li>`)
    .join('\n');

  const blokk = `  <div ${MARKOR} style="margin-top:40px; padding-top:24px; border-top:1px solid var(--line);">
    <h2 style="font-size:17px; margin-bottom:12px;">Relevante tjenester</h2>
    <ul class="bullet-list" style="display:block;">
${punkter}
    </ul>
  </div>
`;

  if (!h.includes('</article>')) { console.error('ingen </article> i blogg/' + fil); continue; }
  h = h.replace('</article>', blokk + '</article>');
  fs.writeFileSync(p, h);
  art++;
}

// ── Tjenestesider ───────────────────────────────────────────────────────────
for (const [fil, lenker] of Object.entries(tjenesteTilArtikkel)) {
  const p = path.join(ROT, fil);
  if (!fs.existsSync(p)) { console.error('MANGLER ' + fil); continue; }
  let h = fs.readFileSync(p, 'utf8');
  if (h.includes(MARKOR)) continue;

  const punkter = lenker
    .map(([href, tekst]) => `        <li><a href="${sti(fil, href)}">${tekst}</a></li>`)
    .join('\n');

  const blokk = `
<section ${MARKOR} class="section tight" style="border-top:1px solid var(--line); background:var(--paper-2);">
  <div class="wrap">
    <div class="sec-head" style="margin-bottom:14px;"><h2>Les mer</h2></div>
    <ul class="bullet-list" style="display:block;">
${punkter}
    </ul>
  </div>
</section>

`;

  if (!h.includes('</main>')) { console.error('ingen </main> i ' + fil); continue; }
  h = h.replace('</main>', blokk + '</main>');
  fs.writeFileSync(p, h);
  tj++;
}

console.log(`${art} bloggartikler og ${tj} tjenestesider fikk redaksjonelle lenker`);
