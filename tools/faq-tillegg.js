// Nye FAQ-spørsmål per tjenesteside (fase 3).
//
// Kravet i arbeidsordren er 5–7 spørsmål per tjenesteside med FAQPage-schema.
// Sider som allerede lå på 5 eller mer er ikke rørt.
//
// Ingenting her påstår priser som ikke allerede står på siden. Der prisen ikke er
// offentlig, peker svaret videre til /priser eller til tilbudsskjemaet.

module.exports = {

  "borettslag/kartlegging/index.html": [
    ["Koster kartleggingen noe?",
     "Nei. Den første gjennomgangen av bygget er gratis og helt uforpliktende. Dere får en anbefaling av nivå og en fra-pris — uten at dere har bundet dere til noe."],
    ["Hva skjer under kartleggingen?",
     "Vi går gjennom bygget sammen med noen fra styret eller vaktmester: hovedtavler og fordelinger, fellesarealer, kjeller og garasje, ladeanlegg, brannalarm og nødlys. Vi noterer hva laget har, hva som er lovpålagt å kontrollere, og når det sist ble gjort."],
    ["Hvor lang tid tar det?",
     "Selve gjennomgangen tar som regel én til to timer, avhengig av lagets størrelse og hvor mange bygg som inngår. Dere får anbefalingen og fra-prisen i etterkant."],
    ["Må hele styret være med?",
     "Nei. Det holder at én person med tilgang til fellesarealene blir med — typisk styreleder, vaktmester eller forretningsfører. Rapporten går uansett til hele styret."],
    ["Er vi forpliktet til å bestille etterpå?",
     "Nei. Kartleggingen er uforpliktende. Velger dere å ikke gå videre, beholder dere likevel oversikten vi satte opp over hva laget har og hva som er lovpålagt."]
  ],


  'elkontroll-bolig.html': [
    ['Hva koster elkontroll av bolig?',
     'Fastpris 5 000 kr, med termografering inkludert. Det er ingen kjøretillegg innenfor Østfold, og du betaler via faktura etter at kontrollen er utført og rapporten levert. Se <a href="priser.html">alle priser</a>.'],
    ['Gir kontrollen rabatt på forsikringen?',
     'Ofte, ja. Flere selskaper gir sikkerhetsrabatt når kontrollen er utført etter NEK 405 av sertifisert kontrollør, typisk med fem års varighet. Kravet er som regel at eventuelle avvik er utbedret først. Les mer om <a href="forsikringsrabatt.html">hva som kreves for forsikringsrabatt</a>.']
  ],

  'naering.html': [
    ['Hvor ofte må næringsbygget kontrolleres?',
     'Det avhenger av hvilken kontrollklasse bygget havner i etter forsikringsbransjens FG-1400, som igjen følger av bygningstype og risiko. Intervallet varierer typisk fra årlig til hvert tredje år. Vi setter opp en kontrollplan etter første gjennomgang, slik at dere slipper å holde styr på frister selv.'],
    ['Kan vi bruke rapporten overfor eltilsyn og leietakere?',
     'Ja. Rapporten er utført av NEK 405-sertifisert kontrollør i et NEK 405-4-sertifisert foretak, og er utformet for å brukes overfor Det lokale eltilsyn, forsikringsselskap og leietakere. Avvikene er prioritert etter alvor, med tydelig angivelse av hvem som bør utbedre hva.']
  ],

  'internkontroll.html': [
    ['Må alle virksomheter ha internkontroll for elsikkerhet?',
     'Ja. Kravet gjelder alle som driver virksomhet og bruker elektrisk anlegg eller utstyr — uansett størrelse, og uansett om dere eier eller leier lokalene. Ansvaret ligger på den som er ansvarlig for virksomheten.'],
    ['Vi leier lokalene — er ikke dette gårdeiers ansvar?',
     'Gårdeier har ansvar for bygget og det faste anlegget, men virksomheten har ansvar for internkontroll knyttet til egen bruk av anlegget og eget elektrisk utstyr. I praksis overlapper de to, og det lønner seg å avklare hvem som gjør hva skriftlig. Vi hjelper gjerne med å trekke den grensen.'],
    ['Hva er forskjellen på internkontroll og elkontroll?',
     'Internkontroll er systemet — rutinene, ansvarsfordelingen og dokumentasjonen som viser at dere følger opp elsikkerheten løpende. Elkontroll er selve den tekniske gjennomgangen av anlegget, utført av sertifisert kontrollør. Elkontrollen er altså en del av internkontrollen, ikke det samme som den.'],
    ['Hvor ofte må kontrollen gjøres?',
     'Hovedregelen er årlig, men omfang og hyppighet settes ut fra risiko, alder på anlegget og forsikringens kontrollklasse. Etter første kontroll setter vi opp en kontrollplan tilpasset virksomheten.'],
    ['Hva skjer hvis eltilsynet kommer og vi mangler dokumentasjon?',
     'Det lokale eltilsyn (DLE) kan gi pålegg med frist om å lukke avvik, og i alvorlige tilfeller varsle tvangsmulkt eller stenging. Har dere allerede fått et pålegg, har vi en egen side om <a href="fatt-avvik.html">hva du gjør da</a>.'],
    ['Hva koster internkontroll?',
     'Vi gir tilbud, fordi omfanget avhenger av virksomhetens størrelse, antall anlegg og hvilken kontrollklasse byggene faller i. Se <a href="priser.html">prisoversikten</a> for hva som har fastpris og hva som prises etter tilbud.']
  ],

  'kontrollavtale.html': [
    ['Hva dekker en kontrollavtale?',
     'Elektrisk anlegg, termografi av tavler, ladeanlegg for elbil, brannalarm, nødlys og ledesystem, og eventuelle slukkeanlegg. Alt samlet i én kontrollplan med ett sett frister, én kontaktperson og én rapport.'],
    ['Gjør dere alt selv?',
     'Elektro og termografi utfører vi selv, med sertifisert personell etter NEK 405-1 og NEK 405-3. Brannalarm, nødlys og sprinkler gjennomføres av FG-godkjente samarbeidspartnere — men vi koordinerer, følger opp og samler dokumentasjonen, slik at dere bare har oss å forholde dere til.'],
    ['Vi har allerede avtaler med andre leverandører — må vi si dem opp?',
     'Nei, ikke nødvendigvis. Vi kartlegger hva dere har fra før, og setter opp planen rundt det. Noen velger å samle alt hos oss over tid, etter hvert som eksisterende avtaler løper ut.'],
    ['Hva skjer hvis et avvik ikke blir lukket?',
     'Vi purrer til det er lukket, og dokumenterer når det skjedde. Det er nettopp den oppfølgingen som gjør at permen holder når brannvesen, eltilsyn eller forsikring spør — en rapport uten lukkede avvik hjelper lite.'],
    ['Hvor ofte gjennomgår vi planen sammen?',
     'Årlig. Da oppdaterer vi planen ved ombygging, nye leietakere eller nye anlegg — for eksempel ladepunkter eller solceller, som mange bygg har fått de siste årene og som ofte ikke var med i forrige runde.'],
    ['Hva koster en kontrollavtale?',
     'Vi gir tilbud, siden omfanget avhenger av antall bygg, antall anlegg og hvilke kontrollklasser byggene faller i. Se <a href="priser.html">prisoversikten</a> for hva som har fastpris og hva som prises etter tilbud.']
  ],

  'tjenester.html': [
    ['Hvilken kontroll trenger jeg?',
     'Bolig: elkontroll etter NEK 405-2. Borettslag, sameie, næringsbygg og gårdsbruk: NEK 405-3, med ulike tillegg. Skal boligen selges, finnes en egen variant tilpasset eierskifte. Er du usikker, ring oss — det tar to minutter å finne ut av.'],
    ['Hva er forskjellen på el-sjekk og elkontroll?',
     'En el-sjekk er en enklere gjennomgang uten formelle krav til metode eller kontrollørens sertifisering. En elkontroll følger NEK 405, utføres av sertifisert kontrollør, og gir dokumentasjon som holder overfor forsikring, eltilsyn og kjøper. Vi har skrevet en <a href="blogg/el-sjekk-vs-elkontroll-hva-er-egentlig-forskjellen.html">full gjennomgang av forskjellen</a>.'],
    ['Er termografering inkludert?',
     'Ja, på elkontroll av bolig er termografering inkludert i fastprisen. I markedet kommer det ofte som et tillegg på rundt 2 500 kr. For næring og landbruk inngår termografi i kontrollen etter NEK 405-3.'],
    ['Hvor dekker dere?',
     'Vi holder til i Halden og tar oppdrag i hele Østfold og på Østlandet. Se <a href="omrader.html">områdene vi dekker</a> — vi tar ikke kjøretillegg innenfor Østfold.'],
    ['Hva koster det?',
     'Elkontroll av bolig koster 5 000 kr som fastpris. Bygg som varierer for mye til at én pris gir mening, får konkret tilbud. Hele oversikten står på <a href="priser.html">prissiden</a>.']
  ],

  'borettslag/elkontroll/index.html': [
    ['Hvor ofte må fellesanlegget kontrolleres?',
     'Etter forsikringens kontrollklasse — typisk hvert tredje år, men årlig der risikoen er høy. Vi setter opp intervallet i kontrollplanen etter kartleggingen, slik at styret slipper å holde styr på fristene selv.'],
    ['Hvem har ansvaret — styret eller den enkelte andelseier?',
     'Styret har ansvaret for fellesanlegget: hovedtavle, stigere, fellesrom, kjeller, garasje, utelys og varmekabler. Andelseier har ansvaret for det elektriske innenfor egen boenhet. Vi har skrevet mer om <a href="../../blogg/styrets-ansvar-for-det-elektriske-anlegget-dette-bor-dere-vite.html">styrets ansvar</a>.'],
    ['Er leilighetene inkludert?',
     'Nei, ikke i elkontroll av fellesanlegget. Kontroll av de enkelte boenhetene er en egen tjeneste — se <a href="/borettslag/leiligheter/">leilighetskontroll</a>, som kan legges til uansett hvilket nivå laget velger.']
  ],

  'borettslag/ladeanlegg/index.html': [
    ['Hva sjekkes konkret i ladeanlegget?',
     'Termografi under last, kontroll av vern og jordfeilvern, lastbalansering, tilstand på ladepunkter og kabling, og at dokumentasjonen på anlegget faktisk finnes. Kontrollen gjøres mens anlegget er i drift — det er da varmgang viser seg.'],
    ['Må anlegget kontrolleres selv om det er nytt?',
     'Ja. Et nytt anlegg er ikke et kontrollert anlegg, og feil ved montasje er nettopp noe man vil oppdage tidlig — mens det fortsatt er innenfor reklamasjonsfristen og entreprenøren må rette det for egen regning. Se også <a href="../../garantikontroll.html">garantikontroll</a>.'],
    ['Hvem har ansvaret for ladeanlegget?',
     'Styret, når anlegget er en del av fellesanlegget — uavhengig av om det var en leverandør, en beboer eller en entreprenør som fikk det montert. Les mer i artikkelen <a href="../../blogg/ladeanlegg-borettslag-kontroll.html">må ladeanlegget i borettslaget kontrolleres?</a>']
  ],

  'borettslag/brannvern/index.html': [
    ['Hvem kan utføre kontrollen?',
     'Kontroll av brannalarm krever FG-750-sertifisert personell, og nødlys og ledesystem krever FG-760. Vaktmesteren kan ikke gjøre den selv, uansett hvor godt han kjenner bygget. Vi er sertifisert for begge deler.'],
    ['Hva sjekkes på nødlys og ledesystem?',
     'Funksjonstest og kontroll av alle armaturer etter FG-760 og NS-EN 1838 — at de faktisk lyser når strømmen går, at batterikapasiteten holder den tiden den skal, og at rømningsveiene er merket slik de skal være.'],
    ['Hva skjer hvis vi ikke har kontrollert?',
     'Manglende kontroll er et brudd på styrets internkontrollplikt, og kan få konsekvenser både ved tilsyn og ved en eventuell skade. Ved brann kan manglende dokumentasjon føre til avkortning i erstatningen. Les mer i artikkelen om <a href="../../blogg/arlig-kontroll-av-brannalarm-og-nodlys-i-sameier-dette-er-lovpalagt.html">årlig kontroll av brannalarm og nødlys</a>.']
  ],

  'borettslag/leiligheter/index.html': [
    ['Hva kontrolleres i hver leilighet?',
     'Sikringsskap og kurser, stikkontakter og brytere, jording og jordfeilvern, varmekabler, og synlige tegn på varmgang eller slitasje. Kontrollen følger NEK 405-2, samme metodikk som en vanlig boligkontroll.'],
    ['Hva skjer hvis en beboer ikke slipper oss inn?',
     'Boenheter der ingen er hjemme, kan avtales særskilt eller utsettes til neste runde. Styret får uansett en oversikt over hvilke enheter som er kontrollert og hvilke som gjenstår, slik at det er dokumentert hva som er forsøkt.'],
    ['Hvor lang tid tar det per leilighet?',
     'Som regel under en time. Vi tar alle leilighetene i samme uke, slik at beboerne bare trenger å forholde seg til ett tidsvindu og styret får hele bygningsmassen dokumentert på én gang.']
  ],

  'borettslag/pris/index.html': [
    ['Hva er inkludert i årsprisen?',
     'Det avhenger av nivået. Basis dekker elkontroll av fellesanlegget, årlig termografi, kontrollplan, avviksrapport og dokumentarkiv. Trygg legger til ladeanlegg, brannalarm, nødlys, årsmøterapport og beboerinformasjon. Komplett legger til DLE-bistand, sensor i fellestavler, egenkontroll-sjekkliste og fast kontaktperson.'],
    ['Kan vi oppgradere nivå underveis?',
     'Ja. Mange starter på Basis og utvider når laget får ladeanlegg eller styret ønsker å samle brannvernet samme sted. Vi justerer kontrollplanen og prisen fra neste avtaleår.'],
    ['Er utbedring av avvik inkludert i prisen?',
     'Nei. Vi er et uavhengig kontrollforetak — vi finner og dokumenterer avvik, vi selger ikke utbedringen. Avviksrapporten er prioritert med anslått kostnad, slik at styret kan hente inn pris fra en elektriker laget selv velger.']
  ]
};
