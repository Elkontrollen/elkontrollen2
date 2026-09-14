# REVISJON.md — SEO-revisjon av elkontrollen.no

Seksjon 1–13 er kartleggingen fra **fase 0**. Ingenting på siden ble endret mens den ble laget.
Seksjon 14–18 dokumenterer endringene i de påfølgende fasene.

| Fase | Hva | Seksjon |
|---|---|---|
| 0 | Kartlegging og konkurrentanalyse | 1–13 |
| 1 | Kontaktskjema og e-post | 14 |
| 2 | Åtte lokale landingssider | 15 |
| 3 | `/priser`, `/forsikringsrabatt`, FAQ overalt | 16 |
| 4 | Teknisk SEO | 17 |
| 5 | Oppgaver til eieren | 18 |

**Leveranser:** `REVISJON.md` (denne), `FAKTASJEKK.md` (87 punkter som må bekreftes),
`TIL_DEG.md` (11 oppgaver eieren må gjøre selv).

Dato: 2026-09-14
Repo: `Elkontrollen/elkontrollen2` (branch `main`, HEAD `0529d69`)
Produksjon: https://elkontrollen.no (Netlify, live og svarer 200)

---

## 1. Rammeverk, bygg og innholdsplassering

| | |
|---|---|
| **Rammeverk/generator** | **Ingen.** Håndskrevet statisk HTML. Ingen 11ty/Astro/Hugo/Jekyll, ingen `package.json`, ingen templating. |
| **Byggkommando** | Ingen. `netlify.toml` inneholder kun `[build] publish = "."` — Netlify publiserer repo-roten rått. |
| **Deploy** | Push til `main` på GitHub → Netlify bygger og publiserer. `CNAME` inneholder `elkontrollen.no` (rest fra GitHub Pages-tiden). |
| **Hvor innholdet ligger** | Én `.html`-fil per side i repo-roten, `blogg/` og `borettslag/`. `assets/css/style.css` (35,5 kB, én fil for hele siden), `assets/js/main.js` (714 B), `assets/img/` (12 JPG). |

**Konsekvens for revisjonen:** det finnes **ingen felles layout**. Header, footer, JSON-LD, meta-tagger og nav er kopiert inn i hver enkelt fil. Alt som skal gjelde «på alle sider» (Fase 4: `LocalBusiness`, `BreadcrumbList`, `lang="nb"`) må skrives inn i **59 filer**. Dette gjøres med skript, ikke for hånd.

### Sideinventar (59 HTML-filer)

| Gruppe | Antall | Filer |
|---|---|---|
| Forside | 1 | `index.html` |
| Tjenestesider (rot) | 10 | `elkontroll-bolig`, `elkontroll-boligsalg`, `landbruk`, `naering`, `internkontroll`, `kontrollavtale`, `garantikontroll`, `brannalarm-nodlys`, `elbillading-kontroll`, `fatt-avvik` |
| Trygt Borettslag | 7 | `borettslag/` + `elkontroll/`, `ladeanlegg/`, `brannvern/`, `leiligheter/`, `pris/`, `kartlegging/` |
| Støttesider | 5 | `tjenester`, `om-oss`, `kontakt`, `skjemaer`, `404` |
| Blogg | 35 | `blogg/index.html` + **34 artikler** |
| Internt verktøy | 1 | `skjema/` (noindex, kun for montører) |

> Arbeidsordren sier «rundt 15 tjenestesider og 35 bloggartikler». Reelt: **22 tjeneste-/støttesider** og **34 artikler**. Ingen praktisk betydning, men tallene er rettet her.

---

## 2. sitemap.xml og robots.txt

**`sitemap.xml` — korrekt, men blir foreldet ved hver ny side.**

- 57 URL-er. Full diff mot filsystemet: **ingen manglende og ingen døde URL-er.** De to filene som ikke står der (`404.html`, `skjema/`) er riktig utelatt — begge har `<meta name="robots" content="noindex">`.
- `lastmod` er `2026-08-17`/`2026-08-18` overalt. Ingen `changefreq`. `priority` brukes (Google ignorerer den — harmløst).
- **Håndvedlikeholdt.** Må oppdateres manuelt i Fase 2/3 når lokalsidene, `/priser` og `/forsikringsrabatt` kommer til.

**`robots.txt` — korrekt og gjennomtenkt.**

- `User-agent: * / Allow: /` + eksplisitt `Allow` for GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-User, Claude-SearchBot, Google-Extended, PerplexityBot, Perplexity-User, CCBot, Bytespider.
- `Sitemap:`-direktiv peker riktig.
- Ingen `Disallow` — `skjema/` holdes ute via meta-robots i stedet, som er riktig valg her.

**`llms.txt` finnes** (2,7 kB) med strukturert tjenesteoversikt. Bra — men må oppdateres i Fase 2/3, ellers blir den utdatert.

---

## 3. Schema (JSON-LD)

Alle JSON-LD-blokker på siden **parser uten feil**. Dekningen er slik:

| Type | Hvor | Status |
|---|---|---|
| `Organization` | 57 av 59 sider | ✅ Konsistent: navn, url, logo, telefon, e-post, `PostalAddress`. |
| `ElectricianService` | `index.html`, `kontakt.html` | 🔴 **Ugyldig type.** `ElectricianService` finnes ikke i schema.org. Riktig type er **`Electrician`** (subtype av `LocalBusiness`). Google ignorerer blokken → **siden har i praksis null LocalBusiness-signal i dag.** |
| `Service` | 13 tjenestesider | ✅ Med `serviceType`, `provider`, `areaServed`, `description`. |
| `Offer` | **kun 2** (`elkontroll-bolig`, `elkontroll-boligsalg`) | ⚠️ `"price":"5000","priceCurrency":"NOK"`. Mangler på alle andre sider med pris. |
| `FAQPage` | 13 sider | ✅ 3–5 spørsmål hver. |
| `Article` | 34 artikler | ⚠️ `headline`, `datePublished`, `author`, `publisher`, `description`. **`author` er `Organization`, ikke `Person`** — ingen E-E-A-T-signal, ingen NEK 405-kvalifikasjon oppgitt. Mangler også `dateModified`. |
| `BreadcrumbList` | **ingen steder** | 🔴 Helt fraværende. |
| `LocalBusiness` i felles layout | — | 🔴 Finnes ikke. Kun på 2 av 59 sider, og der med ugyldig type. |

**Det som mangler i LocalBusiness-blokken selv om typen fikses:**

- `geo` (breddegrad/lengdegrad for Lorangløkka 1)
- `openingHours` — **siden oppgir ikke åpningstider noe sted i det hele tatt**
- `areaServed` er bare `["Østfold","Østlandet"]` som løse strenger. Ingen kommuner. Dette er nøyaktig det Fase 2 skal utvide.
- Org.nr (825 176 942) står i footer-teksten, men **ikke i schema** (`vatID`/`identifier`)
- `sameAs` (Google Bedriftsprofil, Proff, 1881) — ingen
- `aggregateRating`/`review` — ingen (og skal ikke finnes opp, jf. arbeidsordren)

### FAQ-dekning per tjenesteside (grunnlag for Fase 3)

| Har FAQ + schema (3–5 spm) | Mangler FAQ helt |
|---|---|
| `elkontroll-bolig` (4), `elkontroll-boligsalg` (5), `landbruk` (5), `naering` (4), `brannalarm-nodlys` (5), `elbillading-kontroll` (5), `garantikontroll` (5), `fatt-avvik` (5), `borettslag/` (7), `borettslag/elkontroll` (3), `borettslag/ladeanlegg` (3), `borettslag/brannvern` (3), `borettslag/leiligheter` (3), `borettslag/pris` (3) | 🔴 `internkontroll`, `kontrollavtale`, `tjenester`, `om-oss`, `kontakt`, `index` |

Fase 3 krever 5–7 spørsmål per tjenesteside. Ingen side når 7 i dag; sju sider ligger på 3–4, og to tjenestesider har ingen.

---

## 4. Title og meta description

**Alle sider unntatt `404.html` har både `<title>` og `<meta description>`. Kun ett duplikat i hele inventaret.**

| Funn | Antall | Detaljer |
|---|---|---|
| 🔴 `<title>` over 60 tegn | **42 av 59** | Kuttes i SERP. Verstinger: 99 tegn (`elkontroll-for-fredede…`), 96 (`avfallshandtering`), 93 (`bensinstasjoner`, `internat`), 92 (`temperatursensor`, `parkeringshus`, `rettspraksis`), 90 (`landbruk.html`), 89 (`fatt-avvik.html`). Forsiden ligger på 63. |
| 🔴 `description` over 155 tegn | **17** | `skjema/` 205 (noindex, uvesentlig), `garantikontroll` 184, `elektriker-eller-kontrollor` 180, `forsikringskrav-elkontroll-landbruk` 180, `tjenester` 180, `internkontroll` 179, `landbruk` 179, `borettslag/leiligheter` 175, `index` 174. |
| 🔴 Duplikat `<title>` | **1 par** | `"Elkontroll-skjema — Elkontrollen"` på både `skjema/index.html` og `skjemaer.html`. Den ene er noindex, så skaden er begrenset, men bør skilles. |
| Duplikat `description` | 0 | ✅ |
| Mangler `description` | 1 | `404.html` (uvesentlig — noindex) |

Hovedårsaken til lengdeproblemet: mønsteret `[full H1-tittel] — Elkontrollen` er brukt mekanisk på alle bloggartikler. Suffikset spiser 14 tegn.

---

## 5. Canonical

| | |
|---|---|
| Har canonical | **57 av 59** ✅ |
| Mangler | `404.html`, `skjema/index.html` — begge noindex, akseptabelt |
| Format | Absolutt, https, riktig domene. Mappesider bruker skråstrek (`/borettslag/`), rotsider bruker `.html`. |

### 🔴 Det alvorligste tekniske funnet: canonical er i konflikt med interne lenker

