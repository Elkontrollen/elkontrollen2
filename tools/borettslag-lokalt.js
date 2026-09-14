// Fase D — innhold til de lokale borettslagssidene.
//
// Tallene er hentet, ikke gjettet:
//   Antall borettslag og eierseksjonssameier: Brønnøysundregistrene,
//     Enhetsregisteret, organisasjonsform BRL og ESEK per kommunenummer.
//   Blokkleiligheter fordelt på byggeår: SSB tabell 06266, bygningstype
//     Boligblokk, 2026.
//
// Påstander om hva vi typisk finner er merket usikker og havner i FAKTASJEKK.md.

module.exports = [

{
  slug: 'fredrikstad', navn: 'Fredrikstad', iNavn: 'Fredrikstad',
  brl: 214, esek: 499, blokk: 8198, km: 36, minTekst: 'rundt 40 minutter',
  omrader: ['Gamlebyen', 'Cicignon', 'Trara', 'Holmen', 'Kråkerøy', 'Gressvik', 'Sellebakk', 'Rolvsøy', 'Østsiden', 'Begby'],
  topp: '2 076 fra 2011–2020 og 1 451 fra 2021 eller senere',
  metaTittel: 'Elkontroll borettslag Fredrikstad | Elkontrollen',
  beskrivelse: 'Elkontroll av fellesanlegget for borettslag og sameier i Fredrikstad. 214 borettslag og 499 sameier i kommunen. Gratis kartlegging, fast årspris.',
  ingress: 'Fredrikstad har <strong>214 borettslag og 499 eierseksjonssameier</strong> registrert i Enhetsregisteret, og <strong>8 198 blokkleiligheter</strong>. Vi kjører fra Halden til Fredrikstad fast, og tar elkontroll av fellesanlegget, termografering, brannalarm, nødlys og ladeanlegg i én befaring.',
  bygningsmasse: [
    'Blokkbebyggelsen i Fredrikstad har to tyngdepunkter, og de stiller helt ulike krav til et styre.',
    'Det ene er <strong>etterkrigs- og syttitallsblokkene</strong>: 987 leiligheter fra 1961–1970 og 1 122 fra 1971–1980. Det er anlegg som i dag er 45–65 år gamle, prosjektert før jordfeilbryter ble påbudt på stikkontaktkurser i 1999, og med et kurstall dimensjonert for en husholdning uten induksjonstopp, varmepumpe og elbil. Her er det fellesanlegget som er den begrensende faktoren når laget vil ha ladeanlegg.',
    'Det andre er <strong>den nye bebyggelsen</strong>: 2 076 leiligheter fra 2011–2020 og 1 451 fra 2021 eller senere. Til sammen er over 40 prosent av blokkleilighetene i Fredrikstad bygget etter 2010. Nye lag tror ofte at et nytt anlegg er et kontrollert anlegg. Det er det ikke — og reklamasjonsfristen på fem år løper fra overtakelse, ikke fra når feilen oppdages.',
    'I tillegg har Fredrikstad <strong>238 blokkleiligheter fra 1900 eller tidligere</strong>, i bygårder i sentrum og på Cicignon. Der er anlegget lagt i lag over mer enn hundre år, og den vanligste utfordringen er å finne ut hva som faktisk ligger bak et nytt sikringsskap.'
  ],
  funn: [
    'I sytti- og åttitallslagene er det oftest hovedfordelingen som setter grensen. Laget vil ha ladeanlegg, og oppdager at stigeledningen ikke har kapasitet — noe som burde vært avklart før leverandøren ble kontaktet.',
    'I den nye bebyggelsen finner vi løse klemmer i fordelinger som aldri har vært etterkontrollert, og dokumentasjon som ikke ble overlevert ved ferdigstillelse. Begge deler er entreprenørens ansvar så lenge reklamasjonsfristen løper.',
    'I bygårdene i sentrum er det lagene med blandet bruk — næring i første etasje, boliger over — som krever mest. Der gjelder ofte en høyere kontrollklasse for næringsdelen enn for boligdelen.'
  ]
},

{
  slug: 'sarpsborg', navn: 'Sarpsborg', iNavn: 'Sarpsborg',
  brl: 226, esek: 200, blokk: 5364, km: 31, minTekst: 'rundt en halvtime',
  omrader: ['Sarpsborg sentrum', 'Greåker', 'Sandesund', 'Opsund', 'Alvim', 'Hafslundsøy', 'Borgenhaugen', 'Tune', 'Varteig', 'Skjeberg'],
  topp: '1 283 fra 1971–1980',
  metaTittel: 'Elkontroll borettslag Sarpsborg | Elkontrollen',
  beskrivelse: 'Elkontroll av fellesanlegget for borettslag og sameier i Sarpsborg. 226 borettslag i kommunen — flest i Østfold. Gratis kartlegging, fast årspris.',
  ingress: 'Sarpsborg har <strong>226 borettslag</strong> registrert i Enhetsregisteret — flere enn noen annen Østfold-kommune — og <strong>200 eierseksjonssameier</strong>. Byen ligger en halvtime fra basen vår i Halden, og vi tar elkontroll av fellesanlegget, termografering, brannalarm, nødlys og ladeanlegg i én befaring.',
  bygningsmasse: [
    'Sarpsborg skiller seg fra nabobyene på to måter som begge betyr noe for styret.',
    'For det første er <strong>borettslagsformen dominerende</strong>. 226 borettslag mot 200 sameier er et helt annet forhold enn i Fredrikstad, der det er 214 mot 499. Det gjenspeiler at Sarpsborg er en industriby der boligbyggelagene bygget mye på femti- og syttitallet, mens seksjonering av nyere bygg har kommet senere og i mindre omfang.',
    'For det andre ligger <strong>tyngdepunktet i blokkbebyggelsen på syttitallet</strong>: 1 283 av 5 364 blokkleiligheter er fra 1971–1980, og ytterligere 744 fra 1961–1970. Nesten 38 prosent av blokkbebyggelsen er altså fra de to tiårene.',
    'Det gir en gjenkjennelig situasjon: mange lag i samme aldersgruppe, med samme type anlegg, som nærmer seg samme problemstillinger samtidig. Ladeanlegg, oppgradering av hovedfordeling og utskifting av stigeledninger kommer som en bølge gjennom disse lagene de nærmeste årene.'
  ],
  funn: [
    'I syttitallslagene er det stigeledningene som oftest er den skjulte begrensningen. De ble dimensjonert for et forbruk ingen forutså, og et lag som vil ha lading på 30 plasser møter veggen der.',
    'Vi ser også at mange lag i denne aldersgruppen har fått nye sikringsskap i fellesarealene uten at kursene bak er skiftet. Et nytt skap sier ingenting om hva som ligger bak det.',
    'I lagene rundt Opsund og de gamle industriområdene er bygningsmassen sammensatt — arbeiderboliger som er seksjonert, påbygd og delt over tid. Der er anlegget utvidet i mange omganger, og oversikten over hva som hører til fellesanlegget er ofte den første jobben.'
  ]
},

{
  slug: 'halden', navn: 'Halden', iNavn: 'Halden',
  brl: 99, esek: 154, blokk: 2455, km: 0, minTekst: 'samme dag',
  omrader: ['Sørsiden', 'Nordsiden', 'Tistedalen', 'Isebakke', 'Sponvika', 'Solbakken', 'Sofienberg', 'Berg', 'Idd'],
  topp: '560 fra 1971–1980, men også 392 fra 1900 eller tidligere',
  metaTittel: 'Elkontroll borettslag Halden | Elkontrollen',
  beskrivelse: 'Elkontroll av fellesanlegget for borettslag og sameier i Halden. Vi holder til i Lorangløkka 1 og kan rykke ut på kort varsel. Gratis kartlegging.',
  ingress: 'Halden har <strong>99 borettslag og 154 eierseksjonssameier</strong> registrert i Enhetsregisteret, og <strong>2 455 blokkleiligheter</strong>. Vi holder til i Lorangløkka 1 — dette er hjemmebanen, og vi kjenner bygningsmassen på begge sider av Tista.',
  bygningsmasse: [
    'Halden har den minste blokkbebyggelsen av Østfold-byene, men også den eldste — og det er kombinasjonen som gjør den krevende.',
    '<strong>392 av 2 455 blokkleiligheter er fra 1900 eller tidligere.</strong> Det er 16 prosent, mot 3 prosent i Fredrikstad og Sarpsborg. Bygårdene på Sørsiden er den klart mest særegne bygningsmassen i fylket, med bevart empirebebyggelse og sjøboder fra rundt 1830.',
    'I slike bygg har det elektriske anlegget vært gjennom flere generasjoner: først enkel belysning, så stikkontakter, så kjøkken og bad, og til slutt varmekabler, varmepumper og ladeanlegg. Hvert lag er lagt oppå det forrige, og gamle føringsveier er ofte fortsatt i bruk bak nye skap.',
    'Er bygget i tillegg vernet, begrenser det hva som kan gjøres. Nye føringsveier må ofte legges skjult i eksisterende rør eller hulrom, og synlige inngrep er ikke uten videre tillatt. Det gjør planlegging viktigere enn andre steder — og det gjør at en kontroll bør gjøres før laget bestiller arbeid, ikke etter.',
    'Den andre gruppen er <strong>560 leiligheter fra 1971–1980</strong> og 256 fra 1961–1970, med de samme problemstillingene som i resten av fylket.'
  ],
  funn: [
    'I bygårdene på Sørsiden er det oversikten som mangler oftest. Hvilke kurser hører til fellesanlegget, hvilke til leilighetene, og hvor går de? For mange lag er kartleggingen den mest verdifulle delen av jobben, ikke selve kontrollen.',
    'Vi ser også at lag i vernet bebyggelse utsetter oppgraderinger fordi de tror det ikke lar seg gjøre. Det finnes som regel en løsning, men den må planlegges — og den blir dyrere hvis den hastes fram etter et pålegg.',
    'Fordi vi holder til i Halden, kan vi som regel rykke ut samme eller neste dag når noe haster — for eksempel når Det lokale eltilsyn har gitt et pålegg med kort frist.'
  ]
},

{
  slug: 'moss', navn: 'Moss', iNavn: 'Moss',
  brl: 141, esek: 289, blokk: 8549, km: 61, minTekst: 'under en time',
  omrader: ['Moss sentrum', 'Jeløy', 'Kambo', 'Melløs', 'Krapfoss', 'Halmstad', 'Rygge', 'Dilling', 'Larkollen'],
  topp: '1 725 fra 2011–2020 og 1 567 fra 1961–1970',
  metaTittel: 'Elkontroll borettslag Moss | Elkontrollen',
  beskrivelse: 'Elkontroll av fellesanlegget for borettslag og sameier i Moss og Rygge. 8 549 blokkleiligheter i kommunen. Gratis kartlegging, fast årspris.',
  ingress: 'Moss har <strong>141 borettslag og 289 eierseksjonssameier</strong> registrert i Enhetsregisteret, og <strong>8 549 blokkleiligheter</strong> — flest i Østfold. Vi dekker hele kommunen slik den ser ut etter sammenslåingen med Rygge i 2020.',
  bygningsmasse: [
    'Moss har den største blokkbebyggelsen i Østfold, og den er delt i to nesten like store grupper fra hver sin ende av tidslinjen.',
    'Den ene er <strong>sekstitallet</strong>: 1 567 leiligheter fra 1961–1970, den største enkeltperioden etter 2011. Befolkningen i Moss nær doblet seg i løpet av 65 år etter krigen, og mye av den veksten kom som blokker i én periode.',
    'Den andre er <strong>det siste tiåret</strong>: 1 725 leiligheter fra 2011–2020 og 1 287 fra 2021 eller senere. Moss har hatt en av de høyeste utbyggingstaktene i fylket, særlig rundt sentrum og mot sjøen.',
    'For et styre betyr det at nabolaget kan bestå av lag med femti års forskjell i anleggsalder, med helt ulike behov. Et sekstitallslag står foran oppgradering av hovedfordeling og stigeledninger. Et lag fra 2019 står foran utløp av reklamasjonsfristen — og bør bruke den før den går ut.',
    'I Rygge-delen av kommunen er innslaget av småhus og spredt bebyggelse større, og sameiene er gjennomgående mindre.'
  ],
  funn: [
    'I sekstitallsblokkene er varmgang i hovedfordelinger det vanligste funnet. Anleggene har gått i seksti år, klemmer har løsnet med temperatursykluser, og det er ikke synlig før man setter varmekamera på det under last.',
    'I den nye bebyggelsen er det dokumentasjonen som mangler oftere enn anlegget svikter. Samsvarserklæringer som aldri ble overlevert, kursfortegnelser som ikke er oppdatert etter endringer, og ladeanlegg montert av en leverandør laget fant selv — uten at papirene fulgte med.',
    'På Jeløy ser vi en del lag med bygg fra ulike tiår i samme sameie, der fellesanlegget er koblet sammen over tid uten en samlet gjennomgang.'
  ]
}

];
