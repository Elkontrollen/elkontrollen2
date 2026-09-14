// Genererer /priser og /forsikringsrabatt.
//
// Samme prinsipp som tools/bygg-lokalsider.js: header og footer hentes fra en
// eksisterende side, så navigasjonen aldri må vedlikeholdes to steder.
//
// VIKTIG OM PRISER: ingen priser er funnet opp her. Alle beløp er hentet fra det
// som allerede står på tjenestesidene. Tjenester uten oppgitt pris står som
// "tilbud" — ikke med et gjettet tall.
//
// Kjør fra repo-roten:  node tools/bygg-sider.js

const fs = require('fs');
const path = require('path');

const ROT = path.join(__dirname, '..');
const MAL = fs.readFileSync(path.join(ROT, 'om-oss.html'), 'utf8');
const HEADER = MAL.match(/<header>[\s\S]*?<\/header>/)[0].replace(/ class="current"/g, '');
const FOOTER = MAL.match(/<footer>[\s\S]*?<\/footer>/)[0];
const BASE = 'https://elkontrollen.no';

const ORG = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Elkontrollen AS',
  url: BASE + '/', logo: BASE + '/assets/favicon.svg', telephone: '+4798019154',
  email: 'post@elkontrollen.no',
  address: { '@type': 'PostalAddress', streetAddress: 'Lorangløkka 1', postalCode: '1782', addressLocality: 'Halden', addressCountry: 'NO' }
};

const ld = o => `<script type="application/ld+json">\n${JSON.stringify(o)}\n</script>`;

function head({ tittel, beskrivelse, url, bilde }) {
  return `<!DOCTYPE html>
<html lang="no">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${tittel}</title>
<meta name="description" content="${beskrivelse}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${tittel.split(' | ')[0]}">
<meta property="og:description" content="${beskrivelse}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${BASE}/assets/img/${bilde}">
<meta property="og:locale" content="nb_NO">
<meta property="og:site_name" content="Elkontrollen">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${tittel.split(' | ')[0]}">
<meta name="twitter:description" content="${beskrivelse}">
<meta name="twitter:image" content="${BASE}/assets/img/${bilde}">`;
}

function faqBlokk(faq) {
  const html = faq.map(([q, a]) =>
    `      <div class="faq-item"><div class="faq-q"><span>${q}</span><span class="plus">+</span></div><div class="faq-a"><p>${a}</p></div></div>`
  ).join('\n');
  const schema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
  };
  return { html, schema };
}

function skriv(fil, { tittel, beskrivelse, bilde, schemas, body }) {
  const url = `${BASE}/${fil}`;
  const html = head({ tittel, beskrivelse, url, bilde })
    + '\n' + [ORG, ...schemas].map(ld).join('\n')
    + '\n</head>\n<body>\n' + HEADER + body + FOOTER
    + '\n<script src="assets/js/main.js"></script>\n</body>\n</html>\n';
  fs.writeFileSync(path.join(ROT, fil), html);
  console.log('skrev', fil);
}

// ─────────────────────────────────────────────────────────────── /priser ────

const PRISRADER = [
  ['<a href="elkontroll-bolig.html">Elkontroll bolig</a>', 'NEK 405-2', '<strong>5 000 kr</strong>', 'Fastpris. Termografering inkludert.'],
  ['<a href="elkontroll-boligsalg.html">Elkontroll ved kjøp og salg</a>', 'NEK 405-2', '<strong>5 000 kr</strong>', 'Fastpris. Rapport klar før visning eller bud.'],
  ['<a href="landbruk.html">Elkontroll landbruk</a>', 'NEK 405-3 m/tillegg', 'Fast pris', 'Avklares på telefon — du får pris samme dag.'],
  ['<a href="garantikontroll.html">Garantikontroll</a>', 'NEK 405-3', 'Fast pris', 'Avtales etter opplysninger om anlegget.'],
  ['<a href="naering.html">Elkontroll næring</a>', 'NEK 405-3 / FG-1400', 'Tilbud', 'Etter bygningstype, areal og risikoklasse.'],
  ['<a href="borettslag/pris/index.html">Trygt Borettslag</a>', 'NEK 405-3 + FG-750/760', 'Årsavtale', 'Etter antall enheter, tavler og ladepunkter. Gratis kartlegging først.'],
  ['<a href="brannalarm-nodlys.html">Brannalarm og nødlys</a>', 'FG-750 / FG-760', 'Tilbud', 'Etter anleggets størrelse og antall armaturer.'],
  ['<a href="elbillading-kontroll.html">Kontroll av ladeanlegg</a>', 'NEK 400 / NEK 405-3', 'Tilbud', 'Etter antall ladepunkter og fordelinger.'],
  ['<a href="internkontroll.html">Internkontroll elektro</a>', 'Internkontrollforskriften', 'Tilbud', 'Årsavtale, etter virksomhetens omfang.'],
  ['<a href="kontrollavtale.html">Kontrollavtale for bygget</a>', 'Samlet', 'Tilbud', 'Alle lovpålagte kontroller i én avtale.']
];

