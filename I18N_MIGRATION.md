# Umstellung auf next-intl — Was wurde gemacht und warum

## Ausgangslage

Die Seite war zweisprachig (Persisch/Englisch), aber die Sprachumschaltung lief rein
im Browser: ein `LanguageContext` (`useLanguage()`-Hook) hat die gewählte Sprache in
`localStorage` gespeichert. Persisch und Englisch liefen dabei über **dieselbe URL**
(z. B. `/products` zeigte je nach gespeicherter Einstellung FA oder EN).

### Warum das ein Problem war

- **SEO:** Google kann eine URL nur mit einem Inhalt indexieren. Da FA und EN dieselbe
  URL teilten, war die englische Version für Suchmaschinen praktisch unsichtbar — es
  gab kein zweites, eigenständig auffindbares Ergebnis.
- **Kein `hreflang`:** Ohne getrennte URLs gibt es kein Signal an Google, welche Sprache
  zu welcher Seite gehört.
- **Architektur:** Da die Sprache nur im Browser (`localStorage`) bekannt war, mussten
  praktisch alle Komponenten, die Text anzeigen, als Client-Components (`'use client'`)
  gebaut werden. Das verhindert die volle Nutzung von Next.js Server Components und
  kostet Ladezeit/Performance.
- **Kein FOUC-Schutz ohne Trick:** Um zu verhindern, dass beim Laden kurz die falsche
  Sprache aufblitzt, war ein extra Inline-Script im `<head>` nötig, das vor der
  eigentlichen Seite `localStorage` ausliest.

## Was geändert wurde

