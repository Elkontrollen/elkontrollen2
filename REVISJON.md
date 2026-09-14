# REVISJON.md — Fase 0: kartlegging

Kartlegging av elkontrollen.no før SEO-revisjonen. **Ingenting er endret i denne fasen.**

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

| Skjema | Fil | Løsning | Status |
|---|---|---|---|
| Bestilling bolig | `elkontroll-bolig.html` | Netlify Forms | ✅ |
| Bestilling boligsalg | `elkontroll-boligsalg.html` | Netlify Forms | ✅ |
| Avviksskjema | `fatt-avvik.html` | Netlify Forms (`multipart/form-data`) | ✅ |
| Tilbud landbruk | `landbruk.html` | Netlify Forms | ✅ |
| Tilbud næring | `naering.html` | Netlify Forms | ✅ |
| Gratis kartlegging | `borettslag/kartlegging/index.html` | Netlify Forms | ✅ |
| **Kontaktskjema** | **`kontakt.html`** | **`<form action="mailto:post@elkontrollen.no" method="post" enctype="text/plain">`** | 🔴 |

De seks som virker har alle: `data-netlify="true"`, `name="…"`, `netlify-honeypot="bot-field"`, skjult `<input type="hidden" name="form-name">` og AJAX-innsending via `fetch("/", …)`. Riktig oppsett.

**`kontakt.html` er unntaket og må fikses i Fase 1.** `mailto:`-skjemaer åpner brukerens e-postklient med rå tekst i kroppen. På mobil og for alle som bruker webmail uten registrert `mailto:`-handler skjer det ingenting i det hele tatt. Henvendelser fra hovedkontaktsiden går tapt.

Andre funn:

- **Ingen takkeside.** `/takk` finnes ikke. Ingen av de sju skjemaene har `action="/takk"` — de seks Netlify-skjemaene håndterer kvittering i JS.
- **Ingen Resend-integrasjon** noe sted. Arbeidsordrens «hvis det finnes en Resend-integrasjon som fungerer» er ikke aktuell her.
- **E-postvarsling i Netlify må bekreftes aktivert.** `README.md` dokumenterer steget som manuelt, men det kan ikke verifiseres herfra — det ligger i Netlify-panelet. Føres videre til `TIL_DEG.md`.
- `netlify-honeypot` er attributtnavnet som brukes i dag. Arbeidsordren nevner `data-netlify-honeypot` — begge fungerer, og den eksisterende skrivemåten beholdes for konsistens.

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