const priserFaq = faqBlokk([
  ['Hva koster elkontroll av bolig?', '5 000 kr som fastpris, uansett hvor i Østfold boligen ligger. Termografering er inkludert i prisen — det er ikke et tillegg. Betaling skjer via faktura etter utført kontroll.'],
  ['Er det tillegg for kjøring?', 'Nei. Fastprisen gjelder i hele Østfold. Vi holder til i Halden, men tar ikke kjøretillegg til Fredrikstad, Sarpsborg, Moss, Hvaler eller noe annet sted i fylket.'],
  ['Hvorfor har ikke alle tjenestene fastpris?', 'Fordi byggene er for ulike. En bolig er en bolig — omfanget er forutsigbart nok til at vi tør sette én pris. Et næringsbygg kan være et lite butikklokale eller et lager på flere tusen kvadratmeter, med helt ulikt antall tavler, kurser og risikoklasse. Da blir en fastpris enten for høy for den lille eller for lav for den store. Du får konkret tilbud i stedet.'],
  ['Er utbedring av avvik inkludert?', 'Nei. Kontrollen er en uavhengig tilstandsvurdering — vi finner og dokumenterer, vi selger ikke utbedringen. Det er poenget med å bruke et kontrollforetak framfor den som selv skal gjøre jobben. Rapporten beskriver funnene prioritert, slik at du kan hente inn pris fra en elektriker du selv velger.'],
  ['Hva er markedsprisen ellers?', 'Bransjeoversikter oppgir typisk 4 000–8 000 kr for elkontroll av bolig opp til 150 m², og termografering kommer ofte som et tillegg på rundt 2 500 kr. Vi ligger midt i intervallet, med termografering inkludert. Se vår <a href="blogg/hva-koster-elkontroll-full-prisguide.html">fulle prisguide</a> for gjennomgang av alle kontrolltyper.'],
  ['Når må jeg betale?', 'Faktura sendes etter at kontrollen er utført og rapporten er levert. Ingen forskuddsbetaling.'],
  ['Gir elkontroll rabatt på forsikringen?', 'Ofte, ja. Flere selskaper gir sikkerhetsrabatt når kontrollen er utført etter NEK 405 av sertifisert kontrollør. Se <a href="forsikringsrabatt.html">siden om forsikringsrabatt</a> for hva som kreves.']
]);

const priserSchemas = [
  {
    '@context': 'https://schema.org', '@type': 'Service',
    serviceType: 'Elkontroll bolig — NEK 405-2',
    provider: { '@type': 'Organization', name: 'Elkontrollen AS', url: BASE + '/' },
    areaServed: [{ '@type': 'AdministrativeArea', name: 'Østfold' }, { '@type': 'AdministrativeArea', name: 'Østlandet' }],
    description: 'Elkontroll av bolig etter NEK 405-2 med termografering inkludert. Fastpris i hele Østfold.',
    offers: {
      '@type': 'Offer', name: 'Elkontroll bolig', price: '5000', priceCurrency: 'NOK',
      availability: 'https://schema.org/InStock', url: BASE + '/priser.html',
      eligibleRegion: { '@type': 'AdministrativeArea', name: 'Østfold' }
    }
  },
  priserFaq.schema
];

