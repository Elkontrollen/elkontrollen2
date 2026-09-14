# TIL_DEG.md

Oppgaver som ikke kan gjøres fra kode. Noen fordi de krever innlogging et sted, noen
fordi de krever opplysninger bare dere har.

Lista er sortert etter hva som koster mest å la ligge, ikke etter hvor mye arbeid det er.
Punktene som er krysset ut, er gjort underveis.

Sist oppdatert: 2026-09-14 (punkt 0, 6, 7, 8b og 8c er gjort)

---

## 0. ~~«Fra xxx kr/år»~~ ✅ gjort

Plassholderen er borte fra alle tolv stedene — tre priskort på `/borettslag/` og ni
tabellceller på `/borettslag/pris/`.

**Priskortene** sier nå «Pris settes etter kartleggingen», i stedet for et beløp som
aldri ble fylt inn. Linja under sto allerede der: «Pris avhenger av antall enheter,
tavler og ladepunkter. Fast årspris.»

**Tabellen** er fjernet. Ni celler med samme setning gir ingen mening, og overskriften
«Fra-priser etter lagstørrelse» lovet tall som ikke fantes. Seksjonen heter nå «Hva koster
Trygt Borettslag?» og forklarer hvorfor prisen settes etter kartleggingen — at to lag med
like mange leiligheter kan ha helt ulikt anlegg, og at en fra-pris satt uten å ha sett
bygget blir for høy for det enkle laget eller for lav for det sammensatte. Under ligger
en knapp til den gratis kartleggingen.

Seksjonen «Slik settes prisen» rett etter, som lister de fire faktorene, står som den var
og flyter nå logisk fra forklaringen.

**Også rettet, fordi de lovet det samme:**

| Sted | Før | Etter |
|---|---|---|
| `meta description` på `/borettslag/pris/` | «Fra-priser for Trygt Borettslag etter lagstørrelse og nivå …» | «Pris settes etter en gratis kartlegging av bygget …» |
| `og:description` og `twitter:description` | samme | samme |
| Hero-stempelet | «Fra-pris · del av Trygt Borettslag» | «Pris etter kartlegging · del av Trygt Borettslag» |
| FAQ på `/borettslag/`: «Hva koster det?» | «Se fra-priser for de tre nivåene …» | «Prisen settes etter en gratis og uforpliktende kartlegging …» |

FAQ-schemaet er bygget på nytt, så strukturerte data stemmer med teksten.

**Vil dere heller ha tall der?** Fyll inn ni beløp, si fra, så setter jeg tabellen
tilbake. Formuleringen nå lover ingenting dere ikke kan holde.

---

## 1. Google Bedriftsprofil

**Tid: 20 minutter, pluss 1–2 uker på verifisering. Dette er sannsynligvis viktigere
enn alt annet på lista.**

Konkurrentanalysen i `REVISJON.md` (seksjon 12) viste at det ikke er elektrikerfirmaene
som fyller topplasseringene på «elkontroll Fredrikstad» og liknende — det er katalogene:
`fixa.no`, `sjekkscore.no`, `1881.no`, `boligsmart.no`. De slås ikke med tekst. De slås
med en bedriftsprofil som har anmeldelser.

### Slik gjør du det

1. Gå til <https://business.google.com> og logg inn med en Google-konto dere kontrollerer over tid — ikke en privat konto som kan forsvinne.
2. Søk opp «Elkontrollen AS». Finnes profilen allerede (den kan være opprettet automatisk), velg **Gjør krav på** i stedet for å lage en ny. To profiler for samme bedrift skader begge.
3. **Velg kategori:** «Elektriker» som primærkategori. Legg til «Sikkerhetstjeneste» og «Brannvernsystemleverandør» som sekundære hvis de er tilgjengelige.
4. **Sett den opp som tjenesteområdebedrift**, ikke som butikk. Dere reiser ut til kunden — dere har ikke kundemottak i Lorangløkka. Da skjules adressen, men dere blir synlige i hele området dere betjener.
5. **Legg inn tjenesteområdet.** Alle kommunene vi nå har egne sider for:

   Halden · Fredrikstad · Sarpsborg · Moss · Indre Østfold · Rakkestad · Hvaler · Aremark

   Legg gjerne til Marker, Skiptvet, Råde og Våler også hvis dere tar oppdrag der.
