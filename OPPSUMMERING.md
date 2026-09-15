# Oppsummering

**Natten 13.–14. september 2026.** **Deployet 15. september** etter beskjed, og verifisert
mot produksjon.

---

## Det viktigste, hvis du bare leser tre avsnitt

**1. Det er ute nå.** Arbeidet ble holdt tilbake til du ga beskjed, fordi push til `main`
på dette repoet er det samme som deploy — det finnes ingen mellomting. Tolv commits er
sendt, og alt under er verifisert mot den ekte siden, ikke bare lokalt.

Deployen avdekket én ting til: de ni nye sidene og de åtte nye artiklene manglet regel i
`_redirects`, fordi generatoren sist ble kjørt før de fantes. De svarte 200 på både
`/elkontroll-drammen` og `/elkontroll-drammen.html`. Canonical pekte riktig hele veien, så
Google ville slått dem sammen uansett, men nå er det likt på tvers. Rettet og deployet på
nytt.

**2. Sjekk `TIL_DEG.md` punkt 11 før de nye sidene får trafikk.** De fem sidene utenfor
Østfold sier ingenting om pris, fordi jeg ikke vet hva den er. Østfold-sidene lover
fastpris uten kjøretillegg; de nye stedene ligger 119–134 km unna. Uoppgitt pris er den
vanligste grunnen til at folk ikke tar kontakt.

**3. Drammen er ikke stedet dere er nærmest.** Ordren sa det, men kjøreavstanden sier noe
annet: Drammen 1 t 57 min, Oslo 1 t 37 min. Drammen er den lengste av de fem nye. Jeg
fulgte prioriteringen som bedt — Drammen ligger foran de fire andre — men hvis premisset
var en glipp, bør Oslo få oppmerksomheten først.

---

## Hva som ble gjort

### Først: en feil jeg selv hadde laget

Før jeg begynte på borettslagsordren fant jeg en **omdirigeringsløkke i produksjon**. Ni
sider var nede — hele bloggoversikten og hele Trygt Borettslag-seksjonen — i rundt en
time. Årsaken var regler jeg selv skrev kvelden før, av typen:

```
/borettslag/pris    /borettslag/pris/    301!
```

Netlify behandler kilde med og uten avsluttende skråstrek som samme sti. `/borettslag/pris/`
traff altså sin egen regel og pekte på seg selv.

Grunnen til at jeg ikke fanget det: verifiseringen min brukte `curl -o /dev/null` og
sjekket bare at formen *uten* skråstrek ga 301. Jeg fulgte aldri omdirigeringen. Nå gjør
sjekken i `TIL_DEG.md` det med `curl -L`, og generatoren har en vakt som kaster feil hvis
en regel peker på seg selv eller på en mappe.

Samme runde avdekket at `POST /takk` fikk 301 før Netlify-skjemaet rakk å svare. Hver
eneste kontaktskjemainnsending ble spist stille. Også rettet.

### Fase A — plassholdere

To blokker fjernet. Begge lå i produksjon:

- **Kundeomtaler** med oppdiktede navn og sitater
- **Teamseksjon** med tomme profiler

Full markup ligger i `FJERNET.md`, så de kan settes tilbake når det finnes ekte innhold.
Ordren var tydelig på at kundeomtaler ikke skal finnes opp, så de kommer ikke tilbake av
seg selv.

I samme slengen: **«Fra xxx kr/år»** sto i produksjon på to sider. Erstattet med «Pris
settes etter kartleggingen».

### Dekningsområdet korrigert

Fra «Østfold» til «Østfold, Oslo, Akershus og Buskerud» — **89 tekststeder** pluss
`areaServed` i `LocalBusiness`-schema på alle sider, footer og forsidens ingress.

### Fase B — `/borettslag/` bygget om

Hovedsiden gikk fra 707 til **1 311 ord**. Pakkeinnholdet står nå som fem punkter høyt på
siden i stedet for i en tabell langt nede. Prismodellen er flyttet opp fra undersiden.
Avviksliste med status og dokumentasjon som overlever styreskifte har fått egne seksjoner.
FAQ utvidet fra 7 til 8 spørsmål. Artikkellenker fra 3 til 12.

