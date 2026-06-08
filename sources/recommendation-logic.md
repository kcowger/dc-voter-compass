# Recommendation Logic

This document specifies how user answers should map to candidate recommendations. It's designed to be implemented as a scoring system rather than a hardcoded decision tree, so the logic stays interpretable and easy to update.

## Scoring model

Each candidate gets a score per question per answer. Total score determines the ranking. Scores are:

- **3**: Strong fit (this candidate is the clearest match on this dimension)
- **2**: Good fit (candidate fits well but isn't the standout)
- **1**: Partial fit (candidate has some alignment)
- **0**: No fit or mismatch
- **-1**: Active mismatch (this answer is directly against the candidate's known position)

The tool should sum scores across questions, then rank candidates by total.

## Delegate to Congress race

### Q1: Most important job

| Answer | Holbrook | Jaczko | Pinto | White | Zalesne |
|--------|----------|--------|-------|-------|---------|
| A) Statehood meaningfully closer | 2 | 2 | 1 | 2 | 3 |
| B) Defend autonomy from federal attacks | 3 | 2 | 1 | 2 | 1 |
| C) Direct federal money / economy | 1 | 2 | 2 | 3 | 2 |
| D) Federal levers for local wins | 1 | 1 | 3 | 2 | 1 |

### Q2: Style of advocacy

| Answer | Holbrook | Jaczko | Pinto | White | Zalesne |
|--------|----------|--------|-------|-------|---------|
| A) Inside game | 3 | 0 | 2 | 3 | 1 |
| B) Outside game | 0 | 3 | 1 | 1 | 1 |
| C) Coalition building | 1 | 1 | 1 | 2 | 3 |
| D) Local mobilization | 1 | 1 | 1 | 2 | 1 |

### Q3: Background

| Answer | Holbrook | Jaczko | Pinto | White | Zalesne |
|--------|----------|--------|-------|-------|---------|
| A) Hill experience | 3 | 0 | 0 | 2 | 0 |
| B) DC Council experience | 0 | 0 | 3 | 3 | 0 |
| C) Outside-politics expertise | 0 | 3 | 0 | 0 | 2 |
| D) National political networks | 0 | 0 | 1 | 1 | 3 |

### Worked example: source conversation answers (A on Q1+C, A on Q2, B on Q3)

- Holbrook: 2 + 1 + 3 + 3 + 0 = 9
- Jaczko: 2 + 2 + 0 + 0 = 4
- Pinto: 1 + 2 + 2 + 3 = 8
- White: 2 + 3 + 3 + 3 = **11** (highest)
- Zalesne: 3 + 2 + 1 + 0 = 6

Recommended: **White**, with the rationale that he is the only candidate scoring highly on all three dimensions (combined Hill + Council experience is rare; explicit Appropriations focus matches the "direct federal money" priority; inside-game style).

## Mayor race

The mayor race is unusually clean: Lewis George and McDuffie split predictably across nearly every dimension. The scoring model below reflects that.

### Q1: Scale of ambition vs. fiscal sustainability

| Answer | Lewis George | McDuffie |
|--------|--------------|----------|
| A) Major new programs worth funding | 3 | 0 |
| B) Smaller, fiscally cautious steps | 0 | 3 |
| C) Mixed | 2 | 2 |

### Q2: Public safety approach

| Answer | Lewis George | McDuffie |
|--------|--------------|----------|
| A) Prevention-first, less aggressive enforcement | 3 | 0 |
| B) Enforcement-first, hire more police, curfews | 0 | 3 |
| C) Balanced at current MPD size | 2 | 1 |

### Q3: Housing approach

| Answer | Lewis George | McDuffie |
|--------|--------------|----------|
| A) Build dramatically more, social housing | 3 | 0 |
| B) Sustainable pace with tenant protections + ownership | 1 | 3 |
| C) Focus on preservation and existing stock affordability | 2 | 2 |

### Q4: Taxes and revenue

| Answer | Lewis George | McDuffie |
|--------|--------------|----------|
| A) Progressive tax increases on wealthy/corps | 3 | 0 |
| B) No broad tax increases | 0 | 3 |

