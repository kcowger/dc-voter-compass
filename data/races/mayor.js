// DC Mayor, Democratic primary.
// Coverage focuses on the two front-runners, Janeese Lewis George and Kenyan
// McDuffie, who each qualified for Fair Elections public financing and raised
// over $1M. Content traces to the candidates' campaign sites, DC Council
// legislative records, The 51st, Washington Post, and Axios DC. Scoring matrix
// taken verbatim from the guide's recommendation-logic. Ethics items are
// disclosed for both candidates, never hidden.

const SRC_LG = {
  label: "Janeese Lewis George campaign site, DC Council records, The 51st, Washington Post, Axios DC",
  url: "https://www.janeesefordc.com/"
};
const SRC_MCD = {
  label: "Kenyan McDuffie campaign site, DC Council records, The 51st, Washington Post, Axios DC",
  url: "https://www.kenyanmcduffie.com/"
};

export const mayor = {
  id: "mayor",
  group: "citywide",
  title: "Mayor",
  shortTitle: "Mayor",
  ballot: "Democratic primary",
  allVoters: false,
  rcv: true,
  coverage: "partial",
  coverageNote:
    "This module covers the two clear front-runners, Janeese Lewis George and Kenyan McDuffie, who each qualified for public financing and raised over $1M. Other Democrats also qualified; see the full official field linked below. We don't have enough sourced detail to score the rest fairly, so we don't.",
  seat:
    "Open seat, Mayor Muriel Bowser is not seeking a fourth term, the first contested mayoral primary in 20 years.",
  overview:
    "In heavily Democratic DC, the primary winner is widely expected to win in November. The race is an unusually clean ideological contrast between a progressive (Lewis George) and a moderate (McDuffie).",
  stakes:
    "The next mayor sets the city's direction on housing scale, policing, taxes, and how confrontational to be with the Trump administration, at a moment of real federal pressure on DC.",
  map: {
    x: { label: "Ideological lean", left: "Progressive", right: "Moderate" },
    y: { label: "Public-safety approach", low: "Enforcement-first", high: "Prevention-first" },
    note: "The two front-runners sit at opposite poles on nearly every dimension. Your marker slides along the line between them as you answer."
  },
  candidates: [
    {
      id: "lewisgeorge",
      name: "Janeese Lewis George",
      age: 38,
      neighborhood: "Ward 4 (third-generation Washingtonian)",
      role: "Ward 4 Councilmember since 2021",
      background:
        "Former Assistant Attorney General under Karl Racine and former Assistant General Counsel at OSSE. A self-identified democratic socialist; the first Council member affiliated with the Metro DC DSA since 1998. Her platform centers on affordability, economic populism, and standing up to the Trump administration.",
      pos: [-0.75, 0.6],
      tagline: "Progressive · prevention-first · ambitious scale",
      inferredLean:
        "Progressive / democratic socialist, this is her self-description, not an inference.",
      priorities: [
        "Affordability across housing, childcare, and utilities",
        "Economic populism funded by progressive revenue",
        "A confrontational posture toward federal interference"
      ],
      positions: [
        "Housing: target of 72,000 new units over five years (roughly six times McDuffie's pace), plus \"Dignified Homes DC\" social housing",
        "Proposes financing affordable housing construction with billions from the city's pension funds (the Washington Post criticized this editorially)",
        "Voted NO on the 2025 RENTAL Act (one of three no votes); tried to remove its violent-tenant eviction provision",
        "Public safety: \"prevention, intervention, and enforcement,\" Community Hubs in all eight wards, no stated MPD hiring target",
        "Voted against extending the youth curfew four times; says she would end the policy as mayor",
        "Childcare: universal subsidy capping family cost at 7% of income, paid directly to providers",
        "Co-authored a 2021 income-tax increase on high earners; supports a Business Activity Tax",
        "Would end MPD cooperation with ICE on day one; \"no comply in advance\"",
        "Schools: reduce mayoral control, giving the State Board of Education authority over the Superintendent"
      ],
      endorsements: [
        "A broad cross-section of DC's labor movement and progressive groups (per Axios DC, May 2026)"
      ],
      strengths: [
        "Most ambitious affordability agenda in the race (housing scale, universal childcare)",
        "Clear, consistent progressive record voters can check against her votes",
        "Strong labor and progressive coalition"
      ],
      weaknesses: [
        "Social-housing mechanism is unproven at DC scale",
        "Pension-fund housing financing is contested and drew editorial criticism",
        "No stated MPD hiring target may concern voters focused on police staffing"
      ],
      flags: [
        {
          id: "ethics",
          label: "Active campaign-finance investigation and a disclosure complaint",
          detail:
            "An active DC Office of Campaign Finance investigation into alleged improper coordination with organized labor; and a May 2026 Campaign for Accountability complaint to BEGA alleging she failed to properly disclose her family's financial assets over multiple years."
        },
        {
          id: "trayon",
          label: "Called expelled Councilmember Trayon White a \"mentor\"",
          detail:
            "In May 2026 she referred to expelled Ward 8 Councilmember Trayon White (under federal bribery indictment) as a \"mentor,\" and had earlier agreed to administer his oath of office. She did vote with the Council supermajority to expel him."
        }
      ],
      source: SRC_LG
    },
    {
      id: "mcduffie",
      name: "Kenyan McDuffie",
      age: 51,
      neighborhood: "DC",
      role: "Former At-Large Councilmember (stepped down to run for mayor)",
      background:
        "A former postal worker and aide to Delegate Norton, then a civil-rights attorney at the U.S. DOJ under Obama. Elected to represent Ward 5 in 2012, then At-Large in 2022. Campaign frame is making DC \"the most affordable city in the U.S.\" through lower costs rather than new taxes.",
      pos: [0.7, -0.6],
      tagline: "Moderate · enforcement-forward · fiscally cautious",
      inferredLean:
        "Moderate. Business and real-estate-aligned coalition; emphasis on lowering costs without broad tax increases. (Inferred from his coalition and platform.)",
      priorities: [
        "Lower cost of living without raising taxes",
        "Expand opportunity in every ward",
        "Strengthen public safety, including police staffing"
      ],
      positions: [
        "Housing: 12,000 new units by 2030, preserve 20,000 affordable units, cut approval timelines by 50%",
        "Voted YES on the 2025 RENTAL Act; expanded down-payment assistance and streamlined approvals",
        "Public safety: hire 1,000 additional MPD officers; authored the NEAR Act and DC's body-worn-camera law",
        "Voted for the youth curfew three times; calls it part of a broader strategy, \"not a standalone fix\"",
        "Authored a 2024 amendment sunsetting expanded pre-trial detention after 225 days for study",
        "Childcare: expand the Local Child Tax Credit and employer incentives rather than a universal subsidy",
        "No broad-based tax increases; helped secure the Capital One Arena and RFK stadium deals",
        "Would end ICE raids and revoke MPD cooperation with ICE: \"The ICE raids have to end\"",
        "Schools: continue mayoral control"
      ],
      endorsements: [
        "Real-estate and business-friendly organizations, including Opportunity DC (per Axios DC, May 2026)"
      ],
      strengths: [
        "Concrete, costed public-safety plan and a long record on the issue (NEAR Act, body cameras)",
        "Fiscally cautious agenda that avoids broad tax increases",
        "Deep legislative and executive experience across nine years chairing the business/economy committee"
      ],
      weaknesses: [
        "Housing target is far smaller than Lewis George's",
        "Heavy reliance on real-estate and business donors may concern voters worried about developer influence",
        "The 1,000-officer target is larger than current MPD attrition can fill quickly"
      ],
      flags: [
        {
          id: "donors",
          label: "Business and real-estate donor base",
          detail:
            "His coalition is heavily real-estate and business; voters concerned about developer influence may weigh this. (No active ethics investigation is documented.)"
        },
        {
          id: "enforcement",
          label: "Curfew and detention votes",
          detail:
            "His curfew and pre-trial detention votes are out of step with many criminal-justice reform advocates. He did author a 225-day sunset on the expanded detention provisions to study their effect."
        }
      ],
      source: SRC_MCD
    }
  ],
  questions: [
    {
      id: "ambition",
      text: "How should DC trade off ambitious new programs against fiscal caution?",
      type: "single",
      options: [
        { id: "A", label: "Major new programs (universal childcare, social housing) are worth funding", scores: { lewisgeorge: 3, mcduffie: 0 } },
        { id: "B", label: "Smaller, fiscally cautious steps are more realistic given budget pressure", scores: { lewisgeorge: 0, mcduffie: 3 } },
        { id: "C", label: "Mixed: ambitious on some issues, cautious on others", scores: { lewisgeorge: 2, mcduffie: 2 } }
      ]
    },
    {
      id: "safety",
      text: "What's the right public-safety approach?",
      type: "single",
      options: [
        { id: "A", label: "Prevention-first: jobs, mental health, youth services; less aggressive enforcement", scores: { lewisgeorge: 3, mcduffie: 0 } },
        { id: "B", label: "Enforcement-first: hire more police, support curfews, expand pre-trial detention", scores: { lewisgeorge: 0, mcduffie: 3 } },
        { id: "C", label: "Balanced at current MPD size, with both prevention and enforcement", scores: { lewisgeorge: 2, mcduffie: 1 } }
      ]
    },
    {
      id: "housing",
      text: "What's the right housing strategy?",
      type: "single",
      options: [
        { id: "A", label: "Build dramatically more, including publicly owned social housing", scores: { lewisgeorge: 3, mcduffie: 0 } },
        { id: "B", label: "Build at a sustainable pace with strong tenant protections and ownership pathways", scores: { lewisgeorge: 1, mcduffie: 3 } },
        { id: "C", label: "Focus on preserving and improving existing affordable housing", scores: { lewisgeorge: 2, mcduffie: 2 } }
      ]
    },
    {
      id: "taxes",
      text: "How should DC fund new programs?",
      type: "single",
      options: [
        { id: "A", label: "Progressive tax increases on the wealthy and corporations", scores: { lewisgeorge: 3, mcduffie: 0 } },
        { id: "B", label: "No broad tax increases; lower costs through targeted programs and efficiency", scores: { lewisgeorge: 0, mcduffie: 3 } }
      ]
    },
    {
      id: "federal",
      text: "What's the right posture toward Trump and federal interference?",
      help: "Optional, both candidates oppose ICE cooperation, so this mainly captures tone.",
      type: "single",
      optional: true,
      options: [
        { id: "A", label: "Confrontational: refuse to comply in advance; draw clear lines", scores: { lewisgeorge: 3, mcduffie: 1 } },
        { id: "B", label: "Strategic: fight smart, pick battles, protect home rule through negotiation", scores: { lewisgeorge: 1, mcduffie: 3 } }
      ]
    }
  ],
  tradeoffs: [],
  // Side-by-side rendered on the results screen for this race.
  comparison: [
    { dimension: "Housing build target", lewisgeorge: "72,000 units / 5 years", mcduffie: "12,000 units by 2030" },
    { dimension: "RENTAL Act vote", lewisgeorge: "No (one of three)", mcduffie: "Yes (with the 10–3 majority)" },
    { dimension: "MPD hiring target", lewisgeorge: "None stated", mcduffie: "1,000 additional officers" },
    { dimension: "Youth curfew", lewisgeorge: "Would end as mayor", mcduffie: "Supports as part of a broader strategy" },
    { dimension: "Childcare", lewisgeorge: "Universal subsidy capped at 7% of income", mcduffie: "Expand the Local Child Tax Credit" },
    { dimension: "Taxes", lewisgeorge: "Co-authored 2021 income-tax hike; backs a Business Activity Tax", mcduffie: "No broad-based tax increases" },
    { dimension: "Mayoral control of schools", lewisgeorge: "Reduce; empower the State Board of Education", mcduffie: "Continue" },
    { dimension: "ICE cooperation", lewisgeorge: "End it", mcduffie: "End it (and end raids)" }
  ],
  rcvNote:
    "This race uses ranked-choice voting. Because the two front-runners sit at opposite poles, your answers usually point clearly to one. If you land in the middle, your ranking shows which one edges ahead and why.",
  notCovered: {
    note:
      "Other Democrats also qualified for the mayoral ballot. We focus on the two front-runners because they are the only candidates with enough sourced, verifiable policy detail to score fairly. For the complete field and their materials:",
    others: ["Gary Goodweather", "Ernest Johnson", "Vincent Orange", "Rini Sampath", "Hope Solomon"],
    links: [
      { label: "Full official candidate list (DC Board of Elections)", url: "https://www.dcboe.org/" },
      { label: "The 51st, DCision2026 mayor coverage", url: "https://51st.news/washington-dc-2026-primary-election-june-16-mayor-council/" }
    ]
  }
};
