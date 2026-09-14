// Fase B — bygger om /borettslag/ til produktsiden tilleggsordren beskriver.
//
// Kravene: h1 «Elkontroll for borettslag og sameier», pakkeinnholdet som fem
// punkter høyt på siden, hva styret slipper, prismodellen konkret, prosess i tre
// steg, FAQ med 7–8 spørsmål, og lenker til hele artikkelklyngen.
//
// Ingen superlativer. Omfanget vises ved å liste hva som faktisk inngår.
// Skjemaet for sjekklista beholdes uendret fra dagens side.
//
// Idempotent. Kjør fra repo-roten:  node tools/bygg-borettslag-hub.js

const fs = require('fs');
const path = require('path');

const ROT = path.join(__dirname, '..');
const BASE = 'https://elkontrollen.no';
const FIL = path.join(ROT, 'borettslag', 'index.html');

const GAMMEL = fs.readFileSync(FIL, 'utf8');
const HEADER = GAMMEL.match(/<header>[\s\S]*?<\/header>/)[0];
const FOOTER = GAMMEL.match(/<footer>[\s\S]*?<\/footer>/)[0];
const MOBIL = (GAMMEL.match(/<div class="mobile-cta-bar">[\s\S]*?<\/div>/) || [''])[0];
// Sjekklisteskjemaet beholdes slik det er — det er et fungerende Netlify-skjema
const SJEKKLISTE = GAMMEL.match(/<section class="section tight"[^>]*id="sjekkliste">[\s\S]*?<\/section>/)[0];

const TITTEL = 'Elkontroll for borettslag og sameier | Elkontrollen';
const BESKRIVELSE = 'Elkontroll av fellesanlegget, termografering, brannalarm, nødlys og ladeanlegg. Én befaring, én rapport, én leverandør. Gratis kartlegging først.';

// ── Pakken, fem punkter ────────────────────────────────────────────────────
const PAKKEN = [
  ['Elkontroll av fellesanlegget', 'NEK 405-3',
   'Hovedtavle, stigeledninger, fellesmålere, oppganger, kjeller, garasje og utebelysning. Alt styret er ansvarlig for, gjennomgått og dokumentert.'],
  ['Termografering', 'NEK 405-1',
   'Varmekamera på tavler og fordelinger under last. Avdekker varmgang før den blir en brann. Inkludert, uten tilleggspris.'],
  ['Brannalarm og nødlys', 'FG-750 / FG-760',
   'Årlig kontroll av sentral, detektorer, sirener, overføring og alle nødlysarmaturer. Utført av sertifisert personell — vaktmesteren kan ikke gjøre den.'],
  ['Kontroll av ladeanlegg', 'NEK 400 / NEK 405-3',
   'Den tyngste og mest kontinuerlige lasten i bygget. Termografi under last, vern, jordfeilvern og lastbalansering.'],
  ['Dokumentasjon til internkontrollen', 'Internkontrollforskriften',
   'Rapport styret kan legge rett inn i HMS-permen. Ikke en teknisk utskrift som må oversettes først.']
];

// ── Det som skiller fra en vanlig elektriker ───────────────────────────────
const SKILLER = [
  ['Avviksliste med status, ikke bare funn',
   'En rapport forteller hva som ble funnet. En avviksliste forteller hva som er åpent, hva som er utbedret, hva som haster og hva det omtrent koster. Det er den styret faktisk kan bruke — i budsjettet, på styremøtet og overfor årsmøtet.'],
  ['Dokumentasjon som overlever styreskifte',
   'Styret byttes hvert år, og kunnskapen forsvinner med dem. Alt vi leverer lagres på laget og er tilgjengelig for hele styret — ikke sendt som vedlegg til én e-postadresse. Nytt styre arver et system, ikke en bunke papirer i en kjellerbod.']
];

// ── Hva styret slipper ─────────────────────────────────────────────────────
const SLIPPER = [
  'Å holde styr på hvilke kontroller som er lovpålagt, og hvor ofte',
  'Å innhente tilbud fra fire–fem ulike leverandører hvert år',
  'Å huske når neste frist forfaller',
  'Å oversette en teknisk rapport til noe årsmøtet forstår',
  'Å purre på at avvikene faktisk blir lukket',
  'Å lete etter dokumentasjonen når forsikring eller tilsyn spør'
];

