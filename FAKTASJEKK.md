# FAKTASJEKK.md

Alt på denne lista må bekreftes eller rettes av noen som faktisk kjenner Elkontrollens
virksomhet og områdene vi dekker. Ingenting her er feil så langt vi vet — men det er
skrevet uten lokalkunnskap, og det bør ikke stå på en publisert side uten at en
fagperson har sett på det.

**Slik bruker du lista:** gå gjennom punkt for punkt. Når et punkt er bekreftet, fjern
kommentaren `<!-- TRENGER LOKALKUNNSKAP -->` rett over avsnittet i HTML-filen. Skal
teksten endres, rett den i `tools/innhold-steder.js` og kjør `node tools/bygg-lokalsider.js`
på nytt — **ikke i HTML-filen direkte**, ellers blir endringen overskrevet neste gang
sidene genereres.

Sist oppdatert: 2026-09-14 (etter fase 4)

---

## 0. HASTER — placeholder-tekst ligger ute i produksjon

`Fra xxx kr/år` står som synlig tekst på to publiserte sider, seks steder til sammen:

| Fil | Antall | Hvor |
|---|---|---|
| `borettslag/index.html` | 3 | Priskortene for Basis, Trygg og Komplett |
| `borettslag/pris/index.html` | 3 | Tabellen «Fra-priser etter lagstørrelse», ni celler med samme tekst |

Verifisert live på <https://elkontrollen.no/borettslag/pris/> 2026-09-14.

Dette er ikke rettet i revisjonen, fordi det å velge hva som skal stå der er en
prisbeslutning, ikke en skrivefeil. Men det er den enkeltfeilen på hele siden som
koster mest: `/borettslag/pris` er konverteringssiden for hele Trygt Borettslag-produktet,
og en styreleder som leter etter en pris møter bokstavene «xxx».

- [ ] **Fyll inn fra-prisene, eller erstatt tabellen med en formulering som ikke lover et tall** — for eksempel «Pris settes etter kartleggingen». Begge deler er bedre enn det som står nå.

Merk at `/priser` (ny i fase 3) lenker til `/borettslag/pris`, men gjentar ikke
plassholderen — der står det «Årsavtale, etter antall enheter, tavler og ladepunkter».

---

## Hva som IKKE trenger faktasjekk

For å være tydelig på hvor grensen går: disse opplysningene er hentet fra offentlig
statistikk og oppslagsverk, og er etterprøvbare. De trenger ingen bekreftelse.

| Opplysning | Kilde |
|---|---|
| Antall boliger per kommune, fordelt på byggeår | SSB tabell 06266, 2026 |
| Antall fritidsbygg per kommune | SSB tabell 03174, 2026 |
| Antall jordbruksbedrifter per kommune | SSB tabell 08646, 2025 |
| Tettsteder, innbyggertall og bosetningsmønster | Store norske leksikon, kommuneartikler |
| Industrihistorie (Borregaard, Hafslund, Peterson, verftene i Fredrikstad) | Store norske leksikon |
| Gamlebyen som Nord-Europas best bevarte festningsby | Store norske leksikon |
| Opsund som kulturmiljø av nasjonal interesse; Grina-villaene (Ove Bang, 1933) | Store norske leksikon |
| At Rygge ble en del av Moss kommune i 2020 | Store norske leksikon |
| At Aremark er eneste Østfold-kommune uten tettsted | Store norske leksikon |
| At jordfeilbryter på stikkontaktkurser ble krav med NEK 400:1998, i kraft fra 1999 | NEK 400 |
| At skrusikringer var standard til rundt 1970 | Alminnelig fagkunnskap |

---

## 1. Påstander om egen erfaring i området

Dette er den viktigste kategorien. Tekstene beskriver **hva Elkontrollen typisk finner**
i ulike typer bygningsmasse. Påstandene er faglig rimelige og følger av hva byggeåret
tilsier — men de er ikke bygget på deres faktiske oppdragshistorikk. Bekreft, nyanser
eller stryk.

Alle står under overskriften «Det vi typisk finner i …» på hver side, og er merket med
`<!-- TRENGER LOKALKUNNSKAP -->` i HTML-en.

### Fredrikstad — `elkontroll-fredrikstad.html`

