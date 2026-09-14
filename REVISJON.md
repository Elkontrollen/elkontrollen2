# REVISJON.md — SEO-revisjon av elkontrollen.no

Seksjon 1–13 er kartleggingen fra **Fase 0**. Ingenting på siden ble endret mens den ble laget.
Seksjon 14 og utover dokumenterer endringene som er gjort i de påfølgende fasene.

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