### Q5 (optional): Federal/Trump posture

| Answer | Lewis George | McDuffie |
|--------|--------------|----------|
| A) Confrontational, refuse to comply | 3 | 1 |
| B) Strategic, fight smart, negotiate | 1 | 3 |

### Character-flag handling for the mayor race

Both candidates have items the tool should surface, not hide:

**Lewis George flags**:
- Active DC Office of Campaign Finance investigation into alleged improper labor coordination
- Campaign for Accountability complaint about financial disclosure failures
- Referred to Trayon White (under federal bribery indictment) as a "mentor" in May 2026
- Some critics view her pension-fund proposal for housing financing as risky

**McDuffie flags**:
- Heavy reliance on real-estate and business donors may concern voters worried about developer influence
- Curfew and detention votes are out of step with many criminal justice reform advocates
- The 1,000-officer hiring target is much larger than current MPD attrition can support quickly

The tool should present these flags as filterable, not as automatic negative scores. A user who feels strongly about ethics may want to filter out Lewis George; a user who feels strongly about over-policing may want to filter out McDuffie. The user makes the call.

## Council At-Large Democratic primary

### Q1: Ideological direction

| Answer | Chavous | Davis | Forester | Hill | Jackson | Jenkins | Nelson | Owolewa | Raymond |
|--------|---------|-------|----------|------|---------|---------|--------|---------|---------|
| A) Shift progressive | 0 | 1 | 3 | -1 | 1 | 2 | 3 | 3 | 1 |
| B) Keep centrist | 3 | 2 | 1 | 3 | 2 | 1 | 1 | 0 | 2 |
| C) Ideology matters less | 1 | 2 | 1 | 1 | 2 | 1 | 2 | 1 | 2 |

### Q2: Most important issue (multi-select; sum across selected answers)

| Answer | Chavous | Davis | Forester | Hill | Jackson | Jenkins | Nelson | Owolewa | Raymond |
|--------|---------|-------|----------|------|---------|---------|--------|---------|---------|
| A) Housing supply / affordability | 2 | 1 | 2 (mixed) | 2 | 1 | 1 | 2 | 1 | 3 |
| B) Public safety | 1 | 1 | 1 | 2 | 3 | 1 | 1 | 1 | 1 |
| C) Education | 2 | 3 | 1 | 1 | 1 | 2 | 2 | 2 | 3 |
| D) Oversight / accountability | 1 | 2 | 1 | 2 | 1 | 1 | 3 | 2 | 2 |
| E) Federal / autonomy / economy | 1 | 1 | 2 | 1 | 2 | 1 | 2 | 3 | 1 |

**Note on Forester's housing score**: She gets a 2 not a 3 because her published quote questioning whether building faster is the right solution is a real flag for users prioritizing supply expansion. The tool should make this visible.

### Q3: Profile preference (multi-select; sum across selected answers)

| Answer | Chavous | Davis | Forester | Hill | Jackson | Jenkins | Nelson | Owolewa | Raymond |
|--------|---------|-------|----------|------|---------|---------|--------|---------|---------|
| A) Deep policy expert | 2 | 2 | 2 | 3 (zoning) | 2 | 1 | 2 | 1 | 3 (housing) |
| B) Government insider | 3 | 1 | 2 | 2 | 2 | 1 | 3 | 1 | 3 |
| C) Community-rooted east of river | 3 | 2 | 3 | 1 | 3 | 3 | 1 | 3 | 0 |
| D) Private sector / outsider | 1 | 1 | 1 | 3 | 1 | 2 | 0 | 1 | 1 |

### Worked example: source conversation answers (A on Q1, A+D on Q2, B+C on Q3)

Sum the scores for each candidate across the selected answers:

- **Nelson**: 3 (Q1-A) + 2 (Q2-A) + 3 (Q2-D) + 3 (Q3-B) + 1 (Q3-C) = **12** (highest)
- **Raymond**: 1 + 3 + 2 + 3 + 0 = 9
- **Forester**: 3 + 2 + 1 + 2 + 3 = 11
- **Owolewa**: 3 + 1 + 2 + 1 + 3 = 10
- Chavous: 0 + 2 + 1 + 3 + 3 = 9
- Davis: 1 + 1 + 2 + 1 + 2 = 7
- Hill: -1 + 2 + 2 + 2 + 1 = 6
- Jackson: 1 + 1 + 1 + 2 + 3 = 8
- Jenkins: 2 + 1 + 1 + 1 + 3 = 8

