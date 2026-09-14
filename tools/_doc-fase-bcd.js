const fs = require('fs');

// ── FAKTASJEKK: fase D ─────────────────────────────────────────────────────
let f = fs.readFileSync('FAKTASJEKK.md', 'utf8');
if (!f.includes('## 10. Lokale sider')) {
  const lokalt = JSON.parse(fs.readFileSync('tools/faktasjekk-borettslag-lokalt.json', 'utf8'));
  const per = {};
  lokalt.forEach(x => { (per[x.fil] = per[x.fil] || []).push(x); });

  let blokk = `
---

## 10. Lokale sider (fase D)

### Tall som IKKE trenger faktasjekk

Hentet, ikke gjettet. Kan slås opp på nytt når som helst.

| Opplysning | Kilde |
|---|---|
| Antall borettslag og eierseksjonssameier per kommune | Brønnøysundregistrene, Enhetsregisteret, organisasjonsform BRL og ESEK per kommunenummer |
| Blokkleiligheter fordelt på byggeår | SSB tabell 06266, bygningstype Boligblokk, 2026 |
| Boliger, fritidsbygg og jordbruksbedrifter | SSB tabell 06266, 03174 og 08646 |
| Bydeler, tettsteder og industrihistorie | Store norske leksikon |

De konkrete tallene som står på sidene:

| Kommune | Borettslag | Sameier | Blokkleiligheter |
|---|---|---|---|
| Fredrikstad | 214 | 499 | 8 198 |
| Sarpsborg | 226 | 200 | 5 364 |
| Halden | 99 | 154 | 2 455 |
| Moss | 141 | 289 | 8 549 |

### 🔴 Avstandene motsier premisset i ordren

Ordren sier «Prioriter Østfold og Drammen først — der er vi nærmest». Kjøreavstand fra
Lorangløkka 1, målt med OSRM:

| Sted | Avstand | Tid |
|---|---|---|
| Oslo | 119 km | ~1 t 37 min |
| Lillestrøm | 134 km | ~1 t 49 min |
| Bærum | 133 km | ~1 t 51 min |
| Asker | 130 km | ~1 t 53 min |
| **Drammen** | **133 km** | **~1 t 57 min** |

Drammen er altså den **lengste** av de fem, ikke den nærmeste. Oslo er nærmest med god
margin.

Prioriteringen er fulgt som bedt — Drammen ligger som nummer 9, foran de fire andre.

- [ ] **Har dere en base, en kontrollør eller en fast kunde i Drammensområdet som ikke framgår av nettsiden?** I så fall er premisset riktig og tallene irrelevante — men da bør det stå på siden, for lokal tilstedeværelse er et sterkt signal både for kunder og for Google.

### Påstander om egen erfaring på de lokale borettslagssidene

Tolv avsnitt, tre per side, merket \`<!-- TRENGER LOKALKUNNSKAP -->\` i HTML-en.

`;
  for (const [fil, poster] of Object.entries(per)) {
    blokk += `**\`${fil}\`**\n\n`;
    poster.forEach(p => { blokk += `- [ ] ${p.tekst.slice(0, 200)}${p.tekst.length > 200 ? '…' : ''}\n`; });
    blokk += '\n';
  }

  blokk += `### De fem nye lokalsidene utenfor Østfold

Femten avsnitt merket \`<!-- TRENGER LOKALKUNNSKAP -->\` — tre per side for Drammen,
Lillestrøm, Oslo, Bærum og Asker. Alle beskriver hva dere typisk finner i den
bygningsmassen, og følger av byggeåret. Ingen av dem bygger på oppdrag dere faktisk har
hatt der.

- [ ] **Har dere overhodet hatt oppdrag i disse kommunene?** Hvis ikke, bør «det vi typisk finner»-avsnittene omformuleres til hva bygningsmassen tilsier, ikke hva dere har sett. Forskjellen er liten i ord og stor i troverdighet.
- [ ] **Ingen av de fem lover rask utrykning**, og ingen gjentar løftet om «ingen kjøretillegg». Bekreft at det er riktig — og avklar hva prisen faktisk blir utenfor Østfold. Se \`BESLUTNINGER.md\` punkt 3.

### Nye påstander på \`/borettslag/\` og de lokale sidene

- [ ] **«Vi er i området jevnlig og setter gjerne opp flere lag samme dag.»** Står på tre av de fire lokale borettslagssidene.
- [ ] **«Fordi vi holder til i Halden, kan vi som regel rykke ut samme eller neste dag når noe haster.»** Står på Halden-siden. Løfte om responstid.
`;
  f = f.replace('\n---\n\n## Oppsummering', blokk + '\n---\n\n## Oppsummering');
  f = f.replace('| 9. Borettslagsklyngen — egen praksis, påstander og jus | 23 |',
    '| 9. Borettslagsklyngen — egen praksis, påstander og jus | 23 |\n| 10. Lokale sider — avstander, egen erfaring, pris utenfor Østfold | 32 |');
  f = f.replace('| **Til sammen** | **110** |', '| **Til sammen** | **142** |');
  f = f.replace('Sist oppdatert: 2026-09-14 (etter borettslagssatsingen, fase A–C)',
    'Sist oppdatert: 2026-09-14 (etter fase A–F)');
  fs.writeFileSync('FAKTASJEKK.md', f);
  console.log('FAKTASJEKK.md: seksjon 10 lagt til');
} else console.log('FAKTASJEKK: finnes alt');