1. «I den eldste trehusbebyggelsen møter vi ofte anlegg som er bygget ut i flere omganger uten at hovedfordelingen er oppgradert tilsvarende. Et nytt sikringsskap sier ikke nødvendigvis noe om hva som ligger bak det — gamle kurser i rør, skjøter i uinspiserbare hulrom og manglende jording i deler av boligen er ting vi ser jevnlig.»
   - [ ] Bekreftet
2. «I bebyggelsen fra 1960- og 70-tallet er de vanligste funnene knyttet til varmgang: løse koblinger i sikringsskap og koblingsbokser, overbelastede kurser, og skrusikringssokler med høy overgangsmotstand.»
   - [ ] Bekreftet
3. «På hytter og fritidsboliger langs kysten ser vi korrosjon i utvendige koblinger og uttak, og anlegg som er utvidet stykkevis over mange år uten en samlet vurdering av kapasitet og vern.»
   - [ ] Bekreftet

### Sarpsborg — `elkontroll-sarpsborg.html`

1. «I den eldre arbeider- og funksjonærbebyggelsen ser vi ofte spor etter at boligen har vært bygget om. Kurser lagt til i flere omganger, blandingsanlegg der nye og gamle føringsveier møtes i samme koblingsboks, og hovedsikring som ikke er dimensjonert opp i takt med utvidelsene.»
   - [ ] Bekreftet
2. «I boligfeltene fra 1960- og 70-tallet er det først og fremst varmgang vi leter etter — løse klemmer, overbelastede kurser, og sikringssokler med høy overgangsmotstand.»
   - [ ] Bekreftet
3. «På gårdsbrukene i Tune, Varteig og Skjeberg er bildet et annet: støv, fuktighet og vibrasjon sliter på anlegget i driftsbygninger, og avvikene sitter typisk i fordelinger og motorvern.»
   - [ ] Bekreftet — **og: driver dere faktisk oppdrag på gårdsbruk i disse tre områdene?**

### Halden — `elkontroll-halden.html`

1. «I den eldste bebyggelsen på Sørsiden er det lagene som er utfordringen. Vi finner ofte kurser fra ulike tiår i samme boks, skjøter i hulrom som ikke lar seg inspisere, og deler av boligen uten jording.»
   - [ ] Bekreftet
2. «I villabebyggelsen og boligfeltene er varmgang det vanligste. Løse koblinger i sikringsskapet, kurser som går tett opp mot merkestrøm, og varmekabler på bad fra 70- og 80-tallet som nærmer seg eller har passert teknisk levetid.»
   - [ ] Bekreftet
3. «Fordi vi holder til i Halden, kan vi som regel rykke ut samme eller neste dag når noe haster — for eksempel etter et pålegg fra Det lokale eltilsyn med kort frist.»
   - [ ] Bekreftet — **dette er et løfte om responstid. Er det realistisk?**

### Moss — `elkontroll-moss.html`

1. «I boligmassen fra 60- og 70-tallet er de gjengående funnene overbelastede kurser og løse koblinger. Typisk er at kjøkkenet er pusset opp med nytt utstyr, men på samme kurs som før.»
   - [ ] Bekreftet
2. «I villabebyggelsen på Jeløy ser vi en del anlegg som er utvidet mot uthus, brygge eller garasje med lange kurser og skjøter utendørs, der fukt og korrosjon over tid gir dårlige forbindelser.»
   - [ ] Bekreftet — **har dere faktisk hatt oppdrag på Jeløy?**
3. «I Rygge-delen av kommunen er innslaget av gårdsbruk og landbruksbygg større, og der er det driftsbygningene som krever mest oppmerksomhet.»
   - [ ] Bekreftet

### Indre Østfold — `elkontroll-indre-ostfold.html`

1. «I driftsbygninger er de gjennomgående funnene knyttet til miljøet: støv i fordelinger, fukt i uttak og koblingsbokser, og varmgang i kontaktorer og motorvern som har gått mange driftstimer. I fjørfehus ser vi i tillegg ofte at anlegget er utvidet i takt med produksjonen uten at hovedfordelingen er dimensjonert opp.»
   - [ ] Bekreftet — **kontrollerer dere faktisk fjørfehus? FAQ på siden svarer «ja» på direkte spørsmål.**