const priserBody = `
<section class="page-hero">
  <div class="wrap hero-inner" style="align-items:start;">
    <div>
      <span class="stamp"><span class="dot"></span>Fastpris i hele Østfold · ingen kjøretillegg</span>
      <h1>Priser <span>— hva kontrollen faktisk koster.</span></h1>
      <p class="lead">Boligkontroll har én pris, uansett hvor i fylket du bor. Bygg som varierer for mye til at én pris gir mening, får konkret tilbud i stedet. Her er hele bildet.</p>
      <div class="bullet-list">
        <div class="bullet"><span class="chk">✓</span>Termografering inkludert, ikke et tillegg</div>
        <div class="bullet"><span class="chk">✓</span>Ingen kjøretillegg innenfor Østfold</div>
        <div class="bullet"><span class="chk">✓</span>Faktura etter utført kontroll, ingen forskudd</div>
      </div>
    </div>
    <div class="buybox">
      <div class="badge"><span class="d"></span>Vanligste tjenesten</div>
      <h3>Elkontroll bolig</h3>
      <p style="font-family:'Space Grotesk'; font-size:28px; font-weight:600; color:var(--ink); margin-bottom:4px;">5 000 kr</p>
      <p style="margin-bottom:18px;">NEK 405-2 med termografering inkludert. Rapport samme dag. Fastpris i hele Østfold.</p>
      <a class="btn btn-solid" href="elkontroll-bolig.html#bestill" style="width:100%;">Bestill elkontroll</a>
      <a class="btn btn-outline" href="kontakt.html" style="width:100%; margin-top:10px;">Be om tilbud på annet bygg</a>
      <div class="fine">NEK 405-sertifisert kontrollør · svar &lt; 24t</div>
    </div>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line);">
  <div class="wrap">
    <div class="sec-head"><h2>Prisoversikt</h2><p>Alle priser er eksklusive eventuell utbedring — den er aldri inkludert, og vi utfører den ikke selv.</p></div>
    <div class="data-table-wrap">
      <table class="data-table">
        <thead><tr><th>Tjeneste</th><th>Standard</th><th>Pris</th><th>Merknad</th></tr></thead>
        <tbody>
${PRISRADER.map(r => `          <tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('\n')}
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line); background:var(--paper-2);">
  <div class="wrap">
    <div class="sec-head"><h2>Hva de 5 000 kronene dekker</h2><p>Fastprisen på boligkontroll er hele jobben — ikke et startpunkt.</p></div>
    <div class="card-grid">
      <div class="card"><h3>Hele anlegget</h3><p>Sikringsskap, kurser, koblinger, stikkontakter og brytere i hele boligen — ikke bare et utvalg.</p></div>
      <div class="card"><h3>Termografering</h3><p>Varmekamera på tavler og fordelinger. Dette er normalt et tillegg på rundt 2 500 kr i markedet. Hos oss er det inkludert.</p></div>
      <div class="card"><h3>Målinger</h3><p>Isolasjonsmåling, test av jordfeilbryter og kontroll av jording og kontinuitet.</p></div>
      <div class="card"><h3>Rapport samme dag</h3><p>Skriftlig rapport med funnene prioritert, klar til bruk overfor forsikring, eltilsyn, kjøper eller styre.</p></div>
      <div class="card"><h3>Kjøring</h3><p>Ingen tillegg innenfor Østfold. Samme pris i Aremark som i Halden.</p></div>
      <div class="card"><h3>Faktura etterpå</h3><p>Ingen forskuddsbetaling. Du betaler når kontrollen er gjort og rapporten er levert.</p></div>
    </div>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line);">
  <div class="wrap">
    <div class="sec-head"><h2>Hvorfor noen tjenester har tilbud i stedet for fastpris</h2></div>
    <div style="max-width:760px;">
      <p style="color:var(--muted); line-height:1.75; margin-bottom:18px;">En bolig er forutsigbar nok til at vi tør binde oss til én pris. Et næringsbygg er det ikke. Forskjellen mellom et butikklokale på 90 kvadratmeter og et lagerbygg på 4 000 er ikke bare areal — det er antall tavler og fordelinger, antall kurser, hvilken risikoklasse bygget faller i etter FG-1400, og hvor mye som må kontrolleres under drift.</p>
      <p style="color:var(--muted); line-height:1.75; margin-bottom:18px;">Setter vi én fastpris på alt dette, blir den enten for høy for det lille bygget eller for lav for det store. Ingen av delene er en god handel for noen. Derfor får du et konkret tilbud, basert på opplysninger om bygget — ikke et prisintervall du må gjette deg gjennom.</p>
      <p style="color:var(--muted); line-height:1.75;">Det samme gjelder borettslag og sameier. Der er det antall enheter, oppganger, tavler og ladepunkter som avgjør, og vi gjør en <a href="borettslag/kartlegging/index.html">gratis kartlegging</a> først, slik at prisen bygger på hva laget faktisk har — ikke på et anslag.</p>
    </div>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line); background:var(--paper-2);">
  <div class="wrap">
    <div class="sec-head"><h2>Hva koster elkontroll ellers i markedet?</h2></div>
    <div style="max-width:760px;">
      <p style="color:var(--muted); line-height:1.75; margin-bottom:18px;">Bransjeoversikter oppgir typisk <strong>4 000–8 000 kr</strong> for elkontroll av bolig opp til 150 kvadratmeter, og <strong>termografering kommer ofte som et tillegg på rundt 2 500 kr</strong>. For elkontroll ved boligsalg oppgis gjerne fra rundt 10 000 kr.</p>
      <p style="color:var(--muted); line-height:1.75; margin-bottom:18px;">Vår fastpris på 5 000 kr ligger midt i det intervallet — med termografering inkludert, og med samme pris ved boligsalg som ved vanlig kontroll.</p>
      <p style="color:var(--muted); line-height:1.75;">Vi har skrevet en full gjennomgang av hva de ulike kontrolltypene koster og hva som skiller dem: <a href="blogg/hva-koster-elkontroll-full-prisguide.html"><strong>Hva koster elkontroll? Full prisguide</strong></a>. Der finner du også forskjellen på el-sjekk, elkontroll og eltakst, som ofte blandes sammen når man sammenligner priser.</p>
    </div>
    <div style="margin-top:32px; max-width:760px;">
      <h3 style="font-size:17px; margin-bottom:10px;">Les mer</h3>
      <ul class="bullet-list" style="display:block;">
        <li><a href="blogg/hva-koster-elkontroll-full-prisguide.html">Hva koster elkontroll? Full prisguide</a></li>
        <li><a href="blogg/el-sjekk-vs-elkontroll-hva-er-egentlig-forskjellen.html">El-sjekk vs. elkontroll — hva er egentlig forskjellen?</a></li>
        <li><a href="blogg/elektriker-eller-kontrollor.html">Elektriker eller kontrollør — hva er forskjellen?</a></li>
      </ul>
    </div>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line);">
  <div class="wrap">
    <div class="sec-head"><h2>Spørsmål om pris</h2></div>