Migration auf [**next-intl**](https://next-intl.dev), die Standard-Lösung für
Mehrsprachigkeit im Next.js App Router.

### 1. Neue URL-Struktur

- Persisch bleibt **Hauptsprache ohne Präfix**: `/`, `/products`, `/projects/xyz`
- Englisch bekommt eigene, eigenständige URLs: `/en`, `/en/products`, `/en/projects/xyz`
- Kein Umbruch für bestehende (bereits indexierte) persische URLs.

### 2. Routing-Umbau

Alle Seiten liegen jetzt unter `src/app/[locale]/...` statt direkt unter `src/app/...`.
Next.js erkennt daran automatisch, ob gerade FA oder EN angefragt wird, und übergibt
das an jede Seite.

### 3. Neue Konfigurationsdateien

- `src/i18n/routing.ts` — definiert unterstützte Sprachen (`fa`, `en`) und Standard­sprache
- `src/i18n/navigation.ts` — sprachbewusste Version von `Link`, `useRouter`, `usePathname`
- `src/i18n/request.ts` — lädt die passenden Übersetzungstexte je nach Sprache
- `src/proxy.ts` — erkennt anhand der URL, welche Sprache angezeigt werden soll
  (Next.js 16 nennt diese Datei nicht mehr `middleware.ts`, sondern `proxy.ts`)

### 4. Layout statt Inline-Script

`src/app/[locale]/layout.tsx` setzt `<html lang="fa" dir="rtl">` (bzw. `en`/`ltr`) jetzt
direkt serverseitig, basierend auf der URL — kein Auslesen von `localStorage` mehr nötig,
kein Flackern der falschen Sprache beim Laden.

### 5. Inhalte: nichts inhaltlich gelöscht

- **`src/data/*.json`** (Produkte, Projekte, Navigation, etc.) bleiben **unverändert**
  in ihrer Struktur `{ "fa": {...}, "en": {...} }`. Nur die Art des Zugriffs hat sich
  geändert (`pickLocale(data, locale)` statt `data[lang]` aus dem alten Context).
- **`messages/fa.json` / `messages/en.json`** (neu) — nur für kleine, wiederverwendbare
  UI-Texte, die vorher direkt im Code standen (z. B. Placeholder im Suchfeld, „Zurück
  nach oben"-Beschriftung).

➜ **Wichtig für den täglichen Gebrauch:** Neue Produkte/Inhalte müssen weiterhin
manuell in **beiden** Sprachen (`fa` und `en`) in die jeweilige JSON-Datei eingetragen
werden. Das war vorher so und ist auch weiterhin so — next-intl übersetzt keine
Inhalte, es entscheidet nur, welche Sprache wo und wie angezeigt wird.

### 6. Ein bestehendes Sicherheits-Feature erhalten

Beim Umbau wurde eine bereits vorhandene `middleware.ts` gefunden, die Hotlinking von
Bildern verhindert (blockiert Anfragen mit fremder `Referer`-Adresse). Da Next.js 16
nur eine einzige Datei (`proxy.ts`) statt `middleware.ts` erlaubt, wurde diese Logik
in `src/proxy.ts` übernommen — nicht gelöscht.

## Vorteile der Umstellung

| Bereich | Vorher | Jetzt |
|---|---|---|
| SEO | Nur eine Sprache pro URL indexierbar | FA und EN jeweils eigene, crawlbare URL |
| `hreflang` | Nicht vorhanden | Automatisch von next-intl generiert |
| Performance | Zwang zu Client-Components überall | Server Components möglich, weniger JS im Browser |
| Sprachwechsel beim Laden | Kurzes Flackern möglich (Client-Fix nötig) | Sprache steht serverseitig sofort fest, kein Flackern |
| Sprachumschalter | Reiner State-Wechsel im Browser | Echte Navigation zu einer eigenständigen URL |
| CSS | — | **Keine einzige Zeile geändert** — RTL/LTR lief immer schon über `dir`-Attribut |

## Konkrete Datei-Änderungen (Übersicht)

Insgesamt: 66 Dateien geändert (8 Commits, nachvollziehbar in der Git-Historie auf
dem Branch `feature/language`).

**Neu erstellt:**
- `src/i18n/routing.ts`, `src/i18n/navigation.ts`, `src/i18n/request.ts`
- `src/i18n/direction.ts` (RTL/LTR je Sprache), `src/i18n/bcp47.ts` (Format für
  Zahlen/Daten je Sprache, z. B. `fa-IR` / `en-US`)
- `src/proxy.ts` (ersetzt `src/middleware.ts`, siehe unten)
- `src/lib/pickLocale.ts` (kleine Hilfsfunktion für den Datenzugriff)
- `messages/fa.json`, `messages/en.json` (neue UI-Textbausteine)
- Diese Datei (`I18N_MIGRATION.md`)

**Gelöscht:**
- `src/context/LanguageContext.tsx` (alter `useLanguage()`-Hook, nicht mehr gebraucht)
- `src/middleware.ts` (Inhalt in `src/proxy.ts` übernommen, s. u.)
- `src/app/layout.tsx` (ersetzt durch `src/app/[locale]/layout.tsx`)

**Verschoben** (per `git mv`, Historie bleibt erhalten):
- Alle Seiten von `src/app/...` nach `src/app/[locale]/...`
  (`page.tsx`, `about/`, `products/`, `products/[slug]/`, `projects/`,
  `projects/[slug]/`, `resources/`, `design-system/`)
- `src/app/api/contact/route.ts` bewusst **nicht** verschoben — API-Routen brauchen
  kein Sprach-Präfix.

**Inhaltlich angepasst** (ca. 30 Komponenten-Dateien): überall wurde
`const { lang } = useLanguage()` (alter Context) ersetzt durch
`const locale = useLocale()` (next-intl) bzw. `useTranslations()` für die neuen
Textbausteine. Beispiele: `Header.tsx`, `Footer.tsx`, `Hero.tsx`, `ProductCard.tsx`,
`ContactForm.tsx`, `SearchOverlay.tsx`, `LanguageSwitch.tsx` u. a. — die vollständige
Liste steht im Commit `Migrate remaining components to next-intl`.

**`next.config.ts`:** next-intl-Plugin eingebunden; zusätzlich einen zweiten Redirect
ergänzt, damit `/en/products/cc-400` genauso wie `/products/cc-400` korrekt auf die
neue Produktseite weiterleitet (vorher gab es nur die persische Variante).

**Besonderheit `src/proxy.ts`:** Beim Verschieben wurde eine bereits bestehende, bisher
nicht dokumentierte `src/middleware.ts` gefunden — sie blockiert das Einbetten von
Bildern von fremden Webseiten (Hotlink-Schutz). Next.js 16 erlaubt nur noch eine Datei
dieser Art (`proxy.ts` statt `middleware.ts`). Diese Schutzlogik wurde
**unverändert in `src/proxy.ts` übernommen**, nicht gelöscht.

## Was NICHT geändert wurde

- Keine CSS-Änderungen (0 Zeilen Diff in `globals.css`).
- Keine inhaltlichen Textänderungen — alle vorhandenen FA/EN-Texte bleiben exakt erhalten.
- Die Pflege neuer Inhalte (Produkte, Projekte) funktioniert weiterhin gleich: beide
  Sprachversionen von Hand eintragen.