2. «I våningshusene på gårdene finner vi ofte anlegg som er gamle, men godt vedlikeholdt på overflaten — nytt skap, gamle kurser.»
   - [ ] Bekreftet
3. «I boligfeltene rundt Askim, Mysen og Spydeberg er bildet det samme som i resten av Østfold: overbelastede kurser, manglende jordfeilvern på eldre kurser, og varmgang i sikringsskap.»
   - [ ] Bekreftet

### Rakkestad — `elkontroll-rakkestad.html`

1. «I driftsbygninger er de vanligste funnene knyttet til miljøbelastning over tid: støv i fordelingsskap, korrosjon i uttak og koblinger, og varmgang i kontaktorer og motorvern. Et skap kan se helt greit ut med øyet og likevel ha en kobling på 90 grader.»
   - [ ] Bekreftet — **er 90 grader et representativt eksempel, eller bør tallet endres?**
2. «På storfebruk ser vi ofte anlegg som er utvidet i flere etapper i takt med at besetningen har vokst, uten at hovedfordelingen er oppgradert tilsvarende.»
   - [ ] Bekreftet
3. «I våningshus og boliger i tettstedene er funnene de samme som ellers i Østfold.»
   - [ ] Bekreftet

### Hvaler — `elkontroll-hvaler.html`

1. «Korrosjon er det gjennomgående. Vi finner det i utvendige uttak, i koblinger på brygge og i naust, i kurser som går ut til utebelysning og båtplass, og i skjøter som er gjort provisorisk og deretter blitt permanente.»
   - [ ] Bekreftet
2. «På hytter ser vi ofte anlegg som er utvidet i flere omganger uten en samlet vurdering — for eksempel varmepumpe og varmtvannsbereder lagt inn på et skap som opprinnelig forsynte belysning og et par stikkontakter.»
   - [ ] Bekreftet
3. «I den gamle kystbebyggelsen finner vi anlegg lagt i bygg som ikke var tenkt for det, med føringsveier gjennom uoppvarmede rom der kondens og fukt er et vedvarende problem.»
   - [ ] Bekreftet

### Aremark — `elkontroll-aremark.html`

1. «I den eldste bebyggelsen finner vi anlegg som er lagt i flere lag over lang tid, med gamle føringsveier bak nye skap, og deler av bygget uten jording.»
   - [ ] Bekreftet
2. «Spredt bebyggelse gir lange kurser ut til uthus, garasje, pumpehus og brygge. Der ser vi ofte spenningsfall, underdimensjonerte ledere og skjøter utendørs som har fått stå i mange år.»
   - [ ] Bekreftet
3. «På hyttene langs vassdraget er bildet likt det vi ser andre steder med sesongbruk: anlegg utvidet i etapper, fukt i uoppvarmede rom, og feil som får stå uoppdaget mellom sesongene.»
   - [ ] Bekreftet

---

## 2. Reisetid og tilgjengelighet

Kjøreavstandene er beregnet med OSRM (åpen ruteberegning) fra Halden sentrum til
kommunesenteret, i fri flyt uten trafikk. Størrelsesordenen er sannsynligvis riktig,
men dere vet bedre enn oss hvilken rute dere faktisk kjører.

| Sted | Slik det står i teksten | Fil | Bekreftet? |
|---|---|---|---|
| Fredrikstad | 36 km, «rundt 40 minutter» | `elkontroll-fredrikstad.html` | [ ] |
| Sarpsborg | 31 km, «rundt en halvtime» | `elkontroll-sarpsborg.html` | [ ] |
| Halden | Hjemmebase, Lorangløkka 1 | `elkontroll-halden.html` | [ ] |
| Moss | 61 km, «under en time» | `elkontroll-moss.html` | [ ] |
| Indre Østfold | 56 km (Mysen) / 71 km (Askim), «rundt en time» | `elkontroll-indre-ostfold.html` | [ ] |
| Rakkestad | 39 km, «rundt 45 minutter» | `elkontroll-rakkestad.html` | [ ] |
| Hvaler | 63 km, «drøyt en time» | `elkontroll-hvaler.html` | [ ] |
| Aremark | 26 km, «under en halvtime» | `elkontroll-aremark.html` | [ ] |

I tillegg står det påstander om **hvor ofte dere er i området**. Disse er skrevet som
plausible formuleringer og må bekreftes:

