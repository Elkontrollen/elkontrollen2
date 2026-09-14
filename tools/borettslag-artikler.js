// Fase C — åtte nye artikler i borettslagsklyngen.
//
// Hver artikkel svarer på hovedspørsmålet i første avsnitt, deretter utdypning.
// 700–1200 ord. Alle lenker tilbake til /borettslag/.
//
// datePublished er spredt utover, ikke satt til samme dag. De 34 eksisterende
// artiklene ble publisert på få dager i august, og det er nettopp det mønsteret
// som gjør det sannsynlig at mange står som «Oppdaget – foreløpig ikke indeksert».
//
// Påstander som bygger på Elkontrollens egen praksis er merket usikker:true og
// havner i FAKTASJEKK.md.

module.exports = [

// ───────────────────────────────────────────────────────────────────── 1 ────
{
  slug: 'hva-koster-elkontroll-borettslag',
  dato: '2026-09-15',
  tittel: 'Hva koster elkontroll i borettslag?',
  metaTittel: 'Hva koster elkontroll i borettslag? | Elkontrollen',
  beskrivelse: 'Prismodellen forklart: hva som avgjør prisen på elkontroll av fellesanlegget, hva som inngår, og hvorfor ingen kan oppgi et tall før de har sett bygget.',
  ingress: 'Kort svar: prisen settes etter størrelsen på fellesanlegget, ikke etter antall leiligheter alene. Det som avgjør er antall tavler og fordelinger, hvor mange bygg som inngår, om det finnes ladeanlegg, og hva som allerede er kontrollert og dokumentert. Derfor gir ingen seriøs leverandør et tall før de har sett bygget — men modellen bak tallet kan forklares, og det er den styret trenger for å budsjettere.',
  seksjoner: [
    ['Hvorfor antall leiligheter er et dårlig mål', [
      'Det intuitive er å tenke at et lag med 60 leiligheter koster dobbelt så mye som et med 30. Slik er det ikke, fordi elkontroll av fellesanlegget ikke går inn i leilighetene i det hele tatt.',
      'Det kontrolløren faktisk bruker tid på, er hovedtavle, stigeledninger, underfordelinger, fellesrom, kjeller, garasje, utebelysning og varmekabler. Et lag på 30 leiligheter fordelt på fem oppganger med hver sin fordeling er en større jobb enn 60 leiligheter i ett bygg med én hovedtavle.'
    ]],
    ['De fem tingene som avgjør prisen', [
      '<strong>Antall tavler og fordelinger.</strong> Dette er den tyngste faktoren. Hver fordeling skal åpnes, kontrolleres og termograferes under last.',
      '<strong>Antall bygg og oppganger.</strong> Flere bygg betyr flere inntak, mer stigeledning og mer forflytning.',
      '<strong>Ladeanlegg.</strong> Et ladeanlegg er den tyngste og mest kontinuerlige lasten i bygget, og kontrolleres for seg — termografi under last, vern, jordfeilvern og lastbalansering.',
      '<strong>Anleggets alder og tilstand.</strong> Et anlegg der dokumentasjonen finnes og er oppdatert går raskere enn et der ingen vet hva som er gjort siden 1994.',
      '<strong>Hva som allerede er kontrollert.</strong> Har laget en fersk brannalarmkontroll fra en annen leverandør, skal ikke den gjøres om igjen.'
    ]],
    ['Hva som bør inngå i prisen', [
      'Be om at tilbudet spesifiserer dette, og sammenlign leverandører på det — ikke bare på sluttsummen:',
      '<strong>Termografi.</strong> Skal være inkludert, ikke et tillegg. Termografering under last er det som avdekker varmgang før den blir en brann, og en kontroll uten den finner bare det man ser med øyet.',
      '<strong>Prioritert avviksrapport.</strong> Ikke en liste med funn, men en oversikt som sier hva som haster, hva som kan vente, og hva det omtrent koster å lukke.',
      '<strong>Dokumentasjon til internkontrollen.</strong> Rapporten skal kunne legges rett inn i HMS-permen uten at styret må gjøre den om.',
      '<strong>Oppfølging av avvik.</strong> At noen purrer til avvikene faktisk er lukket, og dokumenterer når det skjedde. En rapport med åpne avvik hjelper lite ved et tilsyn.'
    ]],
    ['Fastpris eller timepris?', [
      'Be om fast pris. Timepris på en kontroll gir laget en regning det ikke kan budsjettere med, og gir leverandøren ingen grunn til å være effektiv.',
      'En årsavtale med fast pris fordelt over året er enda bedre for styret, fordi den lar laget legge kostnaden inn i budsjettet på årsbasis i stedet for som en engangspost som dukker opp når frist nærmer seg.'
    ]],
    ['Hva det koster å la være', [
      'Elkontroll er et av de billigste tiltakene et borettslag kan gjøre, målt mot hva det koster å la være.',
      'Ved brann spør forsikringsselskapet etter dokumentasjon på at fellesanlegget er kontrollert. Mangler den, er avkortning i erstatningen en reell mulighet — og et borettslag som får avkortet en brannskade, sitter igjen med et tap ingen i styret ønsker å forklare på årsmøtet.',
      'Kommer Det lokale eltilsyn på tilsyn og finner avvik uten dokumentasjon på oppfølging, får laget pålegg med frist. Å lukke avvik under tidspress er dyrere enn å lukke dem planlagt.'
    ]],
    ['Slik går dere fram', [
      'Be om en kartlegging før dere ber om pris. En leverandør som gir et tall over telefon uten å ha sett bygget, gjetter — og gjetningen er enten for høy for dere eller for lav for dem.',
      'Hos oss er den første gjennomgangen gratis og uforpliktende. Vi går gjennom bygget sammen med styret eller vaktmester, noterer hva laget har og hva som er lovpålagt å kontrollere, og gir en konkret årspris for det nivået som passer.'
    ], true]
  ]
},

// ───────────────────────────────────────────────────────────────────── 2 ────
{
  slug: 'elkontroll-forsikring-borettslag',
  dato: '2026-09-17',
  tittel: 'Elkontroll og forsikring for borettslag',
  metaTittel: 'Elkontroll og forsikring for borettslag | Elkontrollen',
  beskrivelse: 'Hva forsikringsselskapet krever av elkontroll i borettslag, hvilken dokumentasjon de ber om, og hva som skjer med erstatningen hvis kontrollen mangler.',
  ingress: 'Kort svar: forsikringsselskapet krever som regel ikke elkontroll av borettslag på samme absolutte måte som i landbruket, men det stiller krav til at anlegget er i forsvarlig stand og at styret kan dokumentere oppfølging. Ved brann er dokumentasjonen det første som etterspørres, og mangler den, er avkortning i erstatningen en reell mulighet. Flere selskaper gir i tillegg sikkerhetsrabatt når kontrollen er utført etter NEK 405 av sertifisert kontrollør.',
  seksjoner: [
    ['Forskjellen på et krav og et vilkår', [
      'Det er verdt å skille mellom to ting som ofte blandes sammen.',
      'Et <strong>krav</strong> er noe som må være oppfylt for at forsikringen skal gjelde som forutsatt. I landbruket er elkontroll med termografi et slikt krav for husdyrbruk hos de fleste selskapene.',
      'Et <strong>vilkår om aktsomhet</strong> er svakere formulert, men får samme praktiske virkning: forsikringstakeren skal holde anlegget i forsvarlig stand og følge offentlige krav. For borettslag er det oftest denne formen som gjelder — og internkontrollforskriften er det offentlige kravet.',
      'Utfallet er likt: når skaden har skjedd, spør selskapet om dokumentasjon.'
    ]],
    ['Hva selskapet ber om etter en brann', [
      'Erfaringsmessig går spørsmålene i denne rekkefølgen:',
      'Finnes det en kontrollrapport på fellesanlegget, og hvor gammel er den? Hvilken standard er kontrollen utført etter, og var kontrolløren sertifisert? Ble det funnet avvik, og kan dere dokumentere at de ble lukket — og når? Finnes det en kontrollplan som viser at dette er en rutine og ikke en engangshendelse?',
      'Det siste spørsmålet er det mange styrer ikke er forberedt på. En enkeltstående rapport fra 2019 er svakere dokumentasjon enn en plan som viser at kontrollen gjentas.'
    ], true],
    ['Hva som kreves for at rapporten godtas', [
      '<strong>Sertifisert kontrollør.</strong> Personsertifisering etter NEK 405, i et foretak sertifisert etter NEK 405-4. Begge deler — det holder ikke at en elektriker har sett over anlegget.',
      '<strong>Rapport merket NEK 405.</strong> Rapporten må vise hvilken standard kontrollen er utført etter. For fellesanlegg i borettslag er det NEK 405-3.',
      '<strong>Avvik lukket og dokumentert.</strong> En rapport med åpne avvik dokumenterer at dere visste om feilen. Det er ikke nødvendigvis bedre enn ingen rapport.',
      '<strong>Gjentakelse.</strong> Kontrollen skal være innenfor gyldig intervall. Hva som er gyldig avhenger av kontrollklassen bygget faller i.'
    ]],
    ['Sikkerhetsrabatt', [
      'Flere selskaper gir rabatt når det elektriske anlegget er kontrollert etter NEK 405. Gjensidige beskriver el-kontroll som «en av våre største sikkerhetsrabatter» og oppgir at den gjelder i fem år etter kontrollen.',
      'Størrelsen på rabatten varierer, og de fleste selskapene tallfester den ikke offentlig. Det praktiske rådet er enkelt: ring forsikringsrådgiveren og spør hva sikkerhetsrabatt for el-kontroll utgjør på lagets polise, før dere bestiller. Da vet styret hva kontrollen er verdt i kroner, og kan legge det fram på årsmøtet.',
      'Enkelte selskaper premierer også fastmontert temperaturovervåkning i fellestavler — sensorer som varsler når temperaturen stiger unormalt, mellom kontrollene.'
    ]],
    ['Hva styret bør ha i permen', [
      'Uavhengig av hvilket selskap laget har, er dette dokumentasjonen som gjør at spørsmålene over kan besvares:',
      'Siste kontrollrapport på fellesanlegget, med standard og kontrollørens sertifisering oppgitt. Termografirapport med bilder. Avviksliste med status og dato for lukking. Kontrollplan som viser neste frist. Dokumentasjon på ladeanlegg, brannalarm og nødlys. Skriftlig ansvarsfordeling mellom styret og andelseierne.',
      'Ligger alt dette samlet og oppdatert, tar det fem minutter å svare på en henvendelse fra selskapet. Ligger det spredt hos tre tidligere styreledere, tar det uker.'
    ]]
  ]
},

// ───────────────────────────────────────────────────────────────────── 3 ────
{
  slug: 'internkontroll-elektro-borettslag',
  dato: '2026-09-19',
  tittel: 'Internkontroll elektro for borettslag — hva styret må ha på plass',
  metaTittel: 'Internkontroll elektro for borettslag | Elkontrollen',
  beskrivelse: 'De konkrete dokumentene styret må ha i internkontrollen for elsikkerhet — ikke bare prinsippet. Sjekkliste over hva permen faktisk skal inneholde.',
  ingress: 'Kort svar: borettslaget er en virksomhet i lovens forstand, og styret har derfor plikt til internkontroll for elsikkerhet. I praksis betyr det seks dokumenter som skal finnes, være oppdatert og kunne legges fram. De fleste styrer har to av dem.',
  seksjoner: [
    ['Hvorfor plikten gjelder et borettslag', [
      'Internkontrollforskriften gjelder «virksomhet». Et borettslag eller sameie som eier et bygg med elektrisk anlegg, faller inn under den — uavhengig av om laget har ansatte, og uavhengig av om noen tjener penger på det.',
      'Det betyr at et frivillig styre har det samme dokumentasjonsansvaret som en bedrift. Det er en forpliktelse mange styremedlemmer ikke er klar over når de sier ja til vervet.'
    ]],
    ['De seks dokumentene', [
      '<strong>1. Oversikt over anleggene.</strong> Hva laget faktisk har: hovedtavle, underfordelinger, ladeanlegg, brannalarm, nødlys, varmekabler, utebelysning. Med plassering. Uten denne vet ingen hva som skal kontrolleres.',
      '<strong>2. Skriftlig ansvarsfordeling.</strong> Hvem i styret har ansvaret for elsikkerhet, og hva er grensen mot andelseier. Skriftlig, ikke bare underforstått.',
      '<strong>3. Kontrollplan.</strong> Hva som skal kontrolleres, hvor ofte, med hjemmel og neste frist. Dette er dokumentet som viser at kontroll er en rutine og ikke en engangshendelse.',
      '<strong>4. Kontrollrapporter.</strong> Fra elkontroll, termografi, ladeanlegg, brannalarm og nødlys. Med standard og sertifisering oppgitt.',
      '<strong>5. Avviksliste med status.</strong> Hva som ble funnet, hva som er lukket, når, og av hvem. Åpne avvik skal ha en frist.',
      '<strong>6. Informasjon til beboerne.</strong> At andelseierne er informert om sitt eget ansvar for anlegget innenfor egen bolig. Et årlig skriv holder.'
    ]],
    ['Det som oftest mangler', [
      'Etter vår erfaring har de fleste styrer rapport og faktura — altså punkt 4. Det som mangler er kontrollplanen, avvikslisten med status og beboerinformasjonen.',
      'Det er uheldig, fordi det er nettopp de tre som viser at laget har et system og ikke bare har kjøpt en tjeneste én gang. Ved tilsyn er det systemet som vurderes.'
    ], true],
    ['Hvor ofte skal permen oppdateres', [
      'Ved hver kontroll, og minst én gang i året. Den årlige gjennomgangen bør ligge fast i styrets årshjul, gjerne rett før årsmøtet — da har styret uansett behov for å oppsummere hva som er gjort.',
      'Et praktisk grep: legg oppdateringen til samme møte som regnskapet gjennomgås. Da blir den gjort.'
    ]],
    ['Digitalt eller papir', [
      'Begge deler er greit, men digitalt er tryggere av én grunn: styret byttes. En perm i en kjellerbod følger ikke med til neste styreleder. En mappe som ligger tilgjengelig for hele styret, gjør det.',
      'Det viktigste er ikke formatet, men at nytt styre finner den uten å måtte spørre noen.'
    ]],
    ['Hvor mye av dette må styret gjøre selv', [
      'Oversikten over anleggene, kontrollplanen, rapportene og avvikslisten kan leverandøren levere ferdig. Ansvarsfordelingen og beboerinformasjonen må styret eie selv — men malene kan følge med.',
      'I Trygt Borettslag inngår kontrollplan, prioritert avviksrapport, årsmøterapport, ferdige beboerskriv og et dokumentarkiv som ligger på laget. Poenget er at neste styre arver et system, ikke en bunke.'
    ], true]
  ]
},

// ───────────────────────────────────────────────────────────────────── 4 ────
{
  slug: 'ansvar-elektrisk-styret-eller-andelseier',
  dato: '2026-09-21',
  tittel: 'Hvem har ansvaret for det elektriske: styret eller andelseier?',
  metaTittel: 'Elektrisk ansvar: styret eller andelseier? | Elkontrollen',
  beskrivelse: 'Grensegangen mellom fellesanlegg og leilighet, forklart konkret. Hvor går skillet i sikringsskapet, og hvem betaler hva når det oppstår feil?',
  ingress: 'Kort svar: styret har ansvaret for fellesanlegget, andelseier for det som ligger innenfor egen bolig. Grensen går som hovedregel ved inntaket til leiligheten — altså ved leilighetens eget sikringsskap. Men grensen er ikke alltid åpenbar i praksis, og det er de uklare tilfellene som skaper konflikt.',
  seksjoner: [
    ['Hovedregelen', [
      '<strong>Styret har ansvaret for:</strong> hovedtavle og hovedinntak, stigeledninger opp gjennom bygget, fellesmålere, fordelinger i fellesarealer, belysning i oppganger, kjeller, loft og garasje, utebelysning, varmekabler i fellesareal, ladeanlegg for elbil, brannalarm og nødlys.',
      '<strong>Andelseier har ansvaret for:</strong> sikringsskapet i leiligheten og alt innenfor det — kurser, stikkontakter, brytere, lamper, varmekabler på eget bad, eget utstyr.',
      'Skillet følger prinsippet i borettslagsloven om at laget vedlikeholder felles, og andelseier vedlikeholder eget. Vedtektene kan presisere det, men kan sjelden flytte det vesentlig.'
    ]],
    ['Der grensen blir uklar', [
      '<strong>Sikringsskapet i leiligheten.</strong> Selve skapet kan være lagets, mens innholdet er andelseiers — eller motsatt, avhengig av hvordan bygget er satt opp og hva vedtektene sier. Dette er den vanligste uenigheten.',
      '<strong>Stigeledningen fram til leiligheten.</strong> Fram til inntaket er den lagets. Er den underdimensjonert slik at andelseier ikke får installert det hen ønsker, er det lagets problem, ikke andelseiers.',
      '<strong>Ladepunkt på egen plass.</strong> Selve ladeboksen kan være andelseiers, mens kursen, vernet og lastbalanseringen fram til den er lagets. Feil her er den vanligste kilden til tvist om ladeanlegg.',
      '<strong>Balkong og terrasse.</strong> Uttak på balkong hører som regel til leiligheten, men kursen dit kan gå gjennom fellesareal.'
    ]],
    ['Hvorfor det er styrets problem uansett', [
      'Selv der ansvaret formelt ligger hos andelseier, har styret en plikt til å følge opp. Internkontrollforskriften pålegger laget å informere beboerne om deres ansvar, og et kjent avvik i en leilighet som kan true bygget, kan ikke ignoreres fordi det står på feil side av grensen.',
      'I praksis betyr det at styret bør informere skriftlig én gang i året om hva andelseier selv har ansvar for. Det tar ti minutter og flytter en reell risiko.'
    ]],
    ['Hva en elkontroll av fellesanlegget dekker', [
      'En NEK 405-3-kontroll av fellesanlegget går ikke inn i leilighetene. Den dekker hovedtavle, stigere, fellesrom, kjeller, garasje, utebelysning og varmekabler i fellesareal.',
      'Det betyr at et lag kan ha et perfekt kontrollert fellesanlegg og samtidig ha alvorlige feil bak leilighetsdørene. For eldre bygg der mange leiligheter aldri har vært kontrollert, er dette et reelt hull.'
    ]],
    ['Leilighetskontroll som løsning', [
      'Flere lag velger å tilby andelseierne kontroll av egen leilighet mens kontrolløren likevel er i bygget. Det gir hver beboer en kort rapport på sin egen bolig, og styret en samlet oversikt over hele bygningsmassen — ikke bare fellesarealene.',
      'Praktisk fordel: kontrollene tas i samme uke, så beboerne forholder seg til ett tidsvindu. Økonomisk fordel: prisen per leilighet blir lavere enn om hver enkelt bestiller separat, fordi reisen og riggen deles.'
    ], true],
    ['Når det blir konflikt', [
      'Går det til uenighet om hvem som skal betale, er det to spørsmål som avgjør: hvor feilen fysisk befinner seg, og hva vedtektene sier om vedlikeholdsplikt.',
      'En uavhengig kontrollrapport er det som gjør den diskusjonen kort. Rapporten sier hvor feilen er, ikke hvem som skal betale — men når plasseringen er dokumentert av en tredjepart uten interesse i utfallet, er det sjelden mye igjen å krangle om.'
    ]]
  ]
},

// ───────────────────────────────────────────────────────────────────── 5 ────
{
  slug: 'slik-forbereder-styret-elkontroll',
  dato: '2026-09-23',
  tittel: 'Slik forbereder styret en elkontroll',
  metaTittel: 'Slik forbereder styret en elkontroll | Elkontrollen',
  beskrivelse: 'Praktisk sjekkliste før kontrolløren kommer: tilgang til fellesrom, nøkler, varsling av beboere, hvilke dokumenter som bør ligge klart, og hvem som møter.',
  ingress: 'Kort svar: det meste handler om tilgang. En kontroll som stopper fordi ingen finner nøkkelen til teknisk rom, koster laget både tid og penger. Denne lista tar femten minutter å gå gjennom, og fjerner det som faktisk går galt.',
  seksjoner: [
    ['To uker før', [
      '<strong>Finn fram dokumentasjonen.</strong> Forrige kontrollrapport, samsvarserklæringer, tegninger av anlegget og dokumentasjon på ladeanlegget. Finnes det ikke, si fra — det er en opplysning i seg selv, ikke en pinlighet.',
      '<strong>Avklar hvem som møter.</strong> Én person med nøkler og kjennskap til bygget. Vaktmester er ofte bedre enn styreleder, fordi vaktmesteren vet hvor ting er.',
      '<strong>Sjekk at nøkler finnes.</strong> Til hovedtavlerom, teknisk rom, kjeller, loft, garasje, alle bodrom med fordelinger. Dette er punktet som oftest skaper problemer.'
    ]],
    ['En uke før', [
      '<strong>Varsle beboerne.</strong> Skriv i oppgangen eller på lagets kanal: hva som skal gjøres, når, og om det kan bli kortvarige strømbrudd. Skal leilighetene også kontrolleres, må varselet ut i god tid og inneholde tidsvindu.',
      '<strong>Rydd foran tavlene.</strong> Kontrolløren skal åpne skap og bruke varmekamera. Står det sykler, maling og julepynt foran fordelingen, går tid på flytting.',
      '<strong>Merk av hva som er endret.</strong> Har laget fått ladeanlegg, solceller, nytt fyrrom eller bygget om kjelleren siden sist, si fra. Det avgjør hva som må kontrolleres.'
    ]],
    ['Dagen før', [
      '<strong>Bekreft tid og oppmøtested.</strong> Ett telefonnummer som faktisk svarer.',
      '<strong>Sørg for at anlegget er i normal drift.</strong> Termografering måler varmgang under belastning. Et ladeanlegg som er slått av, eller et fyrrom som står stille, gir ikke et representativt bilde. Kontrollen bør skje mens bygget brukes som vanlig.'
    ]],
    ['På kontrolldagen', [
      'Kontrolløren trenger tilgang, ikke selskap. Personen som møter, bør være tilgjengelig på telefon, men trenger ikke gå med hele veien.',
      'Sett av tid til en kort oppsummering på slutten. Fem minutter der kontrolløren sier hva som ble funnet og hva som haster, er mer verdt enn å lese det i rapporten en uke senere — særlig hvis noe er akutt.'
    ]],
    ['Etterpå', [
      '<strong>Les avvikslista først, ikke rapporten.</strong> Rapporten er dokumentasjon. Avvikslista er handlingsplanen.',
      '<strong>Prioriter.</strong> Kritiske avvik utbedres straks. Resten legges inn i vedlikeholdsbudsjettet med frist.',
      '<strong>Dokumenter lukkingen.</strong> Når et avvik er utbedret, skal det stå hvem som gjorde det og når. Det er den dokumentasjonen forsikringen etterspør, ikke selve rapporten.',
      '<strong>Legg alt i internkontrollen.</strong> Og sørg for at neste styre finner det.'
    ]],
    ['Hva som forsinker en kontroll mest', [
      'I rekkefølge: manglende nøkler til ett rom, tavler som er sperret av lagring, og at ingen vet om laget har fått nye anlegg siden sist.',
      'Alle tre løses på under en time hvis styret går gjennom lista over i forkant.'
    ], true]
  ]
},

// ───────────────────────────────────────────────────────────────────── 6 ────
{
  slug: 'elkontroll-for-og-etter-rehabilitering',
  dato: '2026-09-25',
  tittel: 'Elkontroll før og etter rehabilitering',
  metaTittel: 'Elkontroll før og etter rehabilitering | Elkontrollen',
  beskrivelse: 'Garantikontroll, overtakelse og reklamasjon ved rehabilitering i borettslag. Når kontrollen bør gjøres, og hvorfor fristen er viktigere enn de fleste tror.',
  ingress: 'Kort svar: kontroller anlegget både før og etter. Før, for å vite hva som faktisk var der fra før — ellers blir det umulig å skille byggefeil fra gammel slitasje når noe går galt. Etter, mens reklamasjonsfristen fortsatt løper, slik at feil rettes for entreprenørens regning og ikke lagets.',
  seksjoner: [
    ['Kontrollen før arbeidet starter', [
      'Dette er den som oftest droppes, og den som koster mest å droppe.',
      'Uten en tilstandsvurdering fra før arbeidet begynte, har laget ingen dokumentasjon på hva som var der. Når det senere oppstår en feil, står det påstand mot påstand: entreprenøren sier det var slik fra før, styret mener det oppsto under arbeidet. Uten en rapport vinner den som har best hukommelse, ikke den som har rett.',
      'En kontroll før oppstart gir dessuten et konkret grunnlag for anbudet. Det er lettere å be om pris på noe som er dokumentert enn på noe som skal vise seg underveis.'
    ]],
    ['Kontrollen ved overtakelse', [
      'Ved overtakelse skal anlegget kontrolleres mot det som ble avtalt og mot NEK 400 — installasjonsnormen som gjelder for utførelsen.',
      'Det som typisk avdekkes: manglende eller ufullstendige samsvarserklæringer, dokumentasjon som ikke er overlevert, kurser som ikke er merket, jordfeilvern som ikke er testet, og termiske avvik i nye fordelinger som skyldes klemmer som ikke er trukket til.',
      'Det siste er verdt å merke seg. Løse klemmer i et helt nytt anlegg er vanligere enn folk tror, og det er nettopp den typen feil termografering finner — og som ikke er synlig ved en visuell gjennomgang.'
    ]],
    ['Reklamasjonsfristen', [
      'Ved oppføring og rehabilitering gjelder som hovedregel fem års reklamasjonsfrist. Fristen løper fra overtakelse, ikke fra når feilen oppdages.',
      'Det er det som gjør garantikontroll til noe styret bør sette i årshjulet: et avvik som oppdages i år fire, kan kreves rettet for entreprenørens regning. Det samme avviket oppdaget i år seks er lagets egen regning.',
      'Praktisk grep: legg en kontroll inn i budsjettet i god tid før fristen løper ut. Et halvt år før er passe — da er det tid til å melde og forhandle.'
    ]],
    ['Ved bytte av entreprenør', [
      'Skal laget bytte leverandør midt i et prosjekt, eller fra en fast elektriker til en annen, bør anlegget kontrolleres først.',
      'Grunnen er enkel: uten en dokumentert tilstand ved overgangen, arver den nye entreprenøren ansvaret for den forriges arbeid i praksis, og det gjør at ingen tar det. En kontroll ved overgangen setter en strek.'
    ]],
    ['Hvem som kan gjøre kontrollen', [
      'Det bør ikke være den samme som utførte arbeidet. En kontroll av eget arbeid er ikke en uavhengig vurdering, uansett hvor dyktig utføreren er.',
      'Bruk et sertifisert kontrollforetak som ikke selger utbedringen. Da er rapporten et dokument laget kan bruke i en reklamasjonssak, i stedet for et tilbud.'
    ]],
    ['Hva styret bør kreve dokumentert', [
      'Samsvarserklæring for alt arbeid som er utført. Oppdatert dokumentasjon av anlegget, inkludert kursfortegnelse. Måleprotokoll. Dokumentasjon på ladeanlegg, hvis det inngår. Og en kontrollrapport fra en uavhengig tredjepart.',
      'Uten det siste har laget entreprenørens ord på at arbeidet er i orden. Det er ikke det samme som dokumentasjon.'
    ]]
  ]
},

// ───────────────────────────────────────────────────────────────────── 7 ────
{
  slug: 'styret-avvik-i-rapporten',
  dato: '2026-09-27',
  tittel: 'Hva gjør styret når rapporten viser avvik?',
  metaTittel: 'Avvik i elkontroll-rapporten — hva gjør styret? | Elkontrollen',
  beskrivelse: 'Prioritering, budsjettering, frister og hvem som kan lukke avvik i et borettslag. Slik går styret fram uten å få panikk eller la rapporten bli liggende.',
  ingress: 'Kort svar: sorter avvikene etter hvor mye det haster, ikke etter rekkefølgen i rapporten. Kritiske avvik utbedres straks. Resten legges inn i vedlikeholdsbudsjettet med frist og ansvarlig. Og viktigst: dokumenter når hvert avvik ble lukket — det er den dokumentasjonen som etterspørres, ikke selve rapporten.',
  seksjoner: [
    ['Avvik betyr ikke at noe er galt med laget', [
      'De fleste kontroller finner avvik. Det er hele poenget med å gjøre dem. En rapport uten funn på et bygg fra 1974 bør gjøre styret mer bekymret enn en med ti.',
      'Det er heller ikke slik at alle avvik haster. Noen er reell fare, noen er dokumentasjonsmangler, og noen er forhold som bør rettes ved neste anledning.'
    ]],
    ['Tre nivåer, tre ulike svar', [
      '<strong>Kritisk — utbedres straks.</strong> Reell fare for brann eller berøring. Her skal styret ikke vente på neste styremøte. Ta kontakt med registrert installatør med én gang, og dokumenter når det ble gjort.',
      '<strong>Avvik — planlegg utbedring.</strong> Ikke i tråd med krav, men ikke akutt. Legg inn i vedlikeholdsbudsjettet, sett en frist, og gi én person i styret ansvaret for å følge det opp.',
      '<strong>Mindre merknad — følges opp.</strong> Noteres og tas ved neste kontroll eller ved neste ombygging. Krever ikke egen sak.',
      'Er ikke rapporten prioritert slik, be leverandøren om å gjøre det. En avviksliste uten prioritering er et arbeidsdokument styret ikke kan bruke.'
    ]],
    ['Hvem kan lukke et avvik', [
      'Utbedring av elektrisk anlegg skal gjøres av registrert installatør. Vaktmester, en beboer som er elektriker privat, eller et styremedlem med god vilje kan ikke lukke et avvik på en måte som holder.',
      'Kontrollforetaket som fant avviket bør ikke være det samme som utbedrer det. Det er et poeng i seg selv at den som vurderer ikke tjener på funnene.',
      'Etter utbedring skal installatøren levere samsvarserklæring. Det er det dokumentet som beviser at avviket er lukket — ikke fakturaen.'
    ]],
    ['Budsjettering', [
      'Et borettslag kan sjelden ta alt på én gang. Det er heller ikke forventet.',
      'Del opp: kritiske avvik tas over driftsbudsjettet umiddelbart. Større utbedringer legges inn i vedlikeholdsplanen med år og anslått kostnad. Er summen stor, er dette en sak for årsmøtet — og da er en prioritert avviksliste med kostnadsanslag langt lettere å legge fram enn en teknisk rapport.',
      'Be om kostnadsanslag i avvikslista. Ikke bindende pris, men en størrelsesorden, slik at styret vet om vi snakker om 15 000 eller 400 000.'
    ]],
    ['Frister', [
      'Kommer avviket fra en ordinær elkontroll, setter laget fristen selv — men den bør være skriftlig, og den bør være kort for det kritiske.',
      'Kommer det fra Det lokale eltilsyn, er fristen satt av dem, og den skal overholdes. Svar på pålegget innen fristen selv om arbeidet ikke er ferdig — en tilbakemelding om at arbeidet er bestilt og planlagt, er noe helt annet enn stillhet.'
    ]],
    ['Dokumentasjonen er det som teller til slutt', [
      'Dette er det viktigste avsnittet i artikkelen. Selve rapporten dokumenterer at laget visste om avviket. Det er lukkingen som dokumenterer at laget gjorde noe med det.',
      'Før en enkel logg: avvik, dato funnet, hvem som utbedret, dato lukket, samsvarserklæring vedlagt. Det tar minutter per avvik og er forskjellen mellom et styre som har kontroll og et som har en perm.'
    ]],
    ['Hvis rapporten blir liggende', [
      'Det vanligste utfallet av en kontroll er dessverre at rapporten arkiveres og avvikene glemmes til neste kontroll finner de samme feilene.',
      'Motmiddelet er å gi én person ansvaret og sette avvikslista som fast punkt på styremøtet til den er tom. Det er en femminutters sak per møte.'
    ], true]
  ]
},

// ───────────────────────────────────────────────────────────────────── 8 ────
{
  slug: 'elkontroll-sameie-eller-borettslag',
  dato: '2026-09-29',
  tittel: 'Elkontroll i sameie kontra borettslag — er kravene ulike?',
  metaTittel: 'Elkontroll i sameie eller borettslag — ulike krav? | Elkontrollen',
  beskrivelse: 'På elsiden er kravene like. Forskjellen ligger i ansvarsforholdene og hvordan beslutninger tas. Her er hva det betyr i praksis for styret.',
  ingress: 'Kort svar: nei, ikke på elsiden. Kravene til det elektriske anlegget følger av el-tilsynsloven og internkontrollforskriften, og de skiller ikke mellom eierformer. Et sameie og et borettslag med samme bygg har samme plikt. Forskjellen ligger i eierforholdet, i hvordan beslutninger fattes, og i hvem som betaler — og det påvirker hvor lett det er å få gjennomført kontrollen.',
  seksjoner: [
    ['Det som er likt', [
      'Begge er «virksomhet» etter internkontrollforskriften. Begge har plikt til å holde fellesanlegget i forsvarlig stand og kunne dokumentere det. Begge kan få tilsyn fra Det lokale eltilsyn. Begge risikerer avkortning i erstatningen ved brann hvis dokumentasjonen mangler.',
      'Kontrollen utføres etter samme standard — NEK 405-3 for fellesanlegget — og av samme type sertifiserte kontrollør. Rapporten ser lik ut.',
      'Kort sagt: teknisk og juridisk er det ingen forskjell på elsiden.'
    ]],
    ['Det som er ulikt: eierforholdet', [
      'I et <strong>borettslag</strong> eier laget bygningen, og andelseieren eier en andel med borett til en bestemt bolig. Fellesanlegget er utvetydig lagets.',
      'I et <strong>sameie</strong> eier den enkelte seksjonseier sin seksjon direkte, og fellesarealene i sameie med de andre. Grensen mellom seksjon og fellesareal er definert i seksjoneringsbegjæringen.',
      'Praktisk betyr det at grensedragningen i et sameie oftere må slås opp i papirene, mens den i et borettslag oftere følger av vedtektene og en etablert praksis.'
    ]],
    ['Det som er ulikt: beslutninger og finansiering', [
      'Et borettslag kan normalt ta opp felleslån, og har ofte en etablert vedlikeholdsplan med avsetninger. Det gjør det enklere å finansiere større utbedringer over tid.',
      'Et sameie har sjeldnere felles låneopptak, og større tiltak krever ofte at seksjonseierne betaler inn direkte. Det gjør terskelen for å vedta et tiltak høyere — ikke fordi plikten er mindre, men fordi pengene sitter lenger inne.',
      'For styret betyr det at et sameie bør begynne tidligere med budsjettering av utbedringer, og at en prioritert avviksliste med kostnadsanslag er enda viktigere å ha på plass før årsmøtet.'
    ]],
    ['Det som er ulikt: hvor langt styrets ansvar strekker seg', [
      'I begge tilfeller har styret ansvar for fellesanlegget og eieren for det som ligger innenfor egen bolig eller seksjon.',
      'Men i et sameie er det oftere uklart hvor grensen går fysisk, særlig i eldre bygg der seksjoneringen ble gjort lenge etter at anlegget ble lagt. Der grensen er uklar, er en uavhengig kontrollrapport som dokumenterer hvor feilen fysisk befinner seg, det som gjør diskusjonen kort.'
    ]],
    ['Hva det betyr for gjennomføringen', [
      'Kontrollen gjøres likt. Det som skiller er hvor lett det er å få tilgang og å få vedtatt oppfølging.',
      'I sameier med mange små seksjoner og lav møtedeltakelse ser vi at tilgang til fellesrom kan være mer krevende, og at oppfølging av avvik tar lengre tid fordi finansieringen må avklares først.',
      'Rådet er det samme for begge: be om en kartlegging, få en kontrollplan med frister, og legg den inn i årshjulet. Da blir det en rutine i stedet for en sak.'
    ], true],
    ['Hva med sameier under åtte seksjoner?', [
      'Små sameier har ofte ikke et styre i praksis, bare en kontaktperson. Plikten forsvinner ikke av den grunn — eierne har fortsatt et felles ansvar for fellesanlegget.',
      'For små sameier er det ofte enklest å avtale kontroll med fast intervall én gang, slik at den går av seg selv og ikke forutsetter at noen tar initiativ hvert tredje år.'
    ]]
  ]
}

];