${priserFaq.html}
  </div>
</section>

<section class="cta-final centered section">
  <div class="wrap">
    <div class="box">
      <h2>Bestill, eller be om tilbud</h2>
      <p>Bolig har fastpris og kan bestilles direkte. Andre bygg får tilbud innen 24 timer.</p>
      <div class="actions">
        <a class="btn btn-solid" href="elkontroll-bolig.html#bestill">Bestill elkontroll bolig</a>
        <a class="btn btn-outline-light" href="kontakt.html">Be om tilbud</a>
      </div>
    </div>
  </div>
</section>
`;

// ───────────────────────────────────────────────────── /forsikringsrabatt ────

const forsikringFaq = faqBlokk([
  ['Hvor mye rabatt får jeg?', 'Det varierer mellom selskapene, og de fleste oppgir ikke en fast prosentsats offentlig. Gjensidige beskriver el-kontroll som «en av våre største sikkerhetsrabatter», uten å tallfeste den. Spør ditt eget selskap om hva rabatten utgjør for din polise før du bestiller — da vet du hva du får igjen.'],
  ['Hvor lenge varer rabatten?', 'Typisk fem år. Gjensidige oppgir eksplisitt fem år etter kontrollen. Etter det må kontrollen gjentas for at rabatten skal fortsette.'],
  ['Hva kreves for at rapporten godtas?', 'At kontrollen er utført etter NEK 405 av en sertifisert kontrollør, tilknyttet et foretak som er sertifisert etter NEK 405-4. Rapporten må være merket NEK 405. Vi oppfyller begge deler.'],
  ['Må avvikene utbedres først?', 'Som regel ja. Gjensidige krever eksplisitt at feil som ble funnet, må være rettet før rabatten gis. Det er derfor rapporten vår prioriterer funnene — du ser med én gang hva som faktisk må lukkes.'],
  ['Slipper jeg egenandel ved brann?', 'Gjensidige oppgir at du slipper egenandel på brannskader som skyldes feil i det elektriske anlegget, når du har gyldig el-kontroll. Andre selskaper har liknende ordninger. Sjekk dine egne vilkår.'],
  ['Gjelder dette også landbruk?', 'For gårdsbruk er elkontroll ikke bare et rabattgrunnlag — det er et vilkår. De fleste selskapene krever kontroll etter NEK 405-3 med termografi, som hovedregel hvert tredje år for husdyrbruk. I tillegg gir flere selskaper rabatt for fastmonterte temperatursensorer i el-skapene. Se <a href="landbruk.html">elkontroll landbruk</a>.'],
  ['Hvordan får forsikringsselskapet rapporten?', 'Vi sender den for deg hvis du ønsker det. Du får den selvsagt selv også, i et format som kan videresendes.']
]);

const forsikringBody = `
<section class="page-hero">
  <div class="wrap hero-inner" style="align-items:start;">
    <div>
      <span class="stamp"><span class="dot"></span>NEK 405-sertifisert kontrollør · NEK 405-4-sertifisert foretak</span>
      <h1>Forsikringsrabatt <span>— slik dokumenterer du elkontrollen.</span></h1>
      <p class="lead">Flere selskaper gir sikkerhetsrabatt når det elektriske anlegget er kontrollert etter NEK 405. Her er hva som faktisk kreves, hvor lenge rabatten varer, og hvordan vi leverer dokumentasjonen.</p>
      <div class="bullet-list">
        <div class="bullet"><span class="chk">✓</span>Rapport merket NEK 405, utført av sertifisert kontrollør</div>
        <div class="bullet"><span class="chk">✓</span>Funnene prioritert, så du vet hva som må lukkes først</div>
        <div class="bullet"><span class="chk">✓</span>Vi sender rapporten til forsikringsselskapet for deg</div>
      </div>
    </div>
    <div class="buybox">
      <div class="badge"><span class="d"></span>Fastpris</div>
      <h3>Elkontroll bolig</h3>
      <p style="font-family:'Space Grotesk'; font-size:28px; font-weight:600; color:var(--ink); margin-bottom:4px;">5 000 kr</p>
      <p style="margin-bottom:18px;">NEK 405-2 med termografering inkludert. Rapporten er klar til bruk overfor forsikringsselskapet samme dag.</p>
      <a class="btn btn-solid" href="elkontroll-bolig.html#bestill" style="width:100%;">Bestill elkontroll</a>
      <a class="btn btn-outline" href="priser.html" style="width:100%; margin-top:10px;">Se alle priser</a>
      <div class="fine">Rapport samme dag · faktura etterpå</div>
    </div>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line);">
  <div class="wrap">
    <div class="sec-head"><h2>Hva du får, og hva som kreves</h2><p>Kravene er like hos de fleste selskapene. Det er størrelsen på rabatten som varierer.</p></div>
    <div class="card-grid">
      <div class="card"><h3>Sertifisert kontrollør</h3><p>Kontrollen må utføres av en kontrollør som er personsertifisert etter NEK 405, tilknyttet et foretak sertifisert etter NEK 405-4. Begge deler kreves — det holder ikke at en elektriker ser over anlegget.</p></div>
      <div class="card"><h3>Rapport merket NEK 405</h3><p>Rapporten må tydelig vise hvilken NEK 405-standard kontrollen er utført etter. Uten den merkingen blir den som regel ikke godtatt som grunnlag for rabatt.</p></div>
      <div class="card"><h3>Avvikene må lukkes</h3><p>Fant kontrollen feil, må de rettes før rabatten gis. Gjensidige stiller dette kravet eksplisitt. Rapporten vår er prioritert, slik at du ser hva som faktisk må gjøres.</p></div>
      <div class="card"><h3>Gjentakelse</h3><p>Rabatten er tidsbegrenset — typisk fem år. Deretter må kontrollen gjøres på nytt. Vi holder styr på fristen og tar kontakt i god tid.</p></div>
      <div class="card"><h3>Lavere egenandel</h3><p>Gjensidige oppgir at du slipper egenandel på brannskader som skyldes feil i det elektriske anlegget, når du har gyldig el-kontroll. Det kan være verdt mer enn selve rabatten.</p></div>
      <div class="card"><h3>Vi sender dokumentasjonen</h3><p>Du trenger ikke være mellommann. Vi sender rapporten direkte til selskapet hvis du ønsker det, og du får den selv i tillegg.</p></div>
    </div>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line); background:var(--paper-2);">
  <div class="wrap">
    <div class="sec-head"><h2>Hva selskapene faktisk sier</h2><p>Vi gjengir bare det selskapene selv publiserer. Rabattens størrelse må du få bekreftet av ditt eget selskap.</p></div>
    <div style="max-width:800px;">
      <p style="color:var(--muted); line-height:1.75; margin-bottom:18px;"><strong>Gjensidige</strong> beskriver el-kontroll etter NEK 405 som «en av våre største sikkerhetsrabatter», og oppgir at den gjelder i fem år etter kontrollen. De oppgir samtidig at du slipper egenandel på brannskader som skyldes feil i det elektriske anlegget. Kravet er at kontrollen er merket NEK 405, og at eventuelle feil som ble funnet, er rettet før rabatten gis.</p>
      <p style="color:var(--muted); line-height:1.75; margin-bottom:18px;"><strong>De øvrige selskapene</strong> — If, Tryg, Fremtind, Frende, Eika og de andre — har liknende ordninger, men publiserer i varierende grad konkrete satser. Derfor sier vi det rett ut: <strong>vi kan ikke love deg en bestemt prosent.</strong> Ring ditt eget selskap og spør hva sikkerhetsrabatt for el-kontroll utgjør på din polise, før du bestiller. Da vet du hva kontrollen er verdt for deg.</p>
      <p style="color:var(--muted); line-height:1.75;">Det vi kan love, er at rapporten oppfyller kravene: NEK 405-sertifisert kontrollør, NEK 405-4-sertifisert foretak, og en rapport som er merket og utformet for nettopp dette bruket.</p>
    </div>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line);">
  <div class="wrap">
    <div class="sec-head"><h2>Landbruk: ikke bare rabatt — et vilkår</h2></div>
    <div style="max-width:800px;">
      <p style="color:var(--muted); line-height:1.75; margin-bottom:18px;">For gårdsbruk er elkontroll noe annet enn en rabattmulighet. De fleste landbruksforsikringene <strong>krever</strong> kontroll etter NEK 405-3 med termografi av alle el-skap, som hovedregel hvert tredje år for husdyrbruk. Mangler kontrollen når det brenner, er avkortning i erstatningen en reell mulighet.</p>
      <p style="color:var(--muted); line-height:1.75; margin-bottom:18px;">I tillegg gir flere selskaper — blant dem Gjensidige, Fremtind, Eika, Varig og Landkreditt — <strong>rundt 10 prosent rabatt på brannforsikringen</strong> hvis alle el-skap på gården har fastmontert temperatursensor med varsling. Vilkåret er som regel at termograferingen er gjennomført først, og at alle skap er dekket.</p>
      <p style="color:var(--muted); line-height:1.75;">Vi monterer sensorene mens vi likevel står i skapene under kontrollen. Les mer på <a href="landbruk.html">elkontroll landbruk</a>, eller i artiklene <a href="blogg/forsikringskrav-elkontroll-landbruk.html">Hva krever forsikringen av elkontroll i landbruket?</a> og <a href="blogg/temperatursensor-sikringsskap.html">Temperatursensor i sikringsskapet</a>.</p>
    </div>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line); background:var(--paper-2);">
  <div class="wrap">
    <div class="sec-head"><h2>Slik går du fram</h2></div>
    <div class="steps">
      <div class="step"><span class="n">01</span><h4>Ring forsikringen</h4><p>Spør hva sikkerhetsrabatt for el-kontroll utgjør på din polise, og hvilken dokumentasjon de vil ha.</p></div>
      <div class="step"><span class="n">02</span><h4>Bestill kontrollen</h4><p>Fastpris 5 000 kr for bolig, termografering inkludert. Rapport samme dag.</p></div>
      <div class="step"><span class="n">03</span><h4>Lukk avvikene</h4><p>Rapporten er prioritert. Fant vi noe som må rettes, ser du det først i lista.</p></div>
      <div class="step"><span class="n">04</span><h4>Send dokumentasjonen</h4><p>Vi sender rapporten til selskapet for deg, hvis du vil.</p></div>
    </div>
    <div style="margin-top:32px; max-width:760px;">
      <h3 style="font-size:17px; margin-bottom:10px;">Les mer</h3>
      <ul class="bullet-list" style="display:block;">
        <li><a href="blogg/hva-koster-elkontroll-full-prisguide.html">Hva koster elkontroll? Full prisguide</a></li>
        <li><a href="blogg/el-sjekk-vs-elkontroll-hva-er-egentlig-forskjellen.html">El-sjekk vs. elkontroll — og hvorfor det avgjør om forsikringen godtar den</a></li>
        <li><a href="blogg/hvordan-oppstar-boligbranner-forebygg-med-elkontroll.html">Hvordan oppstår boligbranner?</a></li>
      </ul>
    </div>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--line);">
  <div class="wrap">
    <div class="sec-head"><h2>Spørsmål om forsikringsrabatt</h2></div>
