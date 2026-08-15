# Status — innholdsbygging (agent: "innhold")

Bygget 2026-08-15. Dekker alt UNNTATT /skjema/ (bygget av egen agent parallelt).

## Sider bygget (11 stk, i tillegg til index.html)
| Side | Kilde |
|---|---|
| index.html | elkontrollen-redesign_2.html (design) + hjemmeside-fetch fra elkontrollen.no (tekst/tall/testimonials) |
| om-oss.html | Live fetch av /pages/om-os (fullstendig, ikke placeholder) — om-oss.liquid hadde [FYLL INN]-plassholdere så live-siden ble brukt som kilde |
| kontakt.html | kontakt-oss.liquid (kontaktinfo, adresse, skjemafelter) |
| fatt-avvik.html | fatt-avvik.liquid (fullstendig, brukt som-is) |
| elkontroll-bolig.html | produkt-elkontroll-bolig.liquid |
| elsjekk.html | produkt-elsjekk.liquid (live /pages/elsjekk-fetch ga støy/feil innhold, liquid-filen ble brukt i stedet) |
| naering.html | produkt-naering.liquid |
| landbruk.html | produkt-landbruk.liquid |
| borettslag-sameie.html | borettslag-section.liquid (borettslag-section_1.liquid var identisk kopi — /pages/borettslag-sameie-1 er derfor IKKE bygget som egen side, kun borettslag-sameie.html) |
| roykvarsler.html | Live fetch av /products/roykvarsler-palitelig-roykalarm-for-hjem-og-kontor |
| skjemaer.html | Live fetch av /pages/skjemaer — forklarer skjemaet og lenker til /skjema/ (den andre agentens side) |

## Blogg (25 artikler + indeks)
Alle 25 blogginnlegg fra elkontrollen.no/blogs/news hentet direkte fra live-siden (full artikkeltekst, ikke sammendrag) og bygget som egne sider i /blogg/. Blogg-indeks på /blogg/index.html.

## Ikke bygget / bevisst utelatt
- **/pages/om-elkontrollen** — live-fetch ga forvrengt/feil innhold (samme som landbruk-produktet, sannsynligvis en Shopify-mal-feil). Innholdet overlapper uansett fullt med om-os/om-oss.liquid, så det er dekket av om-oss.html.
- **/pages/borettslag-sameie-1** — identisk kildefil (borettslag-section_1.liquid == borettslag-section.liquid). Kun én side bygget for å unngå duplikat-innhold.
- **Priser** — live-siden viste tydelige placeholder-priser (1 kr, 4 kr, 9 kr, 0 kr), ikke reelle. Disse er IKKE brukt på ny side. Alle produktsider bruker "fastpris, ta kontakt for pris" i stedet for tall — reelle priser må fylles inn manuelt før lansering.
- **Team-bilder / navn** — om-oss.liquid hadde plassholdere for teambilder ([Navn], [Rolle]) uten reelt innhold å hente. Utelatt fra om-oss.html — bør fylles inn manuelt.
- **Google-anmeldelser** — redesign_2.html hadde plassholder-sitater ("[Sett inn faktisk sitat...]"). Kun det ene ekte sitatet (Kari Lunde) som fantes på live-forsiden er brukt, resten er droppet fremfor å dikte opp anmeldelser.

## Viktig å vite
- Alt bygget som ren statisk HTML/CSS/JS (ingen build-steg nødvendig for GitHub Pages).
- Delt header/footer/nav på tvers av alle sider via `assets/css/style.css` + generert med et engangs Node-script (ikke en del av det committede repoet).
- Kontaktskjemaet på kontakt.html bruker `mailto:` som fallback (ingen backend). Bør vurderes byttet til EmailJS eller lignende, tilsvarende skjema-agentens løsning.