6. **Fyll ut alt:** telefon `980 19 154`, nettside `https://elkontrollen.no`, org.nr, tjenester, og beskrivelse. Bruk samme formuleringer som på nettsiden.
7. **Legg inn åpningstider:** mandag–fredag 07:00–16:00. Samme som nå står i schema og i footeren — de må stemme overens.
8. **Last opp bilder.** Minst ti: sikringsskap dere har kontrollert, termografibilder, bil med logo, kontrollør i arbeid. Google vekter profiler med ekte bilder høyere enn profiler med stockbilder.
9. Verifiser profilen. Google sender som regel et kort i posten. Det tar en til to uker.

### Når profilen er verifisert

Legg URL-en til profilen inn i `tools/foretak.json` under `sameAs`, og kjør:

```bash
node tools/fase4-schema.js
```

Da knytter Google nettstedet og bedriftsprofilen sammen eksplisitt.

---

## 2. Anmeldelser — to til fire i måneden, jevnt

**Tid: 2 minutter per kunde, men det må bli en vane.**

Dette er den andre halvdelen av punkt 1. En bedriftsprofil uten anmeldelser rangerer
dårlig. Jevn tilvekst teller mer enn et rykk med ti anmeldelser i én uke — det siste
ser unaturlig ut og kan bli filtrert bort.

### Slik lager du lenken

Når profilen er verifisert:

1. Åpne bedriftsprofilen i Google Søk eller i appen.
2. Velg **Be om anmeldelser**. Du får en kort lenke av formen `https://g.page/r/…/review`.
3. Kopier den. Lagre den i telefonen som en tekstsnarvei.

Alternativt: `https://search.google.com/local/writereview?placeid=DIN_PLACE_ID` gjør det
samme. Place-ID-en finner du med Googles Place ID Finder.

### Slik bruker du den

Send SMS **samme dag som rapporten er levert** — da er jobben friskt i minne.

> Hei! Takk for at vi fikk komme. Rapporten ligger i innboksen din.
> Hvis du ble fornøyd, setter vi stor pris på en kort anmeldelse:
> [lenke]
> Tar et halvt minutt. Mvh Elkontrollen

**Mål: to til fire i måneden, jevnt fordelt.** Tolv i året er nok til å skille dere fra
konkurrentene i Østfold — ingen av dem hadde synlige anmeldelser da vi så etter.

Svar på alle anmeldelser, også de negative. Google vekter profiler som svarer høyere,
og en saklig respons på en kritisk anmeldelse selger bedre enn fem stjerner uten tekst.

---

## 3. Search Console — sjekk hva som faktisk er indeksert

**Tid: 15 minutter nå, deretter 10 minutter i måneden.**

De 35 artiklene ble publisert på få dager i august. Det er et mønster Google er skeptisk
til, og det er en reell sjanse for at mange av dem står som «Oppdaget – foreløpig ikke
indeksert».

### Slik sjekker du

1. Gå til <https://search.google.com/search-console>. Er ikke domenet lagt til, legg det til som **Domene-eiendom** (`elkontrollen.no`) — det krever en TXT-post i DNS hos Domeneshop.
2. Åpne **Indeksering → Sider**.
3. Se på tallet «Ikke indeksert» og bryt det ned på årsak.

### Hva tallene betyr

| Status | Hva det betyr | Hva du gjør |
|---|---|---|
| **Oppdatert – ikke indeksert** | Google kjenner URL-en, men har prioritert den bort | Ofte et kvalitets- eller relevanssignal. Den interne lenkingen som er lagt inn i denne revisjonen hjelper direkte her |
| **Gjennomsøkt – foreløpig ikke indeksert** | Google har lest siden og valgt å la være | Samme som over |
| **Duplikat, Google valgte en annen kanonisk** | 🔴 **Dette er det viktigste å se etter.** Kartleggingen fant at hver side svarte på to URL-er | Skal være løst av `_redirects` og `pretty_urls = false`. Sjekk at tallet faller i ukene etter deploy |
| **Side med omdirigering** | Forventet — det er de 79 redirect-reglene som gjør jobben sin | Ingenting |

### Etter deploy

1. Send inn sitemap på nytt: **Indeksering → Nettstedskart** → `https://elkontrollen.no/sitemap.xml`. Den har nå 68 URL-er, mot 57 før.
2. Bruk **URL-inspeksjon → Be om indeksering** på de ni viktigste nye sidene:

   `/priser.html` · `/forsikringsrabatt.html` · `/omrader.html` ·
   `/elkontroll-fredrikstad.html` · `/elkontroll-sarpsborg.html` · `/elkontroll-halden.html` ·
   `/elkontroll-moss.html` · `/elkontroll-indre-ostfold.html` · `/elkontroll-rakkestad.html`

   Ikke send inn alle 68 — det gir ingen effekt og du har uansett en kvote.
