// Stedsspesifikt innhold til de fem nye lokalsidene utenfor Østfold.
//
// Merk: avstanden fra Halden er 119–134 km, altså halvannen til to timer. Ingen
// av disse sidene lover rask utrykning, og ingen gjentar løftet om «ingen
// kjøretillegg», som gjelder Østfold. Se BESLUTNINGER.md punkt 3.

module.exports = {

// ─────────────────────────────────────────────────────────────── Drammen ────
drammen: {
  metaTittel: 'Elkontroll Drammen — NEK 405-sertifisert | Elkontrollen',
  metaBeskrivelse: 'Elkontroll i Drammen etter NEK 405, termografering inkludert. Vi dekker Bragernes, Strømsø, Konnerud, Åssiden, Mjøndalen og Svelvik.',
  h1Hale: 'Bragernes, Strømsø, Konnerud og Mjøndalen.',
  lead: 'Drammen er den første kommunen vi tok inn utenfor Østfold. Sertifisert kontroll av det elektriske, termografering inkludert, og en rapport som holder overfor forsikring og eltilsyn.',

  omradeIngress: 'Vi tar oppdrag i hele Drammen kommune — på begge sider av elva, og ut mot Mjøndalen, Svelvik og Nesbygda.',
  omradeTekst: `Drammen er bygget langs Drammenselva, med <strong>Bragernes</strong> på nordsiden og <strong>Strømsø</strong> på sørsiden. De to var egne byer fram til 1811. Bebyggelsen strekker seg vest–øst langs elva og videre langs fjorden, og følger jernbane- og veikorridorene i stedet for å spre seg jevnt utover. Kommunen har rundt 110 000 innbyggere, og etter sammenslåingen omfatter den også Svelvik og Nedre Eiker med Mjøndalen.`,

  boligmasse: [
    `Drammen har <strong>49 116 boliger</strong>, og <strong>14 675 av dem — 30 prosent — er bygget før 1961</strong>. Ytterligere <strong>13 666, altså 28 prosent, er fra 1961 til 1980</strong>. Det betyr at godt over halvparten av boligmassen har et elektrisk anlegg som ble prosjektert før dagens forbruksmønster fantes.`,

    `Byen var en trelastby. Den økonomiske toppen kom rundt 1900 til 1920, og de fleste trelastbedriftene la ned utover 1970-tallet. Det har satt spor i bygningsmassen på to måter: en betydelig eldre bebyggelse fra industritiden — <strong>2 877 boliger er fra 1900 eller tidligere</strong> — og store boligområder fra etterkrigstiden, bygget for en arbeidsstokk som ikke lenger finnes i samme form.`,

    `Byggeperioden 1961–1980 har et gjenkjennelig elektrisk signalement uansett hvor i landet den står. Skrusikringer var standard til rundt 1970. Jordfeilbryter på stikkontaktkurser ble ikke et krav før NEK 400:1998 trådte i kraft i 1999. Og kurstallet ble lagt for en husholdning uten induksjonstopp, varmepumpe, varmekabler på bad eller elbil i garasjen. Anlegg fra denne perioden er i dag 45–65 år gamle og har som regel fått påkoblet langt mer enn de var tenkt for.`,

    `Kommunen har i tillegg <strong>1 474 fritidsbygg</strong>, de fleste i den tidligere Svelvik-delen mot fjorden. Kystnære hytter har sine egne utfordringer, særlig der anlegget er utvidet gradvis fra enkel belysning til kjøkken, varmtvann og varmepumpe.`
  ],

  funnIngress: 'Det vi typisk finner i Drammen',
  funn: [
    { tekst: `I den eldre bebyggelsen fra industritiden møter vi anlegg som er bygget ut i flere omganger over lang tid. Et nytt sikringsskap sier ikke nødvendigvis noe om hva som ligger bak det — gamle kurser i rør, skjøter i uinspiserbare hulrom og manglende jording i deler av boligen er ting vi ser jevnlig i denne typen bygg.`, usikker: true },
    { tekst: `I boligfeltene fra 1960- og 70-tallet er de vanligste funnene knyttet til varmgang: løse koblinger i sikringsskap og koblingsbokser, overbelastede kurser, og skrusikringssokler med høy overgangsmotstand. Det er nettopp dette termografering avdekker.`, usikker: true },
    { tekst: `I blokkbebyggelsen er det ofte hovedfordelingen som setter grensen når laget vil ha ladeanlegg. Stigeledningene ble dimensjonert for et forbruk ingen forutså.`, usikker: true }
  ],

  faq: [
    ['Hva koster elkontroll i Drammen?', 'Elkontroll av bolig koster 5 000 kr som fastpris, med termografering inkludert. For borettslag, landbruk og næringsbygg gir vi tilbud, siden omfanget avhenger av bygget. Ta kontakt for en avklaring.'],
    ['Dere holder til i Halden — hvordan fungerer det?', 'Drammen ligger rundt 133 km fra Halden. Vi planlegger oppdrag i Drammensområdet samlet, og avtaler tidspunkt når vi setter opp ruten. Si fra om naboen eller borettslaget også vurderer kontroll — flere oppdrag på samme dag gir raskere tid for alle.'],
    ['Dekker dere hele kommunen?', 'Ja. Bragernes, Strømsø, Konnerud, Åssiden, Gulskogen, Skoger, og ut til Mjøndalen, Svelvik, Berger og Nesbygda.'],
    ['Kan rapporten brukes mot forsikringen?', 'Ja. Kontrollen utføres av NEK 405-sertifisert kontrollør i et NEK 405-4-sertifisert foretak, og rapporten er merket med standarden. Se siden om forsikringsrabatt for hva som kreves.'],
    ['Hvor lang tid tar kontrollen?', 'De fleste boligkontroller tar rundt 1,5–2 timer, avhengig av boligens størrelse og alder på anlegget. Borettslag og næringsbygg avhenger av antall fordelinger.']
  ]
},

// ──────────────────────────────────────────────────────────── Lillestrøm ────
lillestrom: {
  metaTittel: 'Elkontroll Lillestrøm — NEK 405-sertifisert | Elkontrollen',
  metaBeskrivelse: 'Elkontroll i Lillestrøm etter NEK 405, termografering inkludert. Vi dekker Lillestrøm, Strømmen, Skedsmokorset, Kjeller, Fetsund og Sørumsand.',
  h1Hale: 'Lillestrøm, Strømmen, Fetsund og Sørumsand.',
  lead: 'Lillestrøm kommune ble til i 2020 av Skedsmo, Fet og Sørum, og er landets niende største. Sertifisert kontroll av det elektriske, termografering inkludert, rapport samme dag.',

  omradeIngress: 'Vi dekker hele Lillestrøm kommune slik den ser ut etter sammenslåingen av Skedsmo, Fet og Sørum i 2020.',
  omradeTekst: `Omtrent 95 prosent av innbyggerne bor i den sammenhengende bebyggelsen østover fra Oslo. Tyngdepunktet ligger rundt <strong>Lillestrøm</strong>, <strong>Strømmen</strong>, <strong>Skedsmokorset</strong> og <strong>Kjeller</strong>, mens <strong>Fetsund</strong> med 9 808 innbyggere og <strong>Sørumsand</strong> med 6 075 utgjør egne tettsteder lenger øst. Kommunen har rundt 97 000 innbyggere.`,

  boligmasse: [
    `Lillestrøm har <strong>41 363 boliger</strong>, og boligmassen er markert yngre enn i Østfold-byene. <strong>Bare 7 149 — 17 prosent — er bygget før 1961</strong>, og <strong>960, altså 2 prosent, er fra 1900 eller tidligere</strong>. Til sammenligning har Halden 36 prosent fra før 1961.`,

    `Det betyr at hovedutfordringen her sjelden er hundre år gamle føringsveier. <strong>9 242 boliger — 22 prosent — er fra 1961 til 1980</strong>, og det er denne gruppen som krever mest oppmerksomhet: anlegg som i dag er 45–65 år gamle, prosjektert før jordfeilbryter ble påbudt på stikkontaktkurser i 1999, og med et kurstall lagt for en husholdning uten varmepumpe, induksjonstopp eller elbil.`,

    `Resten av boligmassen er bygget etter 1980, og en betydelig del etter 2000. Nye anlegg har sine egne problemstillinger — ikke slitasje, men utførelse. Løse klemmer i en fordeling som aldri har vært etterkontrollert, manglende samsvarserklæringer og kursfortegnelser som ikke er oppdatert etter endringer. Reklamasjonsfristen på fem år løper fra overtakelse, ikke fra når feilen oppdages.`,

    `Næringslivet i kommunen er sammensatt — grafisk industri, verkstedindustri og kjemisk industri, i tillegg til forskningsmiljøet på Kjeller og Norges Varemesse. For næringsbygg gjelder NEK 405-3 og forsikringsbransjens FG-1400, med kontrollklasse etter bygningstype og risiko.`
  ],

  funnIngress: 'Det vi typisk finner i Lillestrøm',
  funn: [
    { tekst: `I boligmassen fra 60- og 70-tallet er de gjengående funnene overbelastede kurser og løse koblinger. Typisk er at kjøkkenet er pusset opp med nytt utstyr, men på samme kurs som før, og at varmekabler og varmepumpe er lagt inn i et skap som ikke har fått flere kurser.`, usikker: true },
    { tekst: `I nyere bebyggelse er det oftere dokumentasjonen som mangler enn anlegget som svikter. Samsvarserklæringer som aldri ble overlevert, og ladeanlegg montert av en leverandør boligeieren eller laget fant selv — uten at papirene fulgte med.`, usikker: true },
    { tekst: `I de østlige delene mot Fetsund og Sørumsand er innslaget av eneboliger og spredt bebyggelse større, med lengre kurser ut til uthus, garasje og brygge.`, usikker: true }
  ],

  faq: [
    ['Hva koster elkontroll i Lillestrøm?', 'Elkontroll av bolig koster 5 000 kr som fastpris, med termografering inkludert. Borettslag, landbruk og næringsbygg får tilbud, siden omfanget avhenger av bygget.'],
    ['Dere holder til i Halden — hvordan fungerer det?', 'Lillestrøm ligger rundt 134 km fra Halden. Vi planlegger oppdrag i området samlet og avtaler tidspunkt når ruten settes opp. Flere oppdrag på samme dag gir raskere tid for alle.'],
    ['Dekker dere hele kommunen?', 'Ja. Lillestrøm, Strømmen, Skedsmokorset, Kjeller, Fetsund, Sørumsand, Frogner og Lundermoen.'],
    ['Vi er et borettslag — hva gjelder for oss?', 'Borettslag og sameier følger de samme kravene som næringsbygg for det elektriske. Fellesanlegget kontrolleres etter NEK 405-3, og styret er ansvarlig. Se Trygt Borettslag for en samlet årsavtale.'],
    ['Er termografering inkludert?', 'Ja, i alle våre kontroller, uten tilleggspris. I markedet kommer det ofte som et tillegg på rundt 2 500 kr.']
  ]
},

// ────────────────────────────────────────────────────────────────── Oslo ────
oslo: {
  metaTittel: 'Elkontroll Oslo — NEK 405-sertifisert | Elkontrollen',
  metaBeskrivelse: 'Elkontroll i Oslo etter NEK 405, termografering inkludert. Murgårder, drabantbyer og nyere bebyggelse krever hver sin tilnærming.',
  h1Hale: 'Murgårder, drabantbyer og nybygg.',
  lead: 'Oslo har landets eldste og mest sammensatte boligmasse. Sertifisert kontroll av det elektriske, termografering inkludert, og en rapport som holder overfor forsikring, eltilsyn og styre.',

  omradeIngress: 'Vi tar oppdrag i hele Oslo — i indre by, i drabantbyene og i den nyere bebyggelsen langs sjøen.',
  omradeTekst: `Oslo er delt i 15 bydeler, fra <strong>Gamle Oslo</strong>, <strong>Grünerløkka</strong>, <strong>Sagene</strong> og <strong>St. Hanshaugen</strong> i indre by, via <strong>Frogner</strong>, <strong>Ullern</strong> og <strong>Vestre Aker</strong> i vest, til <strong>Grorud</strong>, <strong>Stovner</strong>, <strong>Alna</strong> og <strong>Søndre Nordstrand</strong> i ytre øst og sør. Den bebygde delen utgjør omtrent en tredjedel av kommunens areal — resten er marka. Byen passerte 700 000 innbyggere i 2020.`,

  boligmasse: [
    `Oslo har <strong>357 673 boliger</strong>. Det er mer enn dobbelt så mange som i hele Østfold, og sammensetningen er en annen: <strong>151 451 boliger — 42 prosent — er bygget før 1961</strong>, og <strong>38 956, altså 11 prosent, er fra 1900 eller tidligere</strong>. Det er nesten fire ganger så mange hundreårsgamle boliger som i hele Østfold til sammen.`,

    `Murgårdsbebyggelsen fra 1890-tallet er en egen kategori som knapt finnes andre steder i landet i dette omfanget. Gårdene på Grünerløkka, Sagene, Gamle Oslo og i deler av Frogner har hatt elektrisk anlegg i over hundre år, og har vært gjennom flere generasjoner installasjon: først enkel belysning, så stikkontakter, så kjøkken og bad, og til slutt varmekabler, varmepumper og ladeanlegg. Hvert lag er lagt oppå det forrige, og gamle føringsveier er ofte fortsatt i bruk bak nye skap. Mange av gårdene er dessuten bevaringsverdige, noe som begrenser hva som kan gjøres synlig.`,

    `Den andre store gruppen er <strong>drabantbyene</strong>: <strong>70 987 boliger — 20 prosent — er fra 1961 til 1980</strong>, i Groruddalen, rundt Østensjøvannet, på Tveita og i de ytre bydelene. Her er anleggene 45–65 år gamle, prosjektert før jordfeilbryter ble påbudt på stikkontaktkurser i 1999, og det er i denne bebyggelsen behovet for ladeanlegg treffer hardest — fordi stigeledningene ble dimensjonert for et helt annet forbruk.`,

    `Den tredje gruppen er den nye bebyggelsen: byfornyelsen fra slutten av 1980-tallet, omgjøringen av industriområder til bolig, og utbyggingen i Bjørvika og langs sjøen etter 2000. Der handler kontrollen sjeldnere om slitasje og oftere om utførelse og dokumentasjon — særlig mens reklamasjonsfristen på fem år fortsatt løper.`
  ],

  funnIngress: 'Det vi typisk finner i Oslo',
  funn: [
    { tekst: `I murgårdene er det lagene som er utfordringen. Vi finner kurser fra ulike tiår i samme boks, skjøter i hulrom som ikke lar seg inspisere, og deler av leiligheten uten jording — gjerne akkurat der det i dag står utstyr som burde hatt den.`, usikker: true },
    { tekst: `I drabantbyene er varmgang i hovedfordelinger det vanligste. Anleggene har gått i femti–seksti år, klemmer har løsnet med temperatursykluser, og det er ikke synlig før man setter varmekamera på det under last.`, usikker: true },
    { tekst: `I den nyere bebyggelsen er det dokumentasjonen som mangler oftere enn anlegget svikter: samsvarserklæringer som ikke ble overlevert, kursfortegnelser som ikke er oppdatert, og ladeanlegg uten papirer.`, usikker: true }
  ],

  faq: [
    ['Hva koster elkontroll i Oslo?', 'Elkontroll av bolig koster 5 000 kr som fastpris, med termografering inkludert. Borettslag, sameier og næringsbygg får tilbud, siden omfanget avhenger av antall fordelinger og bygg.'],
    ['Dere holder til i Halden — hvorfor skal vi bruke dere?', 'Fordi vi er et uavhengig kontrollforetak som ikke selger utbedringen. Vi finner og dokumenterer; dere henter inn en elektriker dere selv velger. Oslo ligger rundt 119 km fra Halden, og vi planlegger oppdrag i området samlet.'],
    ['Vi bor i en gammel murgård — er en elkontroll et inngrep?', 'Nei. Kontrollen er en tilstandsvurdering. Vi åpner sikringsskap og koblingspunkter, måler og termograferer, men river ingenting. Rapporten beskriver hva som bør utbedres, og tar hensyn til at bygget kan være bevaringsverdig.'],
    ['Vi er et sameie som vurderer ladeanlegg — hva bør vi gjøre først?', 'Kontroller fellesanlegget før dere kontakter en ladeleverandør. Det er stigeledningen og hovedfordelingen som avgjør hva som er mulig, og den avklaringen bør ligge til grunn for anbudet — ikke komme som en overraskelse etterpå.'],
    ['Dekker dere alle bydeler?', 'Ja, hele kommunen. Ta kontakt, så avtaler vi tidspunkt når vi setter opp ruten i Oslo-området.']
  ]
},

// ───────────────────────────────────────────────────────────────── Bærum ────
baerum: {
  metaTittel: 'Elkontroll Bærum — NEK 405-sertifisert | Elkontrollen',
  metaBeskrivelse: 'Elkontroll i Bærum etter NEK 405, termografering inkludert. Vi dekker Sandvika, Bekkestua, Stabekk, Høvik, Lysaker, Rykkinn og Fornebu.',
  h1Hale: 'Sandvika, Bekkestua, Høvik og Fornebu.',
  lead: 'Bærum er Akershus’ mest folkerike kommune, med en villabebyggelse som i stor grad ble reist i én periode. Sertifisert kontroll av det elektriske, termografering inkludert.',

  omradeIngress: 'Vi tar oppdrag i hele Bærum — i båndet langs Drammensbanen og forstadsbanene, der over 90 prosent av innbyggerne bor.',
  omradeTekst: `Bebyggelsen i Bærum følger jernbanen i stedet for å spre seg jevnt utover: et bredt bånd fra <strong>Lysaker</strong> og <strong>Stabekk</strong> i øst, via <strong>Høvik</strong>, <strong>Bekkestua</strong> og <strong>Haslum</strong>, til <strong>Sandvika</strong>, <strong>Kolsås</strong>, <strong>Rykkinn</strong> og <strong>Østerås</strong>. <strong>Fornebu</strong> er bygget ut fra 1998, og <strong>Lommedalen</strong> er den siste større utvidelsen. Kommunen har rundt 133 000 innbyggere og den høyeste befolkningstettheten i Akershus.`,

  boligmasse: [
    `Bærum har <strong>55 460 boliger</strong>, og fordelingen forteller en tydelig historie: <strong>16 002 — 29 prosent — er bygget mellom 1961 og 1980</strong>. Det er den høyeste andelen fra denne perioden blant kommunene vi dekker.`,

    `Tallet henger sammen med veksten. Bærum hadde 55 425 innbyggere i 1960 og har rundt 133 000 i dag — folketallet mer enn doblet seg mellom 1960 og 2010. Store deler av villabebyggelsen og blokkene ble reist i løpet av to tiår, og det betyr at en usedvanlig stor del av boligmassen i kommunen har anlegg av samme alder og samme type.`,

    `Det er en praktisk konsekvens av dette som er verdt å merke seg: <strong>disse anleggene når slutten av sin tekniske levetid omtrent samtidig</strong>. Skrusikringer var standard til rundt 1970. Jordfeilbryter på stikkontaktkurser ble ikke et krav før NEK 400:1998 trådte i kraft i 1999. Varmekabler på bad fra 70- og 80-tallet nærmer seg eller har passert teknisk levetid. Og kurstallet ble lagt for en husholdning uten varmepumpe, induksjonstopp og elbil — i en kommune der elbilandelen er blant landets høyeste.`,

    `<strong>13 407 boliger — 24 prosent — er fra før 1961</strong>, mye av det villabebyggelse fra mellomkrigstiden og etterkrigsårene langs banene. Bare 1 393 er fra 1900 eller tidligere. Den nyeste delen, Fornebu, er bygget etter 1998 og har helt andre problemstillinger: utførelse og dokumentasjon framfor slitasje.`
  ],

  funnIngress: 'Det vi typisk finner i Bærum',
  funn: [
    { tekst: `I villabebyggelsen fra 60- og 70-tallet er det kombinasjonen av alder og påkoblet last som gir funnene. Kjøkken er pusset opp, varmepumpe og varmekabler er lagt inn, og ofte er det montert elbillader — alt på et anlegg som ikke er dimensjonert opp underveis.`, usikker: true },
    { tekst: `Varmekabler på bad fra 70- og 80-tallet er en gjenganger. De har ingen evig levetid, og en isolasjonsmåling avslører tilstanden lenge før feilen blir synlig.`, usikker: true },
    { tekst: `I blokk- og rekkehusbebyggelsen er hovedfordelingen ofte begrensningen når laget vil etablere ladeanlegg for flere plasser samtidig.`, usikker: true }
  ],

  faq: [
    ['Hva koster elkontroll i Bærum?', 'Elkontroll av bolig koster 5 000 kr som fastpris, med termografering inkludert. Borettslag, sameier og næringsbygg får tilbud etter omfang.'],
    ['Dere holder til i Halden — hvordan fungerer det?', 'Bærum ligger rundt 133 km fra Halden. Vi planlegger oppdrag i Oslo-området samlet og avtaler tidspunkt når ruten settes opp.'],
    ['Vi skal montere elbillader — bør vi kontrollere først?', 'Ja. En lader krever egen kurs og riktig jordfeilvern, og på et anlegg fra 60- eller 70-tallet er det ofte hovedfordelingen som setter grensen. Den avklaringen bør komme før leverandøren, ikke etter.'],
    ['Dekker dere hele kommunen?', 'Ja. Sandvika, Bekkestua, Stabekk, Høvik, Lysaker, Haslum, Kolsås, Rykkinn, Østerås, Lommedalen og Fornebu.'],
    ['Hvor lang tid tar kontrollen?', 'De fleste boligkontroller tar rundt 1,5–2 timer, avhengig av boligens størrelse og alder på anlegget.']
  ]
},

// ───────────────────────────────────────────────────────────────── Asker ────
asker: {
  metaTittel: 'Elkontroll Asker — NEK 405-sertifisert | Elkontrollen',
  metaBeskrivelse: 'Elkontroll i Asker etter NEK 405, termografering inkludert. Vi dekker Asker sentrum, Heggedal, Holmen, Slemmestad, Røyken, Sætre og Tofte.',
  h1Hale: 'Asker, Heggedal, Slemmestad og Hurum.',
  lead: 'Asker ble slått sammen med Røyken og Hurum i 2020, og strekker seg fra forstad i nord til kystbebyggelse i sør. Sertifisert kontroll av det elektriske, termografering inkludert.',

  omradeIngress: 'Vi tar oppdrag i hele Asker kommune slik den ser ut etter sammenslåingen med Røyken og Hurum i 2020.',
  omradeTekst: `Kommunen har to ganske ulike halvdeler. I nord glir bebyggelsen sammen med Oslo-området langs Drammensbanen, med <strong>Asker sentrum</strong>, <strong>Heggedal</strong> og <strong>Holmen</strong>. I sør ligger Hurumlandet med <strong>Slemmestad</strong>, <strong>Nærsnes</strong>, <strong>Sætre</strong> med 6 270 innbyggere, <strong>Tofte</strong> med 3 157 og <strong>Holmsbu</strong> — kystbebyggelse med egne tettsteder. 94 prosent av innbyggerne bor i tettsted, og kommunen har rundt 101 500 innbyggere.`,

  boligmasse: [
    `Asker har <strong>42 220 boliger</strong> og <strong>4 007 fritidsbygg</strong>. Det siste tallet er det som skiller kommunen fra de andre i Oslo-området: nesten like mange hytter som Hvaler, og fem ganger så mange som Bærum. Kystlinjen på Hurum-siden er fritidsbebyggelse, ikke forstad.`,

    `Boligmassen er relativt ung. <strong>6 634 boliger — 16 prosent — er bygget før 1961</strong>, den laveste andelen blant kommunene vi dekker. <strong>10 646 — 25 prosent — er fra 1961 til 1980</strong>, og resten er nyere. Etter 1945 ble den nordlige delen av kommunen bygget ut som forstad til Oslo.`,

    `For fritidsboligene gjelder andre forhold enn for helårsboliger. Mange hytter er bygget ut stykkevis over flere tiår: fra enkel belysning til kjøkken, varmtvannsbereder, varmekabler og etter hvert varmepumpe. Hvert trinn er ofte lagt til uten at hovedfordelingen er vurdert på nytt. Legg til at anlegget står ubrukt store deler av året — fukt får tid til å arbeide, og feil får stå uoppdaget til neste sesong. Kystklima gir i tillegg korrosjon i utvendige koblinger, uttak på brygge og i naust.`,

    `Næringslivet i nord er preget av elektroteknisk industri og teknologibedrifter. Kommunen har dessuten en lang industrihistorie på Hurum-siden — glassverk fra 1782, sprengstoffproduksjon fra 1875, sement fra 1893 og cellulosefabrikker fra 1897 og 1907. Deler av den bygningsmassen er omgjort til annen bruk, og eldre industribygg har egne problemstillinger i det elektriske.`
  ],

  funnIngress: 'Det vi typisk finner i Asker',
  funn: [
    { tekst: `På hytter og fritidsboliger langs kysten ser vi korrosjon i utvendige koblinger og uttak, og anlegg som er utvidet stykkevis over mange år uten en samlet vurdering av kapasitet og vern.`, usikker: true },
    { tekst: `I villabebyggelsen i nord er funnene de samme som ellers i Oslo-området: kurser som går tett opp mot merkestrøm, manglende jordfeilvern på eldre kurser, og varmekabler fra 70- og 80-tallet som nærmer seg teknisk levetid.`, usikker: true },
    { tekst: `I bygg som er omgjort fra industri til annen bruk, er anlegget ofte lagt for en helt annen virksomhet enn den som drives der i dag. Da stemmer verken kurstall, vern eller dokumentasjon med faktisk bruk.`, usikker: true }
  ],

  faq: [
    ['Kontrollerer dere hytter og fritidsboliger?', 'Ja. Elkontroll av fritidsbolig følger samme metodikk som for bolig, etter NEK 405-2, med termografering inkludert. Asker har over 4 000 fritidsbygg, de fleste på Hurum-siden.'],
    ['Hva koster elkontroll i Asker?', 'Elkontroll av bolig eller fritidsbolig koster 5 000 kr som fastpris, med termografering inkludert. Borettslag, sameier og næringsbygg får tilbud etter omfang.'],
    ['Dere holder til i Halden — hvordan fungerer det?', 'Asker ligger rundt 130 km fra Halden. Vi planlegger oppdrag i Oslo-området samlet og avtaler tidspunkt når ruten settes opp.'],
    ['Må jeg være til stede under kontrollen av hytta?', 'Kontrolløren trenger tilgang til hele bygget, inkludert sikringsskap, loft og kjeller. Vi avtaler adkomst på forhånd — det lar seg som regel løse selv om du ikke bor i nærheten.'],
    ['Dekker dere hele kommunen?', 'Ja. Asker sentrum, Heggedal, Holmen, Vollen, Slemmestad, Røyken, Nærsnes, Sætre, Tofte og Holmsbu.']
  ]
}

};
