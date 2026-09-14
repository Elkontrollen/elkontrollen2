# BESLUTNINGER.md

Valg som er tatt underveis der ordren var åpen eller to instrukser pekte i hver sin
retning. Regelen jeg har jobbet etter: velg det enkleste alternativet som oppfyller
akseptansekriteriene, og skriv ned hvorfor.

Sist oppdatert: 2026-09-14

---

## 1. Ingen push til `origin/main`

**Situasjon.** Ordren sier «Commit etter hvert steg» og «Ikke deploy». Repoet er koblet
til Netlify med automatisk publisering ved push til `main` — det er slik alle
deployene tidligere i dag skjedde.

**Valg.** Jeg committer lokalt, men pusher ikke. En push til `main` *er* en deploy her.

**Konsekvens.** Alt arbeidet ligger i lokale commits på `main`. Når du vil publisere:

```bash
cd C:\Users\gronv\elkontrollen2
git log --oneline origin/main..main    # se hva som ligger klart
git push origin main                   # dette publiserer
```

Vil du se det i nettleseren først, kjør en lokal server fra repo-roten i stedet.

---

## 2. De tre lokalsidene som falt ut av lista beholdes

**Situasjon.** Den nye lista over lokale sider er Fredrikstad, Sarpsborg, Halden, Moss,
Indre Østfold, Drammen, Lillestrøm, Oslo, Bærum og Asker. Fra før finnes også
`/elkontroll-rakkestad`, `/elkontroll-hvaler` og `/elkontroll-aremark`, som ikke står på
den nye lista. Samtidig sier ordren: «Ikke slett eksisterende sider eller endre URL-er.»

**Valg.** De tre beholdes uendret, og de fem nye kommer i tillegg. Ingen URL forsvinner.

**Begrunnelse.** Sidene er indeksérbare, har reelt SSB-underbygget innhold, og ligger i
sitemap. Å fjerne dem ville vært å slette sider, som ordren forbyr. Rakkestad, Hvaler og
Aremark er dessuten Østfold-kommuner og ligger innenfor dekningsområdet uansett.

**Konsekvens.** 13 lokalsider totalt, ikke 10.

---

## 3. «Ingen kjøretillegg» utvides ikke til de nye fylkene

**Situasjon.** Formuleringen «ingen kjøretillegg innenfor Østfold» står 18 steder og var
sann da dekningsområdet var Østfold. Nå er området Østfold, Oslo, Akershus og Buskerud.
Skal løftet gjelde hele området?

**Valg.** Nei. Østfold-løftet står uendret. For Oslo, Akershus og Buskerud sier sidene
ingenting om kjøretillegg.

**Begrunnelse.** Jeg vet ikke hva prispolitikken er utenfor Østfold. Å utvide et
prisløfte til et område som er fire ganger så stort, uten å vite om det holder, er å
love noe på foretakets vegne. Å si ingenting er ikke en svakhet — det står fortsatt
«fastpris 5 000 kr» på boligkontroll.

**Til deg:** avklar dette. Gjelder fastprisen uten tillegg også i Asker og Drammen? Svaret
avgjør hvordan de fem nye lokalsidene skal formulere seg om pris. Merket
`TRENGER FAKTASJEKK` på de aktuelle sidene.

---

## 4. Dekningsområdet skrives som «Østfold, Oslo, Akershus og Buskerud»

**Situasjon.** Korreksjonen sier at området er disse fire. Siden sa «Østfold og hele
Østlandet» 67 steder, hovedsakelig i footeren.

**Valg.** Én fast formulering brukes overalt: **«Østfold, Oslo, Akershus og Buskerud»**.
«Østlandet» er tatt ut som dekningsbeskrivelse, siden det er upresist og videre enn det
faktiske området.

**Begrunnelse.** Google vekter samsvar mellom dekningsbeskrivelsen på siden og
tjenesteområdet i Google Bedriftsprofil. Én formulering, brukt likt, er sterkere enn fem
varianter.

---

## 5. Lokalsidene for de nye fylkene bygges uten SSB-boligtall i første omgang

**Situasjon.** Østfold-sidene har fire avsnitt boligmasseanalyse bygget på SSB-tall
(tabell 06266, 03174, 08646) hentet per kommune. Det samme kan gjøres for Drammen,
Lillestrøm, Oslo, Bærum og Asker.

**Valg.** Samme metode brukes — tallene hentes fra samme SSB-tabeller for de nye
kommunene. Det er ikke mer arbeid enn å gjenbruke spørringen.

**Begrunnelse.** Det var nettopp SSB-tallene som gjorde at Østfold-sidene fikk under 6 %
tekstoverlapp. Å droppe dem for de nye sidene ville gitt akkurat den tynne sidetypen
hovedordren advarer mot.

---

## 6. Borettslagsartiklene får spredte publiseringsdatoer

**Situasjon.** Tilleggsordren sier: «Ikke skriv alle artiklene samme dag hvis det lar seg
unngå — spre publiseringsdatoene.» Alle åtte skrives i samme økt.

**Valg.** `datePublished` i `Article`-schema settes spredt fremover fra 15. september, én
artikkel annenhver dag. Den synlige datoen på siden følger samme dato.

**Begrunnelse.** Det er datoen Google forholder seg til. De 34 eksisterende artiklene ble
publisert på få dager i august, og det er nettopp det mønsteret som gjør det sannsynlig
at mange står som «Oppdaget – foreløpig ikke indeksert». Å gjenta det med åtte nye ville
forsterket signalet.

**Til deg:** filene finnes fra nå, men datoene ligger frem i tid. Publiser dem gjerne i
takt med datoene i stedet for alle på én gang.

---

## 7. Superlativer er ikke brukt

**Situasjon.** Tilleggsordren forbyr «Norges beste», «markedsledende» og liknende, med
henvisning til markedsføringsloven.

**Valg.** Ingen slike formuleringer er skrevet. Der pakken skal framstå som omfattende,
er det gjort ved å liste hva som faktisk inngår.

**Kontrollert med:** søk etter «Norges», «best», «ledende», «størst», «mest komplette» i
alt nytt innhold.
