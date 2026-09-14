// Stedsspesifikt innhold til de lokale landingssidene.
//
// Alle tall i teksten kommer fra SSB og er merket med kilde i sidefoten på hver side.
// Avsnitt som bygger på Elkontrollens egen erfaring i området — og som derfor må
// kvalitetssikres av eieren — er markert med TRENGER_LOKALKUNNSKAP. Generatoren
// legger inn en HTML-kommentar rundt disse og lister dem i FAKTASJEKK.md.

const T = '<!-- TRENGER LOKALKUNNSKAP -->';

module.exports = {

  fredrikstad: {
    metaTittel: 'Elkontroll Fredrikstad — fastpris 5 000 kr | Elkontrollen',
    metaBeskrivelse: 'Elkontroll i Fredrikstad etter NEK 405-2, termografering inkludert. Fastpris 5 000 kr for bolig. Vi dekker Gamlebyen, Kråkerøy, Gressvik og Onsøy.',
    h1Hale: 'Gamlebyen, Kråkerøy, Gressvik og resten av kommunen.',
    lead: 'Vi kjører fra Halden til Fredrikstad fast, og kjenner bygningsmassen langs begge sider av Glomma. Sertifisert kontroll, termografering inkludert, rapport samme dag.',

    omradeIngress: 'Vi tar oppdrag i hele Fredrikstad kommune — både på østsiden og vestsiden av Glomma, og ut på Kråkerøy og i Onsøy.',
    omradeTekst: `Bosetningen i Fredrikstad fordeler seg ujevnt: omtrent 61 prosent bor vest for Glommas hovedløp, 27 prosent på østsiden og 12 prosent på Kråkerøy. Det betyr at tre ganske ulike byggeområder ligger innenfor samme kommune, og at et oppdrag på Gressvik og et oppdrag i Gamlebyen er to forskjellige jobber — selv om begge står oppført med samme postnummerby.`,

    boligmasse: [
      `Fredrikstad har <strong>40 250 boliger</strong>, og av dem er <strong>3 603 bygget i 1900 eller tidligere</strong>. Det er flest i hele Østfold. Fylket har til sammen 10 674 boliger fra den perioden, så omtrent en tredjedel av Østfolds eldste boligmasse står i Fredrikstad alene. Legger man til alt som er bygget før 1961, snakker vi om <strong>13 529 boliger — 34 prosent av kommunen</strong>.`,

      `Den eldste delen er ikke jevnt fordelt. Gamlebyen er Nord-Europas best bevarte festningsby, planlagt på 1660-tallet, og bebyggelsen der er antikvarisk vernet. Det legger reelle begrensninger på hva som kan gjøres med et elektrisk anlegg: nye føringsveier må ofte legges skjult i eksisterende rør eller hulrom, og synlige inngrep er ikke uten videre tillatt. Vestsiden besto opprinnelig i stor grad av mindre trehus, men gikk gjennom omfattende byfornyelse fra 1960-tallet og utover — mange bygg har derfor et elektrisk anlegg fra en helt annen tid enn selve huset.`,

      `Den andre store gruppen er etterkrigs- og sekstitallsbebyggelsen. <strong>9 174 boliger — 23 prosent — er bygget mellom 1961 og 1980.</strong> Det er en byggeperiode med et tydelig elektrisk signalement: skrusikringer var standard til rundt 1970, jordfeilbryter på stikkontaktkurser ble ikke et krav før NEK 400:1998 trådte i kraft i 1999, og antall kurser ble dimensjonert for et forbruk ingen forutså. Anlegg fra denne perioden er i dag 45–65 år gamle og har som regel fått påkoblet langt mer enn de opprinnelig var tenkt for.`,

      `Fredrikstad har i tillegg <strong>4 493 fritidsbygg</strong> — flest i Østfold sammen med Hvaler. Kystnære hytter har sine egne utfordringer, særlig der anlegget er utvidet gradvis fra enkel belysning til kjøkken, varmtvann og varmepumpe.`
    ],

    funnIngress: 'Det vi typisk finner i Fredrikstad',
    funn: [
      { tekst: `I den eldste trehusbebyggelsen møter vi ofte anlegg som er bygget ut i flere omganger uten at hovedfordelingen er oppgradert tilsvarende. Et nytt sikringsskap sier ikke nødvendigvis noe om hva som ligger bak det — gamle kurser i rør, skjøter i uinspiserbare hulrom og manglende jording i deler av boligen er ting vi ser jevnlig.`, usikker: true },
      { tekst: `I bebyggelsen fra 1960- og 70-tallet er de vanligste funnene knyttet til varmgang: løse koblinger i sikringsskap og koblingsbokser, overbelastede kurser, og skrusikringssokler med høy overgangsmotstand. Dette er nettopp det termografering avdekker — og grunnen til at det er inkludert i prisen.`, usikker: true },
      { tekst: `På hytter og fritidsboliger langs kysten ser vi korrosjon i utvendige koblinger og uttak, og anlegg som er utvidet stykkevis over mange år uten en samlet vurdering av kapasitet og vern.`, usikker: true }
    ],

    faq: [
      ['Hva koster elkontroll i Fredrikstad?', 'Elkontroll av bolig koster 5 000 kr som fastpris, med termografering inkludert. Prisen er den samme i Fredrikstad som i Halden — vi tar ikke kjøretillegg innenfor Østfold. For borettslag, landbruk og næringsbygg gir vi tilbud etter befaring eller på grunnlag av opplysninger om bygget.'],
      ['Hvor raskt kan dere komme til Fredrikstad?', 'Fredrikstad ligger rundt 36 km fra Halden, cirka 40 minutters kjøring. Vi er der ukentlig og kan som regel tilby tid innen kort varsel. Ta kontakt, så finner vi et tidspunkt.'],
      ['Dekker dere hele kommunen?', 'Ja. Vi tar oppdrag i Gamlebyen, Cicignon, Trara, Holmen, på Kråkerøy, Gressvik, Sellebakk, Rolvsøy, Torp, Østsiden, Begby og ut i Onsøy mot Lervik og Slevik.'],
      ['Vi bor i vernet bebyggelse i Gamlebyen — kan dere kontrollere anlegget?', 'Ja. En elkontroll er en tilstandsvurdering, ikke et inngrep — vi åpner sikringsskap og koblingspunkter, måler og termograferer, men river ingenting. Rapporten beskriver hva som bør utbedres, og vi tar hensyn til at bygget er vernet når vi beskriver hvordan.'],
      ['Får vi rapporten med én gang?', 'Du får skriftlig rapport samme dag som kontrollen er utført. Rapporten kan brukes direkte overfor forsikringsselskap, eltilsyn, kjøper eller styre.']
    ]
  },

  sarpsborg: {
    metaTittel: 'Elkontroll Sarpsborg — fastpris 5 000 kr | Elkontrollen',
    metaBeskrivelse: 'Elkontroll i Sarpsborg etter NEK 405-2, termografering inkludert. Fastpris 5 000 kr for bolig. Vi dekker sentrum, Greåker, Opsund, Tune og Skjeberg.',
    h1Hale: 'Fra sentrum og Opsund til Greåker, Tune og Skjeberg.',
    lead: 'Sarpsborg ligger en halvtime fra basen vår i Halden. Sertifisert kontroll av det elektriske, termografering inkludert, rapport samme dag.',

    omradeIngress: 'Vi tar oppdrag i hele Sarpsborg kommune — i bykjernen, i de gamle industriområdene og ut i Tune, Varteig og Skjeberg.',
    omradeTekst: `Sarpsborg er bygget rundt Sarpsfossen, med Hafslund og Borregaard på hver sin side. Byen vokste med industrien, og bebyggelsen forteller det: arbeiderboliger nær fabrikkene, funksjonærboliger et stykke unna, og store boligfelt fra etterkrigstiden lenger ut. Kommunen rommer i tillegg betydelige jordbruksområder — <strong>251 jordbruksbedrifter</strong>, flere enn i Fredrikstad.`,

    boligmasse: [
      `Sarpsborg har <strong>27 531 boliger</strong>, og <strong>8 566 av dem — 31 prosent — er bygget mellom 1961 og 1980</strong>. Det er den høyeste andelen fra denne perioden blant kommunene vi dekker. Sammen med de 8 918 boligene fra før 1961 betyr det at godt over halvparten av boligmassen i Sarpsborg har et elektrisk anlegg som ble prosjektert før dagens forbruksmønster fantes.`,

      `Byggeperioden 1961–1980 er den mest forutsigbare å kontrollere, fordi kravene var andre. Skrusikringer var standard fram til rundt 1970. Jordfeilbryter på stikkontaktkurser kom først som krav med NEK 400:1998, i kraft fra 1999 — alt som er bygget før det, har det bare hvis noen har ettermontert det. Og antall kurser ble dimensjonert for en husholdning uten induksjonstopp, varmepumpe, varmekabler på bad og elbil i garasjen.`,

      `Den eldre delen av Sarpsborg har en annen historie. <strong>1 991 boliger er fra mellomkrigstiden (1921–1940)</strong>, og mye av dette er bebyggelse knyttet til industrien. Opsund er et kulturmiljø av nasjonal interesse nettopp fordi det dokumenterer hvordan industrien bygget arbeiderboliger, og i boligområdet Grina står tolv funkisvillaer i tre tegnet av Ove Bang, oppført i 1933. Slike boliger er ofte bygget som små enheter og senere påbygd eller delt — og det elektriske anlegget er da gjerne utvidet i takt med det, kurs for kurs, uten at hovedfordelingen har fulgt med.`,

      `Kommunen har også <strong>2 819 fritidsbygg</strong> og <strong>251 jordbruksbedrifter</strong>. For gårdsbruk gjelder egne krav: landbruksforsikringene stiller vilkår om elkontroll med termografi, og vi utfører kontroll etter NEK 405-3 med tillegg for landbruk.`
    ],

    funnIngress: 'Det vi typisk finner i Sarpsborg',
    funn: [
      { tekst: `I den eldre arbeider- og funksjonærbebyggelsen ser vi ofte spor etter at boligen har vært bygget om. Kurser lagt til i flere omganger, blandingsanlegg der nye og gamle føringsveier møtes i samme koblingsboks, og hovedsikring som ikke er dimensjonert opp i takt med utvidelsene.`, usikker: true },
      { tekst: `I boligfeltene fra 1960- og 70-tallet er det først og fremst varmgang vi leter etter — løse klemmer, overbelastede kurser, og sikringssokler med høy overgangsmotstand. Termograferingen gjør dette synlig før det blir en brann, og den er inkludert i fastprisen.`, usikker: true },
      { tekst: `På gårdsbrukene i Tune, Varteig og Skjeberg er bildet et annet: støv, fuktighet og vibrasjon sliter på anlegget i driftsbygninger, og avvikene sitter typisk i fordelinger og motorvern som har stått i et hardt miljø i mange år.`, usikker: true }
    ],

    faq: [
      ['Hva koster elkontroll i Sarpsborg?', 'Elkontroll av bolig koster 5 000 kr som fastpris, med termografering inkludert. Samme pris som i Halden — vi tar ikke kjøretillegg innenfor Østfold. Borettslag, landbruk og næringsbygg får tilbud basert på bygget.'],
      ['Hvor lang tid tar det før dere er på plass?', 'Sarpsborg ligger rundt 31 km fra Halden, cirka en halvtimes kjøring. Vi er i Sarpsborg jevnlig og kan som regel tilby tid raskt.'],
      ['Dekker dere hele kommunen?', 'Ja. Sentrum, Greåker, Sandesund, Opsund, Grina, Alvim, Yven, Hafslundsøy, Borgenhaugen — og ut i Tune, Varteig og Skjeberg.'],
      ['Vi har gårdsbruk i Sarpsborg — hva gjelder for oss?', 'Landbruksforsikringene stiller krav om elkontroll med termografi, med intervaller som avhenger av driftsform. Vi er sertifisert for NEK 405-3 med landbrukstillegg og sender rapporten direkte til forsikringsselskapet hvis du ønsker det.'],
      ['Kan vi bruke rapporten overfor forsikringsselskapet?', 'Ja. Rapporten er utført av NEK 405-sertifisert kontrollør i et NEK 405-4-sertifisert foretak, og er utformet for å brukes overfor forsikring, eltilsyn, kjøper eller styre.']
    ]
  },

  halden: {
    metaTittel: 'Elkontroll Halden — fastpris 5 000 kr | Elkontrollen',
    metaBeskrivelse: 'Elkontroll i Halden etter NEK 405-2, termografering inkludert. Fastpris 5 000 kr. Vi holder til her, og dekker Sørsiden, Nordsiden og Tistedalen.',
    h1Hale: 'vi holder til i Lorangløkka 1.',
    lead: 'Halden er hjemmebanen vår. Vi holder til i Lorangløkka 1 og kjenner bygningsmassen på begge sider av Tista. Sertifisert kontroll, termografering inkludert, rapport samme dag.',

    omradeIngress: 'Vi holder til i Halden og tar oppdrag i hele kommunen — fra Sørsiden og Nordsiden til Tistedalen, Berg, Idd og ut mot Sponvika og Prestebakke.',
    omradeTekst: `Halden er delt av Tista, og de to bysidene har ulik byggehistorie. Sørsiden er den opprinnelige byen, med bevart empirebebyggelse og sjøboder fra rundt 1830. Nordsiden vokste fram som villastrøk. Fra bykjernen strekker bebyggelsen seg tre–fire kilometer innover i den trange Tistedalen. Omtrent 82 prosent av kommunens innbyggere bor i Halden tettsted; resten fordeler seg på Isebakke, Sponvika, Solbakken og Sofienberg, og på spredt bebyggelse i Berg og Idd.`,

    boligmasse: [
      `Halden har <strong>16 799 boliger</strong>, og <strong>6 014 av dem — 36 prosent — er bygget før 1961</strong>. Det er den høyeste andelen blant bykommunene i Østfold. <strong>1 713 boliger er fra 1900 eller tidligere</strong>, altså drøyt hver tiende bolig i kommunen.`,

      `Den gamle trehusbebyggelsen på Sørsiden er kjernen i dette. Her står hus som har hatt elektrisk anlegg i over hundre år, og som har vært gjennom flere generasjoner installasjon: først enkel belysning, så stikkontakter, så kjøkken og bad, og til slutt varmekabler, varmepumpe og elbillader. Hvert lag er lagt oppå det forrige. Det er sjelden noe galt med selve huset — det er kombinasjonen av gamle føringsveier og moderne last som skaper avvikene.`,

      `Villabebyggelsen på Nordsiden og boligfeltene fra etterkrigstiden utgjør den andre store gruppen: <strong>3 856 boliger — 23 prosent — er fra 1961–1980</strong>. For denne perioden gjelder de samme forholdene som ellers i Østfold. Skrusikringer var standard til rundt 1970. Krav om jordfeilbryter på stikkontaktkurser kom først i 1999, med NEK 400:1998. Et anlegg fra 1972 er teknisk sett ikke ulovlig i dag, men det er bygget for et helt annet forbruk.`,

      `Kommunen har i tillegg <strong>1 903 fritidsbygg</strong> og <strong>177 jordbruksbedrifter</strong>. Halden har også en betydelig elektroteknisk og elektronisk industri, og for næringsbygg gjelder NEK 405-3 og forsikringsbransjens FG-1400.`
    ],

    funnIngress: 'Det vi typisk finner i Halden',
    funn: [
      { tekst: `I den eldste bebyggelsen på Sørsiden er det lagene som er utfordringen. Vi finner ofte kurser fra ulike tiår i samme boks, skjøter i hulrom som ikke lar seg inspisere, og deler av boligen uten jording — gjerne akkurat der det i dag står utstyr som burde hatt den.`, usikker: true },
      { tekst: `I villabebyggelsen og boligfeltene er varmgang det vanligste. Løse koblinger i sikringsskapet, kurser som går tett opp mot merkestrøm, og varmekabler på bad fra 70- og 80-tallet som nærmer seg eller har passert teknisk levetid.`, usikker: true },
      { tekst: `Fordi vi holder til i Halden, kan vi som regel rykke ut samme eller neste dag når noe haster — for eksempel etter et pålegg fra Det lokale eltilsyn med kort frist.`, usikker: true }
    ],

    faq: [
      ['Hva koster elkontroll i Halden?', 'Elkontroll av bolig koster 5 000 kr som fastpris, med termografering inkludert. Betaling via faktura etter utført kontroll.'],
      ['Hvor raskt kan dere komme?', 'Vi holder til i Lorangløkka 1 i Halden. Det betyr at vi som regel kan tilby tid raskt, og at vi kan rykke ut på kort varsel når noe haster — for eksempel ved pålegg fra eltilsynet.'],
      ['Dekker dere hele kommunen?', 'Ja. Sørsiden, Nordsiden, Tistedalen, Isebakke, Sponvika, Solbakken og Sofienberg, og spredt bebyggelse i Berg, Idd og mot Prestebakke.'],
      ['Vi bor i gammelt trehus på Sørsiden — er en elkontroll noe inngrep?', 'Nei. Kontrollen er en tilstandsvurdering. Vi åpner sikringsskap og koblingspunkter, måler og termograferer, men river ingenting. Du får en rapport som beskriver hva som bør utbedres og hvor det haster.'],
      ['Er elkontroll pålagt for private boliger?', 'Nei, for private boliger er det frivillig. Men flere forsikringsselskap gir rabatt når kontrollen er utført av NEK 405-sertifisert kontrollør, og eier har uansett ansvar for at anlegget er i forsvarlig stand.']
    ]
  },

  moss: {
    metaTittel: 'Elkontroll Moss — fastpris 5 000 kr | Elkontrollen',
    metaBeskrivelse: 'Elkontroll i Moss etter NEK 405-2, termografering inkludert. Fastpris 5 000 kr for bolig. Vi dekker sentrum, Jeløy, Kambo, Rygge og Larkollen.',
    h1Hale: 'Sentrum, Jeløy, Kambo og hele Rygge.',
    lead: 'Vi tar oppdrag i Moss og Rygge fra basen i Halden. Sertifisert kontroll av det elektriske, termografering inkludert, rapport samme dag.',

    omradeIngress: 'Vi dekker hele Moss kommune slik den ser ut etter sammenslåingen med Rygge i 2020 — fra bykjernen og Jeløy i nord til Larkollen og Dilling i sør.',
    omradeTekst: `Moss er bygget rundt Kanalen mellom Mossesundet og Værlebukta, og omtrent 84 prosent av innbyggerne bor i selve bytettstedet. Resten fordeler seg på Halmstad, Larkollen og mindre steder som Fuglevik, Såstadbråten, Kirkegrenda og Møvik. Etter sammenslåingen med Rygge i 2020 rommer kommunen i tillegg et betydelig jordbruksområde i sør som lenge var en egen kommune med egen byggehistorie.`,

    boligmasse: [
      `Moss har <strong>25 193 boliger</strong>, og tyngdepunktet ligger senere enn i de øvrige Østfold-byene. <strong>6 926 boliger — 27 prosent — er fra 1961–1980</strong>, og <strong>3 740 av dem er fra 1961–1970 alene</strong>. Det er den største enkeltperioden i kommunen etter 1971–80, og det er ikke tilfeldig: befolkningen i Moss nær doblet seg i løpet av 65 år etter krigen.`,

      `Til gjengjeld er andelen virkelig gammel boligmasse lavere enn i Halden og Fredrikstad. <strong>5 751 boliger — 23 prosent — er fra før 1961</strong>, og bare 1 146 er fra 1900 eller tidligere. Praktisk betyr det at hovedutfordringen i Moss sjelden er hundre år gamle føringsveier, men anlegg som er 45–65 år og som har fått påkoblet langt mer enn de var dimensjonert for.`,

      `Byggeperioden 1961–1980 har et gjenkjennelig elektrisk signalement. Skrusikringer var standard til rundt 1970. Jordfeilbryter på stikkontaktkurser ble ikke et krav før NEK 400:1998 trådte i kraft i 1999. Og kurstallet ble lagt for en husholdning uten varmepumpe, induksjonstopp, varmekabler på bad eller elbil. Når alt dette senere kobles på et anlegg som ikke er dimensjonert opp, er varmgang det første som melder seg — og det er termografering som finner det.`,

      `Moss har i tillegg <strong>1 528 fritidsbygg</strong> og <strong>86 jordbruksbedrifter</strong>, de fleste i den tidligere Rygge kommune. Industrihistorien — trelast, glassverk, hermetikk og Helly Hansen — har satt igjen en del eldre næringsbygg der NEK 405-3 og FG-1400 gjelder.`
    ],

    funnIngress: 'Det vi typisk finner i Moss',
    funn: [
      { tekst: `I boligmassen fra 60- og 70-tallet er de gjengående funnene overbelastede kurser og løse koblinger. Typisk er at kjøkkenet er pusset opp med nytt utstyr, men på samme kurs som før — og at varmekabler og varmepumpe er lagt inn i et skap som ikke har fått flere kurser.`, usikker: true },
      { tekst: `I villabebyggelsen på Jeløy ser vi en del anlegg som er utvidet mot uthus, brygge eller garasje med lange kurser og skjøter utendørs, der fukt og korrosjon over tid gir dårlige forbindelser.`, usikker: true },
      { tekst: `I Rygge-delen av kommunen er innslaget av gårdsbruk og landbruksbygg større, og der er det driftsbygningene som krever mest oppmerksomhet — støv, fuktighet og vibrasjon sliter hardt på fordelinger og motorvern.`, usikker: true }
    ],

    faq: [
      ['Hva koster elkontroll i Moss?', 'Elkontroll av bolig koster 5 000 kr som fastpris, med termografering inkludert. Samme pris som i Halden — vi tar ikke kjøretillegg innenfor Østfold.'],
      ['Hvor lang er kjøreturen fra Halden?', 'Moss ligger rundt 61 km fra Halden, i underkant av en times kjøring. Vi planlegger gjerne flere oppdrag i Moss-området samme dag, så si fra hvis naboen eller borettslaget også vurderer kontroll.'],
      ['Dekker dere Rygge?', 'Ja. Rygge ble en del av Moss kommune i 2020, og vi dekker hele kommunen — inkludert Dilling, Halmstad, Larkollen og gårdsbrukene i sør.'],
      ['Vi er et borettslag i Moss — hva gjelder for oss?', 'Borettslag og sameier følger de samme kravene som næringsbygg for det elektriske. Fellesanlegget skal kontrolleres etter NEK 405-3, og styret er ansvarlig. Vi tilbyr en samlet årsavtale under navnet Trygt Borettslag, med elkontroll, termografi, ladeanlegg, brannalarm og nødlys i én pakke.'],
      ['Får vi rapport samme dag?', 'Ja, skriftlig rapport leveres samme dag som kontrollen er utført.']
    ]
  },

  'indre-ostfold': {
    metaTittel: 'Elkontroll Indre Østfold — Askim, Mysen | Elkontrollen',
    metaBeskrivelse: 'Elkontroll i Indre Østfold etter NEK 405-2 og 405-3. Fastpris 5 000 kr for bolig, tilbud på gård og næring. Dekker Askim, Mysen og Spydeberg.',
    h1Hale: 'Askim, Mysen, Spydeberg og gårdsbrukene imellom.',
    lead: 'Indre Østfold er den største landbrukskommunen i fylket. Vi kontrollerer både boliger i tettstedene og driftsbygninger på gårdene — sertifisert, med termografering inkludert.',

    omradeIngress: 'Vi dekker hele Indre Østfold kommune, som ble til i 2020 av Askim, Eidsberg, Hobøl, Spydeberg og Trøgstad.',
    omradeTekst: `Kommunen har omtrent 48 000 innbyggere fordelt på tolv tettsteder. De største er <strong>Askim med 15 629 innbyggere</strong>, <strong>Mysen med 7 199</strong> og <strong>Spydeberg med 6 785</strong>, fulgt av Tomter og Skjønhaug. Bosetningen er ellers jevnt fordelt i jordbruksområdene sentralt i kommunen og sørover langs Glomma og Hobølelva, mens skogtraktene i vest og øst er tynt befolket. Det betyr at vi kjører like mye mellom gårdstun som mellom boligfelt når vi er her.`,

    boligmasse: [
      `Indre Østfold har <strong>21 982 boliger</strong>, med tyngdepunkt i nyere tid enn i kystbyene: <strong>5 414 boliger — 25 prosent — er fra 1961–1980</strong>, og <strong>5 450 — også 25 prosent — er fra før 1961</strong>. Kommunen har vokst jevnt siden 1951, og mye av veksten har kommet som eneboligfelt rundt tettstedene.`,

      `Men det som virkelig skiller Indre Østfold fra resten av fylket, er landbruket. <strong>546 jordbruksbedrifter</strong> — klart flest i Østfold — driver på et areal der 29 prosent av kommunens totalflate er jordbruksland, den største andelen i fylket. Rundt 85 prosent av åker og hage går til korn og oljevekster, og kommunen har det største hønseholdet blant Østfold-kommunene.`,

      `Fjørfehus er noe av det mest krevende vi kontrollerer. Der står belysning, ventilasjon, fôringsanlegg og varme på kontinuerlig drift i et miljø med støv og ammoniakk, og lasten er høy og jevn døgnet rundt. Det er en kombinasjon som sliter på fordelinger, kontaktorer og motorvern — og det er grunnen til at landbruksforsikringene stiller krav om elkontroll med termografi. To av tre branner i driftsbygninger skyldes feil på det elektriske anlegget.`,

      `For boligene gjelder de samme forholdene som ellers: skrusikringer var standard til rundt 1970, og jordfeilbryter på stikkontaktkurser ble først et krav med NEK 400:1998, i kraft fra 1999. Kommunen har i tillegg <strong>1 571 fritidsbygg</strong>.`
    ],

    funnIngress: 'Det vi typisk finner i Indre Østfold',
    funn: [
      { tekst: `I driftsbygninger er de gjennomgående funnene knyttet til miljøet: støv i fordelinger, fukt i uttak og koblingsbokser, og varmgang i kontaktorer og motorvern som har gått mange driftstimer. I fjørfehus ser vi i tillegg ofte at anlegget er utvidet i takt med produksjonen uten at hovedfordelingen er dimensjonert opp.`, usikker: true },
      { tekst: `I våningshusene på gårdene finner vi ofte anlegg som er gamle, men godt vedlikeholdt på overflaten — nytt skap, gamle kurser. Kombinasjonen av bolig og driftsbygning på samme abonnement gjør også at det er verdt å se på fordelingen mellom dem.`, usikker: true },
      { tekst: `I boligfeltene rundt Askim, Mysen og Spydeberg er bildet det samme som i resten av Østfold: overbelastede kurser, manglende jordfeilvern på eldre kurser, og varmgang i sikringsskap.`, usikker: true }
    ],

    faq: [
      ['Hva koster elkontroll i Indre Østfold?', 'Elkontroll av bolig koster 5 000 kr som fastpris, med termografering inkludert. For gårdsbruk og næringsbygg gir vi tilbud, siden omfanget avhenger av antall bygg, størrelse og driftsform.'],
      ['Hvor lang er kjøreturen fra Halden?', 'Mysen ligger rundt 56 km fra Halden og Askim rundt 71 km — mellom 50 minutter og drøy time avhengig av hvor i kommunen du er. Vi setter gjerne opp flere oppdrag i samme område på samme dag.'],
      ['Vi driver gård — hvor ofte må vi ha elkontroll?', 'Det avhenger av driftsform og hvilket forsikringsselskap dere har. For husdyrbruk er hvert tredje år vanlig, for andre driftsformer hvert femte. Kontrollen skal utføres etter NEK 405-3 med landbrukstillegg, av sertifisert kontrollør, og med termografi. Vi sender rapporten direkte til forsikringsselskapet hvis dere ønsker det.'],
      ['Kontrollerer dere fjørfehus?', 'Ja. Fjørfehus krever særlig oppmerksomhet på ventilasjon, fôringsanlegg, varmeanlegg og belysning, og termografering under normal drift er det som avdekker varmgang før det blir kritisk.'],
      ['Dekker dere hele kommunen?', 'Ja — Askim, Mysen, Spydeberg, Eidsberg, Trøgstad, Tomter, Skjønhaug, Knapstad, Hobøl, Slitu og Båstad, og de spredte gårdsbrukene imellom.']
    ]
  },

  rakkestad: {
    metaTittel: 'Elkontroll Rakkestad — bolig, gård og næring | Elkontrollen',
    metaBeskrivelse: 'Elkontroll i Rakkestad etter NEK 405-2 og 405-3, termografering inkludert. Fastpris 5 000 kr for bolig, tilbud på gårdsbruk. Også Degernes.',
    h1Hale: 'Rakkestad sentrum, Degernes og gårdene imellom.',
    lead: 'Rakkestad har 265 jordbruksbedrifter på drøyt 8 500 innbyggere. Vi kontrollerer både bolig og driftsbygning — sertifisert, med termografering inkludert.',

    omradeIngress: 'Vi dekker hele Rakkestad kommune — tettstedene Rakkestad og Degernes, og den spredte gårdsbebyggelsen i mellom.',
    omradeTekst: `Rakkestad har to tettsteder: <strong>Rakkestad med 5 124 innbyggere</strong> og <strong>Degernes med 307</strong>. Til sammen bor omtrent to tredjedeler av kommunens innbyggere i tettsted; resten bor spredt. Bosetningen er i hovedsak konsentrert til de lavereliggende jordbruksområdene sentralt og nord i kommunen, mens skogtraktene i øst og sørvest er tynt befolket. Det betyr at et oppdrag i Rakkestad ofte innebærer kjøring på gårdsveier — noe vi regner inn i tidsplanleggingen, ikke i prisen.`,

    boligmasse: [
      `Rakkestad har <strong>4 143 boliger</strong>, hvorav <strong>1 228 — 30 prosent — er bygget før 1961</strong> og <strong>1 066 — 26 prosent — mellom 1961 og 1980</strong>. Det er en boligmasse der over halvparten har et elektrisk anlegg som er eldre enn dagens krav til jordfeilvern, som kom med NEK 400:1998 i 1999.`,

      `Det som preger Rakkestad mest, er likevel landbruket. <strong>265 jordbruksbedrifter</strong> på drøyt 8 500 innbyggere — omtrent ett gårdsbruk per 32 innbyggere. Rundt 80 prosent av jordbruksarealet går til korn og oljevekster, med hvete på 41 prosent av kornarealet. Kommunen har det største storfeholdet blant Østfold-kommunene, i tillegg til betydelig fjørfe- og svineproduksjon. Næringsmiddelindustri med fjørfeslakteri og eggpakkeri er en av de største arbeidsgiverne.`,

      `Driftsbygninger er et helt annet elektrisk miljø enn en bolig. Støv fra fôr og strø legger seg i fordelinger. Fuktighet og ammoniakk tærer på kontakter og klemmer. Vifter, fôringsanlegg og melkeanlegg gir vibrasjon og lang kontinuerlig drift. Alt dette bidrar til overgangsmotstand og varmgang — og det er derfor landbruksforsikringene stiller krav om elkontroll med termografi, og gir rabatt når kravet er oppfylt. To av tre branner i driftsbygninger skyldes feil på det elektriske anlegget.`,

      `Kommunen har i tillegg <strong>301 fritidsbygg</strong>, og næringsmiddelindustrien gjør at det også finnes næringsbygg her som faller inn under NEK 405-3 og forsikringsbransjens FG-1400.`
    ],

    funnIngress: 'Det vi typisk finner i Rakkestad',
    funn: [
      { tekst: `I driftsbygninger er de vanligste funnene knyttet til miljøbelastning over tid: støv i fordelingsskap, korrosjon i uttak og koblinger, og varmgang i kontaktorer og motorvern. Termografering under normal drift er det som gjør dette synlig — et skap kan se helt greit ut med øyet og likevel ha en kobling på 90 grader.`, usikker: true },
      { tekst: `På storfebruk ser vi ofte anlegg som er utvidet i flere etapper i takt med at besetningen har vokst, uten at hovedfordelingen er oppgradert tilsvarende.`, usikker: true },
      { tekst: `I våningshus og boliger i tettstedene er funnene de samme som ellers i Østfold: kurser som går tett opp mot merkestrøm, manglende jordfeilvern på eldre kurser, og løse koblinger i sikringsskap.`, usikker: true }
    ],

    faq: [
      ['Hva koster elkontroll i Rakkestad?', 'Elkontroll av bolig koster 5 000 kr som fastpris, med termografering inkludert. Gårdsbruk og næringsbygg får tilbud, fordi omfanget avhenger av antall bygg, størrelse og driftsform.'],
      ['Hvor lang er kjøreturen fra Halden?', 'Rakkestad ligger rundt 39 km fra Halden, cirka 45 minutters kjøring. Ligger gården et stykke ut på bygda, kommer det litt kjøring i tillegg — men prisen på boligkontroll er den samme.'],
      ['Hvor ofte må vi ha elkontroll på gården?', 'Det avhenger av driftsform og forsikringsselskap. For husdyrbruk er hvert tredje år vanlig, for andre driftsformer hvert femte. Kontrollen skal utføres etter NEK 405-3 med landbrukstillegg, av sertifisert kontrollør, og inkludere termografi.'],
      ['Gir elkontroll rabatt på landbruksforsikringen?', 'Alle de store landbruksforsikringene stiller krav om elkontroll med termografi, og flere gir i tillegg rabatt for fastmonterte temperatursensorer i el-skapene. Vi sender rapporten direkte til forsikringsselskapet hvis dere ønsker det.'],
      ['Dekker dere Degernes?', 'Ja. Vi tar oppdrag i hele kommunen — Rakkestad sentrum, Degernes, Os, Bergenhus, Fladstad og Kirkeng, og den spredte bebyggelsen imellom.']
    ]
  },

  hvaler: {
    metaTittel: 'Elkontroll Hvaler — bolig og hytte | Elkontrollen',
    metaBeskrivelse: 'Elkontroll på Hvaler etter NEK 405-2, termografering inkludert. Fastpris 5 000 kr for bolig og hytte. Dekker Skjærhalden, Kirkøy, Asmaløy og Vesterøy.',
    h1Hale: 'Skjærhalden, Kirkøy, Asmaløy, Spjærøy og Vesterøy.',
    lead: 'Hvaler har nesten dobbelt så mange hytter som boliger. Vi kontrollerer begge deler — sertifisert, med termografering inkludert, og vi kjenner hva saltluft og sesongbruk gjør med et anlegg.',

    omradeIngress: 'Vi tar oppdrag på hele Hvaler — på de store øyene med fast veiforbindelse og i hyttebebyggelsen rundt.',
    omradeTekst: `Hvaler består av rundt 550 øyer og skjær, med Vesterøy, Spjærøy, Asmaløy, Kirkøy og Papper som de største. Fem tettsteder huser mesteparten av den faste bosetningen: <strong>Skjærhalden (928), Rød (739), Norderhaug (606), Hauge (422) og Utgård (326)</strong>. Omtrent to tredjedeler av innbyggerne bor på øyene vest for Løperen. Utgårdskilen på Vesterøy er en av Sør-Norges største fiskerihavner.`,

    boligmasse: [
      `Hvaler er den kommunen vi dekker der forholdet mellom bolig og fritidsbolig er snudd på hodet. Kommunen har <strong>2 587 boliger</strong> — og <strong>4 479 fritidsbygg</strong>. Det er nesten to hytter per helårsbolig. Om sommeren er folketallet mange ganger det faste, og belastningen på det elektriske øker tilsvarende.`,

      `Selve boligmassen er relativt ung i Østfold-sammenheng: <strong>615 boliger — 24 prosent — er fra før 1961</strong>, og bare 366 er fra 1961–1980. Til gjengjeld er <strong>288 boliger — 11 prosent — fra 1900 eller tidligere</strong>, den nest høyeste andelen blant kommunene vi dekker. Det er den gamle kystbebyggelsen: skipper- og fiskerhus, sjøboder og naust, der anlegget er lagt inn i et bygg som opprinnelig ikke hadde noe.`,

      `Kystklima er hardt mot elektriske installasjoner. Saltluft gir korrosjon i utvendige koblinger, uttak, stikkontakter på brygge og i naust, og i overganger mellom ulike metaller. Korrosjon gir overgangsmotstand, og overgangsmotstand gir varme. Det er en langsom prosess som ikke synes før den er langt kommet — og det er nettopp derfor termografering er nyttig på kysten.`,

      `Fritidsboliger har i tillegg en egen historikk. Mange hytter på Hvaler er bygget ut stykkevis over flere tiår: fra enkel belysning til kjøkken, varmtvannsbereder, varmekabler og etter hvert varmepumpe og elbillader. Hvert trinn er ofte lagt til uten at hovedfordelingen er vurdert på nytt. Legg til at anlegget står ubrukt store deler av året — fukt får tid til å arbeide, og feil får stå uoppdaget til neste sesong.`
    ],

    funnIngress: 'Det vi typisk finner på Hvaler',
    funn: [
      { tekst: `Korrosjon er det gjennomgående. Vi finner det i utvendige uttak, i koblinger på brygge og i naust, i kurser som går ut til utebelysning og båtplass, og i skjøter som er gjort provisorisk og deretter blitt permanente.`, usikker: true },
      { tekst: `På hytter ser vi ofte anlegg som er utvidet i flere omganger uten en samlet vurdering — for eksempel varmepumpe og varmtvannsbereder lagt inn på et skap som opprinnelig forsynte belysning og et par stikkontakter.`, usikker: true },
      { tekst: `I den gamle kystbebyggelsen finner vi anlegg lagt i bygg som ikke var tenkt for det, med føringsveier gjennom uoppvarmede rom der kondens og fukt er et vedvarende problem.`, usikker: true }
    ],

    faq: [
      ['Kontrollerer dere hytter og fritidsboliger?', 'Ja. Elkontroll av fritidsbolig følger samme metodikk som for bolig, etter NEK 405-2, med termografering inkludert. Fastpris 5 000 kr.'],
      ['Hva koster elkontroll på Hvaler?', 'Elkontroll av bolig eller fritidsbolig koster 5 000 kr som fastpris, med termografering inkludert. Vi tar ikke kjøretillegg innenfor Østfold.'],
      ['Hvor lang er kjøreturen fra Halden?', 'Skjærhalden ligger rundt 63 km fra Halden, i overkant av en times kjøring via Fredrikstad og Kråkerøyforbindelsen. Vi setter gjerne opp flere oppdrag på Hvaler samme dag — si fra hvis naboen også vurderer kontroll.'],
      ['Må jeg være til stede under kontrollen av hytta?', 'Kontrolløren trenger tilgang til hele bygget, inkludert sikringsskap, loft og kjeller. Vi avtaler adkomst på forhånd — det lar seg som regel løse selv om du ikke bor i nærheten.'],
      ['Gjelder kontrollen også brygge, naust og utebelysning?', 'Ja, hvis det er en del av det samme anlegget. Det er ofte nettopp der de alvorligste funnene sitter, fordi utendørs installasjoner i kystklima er mest utsatt for korrosjon og fukt.']
    ]
  },

  aremark: {
    metaTittel: 'Elkontroll Aremark — bolig, hytte og gård | Elkontrollen',
    metaBeskrivelse: 'Elkontroll i Aremark etter NEK 405-2 og 405-3, termografering inkludert. Fastpris 5 000 kr for bolig og hytte. Under en halvtime fra Halden.',
    h1Hale: 'Fossby, Strømsfoss og bebyggelsen langs vassdraget.',
    lead: 'Aremark er nærmeste nabokommune til Halden — under en halvtimes kjøring fra basen vår. Sertifisert kontroll av bolig, hytte og driftsbygning, med termografering inkludert.',

    omradeIngress: 'Vi dekker hele Aremark — Fossby, Strømsfoss og den spredte bebyggelsen langs Haldenvassdraget.',
    omradeTekst: `Aremark er den eneste kommunen i Østfold uten tettsted. Kommunesenteret Fossby ligger på østsiden av Aremarksjøen, og litt over halvparten av kommunens 1 354 innbyggere bor i dette området. Resten bor spredt, i hovedsak langs Haldenvassdraget. Nesten 80 prosent av kommunens areal er skog. Strømsfoss, med sluser og møllemuseum, er det andre knutepunktet.`,

    boligmasse: [
      `Aremark har <strong>755 boliger</strong> — og <strong>750 fritidsbygg</strong>. Det er omtrent én hytte per bolig, et forhold som sier mye om hvordan kommunen brukes: fast bosetning langs vassdraget, og en stor hyttebebyggelse knyttet til det samme vannet.`,

      `Boligmassen er den eldste blant kommunene vi dekker. <strong>296 boliger — 39 prosent — er fra før 1961</strong>, og <strong>127 — nesten 17 prosent — er fra 1900 eller tidligere</strong>. Det er den høyeste andelen hundreårsgamle boliger i hele utvalget vårt. Samtidig har kommunen hatt befolkningsnedgang siden 2000, og det er bygget svært lite nytt: bare 5 boliger er registrert fra 2021 eller senere.`,

      `Gammel boligmasse i spredt bebyggelse gir en bestemt type utfordringer. Anleggene er lagt inn over flere generasjoner, ofte i bygg som ikke opprinnelig hadde elektrisitet. Avstandene gjør at kursene blir lange, og at uthus, garasje, pumpehus og brygge ofte forsynes fra våningshuset via kurser som er trukket over tid og ikke nødvendigvis dimensjonert for det de i dag forsyner.`,

      `Landbruket er den andre delen av bildet. Kommunen har <strong>54 jordbruksbedrifter</strong>, der korn utgjør 65 prosent av jordbruksarealet, i tillegg til storfe og fjørfe. For driftsbygninger gjelder NEK 405-3 med landbrukstillegg, og landbruksforsikringene stiller krav om elkontroll med termografi.`
    ],

    funnIngress: 'Det vi typisk finner i Aremark',
    funn: [
      { tekst: `I den eldste bebyggelsen finner vi anlegg som er lagt i flere lag over lang tid, med gamle føringsveier bak nye skap, og deler av bygget uten jording.`, usikker: true },
      { tekst: `Spredt bebyggelse gir lange kurser ut til uthus, garasje, pumpehus og brygge. Der ser vi ofte spenningsfall, underdimensjonerte ledere og skjøter utendørs som har fått stå i mange år.`, usikker: true },
      { tekst: `På hyttene langs vassdraget er bildet likt det vi ser andre steder med sesongbruk: anlegg utvidet i etapper, fukt i uoppvarmede rom, og feil som får stå uoppdaget mellom sesongene.`, usikker: true }
    ],

    faq: [
      ['Hva koster elkontroll i Aremark?', 'Elkontroll av bolig eller fritidsbolig koster 5 000 kr som fastpris, med termografering inkludert. Gårdsbruk får tilbud, siden omfanget avhenger av antall bygg og driftsform.'],
      ['Hvor raskt kan dere komme?', 'Aremark ligger rundt 26 km fra Halden, under en halvtimes kjøring. Det er den nærmeste kommunen til basen vår, og vi kan som regel tilby tid raskt.'],
      ['Kontrollerer dere hytter?', 'Ja. Aremark har omtrent like mange fritidsbygg som boliger, og vi kontrollerer begge deler etter NEK 405-2. Vi avtaler adkomst på forhånd hvis du ikke bor i nærheten.'],
      ['Vi driver gård — hva gjelder for oss?', 'Landbruksforsikringene stiller krav om elkontroll med termografi. Intervallet avhenger av driftsform — hvert tredje år er vanlig for husdyrbruk, hvert femte for andre. Kontrollen utføres etter NEK 405-3 med landbrukstillegg, av sertifisert kontrollør.'],
      ['Dekker dere også de spredte gårdene og hyttene?', 'Ja. Vi tar oppdrag i hele kommunen — Fossby, Strømsfoss, Ytre Aremark, Øymark og den spredte bebyggelsen langs vassdraget.']
    ]
  }
};

module.exports.TRENGER_LOKALKUNNSKAP = T;
