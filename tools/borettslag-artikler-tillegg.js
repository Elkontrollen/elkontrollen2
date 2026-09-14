// Tilleggsseksjoner og FAQ per artikkel i borettslagsklyngen.
//
// Skilt ut i egen fil for å holde borettslag-artikler.js lesbar. Generatoren
// slår sammen de to før den bygger.
//
// FAQ-en gir samtidig FAQPage-schema på hver artikkel, som er et krav i fase F.

module.exports = {

'hva-koster-elkontroll-borettslag': {
  ekstra: [
    ['Hva et tilbud bør spesifisere', [
      'Be om at tilbudet er delt opp. Et samlet tall uten innhold gjør det umulig å sammenligne to leverandører, og det gjør det umulig for styret å se hva som kan tas nå og hva som kan vente.',
      'Spør konkret: hvor mange fordelinger er priset inn? Er termografi under last inkludert eller et tillegg? Følger det med en prioritert avviksliste med kostnadsanslag? Hvem følger opp at avvikene lukkes, og er det priset? Er rapporten formatert slik at den kan legges rett i HMS-permen?',
      'Leverandører som svarer utydelig på disse spørsmålene, pleier å svare utydelig på fakturaen også.'
    ]],
    ['Engangskontroll eller årsavtale', [
      'En engangskontroll løser et øyeblikksproblem: laget trenger dokumentasjon nå, ofte fordi forsikringen eller et tilsyn har spurt.',
      'En årsavtale løser et strukturproblem: styret byttes hvert år, og uten en avtale som løper, faller kontrollen mellom to styrer. Det er den vanligste grunnen til at et lag oppdager at forrige kontroll er sju år gammel.',
      'Årsavtalen har også en praktisk økonomisk side: kostnaden fordeles over året i stedet for å komme som en engangspost, og laget slipper å hente inn tilbud på nytt hver gang.'
    ]],
    ['Leilighetskontroll som tillegg', [
      'Kontroll av fellesanlegget går ikke inn i leilighetene. For eldre lag der mange boenheter aldri har vært kontrollert, er det et reelt hull i oversikten.',
      'Når kontrolløren likevel er i bygget, kan andelseierne bestille kontroll av egen leilighet til lavere pris enn om hver enkelt bestiller separat — reisen og riggen deles på mange. Beboeren får en kort rapport på sin bolig, og styret får en samlet oversikt over hele bygningsmassen.',
      'Det gir styret noe konkret å tilby beboerne, uten at laget tar kostnaden.'
    ], true]
  ],
  faq: [
    ['Kan dere gi en pris over telefon?', 'Vi kan forklare modellen og hva som avgjør prisen, men ikke tallet. Et tall gitt uten å ha sett bygget er en gjetning, og gjetningen blir enten for høy for dere eller for lav for oss. Kartleggingen er gratis og uforpliktende.'],
    ['Hva koster det per leilighet?', 'Elkontroll av fellesanlegget prises ikke per leilighet, fordi kontrollen ikke går inn i leilighetene. Det er antall tavler, fordelinger og bygg som avgjør. Leilighetskontroll er en egen tjeneste som prises per boenhet.'],
    ['Er termografi inkludert?', 'Ja, i våre kontroller. Sjekk dette spesifikt i tilbud fra andre — termografi under last er det som avdekker varmgang før den blir en brann, og en kontroll uten den finner bare det man ser med øyet.'],
    ['Kan vi dele opp utbedringene over flere år?', 'Ja, og det er ofte det riktige. Kritiske avvik må tas straks, men resten kan legges inn i vedlikeholdsplanen med frist. Be om kostnadsanslag i avvikslista, så har styret grunnlag for å budsjettere.'],
    ['Hva om vi allerede har en avtale med en elektriker?', 'Da beholder dere den. Kontroll og utbedring bør uansett ikke gjøres av samme foretak — vi finner og dokumenterer, deres elektriker retter. Det er nettopp uavhengigheten som gjør rapporten verdt noe.']
  ]
},

'elkontroll-forsikring-borettslag': {
  ekstra: [
    ['Kontrollklasse — det som styrer intervallet', [
      'Forsikringsbransjens regelverk FG-1400 deler bygg inn i kontrollklasser etter risiko. Klassen avgjør hvor ofte anlegget skal kontrolleres.',
      'For boligblokker havner de fleste i et intervall på tre til fem år for fellesanlegget, mens termografi av hovedtavler ofte anbefales årlig. Bygg med høy last, mange fordelinger, garasjeanlegg med lading eller næringslokaler i første etasje trekker mot kortere intervall.',
      'Sjekk hvilken klasse laget faktisk er plassert i. Det står i vilkårene, og det er ikke alltid det styret antar.'
    ]],
    ['Ladeanlegg og forsikring', [
      'Ladeanlegg er den delen av fellesanlegget som har endret risikobildet mest de siste årene. Det er den tyngste og mest kontinuerlige lasten i bygget, og det går gjerne i timevis om natten når ingen er til stede.',
      'Flere selskaper har egne vilkår for ladeanlegg, og noen krever dokumentasjon på at anlegget er kontrollert etter installasjon og deretter jevnlig. Er ladeanlegget montert av en leverandør laget fant selv, bør styret forsikre seg om at dokumentasjonen faktisk ble overlevert.',
      'Et ladeanlegg uten dokumentasjon er et problem styret arver, uansett hvem som monterte det.'
    ]],
    ['Hva avkortning betyr i praksis', [
      'Avkortning betyr at selskapet reduserer erstatningen fordi forsikringstakeren ikke har oppfylt sine plikter. Det er ikke det samme som avslag — laget får noe, men ikke alt.',
      'Størrelsen avhenger av hvor grov forsømmelsen var og hvor mye den bidro til skaden. Manglende kontroll på et anlegg der brannen startet, vekter tyngre enn manglende dokumentasjon på et forhold uten sammenheng med skaden.',
      'For et borettslag med en totalskade er selv en moderat avkortning et beløp ingen i styret ønsker å forklare på årsmøtet.'
    ]]
  ],
  faq: [
    ['Krever forsikringen elkontroll av borettslag?', 'De fleste stiller ikke et absolutt krav slik som i landbruket, men vilkårene krever at anlegget holdes i forsvarlig stand og at offentlige krav følges. Internkontrollforskriften er det offentlige kravet, og den gjelder borettslag.'],
    ['Hvor gammel kan rapporten være?', 'Det avhenger av kontrollklassen bygget er plassert i etter FG-1400. For boligblokker er tre til fem år vanlig for fellesanlegget. Sjekk vilkårene — klassen står der.'],
    ['Får vi rabatt?', 'Flere selskaper gir sikkerhetsrabatt for elkontroll etter NEK 405. Gjensidige beskriver den som «en av våre største sikkerhetsrabatter» og oppgir fem års varighet. Størrelsen varierer og tallfestes sjelden offentlig — ring rådgiveren og spør hva den utgjør for lagets polise.'],
    ['Må avvikene være lukket for at rabatten skal gjelde?', 'Som regel ja. Gjensidige stiller kravet eksplisitt. En rapport med åpne avvik dokumenterer at laget visste om feilen, og er ikke nødvendigvis bedre enn ingen rapport.'],
    ['Hvem sender dokumentasjonen til forsikringsselskapet?', 'Vi sender den for dere hvis dere ønsker det, og dere får den selv i tillegg. Styret bør uansett ha kopien i internkontrollen.']
  ]
},

'internkontroll-elektro-borettslag': {
  ekstra: [
    ['Hva et tilsyn faktisk ser etter', [
      'Kommer Det lokale eltilsyn på besøk, er det ikke anlegget de starter med. Det er dokumentasjonen.',
      'Spørsmålene går på system: Har dere en oversikt over hvilke anlegg laget har? Finnes det en plan for når de kontrolleres? Kan dere vise siste rapport? Hva ble funnet, og hva ble gjort med det? Hvem i styret har ansvaret?',
      'Et lag som svarer ja på alle fem, får sjelden pålegg selv om anlegget har avvik. Et lag som svarer nei på tre av dem, får pålegg selv om anlegget er i god stand. Det er systemet som vurderes.'
    ], true],
    ['Årshjul for styret', [
      'Det praktiske grepet som gjør at internkontrollen faktisk holdes ved like, er å legge den inn i årshjulet i stedet for å behandle den som en sak som dukker opp.',
      '<strong>Januar–februar:</strong> gjennomgang av internkontrollen før årsmøtet. Oppdater avvikslista, sjekk hvilke frister som forfaller i året.',
      '<strong>Ved årsmøtet:</strong> kort oppsummering av hva som er kontrollert og hva som er lukket. To setninger holder, men de bør stå i protokollen.',
      '<strong>Ved styreskifte:</strong> overlevering av dokumentasjonen, ikke bare av nøkler og bankkort.',
      '<strong>Årlig:</strong> skriv til beboerne om deres eget ansvar innenfor egen bolig.'
    ]],
    ['Overlevering ved styreskifte', [
      'Dette er det svakeste leddet i de fleste lag. Styret byttes, og kunnskapen forsvinner med dem — ikke fordi noen slurver, men fordi ingen har definert hva som skal overleveres.',
      'Lag en fast liste: hvor dokumentasjonen ligger, hvem som er kontaktperson hos leverandøren, hvilke frister som løper, og hvilke avvik som er åpne. Én side.',
      'Et lag som gjør dette, slipper å oppdage etter tre år at forrige kontroll var i 2018 og at ingen har lest rapporten.'
    ]]
  ],
  faq: [
    ['Gjelder internkontrollforskriften virkelig for et borettslag?', 'Ja. Forskriften gjelder «virksomhet», og et borettslag eller sameie som eier et bygg med elektrisk anlegg faller inn under den — uavhengig av om laget har ansatte.'],
    ['Hvem i styret har ansvaret?', 'Styret som helhet, men det bør pekes ut én ansvarlig skriftlig. Uten navn blir ansvaret alles og dermed ingens.'],
    ['Holder det med rapporten fra elkontrollen?', 'Nei. Rapporten er ett av seks dokumenter. Det som oftest mangler er kontrollplanen, avvikslista med status og beboerinformasjonen — og det er nettopp de som viser at laget har et system.'],
    ['Må permen være fysisk?', 'Nei, digitalt er som regel bedre fordi det følger med til neste styre. Det viktigste er at nytt styre finner den uten å måtte spørre noen.'],
    ['Hva om vi ikke har noe av dette i dag?', 'Da starter dere med en oversikt over hvilke anlegg laget har. Uten den vet ingen hva som skal kontrolleres. Resten bygger på den.']
  ]
},

'ansvar-elektrisk-styret-eller-andelseier': {
  ekstra: [
    ['Hva vedtektene kan og ikke kan endre', [
      'Vedtektene kan presisere grensen mellom felles og eget, og de kan regulere hvem som bestiller og betaler for hva i praksis.',
      'Det de ikke kan, er å flytte det offentligrettslige ansvaret. Internkontrollplikten for fellesanlegget ligger hos laget uansett hva vedtektene sier, og en vedtektsbestemmelse som legger kontrollansvaret for hovedtavla på den enkelte andelseier ville ikke hatt virkning overfor eltilsynet.',
      'Sjekk likevel vedtektene, for de avgjør ofte hvem som tar regningen internt.'
    ]],
    ['Når andelseier har gjort noe selv', [
      'Dette er en situasjon som oppstår oftere enn styret liker å tenke på: en beboer har fått en bekjent til å legge inn en ny kurs, montere en varmekabel eller koble til en ladeboks.',
      'Er arbeidet gjort uten registrert installatør, finnes det ingen samsvarserklæring, og da er det ingen som har tatt ansvar for utførelsen. Oppstår det brann, er det et forhold forsikringen vil se nærmere på.',
      'Styret kan ikke gå inn i leiligheter og kontrollere, men kan og bør informere skriftlig om at elektrisk arbeid skal utføres av registrert installatør, og at samsvarserklæring skal foreligge.'
    ]],
    ['Hva styret bør informere om, og hvor ofte', [
      'Ett skriv i året holder. Det bør si: hva andelseier selv har ansvar for, at elektrisk arbeid skal gjøres av registrert installatør, hvilke tegn som bør varsles til styret, og hvem beboeren kontakter ved mistanke om feil i fellesanlegget.',
      'Dette er ikke bare god praksis. Det er en del av internkontrollplikten, og det er dokumenterbart — send det på e-post eller legg det i postkassene, og ta vare på kopien.'
    ]]
  ],
  faq: [
    ['Hvem betaler når sikringen i leiligheten ryker?', 'Som hovedregel andelseier, fordi feilen ligger innenfor egen bolig. Skyldes det derimot en underdimensjonert stigeledning fram til leiligheten, er det lagets ansvar.'],
    ['Er sikringsskapet i leiligheten mitt eller lagets?', 'Det varierer, og det er den vanligste uenigheten. Selve skapet kan være lagets mens innholdet er andelseiers, eller motsatt. Sjekk vedtektene — og ved tvil, sjekk hvor feilen fysisk befinner seg.'],
    ['Hvem har ansvaret for ladeboksen på min plass?', 'Selve boksen er ofte andelseiers, mens kursen, vernet og lastbalanseringen fram til den er lagets. Det er her de fleste tvistene om ladeanlegg oppstår.'],
    ['Kan styret kreve at jeg slipper inn en kontrollør?', 'Ikke uten videre til kontroll av egen leilighet — det er frivillig. Til fellesanlegg som går gjennom boligen, for eksempel en stigeledning, stiller det seg annerledes, og vedtektene regulerer ofte adgang.'],
    ['Dekker elkontroll av fellesanlegget leilighetene?', 'Nei. En NEK 405-3-kontroll av fellesanlegget dekker hovedtavle, stigere, fellesrom, kjeller, garasje og utebelysning. Leilighetene er en egen tjeneste.']
  ]
},

'slik-forbereder-styret-elkontroll': {
  ekstra: [
    ['Hva kontrolløren gjør, så dere vet hva som skjer', [
      'Det hjelper å vite hva som faktisk foregår, både for å svare beboerne og for å sette av riktig tid.',
      'Kontrolløren åpner hovedtavle og underfordelinger, gjør visuell kontroll av tilstand, merking og vern, måler isolasjonsmotstand og tester jordfeilvern. Deretter termograferes tavler og fordelinger under last, med varmekamera som viser temperaturforskjeller usynlige for øyet.',
      'Fellesarealer, kjeller, garasje, loft og utebelysning gås gjennom. Er det ladeanlegg, kontrolleres det for seg, under last.',
      'Det meste er stille arbeid. Kortvarige strømbrudd kan forekomme ved testing av jordfeilvern, og det er den delen beboerne bør varsles om.'
    ]],
    ['Hvor lang tid det tar', [
      'Det avhenger av antall fordelinger og bygg, ikke av antall leiligheter. Et lag med én hovedtavle og to underfordelinger går unna på noen timer. Et lag med fem oppganger, garasjeanlegg og ladeanlegg tar en dag eller mer.',
      'Be om et tidsestimat i forkant, slik at den som møter vet hva hen skal sette av. Et estimat er også et signal om at leverandøren har forstått omfanget.'
    ]],
    ['Vanlige misforståelser', [
      '<strong>«Vi hadde kontroll for to år siden, da trenger vi ikke nå.»</strong> Sjekk hva som faktisk ble kontrollert. En brannalarmkontroll er ikke en elkontroll, og en el-sjekk er ikke en NEK 405-kontroll.',
      '<strong>«Anlegget er nytt, så det er i orden.»</strong> Et nytt anlegg er ikke et kontrollert anlegg. Feil ved montasje er nettopp det man vil oppdage mens reklamasjonsfristen løper.',
      '<strong>«Vaktmesteren ser over det jevnlig.»</strong> Det er bra, men det er ikke dokumentasjon. Kontroll krever sertifisering, og rapporten krever en standard.'
    ]]
  ],
  faq: [
    ['Må beboerne være hjemme?', 'Nei, ikke ved kontroll av fellesanlegget. Den dekker hovedtavle, stigere, fellesrom, kjeller, garasje og utebelysning — ingen tilgang til leilighetene er nødvendig. Skal leilighetene også kontrolleres, avtales det som en egen runde.'],
    ['Blir det strømbrudd?', 'Kortvarig, og bare ved testing av jordfeilvern. Beboerne bør varsles, men det er snakk om sekunder, ikke timer.'],
    ['Hvem bør møte kontrolløren?', 'Én person med nøkler og kjennskap til bygget. Vaktmester er ofte bedre enn styreleder, fordi vaktmesteren vet hvor ting er.'],
    ['Hva om vi ikke finner gammel dokumentasjon?', 'Si fra. At den mangler er en opplysning i seg selv, og det er vanligere enn styret tror. Kontrollen gjennomføres uansett — det tar bare litt lengre tid å kartlegge anlegget.'],
    ['Hvor lang tid tar det?', 'Det avgjøres av antall fordelinger og bygg, ikke antall leiligheter. Be om et tidsestimat i forkant.']
  ]
},

'elkontroll-for-og-etter-rehabilitering': {
  ekstra: [
    ['Rehabilitering uten at anlegget røres', [
      'Et poeng som ofte overses: også rehabilitering som ikke handler om det elektriske, kan påvirke anlegget.',
      'Etterisolering endrer varmeforholdene rundt kabler i vegger og tak. Nye vinduer og tettere bygg endrer ventilasjonsbehovet og dermed lasten. Nytt bad betyr nye varmekabler. Utskiftning av fyrrom flytter last. Og håndverkere som borer, treffer av og til noe.',
      'Er det gjort større arbeid på bygget, bør anlegget kontrolleres selv om ingen har rørt en kurs.'
    ]],
    ['Dokumentasjonen entreprenøren skal levere', [
      'Ved overtakelse har laget krav på at dokumentasjonen følger med. Erfaringsmessig er dette den delen som oftest mangler, og som oftest ikke etterspørres før det er for sent.',
      'Kravlista: samsvarserklæring for alt utført arbeid, oppdatert kursfortegnelse, måleprotokoll, produktdokumentasjon for utstyr som er montert, og dokumentasjon på ladeanlegg der det inngår.',
      'Mangler samsvarserklæringen, har laget i praksis ingen dokumentasjon på at arbeidet er utført forskriftsmessig. Det er ikke et formelt problem før noe skjer — og da er det et stort et.'
    ], true],
    ['Hvorfor kontrollen bør bestilles av laget, ikke entreprenøren', [
      'Det hender at entreprenøren tilbyr seg å ordne kontrollen. Det er ryddig ment, men det svekker rapporten.',
      'En kontroll bestilt og betalt av den som utførte arbeidet, er ikke en uavhengig vurdering — uansett hvor dyktig kontrolløren er. Skal rapporten brukes i en reklamasjonssak, er det avgjørende at den er bestilt av laget.',
      'Kostnaden er lav sammenlignet med det den dokumenterer.'
    ]]
  ],
  faq: [
    ['Hvor lenge kan vi reklamere?', 'Ved oppføring og rehabilitering gjelder som hovedregel fem års reklamasjonsfrist, regnet fra overtakelse — ikke fra når feilen oppdages.'],
    ['Må vi kontrollere før arbeidet også?', 'Det anbefales sterkt. Uten dokumentasjon på tilstanden før, blir det umulig å skille byggefeil fra gammel slitasje når noe går galt. Da står påstand mot påstand.'],
    ['Kan entreprenøren gjøre kontrollen selv?', 'Teknisk ja, men rapporten mister verdien. En kontroll av eget arbeid er ikke uavhengig, og i en reklamasjonssak er det nettopp uavhengigheten som teller.'],
    ['Hva om reklamasjonsfristen nesten er ute?', 'Bestill kontroll nå. Et avvik som meldes innenfor fristen kan kreves rettet for entreprenørens regning. Samme avvik oppdaget etter fristen er lagets egen kostnad.'],
    ['Gjelder dette også når vi bytter elektriker?', 'Ja. Uten en dokumentert tilstand ved overgangen arver den nye entreprenøren ansvaret for den forriges arbeid i praksis, og da tar ingen det.']
  ]
},

'styret-avvik-i-rapporten': {
  ekstra: [
    ['Hvordan legge det fram for årsmøtet', [
      'Skal en større utbedring vedtas, må den presenteres slik at ikke-teknikere kan ta stilling til den. En teknisk rapport gjør det motsatte.',
      'Det som fungerer: en side med tre kolonner — hva som er funnet, hva som skjer hvis det ikke rettes, og hva det koster. Sorter etter alvorlighet, ikke etter rom.',
      'Ta med hva som allerede er lukket. Et årsmøte som får se at styret har ryddet tolv avvik og ber om penger til tre, reagerer annerledes enn et som bare ser regningen.'
    ]],
    ['Hva som skjer hvis avvikene ikke lukkes', [
      'Ved ordinær elkontroll er det ingen umiddelbar sanksjon. Konsekvensen kommer senere, og på tre måter.',
      '<strong>Ved skade:</strong> forsikringsselskapet spør om dokumentasjon. En rapport med åpne avvik viser at laget kjente til feilen og ikke gjorde noe. Det er dårligere enn ingen rapport.',
      '<strong>Ved tilsyn:</strong> Det lokale eltilsyn kan gi pålegg med frist, og i alvorlige tilfeller varsle tvangsmulkt.',
      '<strong>Ved neste kontroll:</strong> de samme avvikene står der, ofte forverret, og utbedringen er blitt dyrere.'
    ]],
    ['Personlig ansvar for styremedlemmer', [
      'Spørsmålet kommer alltid: kan et styremedlem holdes personlig ansvarlig?',
      'Terskelen er høy, og et styre som har fulgt en plan, dokumentert oppfølging og handlet innenfor lagets økonomiske rammer, er i praksis trygt. Det som eksponerer, er å ha kjent til et alvorlig avvik over tid uten å gjøre noe og uten å informere årsmøtet.',
      'Det praktiske svaret er derfor enkelt: dokumenter hva dere gjør. Et styre som kan vise at avviket ble funnet, prioritert, budsjettert og meldt til årsmøtet, har oppfylt sin plikt selv om utbedringen ikke er ferdig.'
    ], true]
  ],
  faq: [
    ['Må alle avvik utbedres med én gang?', 'Nei. Kritiske avvik skal tas straks. Resten legges inn i vedlikeholdsbudsjettet med frist og ansvarlig. Be om at rapporten er prioritert — en avviksliste uten prioritering er ubrukelig for styret.'],
    ['Hvem kan lukke et avvik?', 'Registrert installatør. Vaktmester, en beboer som er elektriker privat, eller et styremedlem kan ikke lukke et avvik på en måte som holder. Etter utbedring skal det foreligge samsvarserklæring.'],
    ['Kan kontrollforetaket utbedre selv?', 'Vi gjør det ikke, og mener det er et poeng. Den som vurderer bør ikke tjene på funnene. Rapporten peker på hva som må gjøres, så henter dere inn en elektriker dere selv velger.'],
    ['Hva dokumenterer at avviket er lukket?', 'Samsvarserklæring fra installatøren, ikke fakturaen. Før en logg med avvik, dato funnet, hvem som utbedret og dato lukket.'],
    ['Hva om vi ikke har råd akkurat nå?', 'Da dokumenterer dere at avviket er kjent, prioritert og lagt inn i vedlikeholdsplanen med frist, og informerer årsmøtet. Et styre som kan vise det, har handlet forsvarlig selv om arbeidet ikke er ferdig.']
  ]
},

'elkontroll-sameie-eller-borettslag': {
  ekstra: [
    ['Forretningsfører — en forskjell i praksis', [
      'De fleste borettslag har forretningsfører. Mange mindre sameier har det ikke.',
      'Det påvirker ikke plikten, men det påvirker hvem som husker den. Et lag med forretningsfører får ofte en påminnelse når en frist nærmer seg. Et sameie uten må holde styr på det selv, i et styre som byttes.',
      'For sameier uten forretningsfører er derfor en løpende avtale med fast intervall enda mer verdt — den erstatter hukommelsen ingen har ansvaret for.'
    ]],
    ['Dokumentasjonen er lik, arkivet er ulikt', [
      'Kontrollrapporten ser lik ut uansett eierform. Det som skiller er hvor den havner.',
      'I borettslag med forretningsfører ligger dokumentasjonen ofte i et system som overlever styreskifte. I sameier havner den oftere hos den enkelte styrelederen — og forsvinner med vedkommende.',
      'Uavhengig av eierform: be om at dokumentasjonen lagres på laget og er tilgjengelig for hele styret, ikke sendt som vedlegg til én e-postadresse.'
    ]],
    ['Blandede bygg', [
      'Mange bygg har næringslokaler i første etasje og boliger over. Da blir bildet mer sammensatt, uansett eierform.',
      'Næringsdelen kan ha en høyere kontrollklasse etter FG-1400 enn boligdelen, og leietakeren har egne plikter for internkontroll knyttet til sin virksomhet. Grensen mellom byggets anlegg og leietakerens utstyr må være avklart.',
      'For styret betyr det at kontrollen må omfatte begge deler, og at ansvarsfordelingen mot leietaker bør stå skriftlig.'
    ]]
  ],
  faq: [
    ['Er kravene til elkontroll ulike for sameie og borettslag?', 'Nei, ikke på elsiden. Begge er virksomhet etter internkontrollforskriften og har samme plikt til å holde fellesanlegget forsvarlig og kunne dokumentere det. Kontrollen utføres etter samme standard.'],
    ['Hva er da forskjellen?', 'Eierforholdet, hvordan beslutninger fattes og hvordan tiltak finansieres. Et borettslag kan normalt ta opp felleslån; et sameie må oftere kreve inn direkte. Det hever terskelen for å vedta større utbedringer.'],
    ['Gjelder plikten for små sameier også?', 'Ja. Plikten følger av at det finnes et fellesanlegg, ikke av hvor mange seksjoner det er. Små sameier uten styre i praksis bør avtale fast intervall én gang, så det går av seg selv.'],
    ['Hvem eier fellesanlegget i et sameie?', 'Seksjonseierne i fellesskap. Grensen mellom seksjon og fellesareal er definert i seksjoneringsbegjæringen, og i eldre bygg er den ikke alltid åpenbar i praksis.'],
    ['Kan vi bruke samme leverandør uansett eierform?', 'Ja. Kontrollen er den samme. Det som varierer er hvordan styret organiserer oppfølgingen etterpå.']
  ]
}

};