${forsikringFaq.html}
  </div>
</section>

<section class="cta-final centered section">
  <div class="wrap">
    <div class="box">
      <h2>Klar for kontrollen?</h2>
      <p>Fastpris 5 000 kr for bolig, termografering inkludert, rapport samme dag — merket NEK 405 og klar for forsikringsselskapet.</p>
      <div class="actions">
        <a class="btn btn-solid" href="elkontroll-bolig.html#bestill">Bestill elkontroll</a>
        <a class="btn btn-outline-light" href="kontakt.html">Spør oss først</a>
      </div>
    </div>
  </div>
</section>
`;

const forsikringSchemas = [
  {
    '@context': 'https://schema.org', '@type': 'Service',
    serviceType: 'Elkontroll for forsikringsrabatt — NEK 405',
    provider: { '@type': 'Organization', name: 'Elkontrollen AS', url: BASE + '/' },
    areaServed: [{ '@type': 'AdministrativeArea', name: 'Østfold' }, { '@type': 'AdministrativeArea', name: 'Østlandet' }],
    description: 'Elkontroll etter NEK 405 av sertifisert kontrollør, med rapport utformet for bruk overfor forsikringsselskapet.',
    offers: { '@type': 'Offer', name: 'Elkontroll bolig', price: '5000', priceCurrency: 'NOK', availability: 'https://schema.org/InStock' }
  },
  forsikringFaq.schema
];

// ───────────────────────────────────────────────────────────────── kjør ────

skriv('priser.html', {
  tittel: 'Priser på elkontroll — fastpris 5 000 kr | Elkontrollen',
  beskrivelse: 'Elkontroll bolig 5 000 kr som fastpris, termografering inkludert og ingen kjøretillegg i Østfold. Se prisoversikt for alle tjenester.',
  bilde: 'elkontroll-bolig-enebolig.jpg',
  schemas: priserSchemas,
  body: priserBody
});

skriv('forsikringsrabatt.html', {
  tittel: 'Forsikringsrabatt på elkontroll — NEK 405 | Elkontrollen',
  beskrivelse: 'Flere selskaper gir sikkerhetsrabatt for elkontroll etter NEK 405. Se hva som kreves, hvor lenge rabatten varer og hvordan vi leverer dokumentasjonen.',
  bilde: 'sikringsskap-norsk.jpg',
  schemas: forsikringSchemas,
  body: forsikringBody
});