- [ ] **Fredrikstad:** «Vi kjører fra Halden til Fredrikstad fast» (ingress) og «Vi er der ukentlig» (FAQ). Stemmer frekvensen?
- [ ] **Sarpsborg:** «Vi er i Sarpsborg jevnlig og kan som regel tilby tid raskt.»
- [ ] **Aremark:** «Det er den nærmeste kommunen til basen vår, og vi kan som regel tilby tid raskt.»
- [ ] **Alle åtte sidene:** «Vi er i området jevnlig, og setter gjerne opp flere oppdrag samme dag hvis naboen, borettslaget eller nabogården også vurderer kontroll.»
- [ ] **Hvaler:** «Vi setter gjerne opp flere oppdrag på Hvaler samme dag» (FAQ).

---

## 3. Pris- og betingelsespåstander

Disse går igjen på alle åtte sidene og i FAQ-schema. Er én av dem feil, er den feil ni
steder samtidig — og den står i strukturerte data som Google kan vise direkte i
søkeresultatet. Les nøye.

| Påstand | Hvor | Bekreftet? |
|---|---|---|
| Fastpris **5 000 kr** for elkontroll av bolig | Alle 8 lokalsider + `omrader.html` | [ ] |
| **Ingen kjøretillegg innenfor Østfold** — samme pris i Aremark som i Halden | Alle 8 lokalsider + `omrader.html` | [ ] |
| Termografering **inkludert** i fastprisen | Alle 8 lokalsider | [ ] |
| **Rapport samme dag** | Alle 8 lokalsider | [ ] |
| Betaling via **faktura etter utført kontroll** | Alle 8 lokalsider | [ ] |
| Svar på henvendelser **innen 24 timer** | `omrader.html` og buyboksen på lokalsidene | [ ] |
| Fastprisen gjelder også **fritidsbolig/hytte** | `elkontroll-hvaler.html`, `elkontroll-aremark.html` | [ ] |

> **Merk særlig hyttepunktet.** Hvis en hyttekontroll på Hvaler i praksis koster mer enn
> 5 000 kr — for eksempel fordi turen dit tar over en time hver vei — må teksten på de to
> sidene rettes. Den står i dag som fastpris, også i `FAQPage`-schema.

---

## 4. Faglige påstander som bør leses av sertifisert kontrollør

Disse er formulert ut fra alminnelig fagkunnskap om norske elektriske anlegg. De er etter
vår vurdering riktige, men de står på deres nettside under deres navn.

- [ ] **«To av tre branner i driftsbygninger skyldes feil på det elektriske anlegget»** — brukt på `elkontroll-indre-ostfold.html` og `elkontroll-rakkestad.html`. Formuleringen er hentet fra deres egen eksisterende artikkel `blogg/elkontroll-landbruk-slik-kan-du-fa-rabatt-pa-forsikringen.html`. Bør kilden oppgis?
- [ ] **Kontrollintervall landbruk:** «hvert tredje år er vanlig for husdyrbruk, hvert femte for andre driftsformer». Brukt i FAQ på Indre Østfold, Rakkestad, Sarpsborg og Aremark. Stemmer dette for alle de store landbruksforsikringene i dag?
- [ ] **«Alle de store landbruksforsikringene stiller krav om elkontroll med termografi»** — `elkontroll-rakkestad.html`. Gjelder «alle»?
- [ ] **«flere gir i tillegg rabatt for fastmonterte temperatursensorer i el-skapene»** — `elkontroll-rakkestad.html`. Hvilke selskaper, og gjelder det fortsatt?
- [ ] **«Elkontroll av private boliger er frivillig»** — `elkontroll-halden.html`. Riktig så vidt vi vet, men les formuleringen om eiers ansvar som følger etter.
- [ ] **«Borettslag og sameier følger de samme kravene som næringsbygg for det elektriske»** — `elkontroll-moss.html`.
- [ ] **Vernet bebyggelse i Gamlebyen:** påstanden om at «nye føringsveier må ofte legges skjult i eksisterende rør eller hulrom, og synlige inngrep er ikke uten videre tillatt» (`elkontroll-fredrikstad.html`) er en generell beskrivelse av antikvarisk vern. Stemmer den med hvordan dere faktisk jobber der?
- [ ] **«Uavhengig kontrollforetak — vi selger ikke utbedringen»** — står i punktlisten øverst på alle åtte sidene. Dette er en posisjonering som skiller dere fra elektrikerne i markedet, men den eksisterende teksten på `elkontroll-bolig.html` sier at dere «kan gi et eget tilbud på» utbedring ved behov. Det er ikke helt det samme. Avklar hvilken formulering som er riktig, og gjør dem konsistente.