// ── Prosess, tre steg ──────────────────────────────────────────────────────
const STEG = [
  ['Gratis kartlegging',
   'Vi går gjennom bygget sammen med styret eller vaktmester, noterer hvilke anlegg laget har og hva som er lovpålagt å kontrollere. Uforpliktende, og dere får en konkret årspris.'],
  ['Kontroll og termografering',
   'Vi gjennomfører kontrollene til rett tid, varsler beboerne i forkant og koordinerer det som må gjøres av FG-godkjent personell. Styret trenger ikke følge med.'],
  ['Rapport og oppfølging',
   'Én samlet rapport med prioritert avviksliste. Vi følger opp til avvikene er lukket og dokumenterer når det skjedde. Klar perm hvis tilsyn kommer.']
];

// ── FAQ, åtte spørsmål ─────────────────────────────────────────────────────
const FAQ = [
  ['Må vi virkelig ha elkontroll av fellesanlegget?',
   'Ja. Borettslag og sameier er virksomhet etter internkontrollforskriften og har plikt til å holde fellesanlegget i forsvarlig stand og kunne dokumentere det. Ved brann eller tilsyn er dokumentasjonen det første som etterspørres.'],
  ['Hvor ofte?',
   'Fellesanlegget hvert tredje til femte år etter forsikringens kontrollklasse, oftere ved høy risiko. Termografi av hovedtavler årlig. Brannalarm, nødlys og ladeanlegg årlig. Vi setter opp intervallene i kontrollplanen etter kartleggingen.'],
  ['Hvordan settes prisen?',
   'Etter størrelsen på fellesanlegget, ikke antall leiligheter alene. Det som avgjør er antall tavler og fordelinger, hvor mange bygg som inngår, om det finnes ladeanlegg, og hva som allerede er kontrollert. Prisen er fast og fordeles over året. Kartleggingen er gratis, og det er der tallet kommer.'],
  ['Må beboerne være hjemme?',
   'Nei. Kontroll av fellesanlegget dekker hovedtavle, stigere, fellesrom, kjeller, garasje og utebelysning — ingen tilgang til leilighetene er nødvendig. Skal leilighetene også kontrolleres, avtaler vi et eget tidsvindu med styret.'],
  ['Kan beboerne få kontrollert sin egen leilighet?',
   'Ja. Når kontrolløren likevel er i bygget, kan andelseierne bestille kontroll av egen bolig til lavere pris enn ved separat bestilling — reisen og riggen deles. Hver beboer får en kort rapport, og styret får oversikt over hele bygningsmassen. Det gir styret noe konkret å tilby beboerne uten at laget tar kostnaden.'],
  ['Utbedrer dere avvikene selv?',
   'Nei, og det er et poeng. Vi er et uavhengig kontrollforetak — vi finner og dokumenterer, dere henter inn en elektriker dere selv velger. Den som vurderer bør ikke tjene på funnene.'],
  ['Hva skjer hvis eltilsynet eller brannvesenet kommer?',
   'Da er dokumentasjonen klar. Kontrollplan, rapporter, avviksliste med status og beboerinformasjon ligger samlet på laget. Vi møter også opp ved tilsyn hvis dere ønsker det.'],
  ['Hva om vi allerede har avtaler med andre leverandører?',
   'Da beholder dere dem. Vi kartlegger hva laget har fra før og setter opp planen rundt det. Mange samler alt hos oss over tid, etter hvert som eksisterende avtaler løper ut.']
];