3. Sjekk **Opplevelse → Core Web Vitals** etter et par uker. Feltdataene bør bli grønne nå som fontene er selvhostet.

---

## 4. Netlify Forms — aktiver e-postvarsling for åtte skjemaer

**Tid: 10 minutter. Uten dette blir henvendelser liggende ulest.**

Skjemainnsendinger lagres i Netlify uansett, men **det sendes ingen e-post før varsling
er satt opp manuelt.** Da må noen huske å logge inn og sjekke.

1. Logg inn på <https://app.netlify.com> og velg siten for elkontrollen.no.
2. **Site configuration → Forms → Form notifications**.
3. **Add notification → Email notification**.
4. **Email to notify:** `post@elkontrollen.no`
5. Gjenta for hvert av de åtte skjemaene:

   | # | Skjemanavn | Side |
   |---|---|---|
   | 1 | `kontakt` | `/kontakt.html` — **ny i denne revisjonen** |
   | 2 | `elkontroll-bolig-bestilling` | `/elkontroll-bolig.html` |
   | 3 | `elkontroll-boligsalg-bestilling` | `/elkontroll-boligsalg.html` |
   | 4 | `fatt-avvik` | `/fatt-avvik.html` |
   | 5 | `landbruk-tilbud` | `/landbruk.html` |
   | 6 | `naering-tilbud` | `/naering.html` |
   | 7 | `borettslag-sjekkliste` | `/borettslag/` |
   | 8 | `borettslag-kartlegging` | `/borettslag/kartlegging/` |

6. **Send en testmelding** gjennom kontaktskjemaet. Bekreft at den både dukker opp under **Forms → kontakt** i Netlify og lander på `post@elkontrollen.no`.

`kontakt` dukker først opp i lista **etter første deploy med det nye skjemaet**, og for
noen skjematyper først etter første innsending. Gjør derfor punkt 6 før punkt 5 hvis
`kontakt` ikke er der.

---

## 5. Bransjeregistre — identisk navn, adresse og telefon overalt

**Tid: 45 minutter én gang.**

Google bruker samsvar mellom oppføringer som et tillitssignal for lokale søk. Ulik
skrivemåte av adressen på fire nettsteder er et svakt signal — identisk skrivemåte er
et sterkt et.

### Bruk nøyaktig denne formen, overalt

```
Elkontrollen AS
Lorangløkka 1
1782 Halden
+47 980 19 154
post@elkontrollen.no
https://elkontrollen.no
Org.nr 825 176 942
```

Ikke «Loranglokka», ikke «Lorangløkka 1B», ikke «98019154». Samme tegnsetting hver gang.

### Registre å sjekke

| Register | Hvor | Merknad |
|---|---|---|
| **Proff** | <https://www.proff.no> | Søk opp org.nr, be om å få redigere oppføringen |
| **Gule Sider / 1881** | <https://www.1881.no> | Har en «Er dette din bedrift?»-funksjon |
| **Bedriftsdatabasen** | <https://www.bedriftsdatabasen.no> | |
| **Elvirksomhetsregisteret** | DSB, <https://elvirksomhetsregisteret.no> | Lovpålagt uansett. Sjekk at registreringen er aktiv og at fagområdene stemmer |
| **Brønnøysundregistrene** | <https://virksomhet.brreg.no> | Kilden alle de andre henter fra. Er noe feil her, forplanter det seg |

Når oppføringene er på plass, legg URL-ene inn i `tools/foretak.json` under `sameAs` og kjør
`node tools/fase4-schema.js`.

---

## 6. ~~Åpningstider~~ ✅ gjort

Mandag–fredag 07:00–16:00 er lagt inn, oppgitt av eier 2026-09-14. Tre steder:

- `openingHours` i `LocalBusiness`-schemaet på alle 69 sider
- Synlig i kontaktkortet på `/kontakt.html`
- Synlig i footeren på alle sider

**Én ting gjenstår:** samme åpningstid må settes i Google Bedriftsprofil (punkt 1).
Google sammenligner schema mot bedriftsprofilen, og avvik mellom dem svekker begge.

---

## 7. ~~Navn på kontrolløren~~ ✅ gjort

Alle 34 bloggartikler har nå `author` som `Person`:

```json
"author": {
  "@type": "Person",
  "name": "Niklas Grønvik",
  "jobTitle": "Sertifisert kontrollør",
  "worksFor": { "@id": "https://elkontrollen.no/#elkontrollen" },
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "Sertifisering",
    "name": "NEK 405-sertifisert kontrollør"
  }
}
```