---

## 5. Sertifiseringsomfang — avvik i eksisterende innhold

Dette gjelder ikke de nye sidene, men ble oppdaget under kartleggingen og bør ryddes,
fordi de nye sidene arver formuleringene.

- [ ] `README.md` og `llms.txt` oppgir at Elkontrollen er sertifisert etter **NEK 405-1 (termografi), 405-3 (næring) og 405-4 (foretak)** — altså ikke 405-2. Men `elkontroll-bolig.html`, `elkontroll-boligsalg.html` og alle de nye lokalsidene markedsfører **elkontroll bolig etter NEK 405-2**. Enten mangler 405-2 i oppramsingen, eller så er boligtjenesten beskrevet med feil standard. Avklar hvilket, og rett det som er galt.
- [ ] `llms.txt` viser til **NEK 405-2-3** for boligsalg, mens `elkontroll-boligsalg.html` sier NEK 405-2. Avklar riktig betegnelse.

---

## 6. Bilder

- [ ] `tjenester.html` har et bilde med alt-teksten **«Næringsbygg i Oslo»** på en side som ellers markedsfører Halden og Østfold. Bytt alt-tekst.
- [ ] Fem filnavn i `assets/img/` peker på nøyaktig samme bilde: `brannalarm-nodlys-sentral.jpg`, `om-oss-elektriker.jpg`, `service-brannalarm-nodlys.jpg`, `service-elkontroll-bolig.jpg` og `sikringsskap-norsk.jpg` (identisk md5). Er det meningen at «brannalarm», «om oss» og «elkontroll bolig» skal illustreres med samme bilde?
- [ ] Fire bildefiler som brukes som `og:image` i fem bloggartikler **finnes ikke** og gir 404 i produksjon: `elkontroll-bolig.jpg`, `elkontroll-landbruk.jpg`, `internkontroll.jpg`, `termografi.jpg`. Se `REVISJON.md` seksjon 9. Skaff bildene, eller pek på eksisterende filer.
- [ ] De nye lokalsidene bruker `elkontroll-bolig-enebolig.jpg` som `og:image`, altså samme bilde for alle åtte. Det fungerer, men et bilde per sted ville vært bedre ved deling.

---

## 7. Fase 3 — priser og forsikringsrabatt

### Priser

Prissiden gjengir bare beløp som allerede sto på tjenestesidene. Ingenting er funnet opp.
Men beløpene bør bekreftes, siden de nå står samlet ett sted og i `Offer`-schema.

| Påstand | Hentet fra | Bekreftet? |
|---|---|---|
| Elkontroll bolig: 5 000 kr fastpris, termografering inkludert | `elkontroll-bolig.html` | [ ] |
| Elkontroll ved kjøp og salg: 5 000 kr fastpris | `elkontroll-boligsalg.html` | [ ] |
| Elkontroll landbruk: fast pris etter kort avklaring, pris samme dag | `landbruk.html` | [ ] |
| Garantikontroll: fast pris, avtales etter opplysninger om anlegget | `garantikontroll.html` (siden sier «fastpris», uten beløp) | [ ] |
| Næring, brannalarm/nødlys, ladeanlegg, internkontroll, kontrollavtale: tilbud | respektive tjenestesider | [ ] |
| Markedsintervall 4 000–8 000 kr, termografi ca. 2 500 kr i tillegg | `blogg/hva-koster-elkontroll-full-prisguide.html` | [ ] |
| «Vi utfører ikke utbedring selv» | Ny formulering på `/priser` og `borettslag/pris` | [ ] — se punkt 4, samme spørsmål som om uavhengighet |

### Forsikringsrabatt

**Arbeidsordren ba om å skrive at «Gjensidige oppgir rundt 10 %». Det er ikke gjort, og
her er hvorfor.**

