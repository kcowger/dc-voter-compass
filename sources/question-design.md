# Question Design Framework

This document specifies how the interactive tool should ask questions to narrow toward candidate recommendations.

## Core principles

### 1. Questions probe values, not predictions

Bad: "Do you support Robert White?"
Good: "What style of advocacy do you think works best in Congress right now?"

The tool should never ask the user to evaluate candidates by name. It asks about priorities, then maps priorities to candidates.

### 2. Two to four questions per race is enough

Source-conversation experience showed that three well-designed questions per race produce confident recommendations. Adding more questions creates fatigue without improving the match.

### 3. Multi-select where real users have multiple priorities

Source conversations validated that voters often pick two priorities, not one. The question schema should support multi-select on issue-priority questions while keeping ideology and profile questions single-select (these are scalar choices).

### 4. Show candidates moving in real time

As the user answers, candidates rise or fall in the live recommendation panel. This is more informative than a single end-of-flow reveal and lets users see how each answer changes the calculus.

### 5. Always make tradeoffs visible

When a user's answers create internal tension (e.g., "progressive lean" plus "housing supply" in the At-Large Dem race, where the most progressive candidates are not the strongest housing-supply candidates), surface the tension. Don't paper over it with a forced recommendation.

## Question patterns by race

### Pre-question: which races

Before any race-specific questions, ask which races the user wants to think through. Each race has its own ballot deadline and its own set of dimensions.

Options:
- Mayor (Democratic primary)
- Delegate to Congress (Democratic primary)
- Council At-Large Democratic primary (Bonds seat)
- Council At-Large special election (McDuffie seat; all voters can vote)
- All of the above

### Mayor race questions

This race is unusually clean ideologically. Lewis George and McDuffie split consistently across most policy dimensions, so 4 to 5 questions is sufficient.

**Q1** (single-select): How should DC trade off ambitious new programs against fiscal caution?
- A) Major new programs (universal childcare, social housing, expanded services) are worth funding
- B) Smaller, fiscally cautious steps are more realistic given DC's budget pressure
- C) Mixed: ambitious on some issues, cautious on others

**Q2** (single-select): What's the right public safety approach?
- A) Prevention-first: invest in jobs, mental health, youth services; less aggressive enforcement
- B) Enforcement-first: hire more police, support curfews, expand pre-trial detention
- C) Balanced at current MPD size with both prevention and enforcement

**Q3** (single-select): What's the right housing strategy?
- A) Build dramatically more, including publicly owned social housing
- B) Build at a sustainable pace with strong tenant protections and ownership pathways
- C) Focus on preserving and improving affordability of existing housing stock

**Q4** (single-select): How should DC fund new programs?
- A) Progressive tax increases on wealthy and corporations
- B) No broad tax increases; lower costs through targeted programs and efficiency

**Q5 optional** (single-select): What's the right posture toward Trump and federal interference?
- A) Confrontational: refuse to comply in advance; draw lines clearly
- B) Strategic: fight smart, pick battles, protect home rule through negotiation

**Note**: Both candidates oppose MPD-ICE cooperation, so this is not a useful differentiating question. Skip ICE-specific questions.

### Delegate to Congress questions

**Q1** (single-select with multi-select support): What's the most important job for the next delegate?
- A) Move statehood meaningfully closer, even if it takes years
- B) Defend DC's existing autonomy from current federal attacks
- C) Direct federal money and rebuild DC's economy post-workforce cuts
- D) Use federal levers for tangible local wins (housing, public safety)

**Q2** (single-select): What style of advocacy do you think will actually work right now?
- A) Inside game: process knowledge, relationships, knowing what fights to pick
- B) Outside game: confrontational leverage, public pressure, reframe the debate
- C) Coalition building: national networks, elite ties, messaging campaigns
- D) Local mobilization: rooted in DC, organizes residents to show up

**Q3** (single-select): What background gives you the most confidence?
- A) Hill experience (worked directly on DC issues in Congress)
- B) DC Council experience (legislative record, local accountability)
- C) Outside-politics expertise (federal agency, business, nonprofit)
- D) National political/fundraising networks

### Council At-Large Democratic primary questions

**Q1** (single-select): With Bonds leaving (she was the moderate swing vote), where do you want this seat to land ideologically?
- A) Shift it progressive
- B) Keep the centrist balance she provided
- C) Ideology matters less to me than competence and judgment

**Q2** (multi-select, up to 2): What issue do you most want an at-large councilmember focused on?
- A) Housing supply and affordability
- B) Public safety and crime
- C) Education quality and equity
- D) Government oversight, accountability, and budget discipline
- E) Federal resilience, DC autonomy, and economic stabilization

**Q3** (multi-select, up to 2): What kind of profile do you want to elevate?
- A) Deep policy expert in one domain
- B) Government insider who knows how DC agencies actually work
- C) Community-rooted advocate from an underrepresented part of the city
- D) Private-sector or outsider perspective

### Council At-Large special election questions

This race has only three candidates with clear ideological differentiation, so a single ideology question may be sufficient. But asking about issue and profile too lets the tool produce a more nuanced ranking.

**Q1** (single-select): Where do you want this seat to land ideologically?
- A) Progressive
- B) Centrist / business-aligned
- C) Doesn't matter

**Q2** (multi-select, up to 2): Most important issue area for this seat?
- A) Housing supply
- B) Education
- C) Federal / Trump resilience
- D) DC agency oversight
- E) Public safety and youth

**Q3** (single-select): What kind of profile do you want?
- A) Past council experience and legislative track record
- B) Education system insider
- C) Current council insider with consensus-building style
- D) Ward 8 community-rooted voice

## Live update rules

As the user answers, the tool should:

1. Show candidates ranked from highest to lowest match
2. For each candidate, show one specific reason their rank is what it is, sourced from their profile
3. Allow click-through to the full candidate profile at any time
4. When a candidate's match changes significantly (rises by 2+ positions or falls by 2+), highlight it briefly

## Tradeoff handling

When a user's answers create internal conflict, the tool should surface it explicitly rather than producing a single answer. Examples:

**At-Large Dem primary**: User selects "progressive" + "housing supply"

The tool should show: "Your criteria pull in slightly different directions. Among the most progressive candidates (Forester, Nelson, Owolewa), housing supply expansion is not the dominant framing. Lisa Raymond is the strongest pro-supply candidate but is closer to the center-left. Here are your top two and what each gives up..."

**Delegate**: User selects "inside game" + "outside-politics expertise"

The tool should show: "These criteria tension against each other. Inside-game candidates (Holbrook, White) come from politics. Outside-politics candidates (Jaczko, Zalesne) tend to favor outside-game strategies. Show the closest matches with the explicit tradeoff..."

## Ranked-choice voting handling

For races with RCV (delegate, both At-Large seats), the tool's final output should be a ranking of 2 to 4 candidates, not a single pick.

Logic:
1. Top match becomes #1
2. Second-best match that does not duplicate the #1 candidate's strengths/weaknesses becomes #2
3. If the user has a candidate they actively oppose (e.g., due to a character flag they call out), that candidate should be omitted from the ranking entirely rather than placed last
4. The tool should explain the strategic logic of each ranking

For the At-Large special election specifically, the tool must explain the Crawford-Patterson cross-endorsement and what it implies for voters.

## What the tool should NEVER do

- Ask questions designed to flatter the user or confirm their assumed leanings
- Recommend a candidate the user's stated criteria don't actually support
- Hide weaknesses of recommended candidates
- Use language like "you'll love [candidate]" or other sentiment-laden framing
- Make up endorsements, quotes, or positions not in the source files