**Det som gjenstår er ikke teknisk.** Team-seksjonen «Hvem kommer hjem til deg?» ligger
fortsatt som en HTML-kommentar på forsiden, med tre kort og plassholderen «Navn» i hvert.
Den ble skjult «til vi har ekte bilder og navn». Nå finnes ett navn — men kortene er tre,
og det mangler bilder.

Ta bildene, fyll inn navnene, og fjern kommentartegnene rundt seksjonen i `index.html`
(linje 220 og framover). Teksten som allerede står der — «Ingen anonyme montører. Du får
navnet på kontrolløren din når du bestiller, og det er samme person som skriver
rapporten» — er et av de sterkeste argumentene på hele siden mot elektrikerfirmaene som
sender hvem som helst. Den er usynlig i dag.

---

## 8. Etter deploy — fire ting å sjekke

**Tid: 15 minutter.**

### Bekreft at canonical-konflikten er borte

Dette var det alvorligste tekniske funnet i kartleggingen. Kjør i en terminal:

```bash
curl -sSL -o /dev/null -w "%{http_code} etter %{num_redirects} hopp\n" https://elkontrollen.no/elkontroll-bolig
curl -sSL -o /dev/null -w "%{http_code} etter %{num_redirects} hopp\n" https://elkontrollen.no/borettslag/pris/
```

**Forventet: `200 etter 1 hopp` og `200 etter 0 hopp`.**

Merk `-L`. Uten den ser du bare at det blir en 301, ikke om adressen den peker til
faktisk svarer. Første versjon av `_redirects` sendte ni mappesider i en uendelig løkke,
og det ble ikke fanget nettopp fordi omdirigeringen aldri ble fulgt — den så riktig ut på
overflaten. Se `REVISJON.md` seksjon 18d.

Får du `200 etter 0 hopp` på den første, har ikke `_redirects` slått inn i det hele tatt.
Sjekk at fila ligger i publiseringsroten i Netlify-loggen.

### Bekreft at Pretty URLs er av

```bash
curl -sS https://elkontrollen.no/ | grep -o "href='/elkontroll-bolig'"
```

**Forventet: ingen treff.** Får du treff, skriver Netlify fortsatt om lenkene. Skru det
av manuelt: **Site configuration → Build & deploy → Post processing → Asset optimization
→ Pretty URLs**.

### Kjør Lighthouse mot produksjon

Målingene i `REVISJON.md` er gjort mot en lokal server. Kjør dem mot den ekte siden:

```bash
npx lighthouse https://elkontrollen.no/ --view
```

**Forventet: 95 eller høyere på alle fire.** Lokalt ga den 100 / 100 / 100 / 100.

### Bekreft at kontaktskjemaet virker

Send en melding gjennom <https://elkontrollen.no/kontakt.html>. Du skal lande på
`/takk`, og meldingen skal dukke opp både i Netlify og på `post@elkontrollen.no`.

---

## 8b. ~~Usynlig tekst~~ ✅ gjort

Tre farger var igjen fra da paletten var mørk. Variabelen heter fortsatt `--navy`, men
verdien er `#F4F6F4` — nesten hvit. De tre stedene hadde fargen skrevet rett inn i
`style`-attributtet eller som en gjennomsiktig ink-verdi, og fulgte derfor ikke med da
paletten ble byttet.

| Sted | Før | Etter | Kontrast |
|---|---|---|---|
| `kontakt.html` — «Org.nr 825 176 942 · Elkontrollen AS» | `rgba(255,255,255,.55)` | `var(--muted)` | usynlig → **5,19:1** |
| `kontakt.html` — skillelinja over den | `rgba(255,255,255,.12)` | `var(--line)` | usynlig → synlig |
| `om-oss.html` — navn, adresse, org.nr i «Hvor vi jobber» | `rgba(255,255,255,.6)` | `var(--muted)` | usynlig → **5,19:1** |
| `style.css` — `.info-row .lbl`, etikettene i kontaktkortet | `rgba(var(--ink-rgb),.5)` | `var(--muted)` | 3,21:1 → **5,19:1** |

Den siste kom fram da kontrasten ble målt etter de tre første: etikettene TELEFON,
E-POST, ADRESSE og de andre lå på 3,21:1, under kravet på 4,5:1. Samme rot, samme fiks.
`var(--muted)` er tokenet all annen dempet tekst på siden bruker fra før.

`kontakt.html` og `om-oss.html` gikk fra 96 og 96 til **100** på tilgjengelighet.