**Netlify «Pretty URLs» er slått på i produksjon.** Netlify skriver om HTML-en etter deploy. Repoet inneholder:

```html
<a href="elkontroll-bolig.html">Elkontroll bolig</a>
```

men produksjon serverer:

```html
<a href='/elkontroll-bolig'>Elkontroll bolig</a>
```

Samtidig sier canonical på den siden:

```html
<link rel="canonical" href="https://elkontrollen.no/elkontroll-bolig.html">
```

Verifisert med curl:

| URL | Svar |
|---|---|
| `https://elkontrollen.no/elkontroll-bolig` | **200** (ingen redirect) |
| `https://elkontrollen.no/elkontroll-bolig.html` | **200** |
| `https://elkontrollen.no/index.html` | **200** (ingen redirect til `/`) |
| `https://www.elkontrollen.no/` | 301 → `https://elkontrollen.no/` ✅ |
| `http://elkontrollen.no/` | 301 → https ✅ |

**Hver eneste side er altså tilgjengelig på to URL-er som begge svarer 200, og all intern lenkekraft peker på den varianten canonical sier ikke er den riktige.** Google må gjette. Dette er sannsynligvis en medvirkende årsak hvis sider står som «Oppdaget – foreløpig ikke indeksert» i Search Console (jf. Fase 5, punkt 3).

**Tiltak i Fase 4:** enten (a) `_redirects` med 301 fra `.html` til penn URL + oppdater alle canonical til penn form, eller (b) skru av Pretty URLs i Netlify. Alternativ (a) er å foretrekke — penne URL-er er bedre uansett, og arbeidsordren tillater `_redirects`. **`_redirects` finnes ikke i repoet i dag.**

---

## 6. H1

**58 av 59 sider har nøyaktig én `h1`.** ✅

| Avvik | Side | Detalj |
|---|---|---|
| 2 × `h1` | `skjema/index.html` | «Kontrollskjema — kun for montører» og «Elkontroll». Siden er `noindex, nofollow` — ingen SEO-skade, men bør ryddes for tilgjengelighet. |

**Overskriftshierarkiet er derimot brutt overalt:** footeren bruker `<h5>` for kolonneoverskriftene («Tjenester», «Selskap», «Kontakt») rett etter `<h4>`-elementer i brødteksten. Lighthouse flagger `heading-order` med score 0 på **både mobil og desktop**. Dette gjentas i footeren på alle 59 sider.

**H1-tekst og søkeord:** flere tjenestesider har merkevarepreget H1 uten søkeordet — f.eks. `garantikontroll.html` → «Sjekk anlegget før regningen blir din», `naering.html` → «Ulike bygg, ulike krav — vi kjenner forskjellen», `kontrollavtale.html` → «Du har ansvaret for flere anlegg. Vi holder oversikten.» Effektivt språk, men søkeordet mangler i H1. Ikke kritisk, og arbeidsordren sier ikke redesign — noteres til vurdering.

---

## 7. Intern lenking

Header og footer lenker til alle tjenestesider fra alle sider. Det er **lenker i brødteksten** som teller redaksjonelt, og der er bildet svakt. Målt ved å strippe bort `<head>`, `<header>`, `<footer>` og `<script>`:

### Blogg → tjenestesider

| Funn | Antall |
|---|---|
| Artikler med ≥1 tjenestelenke i brødteksten | 34 av 34 ✅ |
| Artikler der **eneste** tjenestelenke er `/kontakt` (generisk CTA, ikke tematisk) | **24 av 34** 🔴 |
| Artikler med tematisk relevant tjenestelenke | 10 |
| Artikler med **0** lenker til andre bloggartikler | **34 av 34** 🔴 |

De 24 med bare `/kontakt` er i praksis blindveier. Eksempel: `elkontroll-for-hoteller…`, `elkontroll-for-butikklokaler`, `elkontroll-for-lagerbygg` og alle de andre bygningstype-artiklene burde lenke til `naering.html` — de gjør det ikke.

De 10 som gjør det riktig: `dle-tilsyn-bedrift` → internkontroll, `fatt-palegg-fra-eltilsynet` → fatt-avvik, `forsikringskrav-elkontroll-landbruk` → landbruk, `temperatursensor-sikringsskap` → landbruk, `hva-sjekker-en-termografor` → kontrollavtale, `hvor-ofte-elkontroll-borettslag` → borettslag, `ladeanlegg-borettslag-kontroll` → borettslag, `styrets-ansvar…` → borettslag, `arlig-kontroll-av-brannalarm…` → borettslag, `kan-et-darlig-elektrisk-anlegg…` → elkontroll-boligsalg.

### Tjenestesider → blogg

| Side | Bloggenker i brødtekst |
|---|---|
| `landbruk.html` | 2 ✅ |
| `elkontroll-boligsalg.html` | 1 |
| `fatt-avvik.html` | 1 |
| **Alle 19 øvrige** — `index`, `tjenester`, `elkontroll-bolig`, `naering`, `internkontroll`, `kontrollavtale`, `garantikontroll`, `brannalarm-nodlys`, `elbillading-kontroll`, `om-oss`, `kontakt`, `skjemaer` og alle 7 `borettslag/`-sider | **0** 🔴 |

Fase 4 krever minst to bloggenker per tjenesteside. Gapet er 19 sider × 2 = **38 lenker som må skrives**, pluss tematiske tjenestelenker i 24 artikler.

`blogg/index.html` lenker til alle 34 artikler — ingen foreldreløse artikler. ✅

---

## 8. Lighthouse (mot produksjon, 2026-09-14)

Kjørt med Lighthouse 13.4.1, headless Chrome, mot `https://elkontrollen.no/`.

| Kategori | Mobil | Desktop | Mål |
|---|---|---|---|
| Performance | **96** ✅ | **100** ✅ | 95+ |
| Accessibility | **91** 🔴 | **94** 🔴 | 95+ |
| Best Practices | **100** ✅ | **100** ✅ | 95+ |
| SEO | **100** ✅ | **100** ✅ | 95+ |

### Metrikker

| | Mobil | Desktop |
|---|---|---|
| FCP | 2,2 s | 0,6 s |
| LCP | 2,2 s | 0,6 s |
| TBT | 0 ms | 0 ms |
| CLS | 0,001 | 0,002 |
| Speed Index | 2,7 s | 0,8 s |
| Server-respons | 300 ms | 50 ms |

Utgangspunktet er sterkt. **Kun Accessibility står mellom siden og 95+ på alle fire.** Tre konkrete feil, alle i felles header/footer og dermed på alle 59 sider:

1. **`heading-order` (score 0, mobil + desktop)** — `<h5>` i footeren etter `<h4>` i brødteksten.
2. **`landmark-one-main` (score 0, mobil + desktop)** — **ingen `<main>`-element på noen side i hele repoet** (verifisert: 0 treff på `<main` i alle 59 filer).
3. **`target-size` (score 0, kun mobil)** — `<button class="menu-toggle" aria-label="Meny">` er for liten. CSS-en (`assets/css/style.css:77`) setter kun `font-size:26px`, ingen `min-width`/`min-height`. Dette er hele forskjellen mellom 91 på mobil og 94 på desktop.

Ingen feil på `color-contrast`, `link-name`, `button-name`. ✅

### Ytelse — render-blokkering (est. 680 ms mobil / 290 ms desktop)

| Ressurs | Sparepotensial |
|---|---|
| `fonts.googleapis.com/css2?family=Space+Grotesk…&IBM+Plex+Sans…` | **922 ms** |
| `assets/css/style.css` (7,0 kB komprimert) | — |
| `assets/js/main.js` (828 B) — lastes uten `defer`/`async` (`index.html:301`) | — |

Brotli-komprimering er aktiv (18,4 kB → 4,1 kB på forsiden). ✅ CSS/JS er ikke minifisert, men er så små at det ikke betyr noe.

---

## 9. Bilder

**Siden bruker bare 10 `<img>`-tagger totalt, alle på `tjenester.html`.** Forsiden, alle andre tjenestesider og alle 34 bloggartikler er bildeløse (ikoner er inline SVG). Det er hovedgrunnen til at ytelsen er så god.

| Krav | Status |
|---|---|
| Moderne format (WebP/AVIF) | 🔴 **0 av 12.** Alle er JPG. |
| Komprimert | 🔴 Nei. 8 av 12 ligger på 210–280 kB. Totalt 2,8 MB i repoet. |
| Meningsfull alt-tekst | ⚠️ Alle 10 har `alt`, men de er generiske stockbilde-beskrivelser: «Boligområde i Norge», «Næringsbygg», «Røykdetektor i tak». Én sier «Næringsbygg i Oslo» på en side som markedsfører Halden og Østfold. |
| `width` + `height` | 🔴 **0 av 10.** CLS er likevel 0,001 fordi CSS setter dimensjoner — men attributtene kreves eksplisitt i Fase 4. |
| `loading="lazy"` | ✅ Alle 10 har det (også de over folden på `tjenester.html` — burde vært `eager` på den første). |

### 🔴 Fem bloggartikler har `og:image` som gir 404

Verifisert mot produksjon — alle fire filnavnene svarer **404**:

| Manglende fil | Refereres fra |
|---|---|
| `assets/img/elkontroll-bolig.jpg` | `blogg/elektriker-eller-kontrollor.html` |
| `assets/img/elkontroll-landbruk.jpg` | `blogg/forsikringskrav-elkontroll-landbruk.html`, `blogg/temperatursensor-sikringsskap.html` |
| `assets/img/internkontroll.jpg` | `blogg/internkontroll-elektro-sma-bedrifter.html` |
| `assets/img/termografi.jpg` | `blogg/hva-sjekker-en-termografor.html` |

Disse fem artiklene får ingen forhåndsvisning ved deling på Facebook, LinkedIn eller i Slack.

### ⚠️ Fem filnavn peker på samme bilde