Recommended ranking: **Nelson, Forester, Raymond, Owolewa**

This is slightly different from the source-conversation recommendation (which was Nelson, Raymond, Forester). The scoring model produces Forester ahead of Raymond on raw points because of strong ideology and community scores. The source-conversation reasoning placed Raymond ahead because Forester's housing supply skepticism was treated as a more significant flag.

**Implementation note**: When two candidates are close in raw score, the tool should let the user see the breakdown and decide which tradeoff weighs more for them. Specifically:

- Forester: stronger on ideology and community roots; weaker on housing supply
- Raymond: stronger on housing supply and insider profile; weaker on progressive ideology

This is a real tradeoff that the scoring model can surface but shouldn't pretend to resolve definitively.

## Council At-Large special election

### Q1: Ideological direction

| Answer | Crawford | Patterson | Silverman |
|--------|----------|-----------|-----------|
| A) Progressive | 0 | 1 | 3 |
| B) Centrist | 3 | 2 | 0 |
| C) Doesn't matter | 1 | 1 | 1 |

### Q2: Most important issue (multi-select)

| Answer | Crawford | Patterson | Silverman |
|--------|----------|-----------|-----------|
| A) Housing supply | 2 | 2 | 3 |
| B) Education | 1 | 3 | 1 |
| C) Federal / Trump resilience | 1 | 1 | 3 |
| D) Oversight | 1 | 1 | 3 |
| E) Public safety / youth | 3 | 2 | 1 |

### Q3: Profile preference

| Answer | Crawford | Patterson | Silverman |
|--------|----------|-----------|-----------|
| A) Past council experience | 2 | 1 | 3 |
| B) Education system insider | 1 | 3 | 1 |
| C) Current council insider | 3 | 1 | 1 |
| D) Ward 8 community voice | 0 | 3 | 0 |

### Worked example: source conversation reasoning (progressive + housing/oversight + insider)

- Crawford: 0 + 2 + 1 + 2 = 5
- Patterson: 1 + 2 + 1 + 1 = 5
- **Silverman**: 3 + 3 + 3 + 3 = **12** (dominant)

Recommended ranking: **Silverman #1**. Whether to rank #2 is a user choice. Patterson and Crawford are roughly tied, but for a user who picked progressive, Patterson is slightly less of an ideological stretch than Crawford.

## Cross-race coherence

The tool should recognize that users often have consistent preferences across races. If a user picks "progressive" in the At-Large Dem race, they likely lean progressive in the special election too. The tool can either:

1. Ask the same ideology question once and apply it to both races
2. Ask each race independently and surface inconsistencies for user confirmation

Option 2 is more honest but slightly more friction. Option 1 is more efficient but assumes coherence the user may not actually have.

## Edge cases the logic should handle

1. **User answers don't strongly differentiate**: If the top two candidates are within 1 point of each other, present both with their distinguishing strengths.

2. **User has a character-flag-style preference**: If the user explicitly indicates they don't want a candidate (e.g., flags Pinto's oppo research dump, or White's WHCD post, or Silverman's campaign finance history), the tool should honor that and remove the candidate from the ranking rather than scoring them lower.

3. **User has no strong opinion**: If a user clicks "no preference" on most questions, the tool should not produce a confident ranking. Instead, it should suggest reading the candidate profiles directly.

4. **User changes an answer**: All scores recalculate immediately. The live recommendation panel updates.

## Implementation notes

- The score matrices above can be loaded as JSON for easy iteration
- Adding a candidate or a question requires extending the matrices; the scoring logic stays the same
- Weights between questions can be adjusted (e.g., ideology might count 1.5x in some races) but the source conversations used equal weighting and it worked
- The character-flag handling should be implemented as a separate filter, not as negative scores, because it represents a categorical preference rather than a continuous one