// ── REVISJON: fase B, C, D, E, F ───────────────────────────────────────────
let m = fs.readFileSync('REVISJON.md', 'utf8');
if (!m.includes('## 21. Fase B–F')) {
  const i = m.indexOf('## Vedlegg: kommandoer brukt i kartleggingen');
  const ny = `## 21. Fase B–F — borettslagssatsingen (utført)

### Fase B — \`/borettslag/\` bygget om

| | Før | Etter |
|---|---|---|
| \`h1\` | «Trygt Borettslag — vi tar de lovpålagte kontrollene …» | «Elkontroll for borettslag og sameier» |
| Pakkeinnhold | Tre nivåer i en tabell langt nede | Fem punkter med standard, høyt på siden |
| Prismodell | På egen underside | På hovedsiden, konkret om hva som avgjør |
| Prosess | Fire steg | Tre steg |
| FAQ | 7 | 8, med \`FAQPage\`-schema |
| Artikkellenker | 3 | 12 |
| Ord i brødteksten | 707 | **1 343** |

De to elementene tilleggsordren ber om å løfte fram har fått egen seksjon:
**avviksliste med status** og **dokumentasjon som overlever styreskifte**. Mersalg av
leilighetskontroll har også egen seksjon, med begrunnelsen om at reise og rigg deles.

Ingen superlativer. Omfanget vises ved å liste hva som faktisk inngår — kontrollert med
søk etter «Norges beste», «markedsledende», «mest komplette» og liknende i alt nytt
innhold.

### Fase C — åtte nye artikler

| Artikkel | Ord | Publiseres |
|---|---|---|
| Hva koster elkontroll i borettslag? | 1 115 | 15. sep |
| Elkontroll og forsikring for borettslag | 984 | 17. sep |
| Internkontroll elektro for borettslag | 907 | 19. sep |
| Hvem har ansvaret: styret eller andelseier? | 950 | 21. sep |
| Slik forbereder styret en elkontroll | 823 | 23. sep |
| Elkontroll før og etter rehabilitering | 882 | 25. sep |
| Hva gjør styret når rapporten viser avvik? | 1 016 | 27. sep |
| Elkontroll i sameie kontra borettslag | 918 | 29. sep |

Alle innenfor kravet på 700–1200 ord. Hver svarer på hovedspørsmålet i første avsnitt,
har FAQ med \`FAQPage\`-schema, lenker tilbake til \`/borettslag/\` og krysslenker til tre
naboartikler.

**Publiseringsdatoene er spredt med to dagers mellomrom.** De 34 eksisterende artiklene
ble publisert på få dager i august, og det er nettopp det mønsteret som gjør det
sannsynlig at mange står som «Oppdaget – foreløpig ikke indeksert» (seksjon 3 i
\`TIL_DEG.md\`). Å gjenta det med åtte nye ville forsterket signalet.

### Fase D — ni nye lokale sider

**Fire lokale borettslagssider.** Tallene er hentet fra Brønnøysundregistrene og SSB, ikke
gjettet:

| Kommune | Borettslag | Sameier | Blokkleiligheter | Tyngdepunkt |
|---|---|---|---|---|
| Fredrikstad | 214 | 499 | 8 198 | 2011–2020 og 2021+ |
| Sarpsborg | 226 | 200 | 5 364 | 1971–1980 |
| Halden | 99 | 154 | 2 455 | 1971–80, men 16 % fra før 1901 |
| Moss | 141 | 289 | 8 549 | 2011–2020 og 1961–1970 |

Det gir reell differensiering. Sarpsborg har flest borettslag i fylket og et tydelig
syttitallspreg. Halden har 16 prosent av blokkleilighetene fra før 1901 — bygårdene på
Sørsiden — mot 3 prosent i nabobyene. Fredrikstad og Moss har over 40 prosent bygget
etter 2010, der reklamasjonsfristen er poenget, ikke slitasje.

**Fem nye generelle lokalsider** for Drammen, Lillestrøm, Oslo, Bærum og Asker, med samme
SSB-metode som Østfold-sidene. Ingen av dem lover rask utrykning — avstanden er 119–134
km, og det står i teksten.

### Fase E — søkeord

**15 av 15 dekket i \`title\` eller \`h1\`**, verifisert med \`tools/sjekk-sokeord.js\`.

Tre hull ble funnet og lukket underveis ved å justere overskrifter, ikke ved å stappe inn
ord: \`borettslag/brannvern\` manglet «kontroll» i tittelen, artikkelen om ansvar manglet
«borettslag», og forsikringsartikkelen manglet «krav» som selvstendig ord.

> Sjekkeskriptet måtte skrives om to ganger før det var til å stole på. Første versjon
> krevde eksakt form og ordstilling og meldte åtte falske hull — norsk bøyning gjør at
> «Styrets ansvar for det elektriske anlegget» skal treffe søket «styrets ansvar
> elektrisk anlegg». Andre versjon ble for løs: «Les mer»-blokkene nederst på sidene
> lenker til alle artiklene, så hver side så ut til å dekke hvert søkeord. Tredje versjon
> fjerner lenkeblokkene og krever prefiksmatch bare én vei.

### Fase F — teknisk

| Krav | Status |
|---|---|
| \`Service\`-schema på \`/borettslag/\` med \`serviceType\`, \`areaServed\` og \`offers\` | ✅ |
| \`FAQPage\`-schema på hovedsiden og alle artikler med FAQ | ✅ 46 blokker totalt |
| Brødsmuler på alle borettslagssider | ✅ 85 \`BreadcrumbList\` |
| Hver artikkel lenker til \`/borettslag/\`, hovedsiden lenker til alle | ✅ |
| Borettslag tydelig i hovedmenyen | ✅ se under |

**Menypunktet** er gjort om fra \`<button>\` til \`<a href="/borettslag/">\`, så det går rett
til hovedsiden i stedet for bare å åpne et nedtrekk. Nedtrekket er utvidet med
fellesanlegg, leilighetskontroll og pris.

Det brøt mobilmenyen, der nedtrekket er eneste vei til undersidene — en lenke ville
navigert i stedet for å åpne. \`main.js\` er derfor endret slik at første trykk på mobil
åpner nedtrekket og andre trykk følger lenken.

### Lighthouse på de nye sidene

| Side | Perf | Tilgj. | Beste praksis | SEO |
|---|---|---|---|---|
| \`/borettslag/\` | 100 | 100 | 100 | 100 |
| \`/elkontroll-borettslag-fredrikstad\` | 100 | 100 | 100 | 100 |
| \`/elkontroll-oslo\` | 100 | 100 | 100 | 100 |
| \`/blogg/hva-koster-elkontroll-borettslag\` | 100 | 100 | 100 | 100 |
| \`/omrader\` | 100 | 100 | 100 | 100 |

### Sluttvalidering

| Sjekk | Resultat |
|---|---|
| Sider totalt | 88 (var 71) |
| Brutte interne lenker | **0 av 4 738** |
| JSON-LD som parser | **293 av 293** |
| Tagbalanse | 88 av 88 |
| Nøyaktig én \`h1\` | 88 av 88 |
| Hopp i overskriftsnivå | 0 av 88 |
| \`title\` under 60 / \`description\` under 155 | alle, ingen duplikater |
| FAQ innenfor kravet | 33 av 33 tjenestesider |
| Artikler med tematisk tjenestelenke | 42 av 42 |
| Tjenestesider med minst to bloggenker | 29 av 29 |
| Søkeord dekket i title eller h1 | 15 av 15 |
| Sitemap mot filsystem | 85 URL-er, 0 manglende, 0 døde |

---

`;
  m = m.slice(0, i) + ny + m.slice(i);
  m = m.replace(`| 5 | Oppgaver til eieren | 18 |`,
    `| 5 | Oppgaver til eieren | 18 |
| A–F | Plassholdere, borettslagssatsing, lokale sider | 20–21 |`);
  fs.writeFileSync('REVISJON.md', m);
  console.log('REVISJON.md: seksjon 21 lagt til');
} else console.log('REVISJON: finnes alt');