// ── Artikkelklyngen ────────────────────────────────────────────────────────
const ARTIKLER = [
  ['/blogg/hvor-ofte-elkontroll-borettslag.html', 'Hvor ofte må borettslag og sameier ha elkontroll?'],
  ['/blogg/hva-koster-elkontroll-borettslag.html', 'Hva koster elkontroll i borettslag?'],
  ['/blogg/styrets-ansvar-for-det-elektriske-anlegget-dette-bor-dere-vite.html', 'Styrets ansvar for det elektriske anlegget'],
  ['/blogg/ansvar-elektrisk-styret-eller-andelseier.html', 'Hvem har ansvaret: styret eller andelseier?'],
  ['/blogg/internkontroll-elektro-borettslag.html', 'Internkontroll elektro — hva styret må ha på plass'],
  ['/blogg/elkontroll-forsikring-borettslag.html', 'Elkontroll og forsikring for borettslag'],
  ['/blogg/styret-avvik-i-rapporten.html', 'Hva gjør styret når rapporten viser avvik?'],
  ['/blogg/slik-forbereder-styret-elkontroll.html', 'Slik forbereder styret en elkontroll'],
  ['/blogg/ladeanlegg-borettslag-kontroll.html', 'Må ladeanlegget i borettslaget kontrolleres?'],
  ['/blogg/arlig-kontroll-av-brannalarm-og-nodlys-i-sameier-dette-er-lovpalagt.html', 'Brannalarm og nødlys i sameier — lovpålagt årlig kontroll'],
  ['/blogg/elkontroll-for-og-etter-rehabilitering.html', 'Elkontroll før og etter rehabilitering'],
  ['/blogg/elkontroll-sameie-eller-borettslag.html', 'Elkontroll i sameie kontra borettslag — er kravene ulike?']
];

const rentekst = x => x.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

const schema = [
  {
    '@context': 'https://schema.org', '@type': 'Service',
    serviceType: 'Elkontroll for borettslag og sameier',
    provider: { '@id': BASE + '/#elkontrollen' },
    areaServed: ['Østfold', 'Oslo', 'Akershus', 'Buskerud'].map(n => ({ '@type': 'AdministrativeArea', name: n })),
    description: BESKRIVELSE,
    offers: {
      '@type': 'Offer', name: 'Trygt Borettslag — årsavtale',
      priceCurrency: 'NOK', availability: 'https://schema.org/InStock',
      url: BASE + '/borettslag/pris/',
      description: 'Pris settes etter gratis kartlegging av bygget. Fast årspris fordelt over året.'
    }
  },
  {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQ.map(([q, a]) => ({
      '@type': 'Question', name: rentekst(q),
      acceptedAnswer: { '@type': 'Answer', text: rentekst(a) }
    }))
  }
];