### Fase C — åtte nye artikler

Om pris, forsikring, internkontroll, ansvarsfordeling, forberedelse, rehabilitering,
avvikshåndtering og sameie kontra borettslag. 823–1 115 ord hver. Alle med FAQ,
`FAQPage`-schema og krysslenker.

**Publiseringsdatoene er spredt med to dagers mellomrom fram til 29. september.** De 34
eksisterende artiklene ble publisert på få dager i august, og nettopp det mønsteret gjør
det sannsynlig at mange står som «Oppdaget – foreløpig ikke indeksert» i Search Console. Å
slippe åtte nye samme dag ville forsterket signalet.

### Fase D — ni nye lokale sider

Fire lokale borettslagssider for Fredrikstad, Sarpsborg, Halden og Moss. Tallene er hentet
fra Brønnøysundregistrene og SSB, ikke gjettet:

| Kommune | Borettslag | Sameier | Blokkleiligheter | Det som skiller |
|---|---|---|---|---|
| Fredrikstad | 214 | 499 | 8 198 | 40 % bygget etter 2010 |
| Sarpsborg | 226 | 200 | 5 364 | Flest borettslag i fylket, tydelig syttitallspreg |
| Halden | 99 | 154 | 2 455 | 16 % fra før 1901 — bygårdene på Sørsiden |
| Moss | 141 | 289 | 8 549 | Todelt: nybygg og sekstitall |

Det gir reell forskjell mellom sidene. Halden har fem ganger så stor andel førkrigsbygg
som nabobyene; Fredrikstad og Moss handler om reklamasjonsfrist, ikke slitasje.

Pluss fem generelle lokalsider for Drammen, Lillestrøm, Oslo, Bærum og Asker, med samme
SSB-metode som Østfold-sidene.

### Fase E og F — søkeord og teknisk

**15 av 15 søkeord** dekket i `title` eller `h1`, verifisert med `tools/sjekk-sokeord.js`.
Tre hull ble lukket ved å justere overskrifter, ikke ved å stappe inn ord.

Menypunktet «Borettslag» går nå rett til `/borettslag/` i stedet for bare å åpne et
nedtrekk. Det brøt mobilmenyen — der er nedtrekket eneste vei til undersidene — så
`main.js` er endret slik at første trykk på mobil åpner nedtrekket og andre trykk følger
lenken.

---

## Tilstand nå

| | Før ordren | Nå |
|---|---|---|
| Sider | 71 | **88** |
| Brutte interne lenker | — | **0 av 4 738** |
| JSON-LD som parser | — | **293 av 293** |
| Sider med hopp i overskriftsnivå | — | 0 |
| Tjenestesider med FAQ innenfor kravet | — | 33 av 33 |
| Artikler med tematisk tjenestelenke | — | 42 av 42 |
| Tjenestesider med minst to bloggenker | — | 29 av 29 |
| Søkeord dekket i title eller h1 | — | 15 av 15 |
| Omdirigeringsregler | 79 | 76, alle løkkefrie |

**Lighthouse mot produksjon, 15. september:**

| Side | Perf | Tilgj. | Beste praksis | SEO |
|---|---|---|---|---|
| `/` | 100 | 100 | 100 | 100 |
| `/borettslag/` | 100 | 100 | 100 | 100 |
| `/elkontroll-borettslag-fredrikstad` | 100 | 100 | 100 | 100 |
| `/blogg/hva-koster-elkontroll-borettslag` | 100 | 100 | 100 | 100 |

**Verifisert på den ekte siden etter deploy:**

| Sjekk | Resultat |
|---|---|
| Omdirigeringer fulgt hele veien med `curl -L` | 200 etter 0 eller 1 hopp, ingen løkker |
| `POST /takk` | 200, ikke 301 — skjemaene slipper gjennom |
| Pretty URLs i Netlify | av, ingen omskrevne lenker i kilden |
| Alle 17 nye sider | svarer på både med og uten `.html` |

---

## Hva som gjenstår

### Krever deg, ikke meg

Alt står utdypet i `TIL_DEG.md`.