`.hero-photo .cap-out` og SVG-illustrasjonen på forsiden bruker samme hvite farge, men
ligger på faktisk mørk bakgrunn og er riktige som de er. De er ikke rørt.

---

## 8c. ~~Siste kontrastfeil~~ ✅ gjort

Alvorlighetsmerkene på `/fatt-avvik.html` lå like under kravet. Tekstfargene er mørknet,
bakgrunnene står som de var. Fargetonen er beholdt nøyaktig — RGB-verdiene er skalert
proporsjonalt, ikke justert i tone.

| Merke | Før | Etter | Kontrast |
|---|---|---|---|
| ALVORLIG | `#C0432A` | `#B13E27` | 4,09:1 → **4,65:1** |
| AVVIK | `#96690F` | `#8F640E` | 4,28:1 → **4,63:1** |
| MINDRE | `var(--green-dark)` | uendret | 11,01:1 |

8 og 5 prosent mørkere. Fargekodingen — rød for kritisk, gul for bør utbedres, grønn for
kan vente — leser like tydelig som før, kontrollert visuelt.

**Alle 20 sider målt er nå på 100 i tilgjengelighet.**

---

## 9. Rangeringssjekk — fra norsk IP

**Tid: 20 minutter.**

Konkurrentanalysen i `REVISJON.md` seksjon 12 er en kartlegging av **hvem** som
konkurrerer og **hva de gjør** — ikke en rangeringsmåling. Søkeverktøyene som var
tilgjengelige er USA-baserte, og forsøkene på å hente norske søkeresultater direkte ble
blokkert. Vi sier det heller rett ut enn å presentere noe som ser ut som en
rangeringsliste uten å være det.

Det du kan gjøre på 20 minutter, som vi ikke kunne:

1. Åpne et inkognitovindu. Søk på google.no:

   «elkontroll Fredrikstad» · «elkontroll Sarpsborg» · «elkontroll Moss» ·
   «elkontroll Halden» · «elkontroll bolig pris» · «hva koster elkontroll» ·
   «elkontroll borettslag» · «elkontroll landbruk» · «termografering Østfold»

2. Noter for hvert søk: hvem ligger på plass 1–10, og hvor mange av dem er kataloger.
3. For de fem første organiske treffene: åpne bedriftsprofilen deres i kartpakken og noter **antall Google-anmeldelser**. Det tallet fikk vi ikke tak i, og det er det viktigste enkelttallet for å vite hvor mye arbeid punkt 2 krever.
4. Gjenta om tre måneder. Da har de nye sidene fått tid til å bli indeksert, og du kan måle forskjellen.

Firmaene vi fant, som du sannsynligvis vil møte igjen: Odin Elektro (Gressvik), Elsjekk
AS (uavhengig kontrollforetak, Oslo/Østfold), Elkontrollørene, Sarpsborg Elektro,
ZK Elektro, Moss Elektro, og takstmann Erik Laursen på termografering.

---

## 10. Faktasjekk av de nye sidene

Se `FAKTASJEKK.md`. **87 punkter**, men de fleste er avkrysning.

De to som bør gjøres før sidene får trafikk:

- **Pris.** Fastprisen på 5 000 kr står nå i `Offer`-schema på elleve sider og kan vises direkte i Google. Bekreft at den stemmer — også for hytte på Hvaler og Aremark, der turen er over en time hver vei.
- **Sertifiseringsomfang.** `README.md` og `llms.txt` oppgir NEK 405-1, -3 og -4. Boligtjenesten markedsføres etter NEK 405-2, som ikke står i oppramsingen. Én av de to er feil.

Det som tar lengst tid, men som er verdt det: de **24 påstandene om hva dere typisk
finner** i hver kommune. De står merket med `<!-- TRENGER LOKALKUNNSKAP -->` i HTML-en.
Påstandene følger av byggeåret og er faglig rimelige, men de er ikke bygget på deres
faktiske oppdragshistorikk. Les gjennom, og bytt gjerne ut et generelt avsnitt med noe
dere faktisk har sett. Det er den slags detalj konkurrentene ikke kan kopiere.

---

## Rekkefølge, hvis du vil ha én

| Når | Hva |
|---|---|
| **I dag** | Punkt 4 (e-postvarsling) |
| **Denne uka** | Punkt 1 (bedriftsprofil — verifiseringen tar tid, start nå) |
| **Neste uke** | Punkt 3 (Search Console), punkt 5 (registre), punkt 9 (rangeringssjekk) |
| **Løpende** | Punkt 2 (anmeldelser — to til fire i måneden), punkt 10 (faktasjekk) |
