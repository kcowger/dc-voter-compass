# DC Voter Compass

An independent, evidence-based, and private tool for the **June 16, 2026 Washington, DC primary and special election**. Answer a few questions about your priorities and watch a map move you toward the candidates who fit — with the source shown for every claim.

It is built for the first DC election to use **ranked-choice voting**, and it produces a suggested ranked ballot for each race.

> **Independence:** This project is not affiliated with, authorized by, or funded by any candidate, campaign, party, or government body. Candidate positions change; verify anything important against the candidate's own materials and the [DC Board of Elections](https://www.dcboe.org/) before you vote.

## What makes it different

- **Evidence over opinion.** Every position, endorsement, and quote links to a source. Inferred labels (like "progressive" or "moderate") are always flagged as *inferred*, never presented as fact.
- **Strengths and weaknesses.** Each candidate's concerns and flags are shown next to their strengths.
- **Honest about limits.** When your answers don't clearly point anywhere, it says so instead of forcing a recommendation. The mayoral module is explicit that it only covers the two documented front-runners.
- **Private by design.** No accounts, no analytics, no trackers, no third-party requests of any kind. Your answers are stored only in your browser (`localStorage`) and never leave your device.

## Races covered

Eight contested races are interactive: **Mayor**, **Attorney General**, **Council At-Large (Democratic primary)**, **Council At-Large (special election — all voters)**, **Delegate to Congress**, and **Council in Wards 1, 5, and 6**. Four uncontested races (Council Chairman, Ward 3, Shadow Senator, Shadow Representative) are listed for completeness.

### Coverage levels

| Level | Races | How the questions and scoring were built |
|------|-------|-------------------------------------------|
| **From the source guide** | Mayor, Delegate, both At-Large races | Taken directly from a curated guide built on The 51st's *DCision2026* candidate profiles. |
| **Partial** | Mayor | Limited to the two front-runners (Lewis George, McDuffie), who have the most documented records. |
| **Independently researched** | Attorney General, Wards 1/5/6 | Not in the source guide. Researched from local reporting and the candidates' own materials; questions and scoring constructed from those sourced positions. |

Primary sources include [The 51st](https://51st.news/), the Washington Post, WAMU/DCist, Axios DC, WTOP, HillRag, Greater Greater Washington, DC YIMBYs, candidate campaign sites, and the DC Board of Elections. Each candidate profile in the app links to its sources.

## Tech

- **Zero runtime dependencies, no build step.** Plain HTML, CSS, and ES modules. Open the repo, serve it, done.
- **Static and CDN-free.** Fonts and everything else are self-hosted. A strict Content-Security-Policy (`script-src 'self'`, no inline scripts, no `eval`) keeps the attack surface minimal.
- **Accessible.** Semantic HTML, keyboard-operable, screen-reader live updates, `prefers-reduced-motion` support, and a text ranking that mirrors the visual map.

### Run it locally

ES modules need to be served over HTTP (not opened as a `file://`). Any static server works:

```bash
# Python
python3 -m http.server 8099
# or Node
npx serve .
```

Then open `http://localhost:8099`.

### Project structure

```
index.html            # shell: header, footer, CSP, fonts
css/                  # tokens.css, styles.css, race.css, map.css
js/
  app.js              # router + view mounting
  engine.js           # pure scoring functions
  map.js              # the spatial map (SVG)
  views.js            # all screens + candidate profiles
  store.js            # local-only state (localStorage)
  util.js             # DOM helpers, router, a11y, icons
data/
  meta.js             # voting logistics, sourcing, disclaimers
  races/*.js          # one file per race: candidates, questions, scoring matrices
sources/              # the underlying markdown guide, for provenance
```

### Updating or adding a candidate / race

All candidate data and scoring live in `data/races/*.js`. Each race is a single object: candidates (with sourced profiles), questions, and a per-answer scoring matrix. Add a candidate by extending the matrices; the engine and UI need no changes. Every factual field should carry a verifiable source — see `sources/README.md` for the evidence standard.

## Found an error?

Accuracy matters most. Please open an issue or pull request with the correction and a source.

## License

- **Code:** [MIT](LICENSE).
- **Fonts:** Space Grotesk, Public Sans, and Fraunces, used under the [SIL Open Font License](assets/fonts/LICENSE.md).
- **Candidate information** is factual reporting drawn from the cited public sources.