| | Oppgave | Hvorfor det haster |
|---|---|---|
| 11 | **Pris utenfor Østfold** | De fem nye sidene står uten pris til du sier hva den er |
| 4 | **E-postvarsling i Netlify** | Åtte skjemaer sender ingen varsler før dette er på |
| 1 | **Google Bedriftsprofil** | Verifiseringen tar dager — start nå, ikke når du trenger den |
| 3 | **Search Console** | Se om artiklene fra august faktisk er indeksert |
| 2 | **Anmeldelser** | To til fire i måneden, jevnt. Den eneste posten på lista som ikke kan hastes |

### Faktasjekk

`FAKTASJEKK.md`, **142 punkter**. De fleste er ren avkrysning, men tre er verdt tid:

- **Fastprisen på 5 000 kr** står i `Offer`-schema på elleve sider og kan vises direkte i
  Google. Stemmer den også for hytte på Hvaler?
- **Sertifiseringsomfang.** `README.md` og `llms.txt` oppgir NEK 405-1, -3 og -4.
  Boligtjenesten markedsføres etter NEK 405-2, som ikke står der. Én av de to er feil.
- **De 51 påstandene** merket `<!-- TRENGER LOKALKUNNSKAP -->`. De følger av byggeåret og
  er faglig rimelige, men de bygger ikke på deres oppdragshistorikk. Bytt gjerne ut et
  generelt avsnitt med noe dere faktisk har sett — det er den slags detalj konkurrentene
  ikke kan kopiere.

### Ting jeg ikke fikk til

Sagt rett ut, ikke bortforklart:

- **Ekte SERP fra Google.no.** Søkene mine går fra amerikansk IP, og scraperne er blokkert.
  Rangeringene jeg oppgir er ikke målt. Punkt 9 i `TIL_DEG.md` forklarer hvordan du
  sjekker fra norsk IP på to minutter.
- **Search Console.** Krever deres innlogging. Jeg kan se at domenet er verifisert, men
  ikke hva som står der.
- **PageSpeed Insights mot produksjon.** API-kvoten er brukt opp, og CrUX-data krever
  nøkkel. Lighthouse-tallene over er målt lokalt mot en server med Brotli, som er nærmeste
  tilgjengelige tilnærming til Netlify.

---

## Hvor ting ligger

| Fil | Hva den er |
|---|---|
| `REVISJON.md` | Kartleggingen og alle fasene, seksjon 1–21 |
| `TIL_DEG.md` | De elleve oppgavene du må gjøre selv |
| `FAKTASJEKK.md` | 142 punkter å bekrefte, gruppert i ti seksjoner |
| `BESLUTNINGER.md` | Sju valg jeg tok uten å spørre, med begrunnelse |
| `FJERNET.md` | De to plassholderblokkene, med markup for gjenoppretting |
| `tools/` | Generatorene. Alle er idempotente — kjør på nytt uten frykt |

Sjekkeskriptene er verdt å kjenne til. De tar sekunder og fanger det meste:

```
node tools/sjekk-alt.js          # brutte lenker, JSON-LD, tagbalanse, h1
node tools/sjekk-lenking.js      # intern lenking mellom artikler og tjenestesider
node tools/sjekk-overskrifter.js # hopp i overskriftsnivå
node tools/sjekk-faq.js          # 5–7 spørsmål per tjenesteside
node tools/sjekk-sokeord.js      # de 15 søkeordene
```

`sjekk-alt.js` returnerer exit-kode 1 hvis noe er galt, så den kan settes rett inn i en
byggkommando hvis du vil ha den kjørt automatisk.

---

## Etter deploy

De fire sjekkene i `TIL_DEG.md` punkt 8 er kjørt, og alle er grønne. Verdt å huske til
neste gang: følg alltid omdirigeringene med `curl -L`, ikke bare status på første hopp.
Det var akkurat den snarveien som kostet ni sider i en time.

Det som gjenstår er punkt 11 (pris utenfor Østfold), punkt 4 (e-postvarsling i Netlify) og
punkt 1 (Google Bedriftsprofil). Ingen av dem kan jeg gjøre uten deg.

Husk også at åtte artikler har publiseringsdato fram til 29. september. De ligger ute nå,
men datoene er spredt med vilje — se Fase C over.