const body = `
<main id="innhold">

<section class="page-hero">
  <div class="wrap">
    <span class="stamp"><span class="dot"></span>For styret i borettslag og sameier</span>
    <h1>Elkontroll for borettslag <span>og sameier.</span></h1>
    <p class="lead">Alt det elektriske i borettslaget, i én kontroll. Elkontroll av fellesanlegget, termografering, brannalarm, nødlys og ladeanlegg. Én befaring, én rapport, én leverandør å forholde seg til.</p>
    <div class="hero-ctas">
      <a class="btn btn-solid" href="/borettslag/kartlegging/">Be om gratis kartlegging</a>
      <a class="btn" href="#sjekkliste">Last ned styrets sjekkliste</a>
    </div>
    <p style="margin-top:20px; font-size:12.5px; color:var(--muted); letter-spacing:.02em;">Sertifisert kontrollforetak · Halden · Østfold, Oslo, Akershus og Buskerud</p>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line);" id="pakken">
  <div class="wrap">
    <div class="sec-head"><h2>Dette inngår i Trygt Borettslag</h2><p>Fem kontroller styret er ansvarlig for, samlet i én avtale.</p></div>
    <div class="why-list">
${PAKKEN.map(([t, std, tekst], i) => `      <div class="why-row"><span class="tag">0${i + 1}</span><div><h3>${t}</h3><p>${tekst}</p><p style="font-size:12.5px; color:var(--muted); margin-top:6px; letter-spacing:.03em;">${std}</p></div></div>`).join('\n')}
    </div>
    <p style="margin-top:28px; font-size:14.5px; color:var(--muted); max-width:720px; line-height:1.65;">Sprinkler, heis, lekeplass og ventilasjon er ikke en del av pakken — det er egne fagområder vi ved behov kobler inn samarbeidspartnere på.</p>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line); background:var(--paper-2);">
  <div class="wrap">
    <div class="sec-head"><h2>To ting en vanlig elektriker ikke leverer</h2></div>
    <div class="card-grid" style="grid-template-columns:1fr 1fr;">
${SKILLER.map(([t, tekst]) => `      <div class="card"><h3>${t}</h3><p>${tekst}</p></div>`).join('\n')}
    </div>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line);">
  <div class="wrap">
    <div class="sec-head"><h2>Hva styret slipper å gjøre selv</h2></div>
    <ul class="checklist" style="max-width:760px;">
${SLIPPER.map(s => `      <li><span class="chk">✓</span>${s}</li>`).join('\n')}
    </ul>
    <p style="margin-top:24px; font-size:14.5px; color:var(--muted); max-width:720px; line-height:1.65;">Styret er personlig ansvarlig for at fellesanlegget er i forsvarlig stand. De færreste styrer har tid eller kompetanse til å følge det opp ved siden av alt annet. Det er det vi gjør.</p>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line); background:var(--paper-2);" id="pris">
  <div class="wrap">
    <div class="sec-head"><h2>Hvordan prisen settes</h2><p>Pris settes etter kartleggingen — men modellen bak kan forklares nå.</p></div>
    <div style="max-width:760px;">
      <p style="color:var(--muted); line-height:1.75; margin-bottom:18px;">Prisen følger størrelsen på fellesanlegget, <strong>ikke antall leiligheter alene</strong>. Det er en vanlig misforståelse at et lag med 60 leiligheter koster dobbelt så mye som et med 30 — men kontrollen går ikke inn i leilighetene i det hele tatt. Et lag på 30 boenheter fordelt på fem oppganger med hver sin fordeling er en større jobb enn 60 leiligheter i ett bygg med én hovedtavle.</p>
      <p style="color:var(--muted); line-height:1.75; margin-bottom:18px;">Det som avgjør er <strong>antall tavler og fordelinger</strong>, <strong>hvor mange bygg og oppganger</strong> som inngår, om laget har <strong>ladeanlegg</strong>, og <strong>hva som allerede er kontrollert og dokumentert</strong>. Et anlegg der dokumentasjonen finnes og er oppdatert går raskere enn et der ingen vet hva som er gjort siden nittitallet.</p>
      <p style="color:var(--muted); line-height:1.75;">Avtalen er en <strong>årsavtale med fast pris fordelt over året</strong>, slik at laget kan budsjettere på årsbasis i stedet for å få en engangspost når en frist nærmer seg. Kartleggingen er gratis og uforpliktende, og det er der dere får tallet.</p>
    </div>
    <div style="margin-top:28px;">
      <a class="btn btn-solid" href="/borettslag/kartlegging/">Be om gratis kartlegging</a>
      <a class="btn btn-outline" href="/borettslag/pris/" style="margin-left:10px;">Mer om pris</a>
    </div>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line);">
  <div class="wrap">
    <div class="sec-head"><h2>Slik gjør vi det</h2></div>
    <div class="steps steps-3">
${STEG.map(([t, tekst], i) => `      <div class="step"><span class="n">${i + 1}</span><h3>${t}</h3><p>${tekst}</p></div>`).join('\n')}
    </div>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line); background:var(--paper-2);">
  <div class="wrap">
    <div class="sec-head"><h2>Leilighetskontroll som tillegg</h2></div>
    <div style="max-width:760px;">
      <p style="color:var(--muted); line-height:1.75; margin-bottom:18px;">Kontroll av fellesanlegget går ikke inn i leilighetene. For eldre lag der mange boenheter aldri har vært kontrollert, er det et reelt hull i oversikten — laget kan ha et perfekt fellesanlegg og samtidig ha alvorlige feil bak leilighetsdørene.</p>
      <p style="color:var(--muted); line-height:1.75;">Når kontrolløren likevel er i bygget, kan <strong>andelseierne bestille kontroll av egen leilighet til rabattert pris</strong> — reisen og riggen deles på mange. Hver beboer får en kort rapport på sin bolig, styret får en samlet oversikt over hele bygningsmassen, og laget tar ingen kostnad. Kontrollene tas i samme uke, så beboerne forholder seg til ett tidsvindu.</p>
    </div>
    <div style="margin-top:24px;">
      <a href="/borettslag/leiligheter/" class="link-arrow">Mer om leilighetskontroll →</a>
    </div>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line);">
  <div class="wrap">
    <div class="sec-head"><h2>Hvorfor Elkontrollen</h2></div>
    <div class="why-list">
      <div class="why-row"><span class="tag">01</span><div><h3>Navngitt kontrollør</h3><p>Samme person kommer, kontrollerer og skriver rapporten — ikke en anonym montør.</p></div></div>
      <div class="why-row"><span class="tag">02</span><div><h3>Sertifisert på både el og brann</h3><p>Ett foretak, ikke fire–fem ulike leverandører å holde styr på.</p></div></div>
      <div class="why-row"><span class="tag">03</span><div><h3>Uavhengig av utbedringen</h3><p>Vi finner og dokumenterer. Vi selger ikke utbedringen, og har derfor ingen interesse i hvor mange avvik rapporten inneholder.</p></div></div>
    </div>
  </div>
</section>

${SJEKKLISTE}

<section class="section" style="border-top:1px solid var(--line);">
  <div class="wrap">
    <div class="sec-head"><h2>Spørsmål og svar</h2></div>
${FAQ.map(([q, a]) => `      <div class="faq-item"><div class="faq-q"><span>${q}</span><span class="plus">+</span></div><div class="faq-a"><p>${a}</p></div></div>`).join('\n')}
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line); background:var(--paper-2);" id="les-mer">
  <div class="wrap">
    <div class="sec-head"><h2>Alt om elsikkerhet i borettslag</h2><p>Tolv artikler for styret, fra ansvarsforhold til hva dere gjør når rapporten viser avvik.</p></div>
    <ul class="bullet-list" style="display:block; columns:2; column-gap:40px;">
${ARTIKLER.map(([h, t]) => `      <li style="break-inside:avoid;"><a href="${h}">${t}</a></li>`).join('\n')}
    </ul>
  </div>
</section>

<section class="cta-final centered section">
  <div class="wrap">
    <div class="box">
      <h2>Klar for en gratis kartlegging?</h2>
      <p>Vi går gjennom bygget, setter opp en kontrollplan og gir dere en konkret årspris. Uforpliktende.</p>
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
<title>${TITTEL}</title>
<meta name="description" content="${BESKRIVELSE}">
<link rel="preload" href="../assets/fonts/ibm-plex-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../assets/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="../assets/css/style.css">
<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
<link rel="canonical" href="${BASE}/borettslag/">
<meta property="og:type" content="website">
<meta property="og:title" content="Elkontroll for borettslag og sameier">
<meta property="og:description" content="${BESKRIVELSE}">
<meta property="og:url" content="${BASE}/borettslag/">
<meta property="og:image" content="${BASE}/assets/img/service-borettslag-sameie-og.jpg">
<meta property="og:locale" content="nb_NO">
<meta property="og:site_name" content="Elkontrollen">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Elkontroll for borettslag og sameier">
<meta name="twitter:description" content="${BESKRIVELSE}">
<meta name="twitter:image" content="${BASE}/assets/img/service-borettslag-sameie-og.jpg">
${schema.map(o => `<script type="application/ld+json">\n${JSON.stringify(o)}\n</script>`).join('\n')}
</head>
<body>
${HEADER}${body}${FOOTER}
${MOBIL}
<script src="../assets/js/main.js" defer></script>
</body>
</html>
`;

fs.writeFileSync(FIL, html);

const ord = body.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
console.log(`borettslag/index.html bygget om`);
console.log(`  h1: Elkontroll for borettslag og sameier`);
console.log(`  ${PAKKEN.length} pakkepunkter, ${STEG.length} steg, ${FAQ.length} FAQ, ${ARTIKLER.length} artikkellenker`);
console.log(`  title ${TITTEL.length} tegn, description ${BESKRIVELSE.length} tegn`);
console.log(`  ${ord} ord i brødteksten (var 707)`);