Gjensidiges egen side om billigere husforsikring tallfester ikke rabatten. Den sier
ordrett at du «får en av våre største sikkerhetsrabatter» i fem år etter kontrollen, men
oppgir ingen prosentsats. Å publisere 10 % som om det kom fra Gjensidige ville derfor vært
en påstand vi ikke kan belegge — på en side som handler om hva kunden får igjen i kroner.

Siden sier i stedet rett ut at rabattens størrelse varierer og må bekreftes med eget
selskap. Det er en svakere overskrift, men den holder.

- [ ] **Har dere en kilde for 10 %-tallet for bolig?** Et skjermbilde fra et vilkårsdokument, en e-post fra en rådgiver, eller en henvisning i vilkårene holder. Har dere det, setter vi tallet inn — det er et sterkere salgsargument enn «varierer».

Dette er verifisert og publisert som fakta på siden:

| Påstand | Kilde | Bekreftet? |
|---|---|---|
| Gjensidige: «en av våre største sikkerhetsrabatter» | gjensidige.no, husforsikring/billigere-forsikring | ✅ sitert |
| Gjensidige: rabatten gjelder i fem år etter kontrollen | samme | ✅ sitert |
| Gjensidige: ingen egenandel på brannskade som skyldes feil i el-anlegget | samme | ✅ sitert |
| Gjensidige: feil må være rettet før rabatten gis | samme | ✅ sitert |
| Kontrollen må være merket NEK 405 | samme | ✅ sitert |

Dette er derimot hentet fra deres egen eksisterende artikkel, og bør bekreftes:

- [ ] **«Flere selskaper — blant dem Gjensidige, Fremtind, Eika, Varig og Landkreditt — gir rundt 10 prosent rabatt på brannforsikringen hvis alle el-skap på gården har fastmontert temperatursensor med varsling.»** Hentet ordrett fra `blogg/forsikringskrav-elkontroll-landbruk.html`. Gjelder det fortsatt, og gjelder det alle fem selskapene?
- [ ] **«De fleste landbruksforsikringene krever kontroll etter NEK 405-3 med termografi, som hovedregel hvert tredje år for husdyrbruk.»** Samme kilde.
- [ ] **«If, Tryg, Fremtind, Frende, Eika og de andre har liknende ordninger.»** Formulert forsiktig, men bekreft at dere kjenner til at de faktisk har det.

### Nye FAQ-svar

47 nye spørsmål og svar er lagt inn på tjenestesidene. De fleste er omskrivinger av det
som allerede sto på siden, men disse er nye påstander som bør leses:

- [ ] `internkontroll.html`: «Gårdeier har ansvar for bygget og det faste anlegget, men virksomheten har ansvar for internkontroll knyttet til egen bruk av anlegget og eget elektrisk utstyr.»
- [ ] `internkontroll.html`: «DLE kan gi pålegg med frist, og i alvorlige tilfeller varsle tvangsmulkt eller stenging.»
- [ ] `kontrollavtale.html`: «Vi purrer til avviket er lukket, og dokumenterer når det skjedde.» — er dette en tjeneste dere faktisk leverer?
- [ ] `borettslag/brannvern`: «Ved brann kan manglende dokumentasjon føre til avkortning i erstatningen.»
- [ ] `borettslag/leiligheter`: «Som regel under en time» per leilighet.
- [ ] `borettslag/kartlegging`: «Selve gjennomgangen tar som regel én til to timer.»
- [ ] `borettslag/ladeanlegg`: beskrivelsen av hva som konkret sjekkes (termografi under last, vern og jordfeilvern, lastbalansering, kabling, dokumentasjon).
- [ ] `tjenester.html`: «I markedet kommer termografering ofte som et tillegg på rundt 2 500 kr.»

---

## 8. Fase 4 — teknisk SEO

### Må fylles inn for at schemaet skal bli komplett

Begge ligger klare i `tools/foretak.json`. Fyll inn, kjør `node tools/fase4-schema.js`.

