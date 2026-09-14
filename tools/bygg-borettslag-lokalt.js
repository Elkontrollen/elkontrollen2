// Fase D — bygger /elkontroll-borettslag-[sted].
//
// Fire sider: Fredrikstad, Sarpsborg, Halden og Moss. Kombinasjonen av
// kjøpsintensjon og fravær av konkurranse er høyest her.
//
// Idempotent. Kjør fra repo-roten:  node tools/bygg-borettslag-lokalt.js

const fs = require('fs');
const path = require('path');

const ROT = path.join(__dirname, '..');
const BASE = 'https://elkontrollen.no';
const STEDER = require('./borettslag-lokalt.js');

const MAL = fs.readFileSync(path.join(ROT, 'om-oss.html'), 'utf8');
const HEADER = MAL.match(/<header>[\s\S]*?<\/header>/)[0].replace(/ class="current"/g, '');
const FOOTER = MAL.match(/<footer>[\s\S]*?<\/footer>/)[0];

const nf = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const rentekst = x => x.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
const MERKE = '<!-- TRENGER LOKALKUNNSKAP -->';
const faktasjekk = [];

function bygg(s) {
  const fil = `elkontroll-borettslag-${s.slug}.html`;
  const url = `${BASE}/${fil}`;
  const erHalden = s.km === 0;

  const faq = [
    [`Hva koster elkontroll av borettslag i ${s.navn}?`,
     'Prisen settes etter størrelsen på fellesanlegget — antall tavler og fordelinger, hvor mange bygg som inngår, og om laget har ladeanlegg. Ikke etter antall leiligheter alene, siden kontrollen ikke går inn i leilighetene. Kartleggingen er gratis, og det er der dere får tallet.'],
    [`Hvor raskt er dere på plass i ${s.navn}?`,
     erHalden
       ? 'Vi holder til i Lorangløkka 1 i Halden. Det betyr at vi som regel kan tilby tid raskt, og rykke ut på kort varsel når noe haster — for eksempel ved pålegg fra Det lokale eltilsyn.'
       : `${s.navn} ligger rundt ${s.km} km fra basen vår i Halden, ${s.minTekst} med bil. Vi er i området jevnlig og setter gjerne opp flere lag samme dag.`],
    ['Må beboerne være hjemme?',
     'Nei. Kontroll av fellesanlegget dekker hovedtavle, stigere, fellesrom, kjeller, garasje og utebelysning — ingen tilgang til leilighetene er nødvendig. Skal leilighetene også kontrolleres, avtaler vi et eget tidsvindu med styret.'],
    ['Gjelder dette sameier også?',
     'Ja. På elsiden er kravene like for borettslag og sameier — begge er virksomhet etter internkontrollforskriften og har samme plikt til å holde fellesanlegget forsvarlig og kunne dokumentere det. Forskjellen ligger i eierforholdet og i hvordan tiltak finansieres.'],
    ['Hva inngår i en kontroll?',
     'Elkontroll av fellesanlegget etter NEK 405-3, termografering under last, kontroll av ladeanlegg, brannalarm og nødlys, og en prioritert avviksrapport styret kan legge rett inn i internkontrollen.'],
    ['Utbedrer dere avvikene selv?',
     'Nei. Vi er et uavhengig kontrollforetak — vi finner og dokumenterer, dere henter inn en elektriker dere selv velger. Den som vurderer bør ikke tjene på funnene.']
  ];

  const schema = [
    {
      '@context': 'https://schema.org', '@type': 'Service',
      serviceType: `Elkontroll for borettslag og sameier i ${s.navn}`,
      provider: { '@id': BASE + '/#elkontrollen' },
      areaServed: [
        { '@type': 'AdministrativeArea', name: s.navn },
        ...s.omrader.slice(0, 6).map(o => ({ '@type': 'Place', name: o }))
      ],
      description: s.beskrivelse,
      offers: {
        '@type': 'Offer', name: 'Trygt Borettslag — årsavtale',
        priceCurrency: 'NOK', availability: 'https://schema.org/InStock',
        url: BASE + '/borettslag/pris/',
        description: 'Pris settes etter gratis kartlegging av bygget.'
      }
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: faq.map(([q, a]) => ({
        '@type': 'Question', name: rentekst(q),
        acceptedAnswer: { '@type': 'Answer', text: rentekst(a) }
      }))
    }
  ];

  s.funn.forEach((f, i) => faktasjekk.push({
    fil, sted: s.navn, seksjon: `Det vi typisk finner i ${s.navn}`, nr: i + 1, tekst: rentekst(f)
  }));

  const reise = erHalden
    ? 'Vi holder til i Lorangløkka 1 i Halden. Det betyr korte avstander i egen kommune, og at vi som regel kan rykke ut på kort varsel når noe haster — for eksempel når Det lokale eltilsyn har gitt et pålegg med frist.'
    : `${s.navn} ligger rundt <strong>${s.km} km</strong> fra basen vår i Lorangløkka 1 i Halden — ${s.minTekst} med bil. Vi er i området jevnlig, og setter gjerne opp flere lag samme dag. Har nabolaget flere borettslag som vurderer kontroll, gir det bedre logistikk for oss og raskere tid for dere.`;

  const body = `
<main id="innhold">

<section class="page-hero">
  <div class="wrap hero-inner" style="align-items:start;">
    <div>
      <span class="stamp"><span class="dot"></span>For styret i ${s.navn}</span>
      <h1>Elkontroll for borettslag <span>og sameier i ${s.iNavn}.</span></h1>
      <p class="lead">${s.ingress}</p>
      <div class="bullet-list">
        <div class="bullet"><span class="chk">✓</span>Elkontroll, termografi, brannalarm, nødlys og ladeanlegg i én befaring</div>
        <div class="bullet"><span class="chk">✓</span>Prioritert avviksliste styret kan bruke i budsjettet</div>
        <div class="bullet"><span class="chk">✓</span>Uavhengig kontrollforetak — vi selger ikke utbedringen</div>
      </div>
    </div>
    <div class="buybox">
      <div class="badge"><span class="d"></span>Gratis og uforpliktende</div>
      <h2>Kartlegging av bygget</h2>
      <p style="font-family:'Space Grotesk'; font-size:19px; font-weight:600; color:var(--ink); margin-bottom:4px;">Pris etter kartlegging</p>
      <p style="margin-bottom:18px;">Vi går gjennom bygget med styret eller vaktmester, setter opp en kontrollplan og gir en konkret årspris. Fast pris fordelt over året.</p>
      <a class="btn btn-solid" href="/borettslag/kartlegging/" style="width:100%;">Be om kartlegging</a>
      <a class="btn btn-outline" href="tel:+4798019154" style="width:100%; margin-top:10px;">Ring 980 19 154</a>
      <div class="fine">NEK 405-sertifisert · svar &lt; 24t</div>
    </div>
  </div>
</section>

<section class="section tight" style="border-top:1px solid var(--line);">
  <div class="wrap">
    <div class="stats-band">
      <div class="stat-card"><span class="num">${nf(s.brl)}</span><span class="lbl">borettslag i ${s.navn}</span></div>
      <div class="stat-card"><span class="num">${nf(s.esek)}</span><span class="lbl">eierseksjonssameier</span></div>
      <div class="stat-card"><span class="num">${nf(s.blokk)}</span><span class="lbl">blokkleiligheter</span></div>
    </div>
    <p style="margin-top:16px; font-size:12.5px; color:var(--muted);">Antall borettslag og sameier: Brønnøysundregistrene, Enhetsregisteret. Blokkleiligheter: SSB tabell 06266 (2026).</p>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line); background:var(--paper-2);">
  <div class="wrap">
    <div class="sec-head"><h2>Blokkbebyggelsen i ${s.navn} — og hva den betyr for styret</h2><p>Tyngdepunkt: ${s.topp}.</p></div>
    <div style="max-width:760px;">
${s.bygningsmasse.map(p => `      <p style="color:var(--muted); line-height:1.75; margin-bottom:18px;">${p}</p>`).join('\n')}
    </div>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line);">
  <div class="wrap">
    <div class="sec-head"><h2>Det vi typisk finner i ${s.navn}</h2></div>
    <ul class="checklist" style="max-width:760px;">
${s.funn.map(f => `      ${MERKE}\n      <li><span class="chk">→</span>${f}</li>`).join('\n')}
    </ul>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line);">
  <div class="wrap">
    <div class="sec-head"><h2>${erHalden ? 'Vi holder til i Halden' : 'Fra Halden til ' + s.navn}</h2></div>
    <p style="max-width:760px; color:var(--muted); line-height:1.75;">${reise}</p>
    <div class="area-tags" style="margin-top:20px;">${s.omrader.map(o => `<span>${o}</span>`).join('')}</div>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line); background:var(--paper-2);">
  <div class="wrap">
    <div class="sec-head"><h2>Dette inngår</h2><p>Fem kontroller styret er ansvarlig for, samlet i én avtale.</p></div>
    <ul class="checklist" style="max-width:760px;">
      <li><span class="chk">✓</span><strong>Elkontroll av fellesanlegget</strong> etter NEK 405-3 — hovedtavle, stigeledninger, fellesmålere, oppganger, kjeller, garasje og utebelysning</li>
      <li><span class="chk">✓</span><strong>Termografering</strong> etter NEK 405-1, under last — inkludert, uten tilleggspris</li>
      <li><span class="chk">✓</span><strong>Brannalarm og nødlys</strong> — årlig kontroll av FG-750/760-sertifisert personell</li>
      <li><span class="chk">✓</span><strong>Kontroll av ladeanlegg</strong> — den tyngste lasten i bygget</li>
      <li><span class="chk">✓</span><strong>Dokumentasjon til internkontrollen</strong> — rapport styret kan legge rett inn i HMS-permen</li>
    </ul>
    <div style="margin-top:24px;">
      <a href="/borettslag/" class="link-arrow">Mer om Trygt Borettslag →</a>
    </div>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line);">
  <div class="wrap">
    <div class="sec-head"><h2>Spørsmål fra styrer i ${s.navn}</h2></div>
${faq.map(([q, a]) => `      <div class="faq-item"><div class="faq-q"><span>${q}</span><span class="plus">+</span></div><div class="faq-a"><p>${a}</p></div></div>`).join('\n')}
  </div>
</section>

<section class="section tight" style="border-top:1px solid var(--line); background:var(--paper-2);">
  <div class="wrap">
    <div class="sec-head" style="margin-bottom:14px;"><h2>Les mer</h2></div>
    <ul class="bullet-list" style="display:block;">
      <li><a href="/blogg/hva-koster-elkontroll-borettslag.html">Hva koster elkontroll i borettslag?</a></li>
      <li><a href="/blogg/hvor-ofte-elkontroll-borettslag.html">Hvor ofte må borettslag og sameier ha elkontroll?</a></li>
      <li><a href="/blogg/ansvar-elektrisk-styret-eller-andelseier.html">Hvem har ansvaret: styret eller andelseier?</a></li>
      <li><a href="/blogg/internkontroll-elektro-borettslag.html">Internkontroll elektro — hva styret må ha på plass</a></li>
      <li><a href="elkontroll-${s.slug}.html">Elkontroll i ${s.navn} — bolig, næring og landbruk</a></li>
    </ul>
  </div>
</section>

<section class="cta-final centered section">
  <div class="wrap">
    <div class="box">
      <h2>Skal vi ta en kikk på anlegget i ${s.navn}?</h2>
      <p>Kartleggingen er gratis og uforpliktende. Dere får en kontrollplan og en konkret årspris.</p>
      <div class="actions">
        <a class="btn btn-solid" href="/borettslag/kartlegging/">Be om kartlegging</a>
        <a class="btn btn-outline-light" href="tel:+4798019154">Ring 980 19 154</a>
      </div>
    </div>
  </div>
</section>

</main>
`;

  const html = `<!DOCTYPE html>
<html lang="nb">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${s.metaTittel}</title>
<meta name="description" content="${s.beskrivelse}">
<link rel="preload" href="assets/fonts/ibm-plex-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/style.css">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${s.metaTittel.split(' | ')[0]}">
<meta property="og:description" content="${s.beskrivelse}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${BASE}/assets/img/service-borettslag-sameie-og.jpg">
<meta property="og:locale" content="nb_NO">
<meta property="og:site_name" content="Elkontrollen">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${s.metaTittel.split(' | ')[0]}">
<meta name="twitter:description" content="${s.beskrivelse}">
<meta name="twitter:image" content="${BASE}/assets/img/service-borettslag-sameie-og.jpg">
${schema.map(o => `<script type="application/ld+json">\n${JSON.stringify(o)}\n</script>`).join('\n')}
</head>
<body>
${HEADER}${body}${FOOTER}
<script src="assets/js/main.js" defer></script>
</body>
</html>
`;

  fs.writeFileSync(path.join(ROT, fil), html);
  const ord = body.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
  return { fil, ord, t: s.metaTittel.length, d: s.beskrivelse.length };
}

const r = STEDER.map(bygg);
r.forEach(x => console.log(`  ${x.fil.padEnd(40)} ${String(x.ord).padStart(4)} ord   title ${x.t}   desc ${x.d}`));
fs.writeFileSync(path.join(__dirname, 'faktasjekk-borettslag-lokalt.json'), JSON.stringify(faktasjekk, null, 1));
console.log(`\n${r.length} sider, ${faktasjekk.length} avsnitt merket TRENGER LOKALKUNNSKAP`);