`brannalarm-nodlys-sentral.jpg`, `om-oss-elektriker.jpg`, `service-brannalarm-nodlys.jpg`, `service-elkontroll-bolig.jpg` og `sikringsskap-norsk.jpg` har **identisk md5** (1400×2373, 274 kB). Det samme gjelder `kontrollavtale-kontorbygg.jpg` = `naering-kontorbygg.jpg`.

Følgen: forsidens `og:image` er `service-elkontroll-bolig.jpg` — som altså er det samme bildet som brukes for «brannalarm» og «om oss». Det er dessuten **portrettformat (1400×2373)**, mens sosiale delinger vil ha ca. 1200×630 landskap.

`sikringsskap-norsk.jpg` refereres ikke fra noen fil — død vekt.

---

## 10. Kontaktskjema

Åtte skjemaer sender til Netlify Forms. To til ligger i det interne montørverktøyet `skjema/` og går ikke via Netlify (passordport + PDF-generering i JS) — de er utenfor revisjonens omfang.

| Skjema | Fil | Netlify-navn | Status ved kartlegging |
|---|---|---|---|
| Bestilling bolig | `elkontroll-bolig.html` | `elkontroll-bolig-bestilling` | ✅ Netlify Forms |
| Bestilling boligsalg | `elkontroll-boligsalg.html` | `elkontroll-boligsalg-bestilling` | ✅ Netlify Forms |
| Avviksskjema | `fatt-avvik.html` | `fatt-avvik` | ✅ Netlify Forms (`multipart/form-data`) |
| Tilbud landbruk | `landbruk.html` | `landbruk-tilbud` | ✅ Netlify Forms |
| Tilbud næring | `naering.html` | `naering-tilbud` | ✅ Netlify Forms |
| Last ned styrets sjekkliste | `borettslag/index.html` | `borettslag-sjekkliste` | ✅ Netlify Forms |
| Gratis kartlegging | `borettslag/kartlegging/index.html` | `borettslag-kartlegging` | ✅ Netlify Forms |
| **Kontaktskjema** | **`kontakt.html`** | — | 🔴 **`<form action="mailto:post@elkontrollen.no" method="post" enctype="text/plain">`** |

De sju som virket, har alle: `data-netlify="true"`, `name="…"`, `netlify-honeypot="bot-field"`, skjult `<input type="hidden" name="form-name">` og AJAX-innsending via `fetch("/", …)`. Riktig oppsett.

**`kontakt.html` var unntaket.** `mailto:`-skjemaer åpner brukerens e-postklient med rå tekst i kroppen. På mobil og for alle som bruker webmail uten registrert `mailto:`-handler skjer det ingenting i det hele tatt. Henvendelser fra hovedkontaktsiden gikk tapt. **Rettet i Fase 1 — se seksjon 14.**

Andre funn ved kartleggingen:

- **Ingen takkeside.** `/takk` fantes ikke. Ingen av skjemaene hadde `action="/takk"` — de sju Netlify-skjemaene håndterer kvittering i JS. **Takkeside laget i Fase 1.**
- **Ingen Resend-integrasjon** noe sted. Arbeidsordrens «hvis det finnes en Resend-integrasjon som fungerer» er ikke aktuell her.
- **E-postvarsling i Netlify må bekreftes aktivert.** `README.md` dokumenterer steget som manuelt, men det kan ikke verifiseres herfra — det ligger i Netlify-panelet. Ført videre til `TIL_DEG.md`.

---

## 11. Lokale landingssider — nåsituasjon

**Ingen finnes.** Det er ingen `/elkontroll-[sted]`-side, ingen «områder vi dekker»-side, og ingen side som nevner Fredrikstad, Sarpsborg eller Moss i `title` eller `h1`.

Stedsdekningen uttrykkes utelukkende som varianter av formuleringen **«Halden-basert, dekker Østfold og Østlandet»** — i footer, i tre meta descriptions, i `areaServed`-schema og i `llms.txt`. Halden nevnes i `<title>` på forsiden og på `landbruk.html`. Ingen enkeltkommune utover Halden er nevnt noe sted.

Dette bekrefter premissen i arbeidsordren: hele Fase 2 bygges fra null.

---

## 12. Konkurrentanalyse

### Metodisk forbehold — les dette først

Søkeverktøyene i dette miljøet **kan ikke gi en ekte Google.no-rangering**. Verktøyets websøk er USA-basert, og forsøk på å hente norsk SERP direkte (DuckDuckGo med `kl=no-no`, Bing med `setmkt=nb-NO`) ble blokkert etter de første kallene. Ett DuckDuckGo-kall for «elkontroll Fredrikstad» gikk gjennom før blokkeringen.

Tabellen under er derfor **en kartlegging av hvem som konkurrerer og hva de gjør**, verifisert ved å hente og lese konkurrentenes faktiske nettsider. Den er **ikke** en rangeringsmåling. Antall Google-anmeldelser kunne ikke hentes for noen av dem — det krever Google Maps, som ikke er tilgjengelig herfra.

👉 **Eieren må ta en rangeringssjekk selv fra norsk IP.** Konkret oppgave lagt i `TIL_DEG.md`.

### Hvem konkurrerer

| Firma | Domene | Profil | Lokale sider? | Priser synlig? | Google-anmeldelser | Dekker |
|---|---|---|---|---|---|---|
| **Odin Elektro** | odin-elektro.no | Elektriker (Gressvik v/Fredrikstad), NEK 405-2 | ⚠️ **Én** kombinert side `/aktuelt/elkontroll-bolig` som målretter Fredrikstad + Sarpsborg + Moss samtidig | ❌ Nei — «fastpris» og priskalkulator nevnes, ingen beløp | Ikke verifisert | Fredrikstad, Sarpsborg, Moss, Gressvik |
| **Elsjekk AS** | elsjekk-as.no | **Uavhengig kontrollforetak** — nærmeste direkte konkurrent i profil | ❌ Ingen. Fredrikstad står kun i `<title>` | ❌ Nei | Ikke verifisert | Oslo, Drammen, Østfold. Adresse i Oslo |
| **Elkontrollørene** | elkontrollørene.no | Elektroinstallatør, elkontroll NEK 405-2 + termografi | ❌ Ingen | ❌ Nei. Kun «10 % rabatt» til meglere | Ikke verifisert | Østlandet. Adresse Oslo |
| **Sarpsborg Elektro** | sarpsborgelektro.no | Elektriker med el-kontroll | ❌ Ingen (stedsnavn i `<title>`) | ❌ Nei | Ikke verifisert | Sarpsborg, Fredrikstad, Råde, Moss |
| **ZK Elektro** | zkelektro.no | Elektriker | ❌ Ingen | ❌ Nei | Ikke verifisert | Moss-området |
| **Moss Elektro** | mosselektro.no | Elektriker, «el-sjekk» privat | ❌ Ingen | ❌ Nei | Ikke verifisert | Moss |
| **Erik Laursen (takst)** | thermografering.no | Takstmann/byggmester, termografering | ❌ Ingen | ❌ Nei | Ikke verifisert | Sarpsborg, Fredrikstad, **Halden** |
| **Elkonor / Elektroimportøren** | elkonor.no, elektroimportoren.no | Nasjonale kjeder med sterke forklaringssider om elkontroll | ❌ Ikke for Østfold | ❌ Nei | — | Landsdekkende |

**Kataloger og aggregatorer som også konkurrerer om de samme søkene:** `sjekkscore.no/elektriker/fredrikstad`, `handverker.fixa.no/elkontroll/fredrikstad` og `/moss`, `1881.no/elektriker/elektriker-oestfold/elektriker-moss`, `boligsmart.no/pris/elkontroll`, `proff.no`.

### Hva dette betyr

**1. Ingen i Østfold har ordentlige lokale landingssider.** Odin Elektro er nærmest, med én side som stapper tre bynavn inn i samme tekst uten stedsspesifikt innhold (verifisert: bynavn gjentas, men ingen bydeler, ingen boligmasse, ingen lokale forhold). Fase 2 — åtte separate sider med reelt lokalt innhold — har **ingen direkte motstykke hos noen konkurrent.** Dette er det klareste åpne feltet.

**2. Ingen viser pris.** Ikke én av de åtte. Feltet eies i dag av aggregatoren `boligsmart.no`, som oppgir **4 000–8 000 kr for kontroll inntil 150 m²**. Ett firma i markedet oppgir 3 400 kr for leilighet / 4 400 kr for enebolig (NEK 405-2, 2026-priser). Elkontrollens fastpris på **5 000 kr ligger midt i intervallet** og tåler å stå åpent. At `/priser` (Fase 3) skal vise beløp uten skjema, er derfor en reell differensiator — ikke bare en SEO-øvelse.

**3. De fleste konkurrentene er elektrikere, ikke kontrollører.** Odin Elektro, Sarpsborg Elektro, ZK Elektro og Moss Elektro installerer og utbedrer. Elkontroll er en sidetjeneste. Elsjekk AS er det eneste uavhengige kontrollforetaket i utvalget, og markedsfører nettopp uavhengigheten: «vi er et uavhengig foretak» uten interessekonflikt i vurderingene. Elkontrollen har samme posisjon og bør bruke den like eksplisitt — særlig i møte med konkurrenter som tjener penger på avvikene de selv finner. Artikkelen `elektriker-eller-kontrollor.html` dekker dette allerede, men lenkes i dag **kun til `/om-oss`** fra brødteksten.

**4. Forsikringsrabatt er udekket hos alle.** Ingen av de åtte har en egen side om det. Elkontrollørene nevner 10 % rabatt, men til *meglere*, ikke til forsikringskunder. Fase 3-siden `/forsikringsrabatt` treffer et helt åpent felt.

**5. Aggregatorene er den reelle konkurrenten.** For søk uten sterk lokal Google-bedriftsprofil er det `fixa`, `sjekkscore`, `1881` og `boligsmart` som fyller topplasseringene. De slås ikke med tekst alene — det krever Google Bedriftsprofil med jevn tilstrømning av anmeldelser (Fase 5, punkt 1 og 2). Arbeidsordrens vurdering av at bedriftsprofilen er viktigere enn resten av lista, stemmer med det som er observert.