- [x] **Åpningstider.** Mandag–fredag 07:00–16:00, oppgitt av eier 2026-09-14. Lagt inn i schema, i kontaktkortet og i footeren. **Sett samme tid i Google Bedriftsprofil** — Google sammenligner de to.
- [x] **Navn på kontrollør/forfatter.** Niklas Grønvik, sertifisert kontrollør. Alle 34 artikler har nå `author` som `Person` med NEK 405 som `hasCredential`.
- [ ] **Team-seksjonen på forsiden** ligger fortsatt som HTML-kommentar, med tre kort og plassholderen «Navn». Trenger bilder og de to andre navnene. Se `TIL_DEG.md` punkt 7.
- [x] **Usynlig tekst.** Org.nr og adresse sto i hvitt på nesten hvit bakgrunn i `kontakt.html` og `om-oss.html`, og etikettene i kontaktkortet lå på 3,21:1. Alle fire rettet til `var(--muted)` / `var(--line)`. Begge sider er nå på 100 i tilgjengelighet.
- [ ] **Alvorlighetsmerkene på `/fatt-avvik.html`** ligger på 4,08:1 og 4,28:1, like under kravet på 4,5:1. Ikke rettet — fargene er del av et bevisst fargekodet system. Se `TIL_DEG.md` punkt 8c.

### Bør bekreftes

- [ ] **Koordinatene.** `geo` er slått opp i OpenStreetMap på Lorangløkka 1, 1782 Halden og gir 59.134686, 11.380039 (Brødløs). Stemmer punktet med der dere faktisk holder til?
- [ ] **`sameAs`.** Peker foreløpig bare på Brønnøysundregistrene. Legg til Google Bedriftsprofil, Proff, 1881 og Elvirksomhetsregisteret når profilene er på plass — det styrker koblingen mellom nettsted og bedrift.
- [ ] **Fire og:image-filer manglet** og er pekt om til et eksisterende bilde. Hvilket bilde som passer til hvilken artikkel er en redaksjonell vurdering:
  | Artikkel | Peker nå på |
  |---|---|
  | `elektriker-eller-kontrollor` | `elkontroll-bolig-enebolig` |
  | `forsikringskrav-elkontroll-landbruk`, `temperatursensor-sikringsskap` | `landbruk-driftsbygning` |
  | `internkontroll-elektro-sma-bedrifter` | `naering-kontorbygg` |
  | `hva-sjekker-en-termografor` | `sikringsskap-norsk` |
- [ ] **Nye alt-tekster.** Skrevet ut fra hva bildene viser. «Næringsbygg i Oslo» er rettet til «Næringsbygg med elektrisk anlegg som kontrolleres etter NEK 405-3».
- [ ] **44 titler og 18 beskrivelser er skrevet om** for å komme under 60/155 tegn. Ingen endrer hva siden handler om, men les gjerne gjennom `tools/meta-tekster.js` — det er disse tekstene som står i Google.
- [ ] **`pretty_urls = false`** er satt i `netlify.toml`. Bekreft etter deploy at interne lenker serveres som `.html` og at `/elkontroll-bolig` gir 301 til `/elkontroll-bolig.html`.

---

## Oppsummering

| Kategori | Antall punkter |
|---|---|
| **0. Placeholder-tekst i produksjon** | **1 — haster** |
| 1. Påstander om egen erfaring i området | 24 |
| 2. Reisetid og tilgjengelighet | 13 |
| 3. Pris og betingelser | 7 |
| 4. Faglige påstander | 8 |
| 5. Sertifiseringsomfang | 2 |
| 6. Bilder | 4 |
| 7. Priser, forsikringsrabatt og nye FAQ-svar | 19 |
| 8. Teknisk SEO — åpningstider, forfatternavn, koordinater, bilder | 9 |
| **Til sammen** | **87** |

**Punkt 0 er det eneste som er en ren feil.** Resten er påstander som sannsynligvis
stemmer, men som ingen utenfra kan bekrefte.

Rekkefølgen vi ville tatt dem i:

1. **Punkt 0** — `Fra xxx kr/år` ligger ute nå og koster salg hver dag den står.
2. **Punkt 3 og 7** — pris. Beløpene står nå i `Offer`-schema og kan vises direkte i Google.
3. **Punkt 5** — sertifiseringsomfang. `README.md` og `llms.txt` ramser opp NEK 405-1, -3 og -4, mens boligtjenesten markedsføres etter NEK 405-2. Én av dem er feil.
4. **Punkt 1, 2 og 4** — påstander om egen erfaring. Lavere risiko, men bør gjennom før sidene får trafikk.
5. **Punkt 6** — bilder. Kosmetisk, bortsett fra de fire som gir 404.
