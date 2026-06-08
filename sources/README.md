# DC 2026 Election Voter Guide Tool

An interactive tool that asks users about their priorities and gradually narrows toward candidate recommendations for the DC June 16, 2026 primary and special election.

## Concept

User answers a series of weighted questions about their values and priorities. The tool dynamically updates which candidates remain in the running, eventually surfacing a recommended ranking for ranked-choice voting (where applicable).

## Races covered

1. **DC Mayor** (Democratic primary) — 2 front-runners (Lewis George, McDuffie); other 6 candidates not covered
2. **DC Delegate to Congress** (Democratic primary) — 5 candidates
3. **DC Council At-Large** (Democratic primary) — 9 candidates for one seat, replacing Anita Bonds
4. **DC Council At-Large** (special election, all voters) — 3 candidates serving the rest of Kenyan McDuffie's term

## File structure

```
dc-election-guide/
├── README.md                                       # This file
├── races/
│   ├── mayor.md                                    # Lewis George vs McDuffie, full policy coverage
│   ├── delegate.md                                 # 5 candidates
│   ├── council-at-large-democratic.md              # 9 candidates
│   └── council-at-large-independent.md             # 3 candidates
└── framework/
    ├── question-design.md                          # Question patterns and elicitation logic
    └── recommendation-logic.md                     # How answers map to candidates
```

## Core design principle: evidence over inference

**Every policy claim about a candidate must trace to a documented source.** The primary source for this guide is The 51st's "DCision2026" candidate profile series. Where a claim is inferred rather than directly stated (e.g., assigning "progressive" or "moderate" labels based on endorsements rather than voting records), the file flags it as inferred.

The tool should never present inferred labels as if they were the candidate's self-description. When in doubt, show the underlying evidence (endorsements, employers, stated priorities) and let the user draw conclusions.

### What counts as evidence in this guide

In descending order of strength:

1. **Direct quotes from the candidate** in published interviews (cited with source)
2. **Endorsement lists** as reported by reputable local outlets
3. **Past employment or affiliations** (e.g., "served as chief of staff to Councilmember X")
4. **Stated priorities in published candidate profiles**
5. **Inferred positions** based on patterns of the above (must be flagged explicitly)

What does NOT count and must never appear:
- Made-up endorsements
- Made-up quotes
- Policy positions inferred from a candidate's demographic background
- Speculation about how a candidate would vote on hypotheticals not addressed in their public statements

## Sources

Primary source for all candidate profiles in this guide: The 51st's "DCision2026" candidate profile series.

- **Delegate race profile**: "Meet the candidates running to be D.C.'s delegate to Congress" by Martin Austermuhle, The 51st, published May 11, 2026
- **At-Large Democratic primary profile**: "Meet the candidates for an At-Large seat on the D.C. Council" by Martin Austermuhle and Sam Delgado, The 51st, published May 14, 2026
- **At-Large special election profile**: "Meet the candidates running in the D.C. Council At-Large special election" by Sam Delgado, The 51st, published May 21, 2026

## Suggested additional sources for production

To build this for actual public use, supplement with:

- Each candidate's official campaign website (verify positions and endorsements)
- The 51st's debate coverage and candidate forums
- DC Board of Elections candidate filings
- DC Council voting records for incumbent candidates (Pinto, White, Crawford as interim)
- Endorsing organizations' official statements (rather than press characterizations)

## What's missing

The mayor race covers the two front-runners (Lewis George and McDuffie) who together have raised the vast majority of funds and represent the realistic outcomes of the primary. The other six Democratic candidates are not profiled. If voters want guidance on Vincent Orange, Gary Goodweather, or others, additional sourcing is required.

## Build approach for Claude Code

### Data model

Each candidate profile in the race files follows a consistent structure:

```
- Name, age, neighborhood
- Current role / background
- Endorsements (sourced)
- Stated priorities (sourced)
- Specific policy positions (sourced)
- Inferred ideological lean (with rationale and "inferred" flag)
- Criteria fit (how the candidate scores against the framework dimensions)
- Strengths
- Weaknesses or concerns to flag
- Source citation
```

This consistency means a script can parse the files into structured JSON if needed.

### Question flow

See `framework/question-design.md` for the recommended question sequence and `framework/recommendation-logic.md` for how to map answers to recommendations.

The general pattern, validated in source conversations:

1. Ask user which races they want guidance on
2. For each race, ask 2 to 4 weighted questions
3. Show candidates dynamically rising or falling as user answers
4. At the end, present a recommended ranking with reasoning
5. Always show the underlying evidence for any recommendation
6. Allow the user to dig into any candidate at any point and see their full profile

### UX honesty requirements

- Never tell a user "candidate X believes Y" if Y is inferred. Use "based on endorsements and prior employment" framing.
- If the user's stated criteria don't have a strong match in the field, say so. Don't force a recommendation.
- For ranked-choice races, explain the strategic implications of ranking (e.g., the Crawford-Patterson cross-endorsement against Silverman).
- Show weaknesses, not just strengths, for each recommended candidate.