---

## 13. Samlet prioritering ut av Fase 0

Rangert etter effekt per innsats, med de tekniske funnene som ikke sto i arbeidsordren løftet opp der de hører hjemme.

| # | Tiltak | Fase | Hvorfor |
|---|---|---|---|
| 1 | Google Bedriftsprofil + anmeldelser | 5 | Eneste veien forbi aggregatorene. Eieren må gjøre det. |
| 2 | 8 lokale landingssider med reelt stedsinnhold | 2 | Helt udekket søkeintensjon. Ingen konkurrent gjør dette skikkelig. |
| 3 | **Fiks canonical-konflikten** (`_redirects` + penne URL-er) | 4 | Ikke i arbeidsordren. Alle 59 sider finnes på to URL-er som begge svarer 200, og intern lenkekraft peker feil vei. Kan være årsaken til indekseringsproblemer. |
| 4 | **Rett `ElectricianService` → `Electrician`** | 4 | Ikke i arbeidsordren. Siden har null gyldig LocalBusiness-signal i dag. To linjers rettelse. |
| 5 | Fiks `kontakt.html` (Netlify Forms + `/takk`) | 1 | Henvendelser fra hovedkontaktsiden går tapt i dag. |
| 6 | `/priser` og `/forsikringsrabatt` | 3 | Høy kjøpsintensjon, null konkurranse. |
| 7 | Intern lenking: 38 bloggenker fra tjenestesider + tematiske lenker i 24 artikler | 4 | Største strukturelle svakhet i eksisterende innhold. |
| 8 | Accessibility 91 → 95+ (`<main>`, footer-`h5`, `menu-toggle`-størrelse) | 4 | Tre konkrete feil, alle i felles header/footer. Eneste hinder for 95+ på alle fire. |
| 9 | Titler ned under 60 tegn (42 sider), descriptions under 155 (17 sider) | 4 | Mekanisk, skriptbart. |
| 10 | Bilder: fiks 5 × 404 på `og:image`, konverter til WebP, legg på `width`/`height` | 4 | Delinger er ødelagt i dag. |
| 11 | FAQ til 5–7 spørsmål på alle tjenestesider (2 mangler helt, 7 har 3–4) | 3 | |
| 12 | `Article`-schema: `author` som `Person` med NEK 405-kvalifikasjon, `dateModified` | 4 | |
| 13 | `BreadcrumbList` på alle sider | 4 | Fraværende. |
| 14 | `lang="no"` → `lang="nb"` på alle 59 filer | 4 | Skriptbart. |

**Forutsetning som gjelder hele revisjonen:** det finnes ingen felles layout. Alt som skal gjelde på tvers av sider, må skrives inn i 59 filer med skript. Hver fase bør avsluttes med et verifiseringsskript som bekrefter at endringen faktisk traff alle filene.

---

## 14. Fase 1 — kontaktskjema og e-post (utført)

### Endringer

**`kontakt.html` — skjemaet er flyttet fra `mailto:` til Netlify Forms.**

Før:

```html
<form action="mailto:post@elkontrollen.no" method="post" enctype="text/plain">
```

Etter:

```html
<form name="kontakt" method="POST" action="/takk" data-netlify="true" data-netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="kontakt">
  <p style="display:none;"><label>Ikke fyll ut dette feltet: <input name="bot-field"></label></p>
```

| Krav fra arbeidsordren | Status |
|---|---|
| `data-netlify="true"` og `name="kontakt"` | ✅ |
| Skjult honeypot `data-netlify-honeypot="bot-field"` | ✅ Med tilhørende `<input name="bot-field">` i et `display:none`-avsnitt |
| Alle felt har `name` | ✅ `Navn`, `E-post`, `Telefon`, `Gjelder`, `Melding` — uendret fra før, alle navngitt |
| Takkeside `/takk` + `action="/takk"` | ✅ Ny fil `takk.html`. Netlify serverer den på `/takk` (samme mekanisme som gjør at `/elkontroll-bolig` svarer 200 — verifisert i seksjon 5) |

**Merk om attributtnavnet:** de sju eksisterende skjemaene bruker `netlify-honeypot`. Arbeidsordren ba eksplisitt om `data-netlify-honeypot` på kontaktskjemaet, og den skrivemåten er brukt her. Begge er gyldige og gjør det samme — Netlify godtar begge. De eksisterende skjemaene er ikke rørt, i tråd med «ikke bygg om noe som virker».

**Hvorfor vanlig POST og ikke AJAX:** de sju andre skjemaene sender via `fetch("/", …)` og viser kvittering i JS. Kontaktskjemaet bruker i stedet en vanlig skjemainnsending med `action="/takk"`, slik arbeidsordren spesifiserer. Det er robust uten JavaScript, og det gir en egen URL å måle konvertering på i Search Console og Analytics.

**Ny fil: `takk.html`**

- Samme header, footer og CSS som resten av siden — ingen visuelle endringer, ingen nye klasser utover det `style.css` allerede definerer.
- `<meta name="robots" content="noindex, follow">` — takkesider skal ikke indekseres, men skal fordele lenkekraft videre.
- Ikke lagt inn i `sitemap.xml`, av samme grunn.
- Én `h1`, canonical, OG-/Twitter-tagger og `Organization`-schema, i tråd med resten av siden.
- Lenker videre til prisguiden, «el-sjekk vs. elkontroll» og tjenesteoversikten, slik at siden ikke blir en blindvei.

**`README.md`** er oppdatert — avsnittet som sa at `kontakt.html` fortsatt bruker `mailto:`, beskriver nå den faktiske løsningen.

### 🔴 Eieren må aktivere e-postvarsling i Netlify

**Dette kan ikke gjøres fra kode.** Skjemainnsendinger lagres i Netlify uansett, men **det sendes ingen e-post før varsling er satt opp manuelt i panelet.** Uten dette steget må noen huske å logge inn og sjekke innboksen i Netlify — henvendelser blir liggende ulest.

Slik gjøres det:

1. Logg inn på [app.netlify.com](https://app.netlify.com) og velg siten for elkontrollen.no.
2. Gå til **Site configuration → Forms → Form notifications**.
3. Velg **Add notification → Email notification**.
4. Sett **Email to notify** til `post@elkontrollen.no`.
5. Velg hvilket skjema varslingen gjelder — og **gjenta for hvert av de åtte skjemaene**:

   | # | Skjemanavn i Netlify | Side |
   |---|---|---|
   | 1 | `kontakt` | `/kontakt` — **ny, må legges til** |
   | 2 | `elkontroll-bolig-bestilling` | `/elkontroll-bolig` |
   | 3 | `elkontroll-boligsalg-bestilling` | `/elkontroll-boligsalg` |
   | 4 | `fatt-avvik` | `/fatt-avvik` |
   | 5 | `landbruk-tilbud` | `/landbruk` |
   | 6 | `naering-tilbud` | `/naering` |
   | 7 | `borettslag-sjekkliste` | `/borettslag/` |
   | 8 | `borettslag-kartlegging` | `/borettslag/kartlegging/` |

6. Send en testmelding gjennom kontaktskjemaet og bekreft at den både lander under **Forms → kontakt** i Netlify **og** kommer inn på `post@elkontrollen.no`.

Skjemanavnet `kontakt` dukker først opp i Netlify-panelet **etter første deploy med det nye skjemaet**, og for noen skjematyper først etter første innsending. Gjør derfor punkt 6 før punkt 5 hvis `kontakt` ikke er i lista.

Denne oppgaven er også ført opp i `TIL_DEG.md`.

---

## 15. Fase 2 — lokale landingssider (utført)

Åtte lokale landingssider og én oversiktsside. Dette var revisjonens viktigste oppgave,
og feltet er helt åpent: ingen av konkurrentene i Østfold har ordentlige lokale sider
(se seksjon 12).

### Sidene

| Prio | URL | Kommune | Boliger | Fritidsbygg | Gårdsbruk | Fra Halden | Stedsprosa |
|---|---|---|---|---|---|---|---|
| 1 | [`/elkontroll-fredrikstad`](https://elkontrollen.no/elkontroll-fredrikstad.html) | Fredrikstad | 40 250 | 4 493 | 184 | 36 km | 504 |
| 2 | [`/elkontroll-sarpsborg`](https://elkontrollen.no/elkontroll-sarpsborg.html) | Sarpsborg | 27 531 | 2 819 | 251 | 31 km | 466 |
| 3 | [`/elkontroll-halden`](https://elkontrollen.no/elkontroll-halden.html) | Halden | 16 799 | 1 903 | 177 | — | 455 |
| 4 | [`/elkontroll-moss`](https://elkontrollen.no/elkontroll-moss.html) | Moss | 25 193 | 1 528 | 86 | 61 km | 458 |
| 5 | [`/elkontroll-indre-ostfold`](https://elkontrollen.no/elkontroll-indre-ostfold.html) | Indre Østfold | 21 982 | 1 571 | 546 | 56 km | 454 |
| 6 | [`/elkontroll-rakkestad`](https://elkontrollen.no/elkontroll-rakkestad.html) | Rakkestad | 4 143 | 301 | 265 | 39 km | 437 |
| 7 | [`/elkontroll-hvaler`](https://elkontrollen.no/elkontroll-hvaler.html) | Hvaler | 2 587 | 4 479 | 18 | 63 km | 450 |
| 8 | [`/elkontroll-aremark`](https://elkontrollen.no/elkontroll-aremark.html) | Aremark | 755 | 750 | 54 | 26 km | 380 |

Kolonnen «Stedsprosa» er antall ord i innhold som er unikt for stedet — ingress,
områdebeskrivelse, boligmasseanalyse og funn-avsnitt. Mal, FAQ, tjenestekort og CTA
er holdt utenfor.

I tillegg: **`/omrader`** — oversiktsside med kort per kommune, en tabell over
bygningsmassen i tall, og fire FAQ-punkter om dekningsområde.

### Hvordan sidene unngår å bli tynne

Arbeidsordren advarte eksplisitt: «Hvis sidene bare er samme tekst med byttet stedsnavn,
blir de tynne, rangerer dårlig og kan skade hele domenet.» Det er håndtert på to måter.

**1. Innholdet er bygget på faktiske tall per kommune.**

| Kilde | Hva den gir |
|---|---|
| SSB tabell 06266 (2026) | Antall boliger per kommune, fordelt på 13 byggeårsintervaller |
| SSB tabell 03174 (2026) | Antall fritidsbygg per kommune |
| SSB tabell 08646 (2025) | Antall jordbruksbedrifter per kommune |
| Store norske leksikon | Tettsteder, bosetningsmønster, industrihistorie, vernet bebyggelse |
| OSRM | Kjøreavstand og -tid fra Halden sentrum |

Det gir hver side noe å si som bare gjelder der. Eksempler på funn som faktisk
differensierer sidene:

- **Fredrikstad** har 3 603 boliger fra 1900 eller tidligere — en tredjedel av hele Østfolds eldste boligmasse.
- **Sarpsborg** har 31 prosent av boligmassen fra 1961–1980, høyest andel i utvalget.
- **Hvaler** har 4 479 fritidsbygg mot 2 587 boliger — nesten to hytter per helårsbolig.
- **Aremark** har 17 prosent av boligene fra før 1901, høyest andel i utvalget, og omtrent én hytte per bolig.
- **Indre Østfold** har 546 jordbruksbedrifter, klart flest i fylket.
- **Rakkestad** har 265 gårdsbruk på drøyt 8 500 innbyggere — omtrent ett per 32 innbygger.

**2. Overlappet er målt, ikke antatt.**

Målt på 5-gram over ren stedsprosa er **høyeste overlapp mellom to sider 5,8 prosent**
(Fredrikstad mot Moss). Med mal, navigasjon, FAQ og tjenestekort inkludert stiger tallet
til 20–35 prosent, men det er felles struktur — ikke duplisert brødtekst.

| Mål | Resultat |
|---|---|
| Stedsspesifikke avsnitt per side (krav: minst 3) | 4 på alle åtte |
| Ord unik stedsprosa per side | 380–504 |
| Høyeste 5-gram-overlapp, ren prosa | 5,8 % |

### Hva hver side inneholder

| Element | Detalj |
|---|---|
| `h1` med søkeordet | «Elkontroll i Fredrikstad — …» på alle åtte |
| Pris uten å scrolle | Fastpris 5 000 kr i `buybox` i hero, synlig over folden |
| Tallbånd | Tre SSB-tall per kommune rett under hero |
| Områdedekning | 5–14 navngitte bydeler/tettsteder per side, som `area-tags` |
| Boligmasseanalyse | Fire avsnitt med SSB-tall koblet til hva byggeåret betyr elektrisk |
| Typiske funn | Tre punkter — **alle merket med `<!-- TRENGER LOKALKUNNSKAP -->`** |
| Reisetid | Avstand fra Halden, med logistikk |
| Tjenestelenker | Seks tjenestekort, prioritert etter stedet (landbruk først i Rakkestad og Indre Østfold) |
| Bloggenker | Tre artikler per side, valgt etter tema |
| FAQ | Fem spørsmål per side, med `FAQPage`-schema |
| Schema | `Organization`, `Service` med `areaServed` og `Offer` (5 000 kr), `FAQPage` |

`areaServed` på hver lokalside inneholder kommunen som `AdministrativeArea` pluss de
seks første stedsnavnene som `Place`.

### Intern lenking

- **Forsiden** har fått en ny seksjon `#omrader` med lenke til alle åtte sidene og til oversikten. Dette dekker arbeidsordrens punkt «Lenk fra forsiden til en oversikt over områder dere dekker» — og gir i tillegg direkte inngang til hver enkelt side, noe som er bedre for indeksering enn én enkelt lenke.
- **Footeren på alle 67 sider** har fått «Områder vi dekker» i Selskap-kolonnen. `404.html` og `skjema/` har ingen slik footer og er utelatt.
- Hver lokalside lenker til seks tjenestesider og tre bloggartikler.
- Hver lokalside lenker nederst til `/omrader`.

### areaServed i LocalBusiness

`areaServed` i `LocalBusiness`-blokken på `index.html` og `kontakt.html` er utvidet fra
`["Østfold","Østlandet"]` til ti `AdministrativeArea`-objekter: de åtte kommunene pluss
Østfold og Østlandet.

> **Merk:** blokken har fortsatt den ugyldige typen `ElectricianService` (seksjon 3). Så
> lenge typen er ugyldig, leser ikke Google `areaServed` i det hele tatt. Typefiksen står
> i fase 4, og det er først da denne utvidelsen får effekt.

### Oppdatert

- **`sitemap.xml`** — ni nye URL-er (8 lokalsider med `priority` 0.9, oversikten med 0.8). Sitemap har nå 66 URL-er, og full diff mot filsystemet viser ingen manglende og ingen døde. `takk.html`, `404.html` og `skjema/` er utelatt — alle tre er `noindex`.
- **`llms.txt`** — ny «Områder»-seksjon med alle ni sidene.

### Generatoren

Sidene er generert, ikke håndskrevet. Det er nødvendig fordi siden ikke har felles layout
(seksjon 1) — header og footer måtte ellers vedlikeholdes ni steder til.

| Fil | Rolle |
|---|---|
| `tools/steder.json` | Tall og stedsnavn per kommune, med kildeangivelse |
| `tools/innhold-steder.js` | All prosa. **Her rettes tekst — ikke i HTML-filene.** |
| `tools/bygg-lokalsider.js` | Generator. Henter header og footer fra `om-oss.html`, så navigasjonen alltid følger resten av siden |
| `tools/faktasjekk-data.json` | Genereres automatisk, brukt som grunnlag for `FAKTASJEKK.md` |

Kjøres med `node tools/bygg-lokalsider.js` fra repo-roten. Generatoren er idempotent.

> `tools/` ligger i repoet og blir dermed publisert på Netlify, siden `publish = "."`.
> Filene inneholder ingen hemmeligheter og er ikke lenket fra noen side. Ryddigere hadde
> vært å holde dem utenfor, men det krever en byggkommando siden hele roten publiseres.

### Verifisering

| Sjekk | Resultat |
|---|---|
| Brutte interne lenker på hele siden | 0 av 2 859 |
| Tagbalanse på nye sider | 10 av 10 OK |
| Nøyaktig én `h1` per side | 10 av 10 |
| JSON-LD parser | 31 blokker, 0 feil |
| `<title>` under 60 tegn | 9 av 9 (42–59 tegn) |
| `meta description` under 155 tegn | 9 av 9 (139–150 tegn) |
| Sitemap mot filsystem | 0 manglende, 0 døde |
| Visuell kontroll | Gjengitt i headless Chrome. Følger eksisterende uttrykk, ingen nye CSS-klasser |

### Faktasjekk

**24 påstander er merket `<!-- TRENGER LOKALKUNNSKAP -->`** i HTML-en — tre per side, alle
under «Det vi typisk finner i …». Disse beskriver Elkontrollens egen erfaring i området og
kan ikke verifiseres utenfra.

Skillet som er trukket: **bygningsmassen er sourcet, funnene i den er det ikke.** At
Fredrikstad har 3 603 boliger fra før 1901 er et SSB-tall. At disse boligene typisk har
skjøter i uinspiserbare hulrom er en faglig slutning eieren må stå inne for.

Til sammen **58 punkter** i `FAKTASJEKK.md`, fordelt på seks kategorier. De to som haster
mest er pris (7 punkter — fastprisen står i `FAQPage`-schema og kan vises direkte i Google)
og sertifiseringsomfang (2 punkter — `README.md` og `llms.txt` ramser opp NEK 405-1, -3 og
-4, mens boligtjenesten markedsføres etter NEK 405-2).

---

## 16. Fase 3 — de kommersielle sidene (utført)

### `/priser` — ny samleside

Prisene lå spredt på tjenestesidene, uten noe sted å se dem samlet. Nå finnes
`/priser` med:

- Fastpris 5 000 kr synlig i hero, over folden
- Prisoversikt for alle ti tjenestene, med standard, pris og merknad
- Hva de 5 000 kronene faktisk dekker — seks kort
- En begrunnelse for hvorfor noen tjenester prises etter tilbud
- Sammenligning mot markedet (4 000–8 000 kr, termografi ofte +2 500 kr)
- Sju FAQ-spørsmål med `FAQPage`-schema
- `Offer`-schema med `price: 5000`, `priceCurrency: NOK` og `eligibleRegion: Østfold`

**Ingen priser er funnet opp.** Alle beløp er hentet fra det som allerede sto på
tjenestesidene. Tjenester uten oppgitt pris står som «Tilbud» — ikke med et gjettet tall.

**Lenket fra hovedmenyen**, slik arbeidsordren ba om. Bloggartikkelen «Hva koster
elkontroll» er beholdt, og de to lenker nå til hverandre: artikkelen har fått en ny
avslutningsblokk som skiller markedsintervallene fra Elkontrollens egne priser og sender
leseren videre til `/priser`.

### `/forsikringsrabatt` — ny side

Høyintensjonssøk som var helt udekket, også hos alle konkurrentene (seksjon 12, punkt 4).

Innholdet: hva som kreves for at rapporten godtas, hvor lenge rabatten varer, hva som
skjer med egenandelen, hvordan dokumentasjonen leveres, og et eget avsnitt om landbruk
der elkontroll ikke er en rabattmulighet men et vilkår. Fire steg for hvordan man går
fram, og sju FAQ-spørsmål.

#### 🔴 Om «Gjensidige oppgir rundt 10 %»

Arbeidsordren ba om å skrive dette. **Det er ikke gjort.**

Gjensidiges egen side om billigere husforsikring tallfester ikke rabatten. Den sier
ordrett at du «får en av våre største sikkerhetsrabatter» i fem år etter kontrollen, og
at du slipper egenandel på brannskader som skyldes feil i det elektriske anlegget — men
den oppgir ingen prosentsats.

Å publisere «Gjensidige oppgir rundt 10 %» ville derfor vært en påstand vi ikke kan
belegge, på en side som handler om nettopp hva kunden får igjen i kroner. Siden sier i
stedet rett ut at rabattens størrelse varierer og må bekreftes med eget selskap.

10 %-tallet finnes derimot i deres eget innhold — i `blogg/forsikringskrav-elkontroll-landbruk.html`,
knyttet til **temperatursensorer i el-skap på gårdsbruk**, ikke til vanlig boligkontroll.
Det er sannsynligvis der tallet i arbeidsordren kommer fra. Den påstanden er gjengitt på
`/forsikringsrabatt` i landbruksavsnittet, konsistent med artikkelen, og ført i
`FAKTASJEKK.md` punkt 7.

Har eieren en kilde for 10 % på bolig — et vilkårsdokument, en e-post fra en rådgiver —
settes tallet inn. Det er et langt sterkere salgsargument enn «varierer».

### FAQ på alle tjenestesider

Kravet var 5–7 spørsmål per tjenesteside med `FAQPage`-schema. Slik så det ut før og etter:

| Side | Før | Etter |
|---|---|---|
| `internkontroll` | 0 | 6 |
| `kontrollavtale` | 0 | 6 |
| `tjenester` | 0 | 5 |
| `borettslag/kartlegging` | 0 | 5 |
| `borettslag/elkontroll` | 3 | 6 |
| `borettslag/ladeanlegg` | 3 | 6 |
| `borettslag/brannvern` | 3 | 6 |
| `borettslag/leiligheter` | 3 | 6 |
| `borettslag/pris` | 3 | 6 |
| `elkontroll-bolig` | 4 | 6 |
| `naering` | 4 | 6 |
| `elkontroll-boligsalg`, `landbruk`, `garantikontroll`, `brannalarm-nodlys`, `elbillading-kontroll`, `fatt-avvik` | 5 | 5 (urørt) |
| `borettslag/` | 7 | 7 (urørt) |
| `priser`, `forsikringsrabatt` (nye) | — | 7 |
| 8 lokalsider, `omrader` (nye) | — | 5 |

**47 nye spørsmål og svar.** Alle 29 tjenestesider ligger nå innenfor 5–7, verifisert med
`node tools/sjekk-faq.js`.

#### En feil som ble funnet underveis

`borettslag/pris` bruker `.faq-item`-markupen også til trekkspill som ikke er spørsmål og
svar — de åtte tilleggstjenestene under overskriften «Tillegg». Første versjon av
generatoren dro alle fjorten inn i `FAQPage`-schemaet, altså også «Leilighetskontroll» og
«HMS-perm digital» som spørsmål.

Det ville vært ugyldig FAQ-markup og kunne gitt en manuell reaksjon fra Google.
Generatoren bygger nå schemaet bare fra den siste seksjonen som inneholder FAQ-elementer,
som er den faktiske «Vanlige spørsmål»-seksjonen. Schemaet på siden er 6 spørsmål, mens
HTML-en har 14 `.faq-item` — det er riktig.

### 🔴 Funn: placeholder-tekst ligger ute i produksjon

Under arbeidet med prissiden ble dette oppdaget:

```
Fra xxx kr/år
```

står som **synlig tekst i produksjon**, seks steder: tre priskort på `/borettslag/` og tre
tabellrader på `/borettslag/pris/`. Verifisert live med curl mot
<https://elkontrollen.no/borettslag/pris/>.

`/borettslag/pris` er konverteringssiden for hele Trygt Borettslag-produktet. En
styreleder som kommer dit for å finne en pris, møter bokstavene «xxx».

**Dette er ikke rettet her,** fordi det å velge hva som skal stå i stedet er en
prisbeslutning, ikke en skrivefeil. Det er ført som punkt 0 i `FAKTASJEKK.md` og som
første punkt i `TIL_DEG.md`. `/priser` lenker til siden, men gjentar ikke plassholderen —
der står det «Årsavtale, etter antall enheter, tavler og ladepunkter».

### Navigasjon

- **Hovedmeny:** «Priser» lagt inn mellom «Bedrift & næring» og «Fått avvik?», på alle 68 sider med meny.
- **Bolig-nedtrekket:** «Forsikringsrabatt» lagt til.
- **Footer, Bolig-gruppa:** begge sidene lagt til.

Menyen fikk ett punkt mer enn den hadde plass til på 1280 px, og brøt til to linjer.
`nav.links` er derfor strammet fra `gap:22px; font-size:14px` til `gap:17px; font-size:13.5px`.
Kontrollert mot HEAD før endringen: menyen brøt allerede til to linjer i båndet 901–1100 px,
så den oppførselen er uendret. På 1280 px ligger den nå på én linje igjen.

Dette er den eneste CSS-endringen i hele revisjonen, og den var nødvendig for å få
arbeidsordrens «lenk fra hovedmeny» til å fungere visuelt.

### Oppdatert

- `sitemap.xml`: 66 → 68 URL-er
- `llms.txt`: `/priser` og `/forsikringsrabatt` lagt inn
- `blogg/hva-koster-elkontroll-full-prisguide.html`: krysslenke til begge nye sidene

### Verifisering

| Sjekk | Resultat |
|---|---|
| Brutte interne lenker på hele siden | 0 av 3 257 |
| JSON-LD parser | 159 blokker, 0 feil |
| FAQ-spørsmål innenfor 5–7 på alle tjenestesider | 29 av 29 |
| `<title>` og `meta description` på de nye sidene | 55/56 tegn og 133/150 tegn |
| Sitemap mot filsystem | 0 manglende, 0 døde |
| Nav på 950/1000/1100/1280 px | Kontrollert i headless Chrome |

### Verktøy

| Fil | Rolle |
|---|---|
| `tools/bygg-sider.js` | Genererer `/priser` og `/forsikringsrabatt` |
| `tools/faq-tillegg.js` | Alle nye FAQ-spørsmål, per side. **Her rettes tekst.** |
| `tools/bygg-faq.js` | Setter inn FAQ i HTML og bygger `FAQPage`-schema. Idempotent |
| `tools/sjekk-faq.js` | Verifiserer at alle tjenestesider ligger på 5–7 spørsmål |

---

## 17. Fase 4 — teknisk SEO (utført)

### Sjekklista fra arbeidsordren

| Krav | Status |
|---|---|
| `LocalBusiness`-schema (type `Electrician`) i felles layout | ✅ på 69 sider, med org.nr, telefon, adresse, `geo`, `areaServed` og `sameAs` |
| — med `openingHours` | ✅ `Mo-Fr 07:00-16:00`, oppgitt av eier etter at fase 4 var ferdig |
| `Service`-schema på hver tjenesteside, med `offers` og pris der pris finnes | ✅ 25 blokker |
| `FAQPage`-schema generert fra FAQ-komponenten | ✅ 29 blokker, gjort i fase 3 |
| `Article`-schema på alle bloggartikler | ✅ 34, med `dateModified`, `mainEntityOfPage`, `image` og `inLanguage` |
| — med `author` som `Person` og oppgitt NEK 405-kvalifikasjon | ✅ Niklas Grønvik, oppgitt av eier etter at fase 4 var ferdig |
| `BreadcrumbList`-schema | ✅ 68 sider |
| Unik `title` under 60 tegn | ✅ 71 av 71, ingen duplikater |
| `meta description` under 155 tegn | ✅ 71 av 71, ingen duplikater |
| `canonical` på alle sider | ✅ 71 av 71 |
| Oppdatert `sitemap.xml` | ✅ 68 URL-er, `lastmod` 2026-09-14 |
| Alle bilder i WebP | ✅ 8 WebP, 768 kB samlet |
| `loading="lazy"` under folden | ✅ — og bildet over folden er satt til `fetchpriority="high"` i stedet |
| Meningsfull alt-tekst | ✅ omskrevet, inkludert «Næringsbygg i Oslo» på en side om Østfold |
| `width` og `height` på alle bilder | ✅ 10 av 10 |
| `lang="nb"` | ✅ 71 av 71 |
| Lighthouse 95+ på alle fire på forsiden | ✅ **100 / 100 / 100 / 100** |
| Hver bloggartikkel lenker til minst én tjenesteside | ✅ 34 av 34 |
| Hver tjenesteside lenker til minst to artikler | ✅ 29 av 29 |

### Lighthouse

Målt mot en lokal server som etterligner Netlify med Brotli og samme cache-header.
Uten komprimering måler Lighthouse feil, fordi CSS og HTML da lastes rått.

| Side | Perf | Tilgj. | Beste praksis | SEO |
|---|---|---|---|---|
| `/` (mobil) | **100** | **100** | **100** | **100** |
| `/` (desktop) | **100** | **100** | **100** | **100** |
| `/elkontroll-fredrikstad` | 100 | 100 | 100 | 100 |
| `/priser` | 100 | 100 | 100 | 100 |
| `/forsikringsrabatt` | 100 | 100 | 100 | 100 |
| `/garantikontroll` | 96 | 100 | 100 | 100 |
| `/borettslag/` | 95 | 100 | 100 | 100 |
| `/blogg/dle-tilsyn-bedrift` | 100 | 100 | 100 | 100 |
| `/tjenester` | 99 | 100 | 100 | 100 |

Utgangspunktet var 96 / 91 / 100 / 100 på mobil (seksjon 8). De to som flyttet seg:

**Tilgjengelighet 91 → 100.** Tre feil, alle i felles header og footer:

- `landmark-one-main` — det fantes ikke et `<main>`-element på noen side i hele repoet. Innholdet mellom `</header>` og `<footer>` er nå pakket i `<main id="innhold">` på alle 71 sider.
- `heading-order` — footeren brukte `<h5>` for kolonneoverskriftene rett etter `<h4>` i brødteksten. Endret til `<h2>`, og CSS-selektoren `footer h5` fulgte med. I tillegg hoppet 28 sider et nivå i selve innholdet, mest `h1 → h3` i prisboksen i heroen og `h2 → h4` i stegkort. 41 overskrifter er justert til nærmeste tillatte nivå, og CSS-reglene er utvidet (`.step h4` → `.step h4, .step h3`) slik at utseendet er uendret. Verifisert visuelt.
- `target-size` — menyknappen på mobil var for liten. `.menu-toggle` og `.phone-icon` har fått `min-width`/`min-height: 44px`, og lenkene i mobilmenyen har fått `min-height: 44px`.

**Ytelse 96 → 100, og FCP fra 2,2 s til 0,8 s.** Én endring gjorde nesten hele jobben.

### Selvhostede fonter

Google Fonts-stilarket var den enkeltressursen som blokkerte rendringen mest —
Lighthouse målte **893 ms**. Kjeden var:

```
HTML → fonts.googleapis.com (CSS) → fonts.gstatic.com (woff2)
```

To ekstra opphav, hver med sin DNS-oppslag og TLS-runde, før første tekst kunne
tegnes. Fontfilene ligger nå i `assets/fonts/`, og `@font-face` er lagt inn øverst i
`style.css`. `font-display: swap` er beholdt.

To ting ble gjort samtidig:

- **Bare latin og latin-ext hentes.** Kyrillisk, gresk og vietnamesisk trengs ikke på en norsk side, og utgjorde over halvparten av filene.
- **Vektene er slått sammen.** Google leverer variable fonter, så alle fire vektene av IBM Plex Sans pekte på nøyaktig samme fil. Uten sammenslåing ville nettleseren lastet de samme bytene fire ganger. Fire `@font-face`-regler med vektområde, fire filer, **115 kB totalt**.

I tillegg er de to latin-filene forhåndslastet med `<link rel="preload">`, siden de ellers først oppdages når CSS-en er ferdig parset.

Resultatet er at siden nå ikke gjør noen forespørsler til tredjepart i det hele tatt.

### Canonical-konflikten (seksjon 5)

Dette var det alvorligste tekniske funnet i kartleggingen: hver side svarte 200 på
to URL-er, og Netlifys «Pretty URLs» skrev om alle interne lenker til den varianten
canonical sa ikke var den riktige.

Løsningen holder de eksisterende `.html`-URL-ene. Arbeidsordren sier uttrykkelig at
URL-er ikke skal endres, og 57 av dem er allerede indeksert i den formen — å gå over
til utvidelsesløse URL-er ville vært en full URL-migrasjon.

| Tiltak | Fil |
|---|---|
| `pretty_urls = false` — Netlify slutter å skrive om lenkene | `netlify.toml` |
| 79 regler: 301 fra utvidelsesløs URL til `.html` | `_redirects` (ny) |
| 472 interne lenker til mappesider endret fra `index.html` til kanonisk form (`/`, `/blogg/`, `/borettslag/…/`) | alle sider |

Det siste punktet er den samme konflikten for mappesidene: canonical sa `/blogg/`,
mens lenkene pekte på `/blogg/index.html`. Filnavnene er uendret — ingen URL forsvinner.

`_redirects` genereres av `tools/fase4-redirects.js` og skal ikke redigeres for hånd.

**Ett unntak: `takk.html` har ingen redirect.** Kontaktskjemaet har `action="/takk"`, og en
301 der ville truffet POST-en før Netlify rakk å behandle skjemaet. Innsendingen ville gått
tapt uten at noen merket det — brukeren hadde landet på takkesiden uansett, og trodd at
meldingen var sendt. Verifisert mot produksjon: `POST /takk` ga 301 med regelen på plass.
Siden er `noindex`, så duplikatet koster ingenting.

### Schema

All JSON-LD bygges nå ett sted, av `tools/fase4-schema.js`. Det var nødvendig fordi
siden ikke har felles layout — ellers måtte 225 blokker vedlikeholdes i 71 filer.

| Type | Antall | Merknad |
|---|---|---|
| `Electrician` | 69 | Erstatter `Organization` og den ugyldige `ElectricianService`. Har `@id`, org.nr som `vatID` og `identifier`, `geo`, `areaServed` med alle åtte kommunene pluss Østfold og Østlandet, `sameAs` til Brønnøysundregistrene, `knowsAbout` |
| `BreadcrumbList` | 68 | Alle unntatt forsiden, `404` og `skjema/` |
| `Article` | 34 | `dateModified`, `mainEntityOfPage`, `image`, `inLanguage`, og `publisher` som `@id`-referanse |
| `Service` | 25 | `provider` peker nå på `@id` i stedet for å gjenta navnet |
| `FAQPage` | 29 | Fra fase 3 |

`geo` er slått opp i OpenStreetMap på Lorangløkka 1, 1782 Halden: 59.134686, 11.380039.
Punktet lander på Brødløs i Halden. Bør bekreftes av eier.

### To punkter sto åpne, og ble lukket etterpå

Begge krevde opplysninger som ikke fantes noe sted på nettsiden. Eieren oppga dem da
fasen var dokumentert, og begge var ett felt i `tools/foretak.json` pluss én kommando.
Beskrivelsen under står som den var — den forklarer hvorfor de ikke kunne gjettes.

**Åpningstider: mandag–fredag 07:00–16:00.** Lagt inn tre steder, ikke bare i schema:
`openingHours` på alle 69 sider, synlig i kontaktkortet på `/kontakt.html`, og synlig i
footeren overalt. Google sammenligner strukturerte data mot det som faktisk står på siden,
så de to må stemme overens.

**Forfatter: Niklas Grønvik, sertifisert kontrollør.** Alle 34 artikler har nå `author`
som `Person` med `worksFor` og NEK 405 som `hasCredential`.

Team-seksjonen på forsiden ligger fortsatt som en HTML-kommentar — den har tre kort og
trenger bilder. Ført i `TIL_DEG.md` punkt 7.

### Slik så det ut da fasen ble levert

**1. `openingHours` er utelatt.**

Siden oppgir ikke åpningstider noe sted — verken i tekst, i footer eller i schema.
Å gjette dem ville gitt Google et konkret tidsrom å vise i søkeresultatet, og feil
åpningstid er verre enn ingen: en kunde som ringer på et tidspunkt Google sa dere var
åpne, og ikke får svar, har fått et dårligere møte enn en som ikke fikk noe løfte.

Feltet lå klart i `tools/foretak.json` som en tom liste, slik at det ble ett felt å fylle:

```json
"apningstider": ["Mo-Fr 07:00-16:00"]
```

```bash
node tools/fase4-schema.js
```

Alt annet i `LocalBusiness`-blokka er på plass.

**2. `author` er ikke en `Person`.**

Arbeidsordren ber om `author` som `Person` med oppgitt NEK 405-kvalifikasjon. Det
finnes ikke noe personnavn på siden i dag — team-seksjonen på forsiden ligger som en
HTML-kommentar med plassholderen «Navn», med en notis om at den er «skjult til vi har
ekte bilder og navn». Å finne opp et navn er ikke et alternativ.

Det som er gjort i stedet: `author` er foretaket, med kvalifikasjonen hengt på som
`hasCredential`:

```json
"author": {
  "@id": "https://elkontrollen.no/#elkontrollen",
  "@type": "Electrician",
  "name": "Elkontrollen AS",
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "Sertifisering",
    "name": "NEK 405-sertifisert kontrollør"
  }
}
```

Navn og stilling lå klart som tomme felter i `tools/foretak.json`, slik at `author` ble
bygget om til en `Person` med `worksFor` og samme kvalifikasjon så snart navnet forelå.

### Bilder

| | Før | Etter |
|---|---|---|
| Format | 12 JPG | 8 WebP (4:3-beskåret til formatet `.service-photo` faktisk viser) |
| Størrelse på det som lastes | ~1,8 MB | **768 kB** |
| `width`/`height` | 0 av 10 | 10 av 10 |
| `og:image` som gir 404 | **4 filnavn, brukt i 5 artikler** | 0 |
| `og:image`-format | Originalene, bl.a. 1400×2373 portrett | 16 egne varianter i 1200×630 |

De fire filnavnene som ikke fantes (`elkontroll-bolig.jpg`, `elkontroll-landbruk.jpg`,
`internkontroll.jpg`, `termografi.jpg`) er pekt om til et eksisterende, relevant bilde.
Hvilket bilde som hører til hvilken artikkel er en redaksjonell vurdering — ført i
`FAKTASJEKK.md`.

`og:image` er beholdt som JPG med vilje. Noen sosiale skrapere håndterer fortsatt ikke
WebP, og delingsbildet er ikke en del av sidevekten.

JPG-originalene ligger igjen i `assets/img/` som kilder for generatoren. Ingen side
lenker til dem, så de koster ingen båndbredde.

### Intern lenking

| | Før (seksjon 7) | Etter |
|---|---|---|
| Artikler med tematisk tjenestelenke i brødteksten | 10 av 34 | **34 av 34** |
| Tjenestesider med minst to bloggenker | 3 av 22 | **29 av 29** |

24 artikler hadde `/kontakt` som eneste utgang — en generisk oppfordring, ikke en
tematisk lenke. Alle 22 som fortsatt manglet etter fase 2 og 3 har fått en
«Relevante tjenester»-blokk, og 18 tjenestesider har fått en «Les mer»-blokk.
Koblingene ligger i `tools/lenking.js`.

### Verktøy lagt til i fase 4

| Fil | Rolle |
|---|---|
| `tools/foretak.json` | Foretaksopplysninger til `LocalBusiness`. **Åpningstider og forfatternavn fylles inn her.** |
| `tools/fase4-struktur.js` | `lang="nb"`, `<main>`, footer-overskrifter, `defer` på `main.js` |
| `tools/fase4-schema.js` | All JSON-LD |
| `tools/fase4-redirects.js` | `_redirects` og `netlify.toml` |
| `tools/fase4-lenker.js` | Interne lenker til kanonisk form |
| `tools/meta-tekster.js` + `fase4-meta.js` | Nye titler og beskrivelser |
| `tools/fase4-bilder.js` | WebP, `og:image`-varianter, alt-tekst |
| `tools/fase4-fonter.js` | Selvhosting av fonter |
| `tools/fase4-overskrifter.js` | Retter hopp i overskriftsnivå |
| `tools/lenking.js` + `fase4-lenking.js` | Redaksjonell intern lenking |
| `tools/sjekk-faq.js`, `sjekk-lenking.js`, `sjekk-overskrifter.js` | Verifisering |

Alle er idempotente og kan kjøres om igjen.

### Sluttvalidering

| Sjekk | Resultat |
|---|---|
| Brutte interne lenker | **0 av 3 478** |
| JSON-LD som parser | **225 av 225** |
| Tagbalanse | 71 av 71 filer |
| Nøyaktig én `h1` | 71 av 71 |
| `lang="nb"` | 71 av 71 |
| `<main>` | 71 av 71 |
| Hopp i overskriftsnivå | 0 av 71 sider |
| `title` under 60 / `description` under 155 | 71 av 71, ingen duplikater |
| FAQ innenfor 5–7 på tjenestesider | 29 av 29 |
| Sitemap mot filsystem | 0 manglende, 0 døde |

> **Lighthouse-tallene over er målt lokalt.** De bør kjøres på nytt mot
> `https://elkontrollen.no` etter deploy — særlig fordi `pretty_urls = false` og
> `_redirects` først får virkning der.

---

## 18. Fase 5 — det eieren må gjøre selv (dokumentert)

Skrevet til `TIL_DEG.md`, med konkrete steg for hvert punkt.

De fem fra arbeidsordren, pluss fem som kom ut av revisjonen:

| # | Oppgave | Kilde | Tid |
|---|---|---|---|
| 0 | **Fjern «Fra xxx kr/år»** — plassholdertekst som ligger ute i produksjon på to sider, seks steder | Funnet i fase 3 | 5 min |
| 1 | Google Bedriftsprofil — tjenesteområdebedrift med alle åtte kommunene | Arbeidsordren | 20 min + verifisering |
| 2 | Anmeldelser — SMS med direktelenke etter levert rapport, mål to til fire i måneden | Arbeidsordren | 2 min per kunde |
| 3 | Search Console — sjekk indeksering, send inn ny sitemap, be om indeksering av de ni viktigste nye sidene | Arbeidsordren | 15 min |
| 4 | Netlify Forms — e-postvarsling for åtte skjemaer | Arbeidsordren | 10 min |
| 5 | Bransjeregistre — identisk NAP i Proff, 1881, Bedriftsdatabasen, Elvirksomhetsregisteret | Arbeidsordren | 45 min |
| 6 | **Åpningstider** — ett felt i `tools/foretak.json` | Åpent punkt fra fase 4 | 2 min |
| 7 | **Navn på kontrollør** — så `author` kan bli en `Person` | Åpent punkt fra fase 4 | 2 min |
| 8 | **Etter deploy** — bekreft at redirects virker, at Pretty URLs er av, kjør Lighthouse mot produksjon, test kontaktskjemaet | Fase 4 | 15 min |
| 9 | **Rangeringssjekk fra norsk IP** — det vi ikke kunne måle | Fase 0, seksjon 12 | 20 min |
| 10 | Faktasjekk av de nye sidene | `FAKTASJEKK.md` | Løpende |

Punkt 3 er skrevet med en tabell over hva de ulike statusene i Search Console betyr,
fordi det er der canonical-konflikten fra fase 4 vil vise seg om den ikke er løst:
«Duplikat, Google valgte en annen kanonisk» skal falle i ukene etter deploy.

Punkt 9 er tatt med fordi konkurrentanalysen i seksjon 12 er en kartlegging av hvem som
konkurrerer, ikke en rangeringsmåling — søkeverktøyene i dette miljøet er USA-baserte,
og forsøkene på å hente norske søkeresultater ble blokkert. Det tar 20 minutter fra en
norsk nettleser, og gir i tillegg antall Google-anmeldelser hos konkurrentene, som er
det viktigste enkelttallet for å vite hvor mye arbeid punkt 2 krever.

---

## 18b. Kontrastfeil fra den gamle fargepaletten (rettet etterpå)

Oppdaget under visuell kontroll etter at åpningstidene var lagt inn, ikke av Lighthouse —
forsiden målte 100 på tilgjengelighet hele veien, fordi feilene lå på to andre sider.

Fargepaletten har vært mørk en gang. Variabelen `--navy` heter fortsatt det, men verdien
er `#F4F6F4`. Fire farger fulgte ikke med da paletten ble byttet, fordi de lå i
`style`-attributter eller som gjennomsiktige ink-verdier i stedet for i tokens:

| Sted | Før | Etter | Kontrast |
|---|---|---|---|
| `kontakt.html` — org.nr i kontaktkortet | `rgba(255,255,255,.55)` | `var(--muted)` | usynlig → 5,19:1 |
| `kontakt.html` — skillelinja over | `rgba(255,255,255,.12)` | `var(--line)` | usynlig → synlig |
| `om-oss.html` — navn, adresse, org.nr | `rgba(255,255,255,.6)` | `var(--muted)` | usynlig → 5,19:1 |
| `style.css` — `.info-row .lbl` | `rgba(var(--ink-rgb),.5)` | `var(--muted)` | 3,21:1 → 5,19:1 |

Den siste kom fram da kontrasten ble målt etter de tre første. Den var ikke usynlig, men
lå under kravet på 4,5:1 — samme rot, samme fiks.

**Dette er bedriftens NAP-opplysninger.** Navn, adresse og org.nr sto i praksis ikke på
siden i det hele tatt to steder, samtidig som punkt 5 i `TIL_DEG.md` handler om at
nettopp de opplysningene skal stå likt overalt for at Google skal feste lit til dem.

`kontakt.html` og `om-oss.html` gikk fra 96 til **100**. Målt på fjorten sider er alle
nå på 100 unntatt `/fatt-avvik.html`, der alvorlighetsmerkene ligger på 4,08:1 og 4,28:1.
De er ikke rettet — fargene er del av et bevisst fargekodet system, og hvor mye de tåler
å mørknes er en designvurdering. Ført som punkt 8c i `TIL_DEG.md`.

`.hero-photo .cap-out` og SVG-illustrasjonen på forsiden bruker samme hvite farge, men
ligger på faktisk mørk bakgrunn. De er riktige og ikke rørt.

---

## 19. Byggrekkefølge — viktig hvis sidene genereres på nytt

Elleve sider bygges av generatorer, mens resten er håndskrevet. Kjører du en generator
på nytt, skrives den sida fra bunnen av — og mister da alt fase 4 la på etterpå.

**Riktig rekkefølge:**

```bash
# 1. Innhold
node tools/bygg-lokalsider.js     # de 8 lokalsidene + /omrader
node tools/bygg-sider.js          # /priser + /forsikringsrabatt
node tools/bygg-faq.js            # FAQ + FAQPage-schema

# 2. Teknikk — må kjøres etter generatorene
node tools/fase4-struktur.js      # lang, <main>, footer-overskrifter, defer
node tools/fase4-lenking.js       # redaksjonelle lenker
node tools/fase4-lenker.js        # interne lenker til kanonisk form
node tools/fase4-overskrifter.js  # hopp i overskriftsnivå
node tools/fase4-meta.js          # titler og beskrivelser
node tools/fase4-schema.js        # all JSON-LD — sist, den leser ferdig HTML

# 3. Kontroll
node tools/sjekk-faq.js
node tools/sjekk-lenking.js
node tools/sjekk-overskrifter.js
```

`fase4-bilder.js`, `fase4-fonter.js` og `fase4-redirects.js` trenger du bare når bilder,
fonter eller sidelista endres. Alle skriptene er idempotente — kjører du dem to ganger,
skjer ingenting andre gang.

Header og footer hentes av generatorene fra `om-oss.html`. Endrer du navigasjonen der,
følger den med til de genererte sidene automatisk.

---

## Vedlegg: kommandoer brukt i kartleggingen

Kjørt fra repo-roten. Kan gjentas for å verifisere funnene.

```bash
# Sitemap-dekning mot filsystemet
grep -o -P '(?<=<loc>)[^<]*' sitemap.xml | sed 's|https://elkontrollen.no/||' | sort > /tmp/sm.txt
find . -name "*.html" -not -path "./.git/*" | sed 's|^\./||;s|index\.html$||' | sort > /tmp/fs.txt
comm -13 /tmp/sm.txt /tmp/fs.txt   # i repo, ikke i sitemap

# Canonical-konflikten
curl -sS -o /dev/null -w "%{http_code} %{redirect_url}\n" https://elkontrollen.no/elkontroll-bolig
curl -sS https://elkontrollen.no/elkontroll-bolig.html | grep -o -P 'rel="canonical"[^>]*'

# Manglende bildefiler
curl -sS -o /dev/null -w "%{http_code}\n" https://elkontrollen.no/assets/img/termografi.jpg

# Duplikate bilder
md5sum assets/img/* | sort | uniq -w32 -D

# Lighthouse
export CHROME_PATH="/c/Program Files/Google/Chrome/Application/chrome.exe"
npx lighthouse https://elkontrollen.no/ --quiet --output=json --output-path=/tmp/lh-mobile.json \
  --chrome-flags="--headless=new --no-sandbox --disable-gpu" \
  --only-categories=performance,accessibility,best-practices,seo
```

Node-skriptene for meta-lengder, H1-telling, JSON-LD-parsing og brødtekst-lenkeanalyse ble skrevet ad hoc i denne økten og kan gjenskapes fra beskrivelsene over.
