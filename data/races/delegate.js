// DC Delegate to Congress, Democratic primary.
// Base profiles from The 51st's DCision2026 delegate profile ("Meet the
// candidates running to be D.C.'s delegate to Congress," May 11, 2026),
// deepened June 8, 2026 from candidates' own sites and endorsement releases.
// Notable correction: Robert White's caucus backing is via the Congressional
// Black Caucus PAC and Congressional Progressive Caucus PAC (not the caucuses
// as institutions). Jaczko's site (gojaczko4dc.com) is JS-rendered and did not
// return text, so his positions stay sourced to The 51st and are flagged.

const SOURCE = {
  label: "The 51st, “Meet the candidates running to be D.C.'s delegate to Congress” (May 11, 2026)",
  url: "https://51st.news/washington-dc-2026-primary-election-june-16-mayor-council/"
};
// Candidates' own materials and primary endorsement releases, read June 8, 2026.
const SITE = {
  white: { label: "Robert White endorsements (joinrobertwhite.com/endorsements)", url: "https://www.joinrobertwhite.com/endorsements" },
  pinto: { label: "Brooke Pinto endorsements (brookepintoforcongress.com/endorsements)", url: "https://brookepintoforcongress.com/endorsements" },
  holbrook: { label: "Trent Holbrook issues (trentholbrook.com/issues)", url: "https://www.trentholbrook.com/issues" },
  zalesne: { label: "Kinney Zalesne issues (kinneyfordc.com)", url: "https://www.kinneyfordc.com/issues-1" }
};
const CPC_PAC = { label: "Congressional Progressive Caucus PAC endorsement of Robert White (May 5, 2026)", url: "https://weareprogressives.org/congressional-progressive-caucus-pac-endorses-robert-white-for-dc-delegate/" };

export const delegate = {
  id: "delegate",
  group: "federal",
  title: "Delegate to Congress",
  shortTitle: "Delegate",
  ballot: "Democratic primary",
  allVoters: false,
  rcv: true,
  coverage: "full",
  seat: "Open seat, Eleanor Holmes Norton, delegate since 1991, is not running again.",
  overview:
    "DC's delegate is a non-voting member of Congress. The job is pushing for statehood, defending home rule from federal interference, securing federal funding, and limiting Republican interference in local affairs.",
  stakes:
    "Norton held this seat for 35 years. With her stepping aside amid an aggressive federal posture toward DC, the next delegate inherits both the statehood fight and the defense of home rule at an unusually hostile moment.",
  map: {
    x: { label: "Advocacy style", left: "Inside game", right: "Outside game" },
    y: { label: "Primary focus", low: "Economy & local", high: "Statehood" },
    note: "Positions reflect each candidate's documented advocacy style and primary focus. Open any candidate to see the evidence."
  },
  candidates: [
    {
      id: "white",
      name: "Robert White",
      age: 44,
      neighborhood: "Native Washingtonian",
      role: "At-Large Councilmember (10 years)",
      background:
        "Legislative counsel to Eleanor Holmes Norton, 2008–2013. Lost the 2022 mayoral primary. The only candidate with both substantial DC Council experience and substantial Hill experience.",
      pos: [-0.6, 0.15],
      tagline: "Inside game · Hill + Council",
      inferredLean:
        "Inside game with a progressive coalition; Appropriations focus. (Inferred from his endorsements and stated strategy.)",
      priorities: [
        "DC statehood, framed as a unique historical opportunity right now",
        "Stabilize DC's economy after federal-workforce cuts",
        "Pursue a seat on the House Appropriations Committee specifically"
      ],
      positions: [
        "Wants an Appropriations seat to direct federal funds to DC and head off Republican budget riders",
        "Transfer federal lands around L'Enfant Plaza to local control",
        "Coordinate with regional partners on federal payments to offset workforce cuts",
        "Puerto Rico-style tax model: businesses moving to DC don't pay federal taxes on income earned in DC"
      ],
      endorsements: [
        "Congressional Progressive Caucus PAC (co-chairs Pramila Jayapal, Greg Casar, Maxwell Frost)",
        "Congressional Black Caucus PAC, plus Reps. Jim Clyburn and Maxwell Frost",
        "Senator Elizabeth Warren",
        "Working Families Party, Free DC, Greater Greater Washington, Our Revolution DC, Jews United for Justice",
        "Unions including Metro Washington AFL-CIO, ATU Local 689, AFSCME DC 20, and the Carpenters",
        "Councilmembers Charles Allen (Ward 6) and Janeese Lewis George (Ward 4)"
      ],
      strengths: [
        "Only candidate with both substantial Council experience (10 yrs) and Hill experience (5 yrs on Norton's staff)",
        "Appropriations is the highest-leverage committee for a non-voting delegate seeking to move federal money",
        "Strongest published endorsement list in the field; the CBC and CPC PACs plus Warren is unusual breadth",
        "Native Washingtonian; the only Black candidate in the race"
      ],
      weaknesses: [
        "Fundraising lags Pinto and Zalesne",
        "Lost the 2022 mayoral primary; citywide head-to-head record is mixed"
      ],
      flags: [
        {
          id: "whcd",
          label: "Posted, then deleted, a social-media joke about a shooting",
          detail:
            "Posted a social media joke about the shooting at the White House Correspondents' Dinner; later deleted it and apologized, calling it \"inappropriate and insensitive.\""
        }
      ],
      sources: [SITE.white, CPC_PAC, SOURCE]
    },
    {
      id: "holbrook",
      name: "Trent Holbrook",
      age: 40,
      neighborhood: "Dupont Circle",
      role: "Recently departed legislative staffer to Rep. Norton (8 years)",
      background:
        "Spent eight years in Norton's office; argues that experience gives him direct knowledge of the legislative process for DC issues.",
      pos: [-0.75, 0.7],
      tagline: "Inside game · Hill continuity",
      inferredLean:
        "Continuity with Norton's institutional approach; an inside game. (Inferred from his stated strategy.)",
      priorities: [
        "Continue Norton's statehood push as a national priority",
        "Defend home rule and expand it",
        "Advocate for DC to be treated as a state for federal programs"
      ],
      positions: [
        "Argues his time in Norton's office gives him knowledge of \"what moment we're in, what's moving, and what we could attach to it\"",
        "Wants DC to control functions now run federally: create a local prosecutor's office accountable to DC residents and let DC appoint its own local judges",
        "Supports the DC Tuition Assistance Grant and opposes \"forced school vouchers\"; argues Council members lack the right kind of experience for this seat"
      ],
      endorsements: [
        "Not documented on his campaign site or in available coverage. Norton has not endorsed a successor."
      ],
      strengths: [
        "Deepest Hill experience in the field",
        "Direct continuity on active DC legislative battles",
        "Lower learning curve on day one"
      ],
      weaknesses: [
        "Tied closely to Norton's approach when there are real questions about whether it was still working",
        "No independent legislative record; no Council experience",
        "Limited public profile in DC"
      ],
      flags: [],
      sources: [SITE.holbrook, SOURCE]
    },
    {
      id: "pinto",
      name: "Brooke Pinto",
      age: 33,
      neighborhood: "Logan Circle (Ward 2)",
      role: "Ward 2 Councilmember (since 2020)",
      background:
        "Connecticut native. Top fundraiser in the field, having raised over $1.2 million. Her Council focus has been public safety.",
      pos: [-0.05, -0.7],
      tagline: "Mixed style · local-wins focus",
      inferredLean:
        "Use federal levers for tangible local policy wins; practical and transactional rather than symbolic. (Inferred.)",
      priorities: [
        "Push for statehood and protect city autonomy",
        "Use federal leverage on housing (her top stated priority)",
        "Public safety (her area of focus on the Council)"
      ],
      positions: [
        "Make rent up to $15,000 a year federally tax-deductible, reframing the federal housing subsidy that today favors homeowners",
        "Speed transfer of GSA-administered federal buildings and land to local control for affordable housing; supports repealing the Height Act",
        "Declare more federal enterprise and opportunity zones in DC, especially east of the river",
        "Cites her Council work on gun-crime penalties, expanded pre-trial detention, and teen curfew zones"
      ],
      endorsements: [
        "U.S. Senators Angela Alsobrooks (MD) and Richard Blumenthal (CT)",
        "Former Mayor Tony Williams; Councilmembers/former CMs Anita Bonds, Mary Cheh, Charlene Drew Jarvis, Bill Lightfoot",
        "DC Firefighters IAFF Local 36, DC YIMBYs, Opportunity DC, DMV New Liberals",
        "Top fundraiser in the field (raised over $1.2 million)"
      ],
      strengths: [
        "Active legislative record on the Council",
        "Top fundraiser",
        "Specific, concrete policy proposals tied to federal mechanisms"
      ],
      weaknesses: [
        "Connecticut native; has faced repeated criticism that she doesn't know DC well enough",
        "Her public-safety record is contested by criminal-justice reform advocates",
        "Limited Hill experience"
      ],
      flags: [
        {
          id: "oppo",
          label: "Published unredacted opposition research on an opponent and his family",
          detail:
            "Pinto's campaign published unredacted opposition research on Robert White and his family. She apologized but refused to drop out when he asked. The source flags this as a real concern for a job that runs on relationships and trust."
        }
      ],
      sources: [SITE.pinto, SOURCE]
    },
    {
      id: "zalesne",
      name: "Kinney Zalesne",
      age: 59,
      neighborhood: "Cleveland Park",
      role: "Democratic fundraiser",
      background:
        "Career across federal government, nonprofit leadership focused on DC kids getting to college, Microsoft, and recent prominent Democratic Party fundraising. Strongest national political network in the field.",
      pos: [0.5, 0.6],
      tagline: "Coalition building · national networks",
      inferredLean:
        "National coalition-building and strategic messaging, the campaign-strategist theory of the delegate role. (Inferred.)",
      priorities: [
        "Autonomy (statehood and steps toward it)",
        "Economy (reduce DC's dependence on the federal government)"
      ],
      positions: [
        "Call a \"statehood summit\" after the June 16 primary to refine messaging and strategy",
        "Launch a national ad campaign targeting DC visitors (possible tagline: \"Welcome to D.C., we're the last colony\")",
        "Create a Capitol Caucus of representatives from surrounding states to diversify the regional economy",
        "Argues the role's power comes from the person, not the position, and her national networks are uniquely suited"
      ],
      endorsements: [
        "Three sitting members of the US House (names not in source)",
        "Raised over $660,000"
      ],
      strengths: [
        "Strongest national political network in the field",
        "Treats statehood explicitly as a campaign to be won, with messaging discipline",
        "Significant fundraising; ran an early six-figure ad campaign"
      ],
      weaknesses: [
        "No legislative experience",
        "No DC Council experience; no Hill staff experience",
        "Limited public profile in DC before this race"
      ],
      flags: [],
      sources: [SITE.zalesne, SOURCE]
    },
    {
      id: "jaczko",
      name: "Greg Jaczko",
      age: 55,
      neighborhood: "Tenleytown",
      role: "Runs a renewable-energy consulting firm",
      background:
        "PhD physicist. Former chairman of the Nuclear Regulatory Commission under Obama. 30 years in DC. Brings federal regulatory expertise and a confrontational, outside-game theory of the seat.",
      pos: [0.8, -0.4],
      tagline: "Outside game · federal-agency expertise",
      inferredLean:
        "Outside game, reframe the debate through pressure tactics. (Inferred from his signature proposal and background.)",
      priorities: [
        "Push back on the Trump administration's treatment of federal workers",
        "Get DC exempted from federal taxation as leverage for statehood",
        "Push to be appointed to the House Oversight Committee"
      ],
      positions: [
        "Signature idea: reframe DC's fight as \"no taxation until we get representation\" and exempt DC from federal taxes (like Puerto Rico)",
        "Notes DC paid $45 billion in federal taxes in 2024, more per capita than any state",
        "Argues this would draw corporations to DC and increase pressure for statehood",
        "Notes the Heritage Foundation has at times supported ending federal taxation for DC residents"
      ],
      endorsements: ["Not documented in available coverage."],
      strengths: [
        "Genuinely novel strategic framing in a field of mostly continuity candidates",
        "Strong federal executive-branch experience",
        "Credible advocate for the federal workforce, a major DC economic issue right now"
      ],
      weaknesses: [
        "No legislative experience",
        "The \"no taxation\" framing depends on building national pressure that may not match the current Congress",
        "No DC Council or local-government experience"
      ],
      flags: [],
      source: SOURCE
    }
  ],
  questions: [
    {
      id: "job",
      text: "What's the most important job for the next delegate?",
      type: "single",
      options: [
        { id: "A", label: "Move statehood meaningfully closer, even if it takes years", scores: { holbrook: 2, jaczko: 2, pinto: 1, white: 2, zalesne: 3 } },
        { id: "B", label: "Defend DC's existing autonomy from current federal attacks", scores: { holbrook: 3, jaczko: 2, pinto: 1, white: 2, zalesne: 1 } },
        { id: "C", label: "Direct federal money and rebuild DC's economy after workforce cuts", scores: { holbrook: 1, jaczko: 2, pinto: 2, white: 3, zalesne: 2 } },
        { id: "D", label: "Use federal levers for tangible local wins (housing, public safety)", scores: { holbrook: 1, jaczko: 1, pinto: 3, white: 2, zalesne: 1 } }
      ]
    },
    {
      id: "style",
      text: "What style of advocacy will actually work right now?",
      type: "single",
      options: [
        { id: "A", label: "Inside game: process knowledge, relationships, knowing which fights to pick", scores: { holbrook: 3, jaczko: 0, pinto: 2, white: 3, zalesne: 1 } },
        { id: "B", label: "Outside game: confrontational leverage, public pressure, reframe the debate", scores: { holbrook: 0, jaczko: 3, pinto: 1, white: 1, zalesne: 1 } },
        { id: "C", label: "Coalition building: national networks, elite ties, messaging campaigns", scores: { holbrook: 1, jaczko: 1, pinto: 1, white: 2, zalesne: 3 } },
        { id: "D", label: "Local mobilization: rooted in DC, organizes residents to show up", scores: { holbrook: 1, jaczko: 1, pinto: 1, white: 2, zalesne: 1 } }
      ]
    },
    {
      id: "background",
      text: "What background gives you the most confidence?",
      type: "single",
      options: [
        { id: "A", label: "Hill experience, worked directly on DC issues in Congress", scores: { holbrook: 3, jaczko: 0, pinto: 0, white: 2, zalesne: 0 } },
        { id: "B", label: "DC Council experience, a legislative record and local accountability", scores: { holbrook: 0, jaczko: 0, pinto: 3, white: 3, zalesne: 0 } },
        { id: "C", label: "Outside-politics expertise, federal agency, business, nonprofit", scores: { holbrook: 0, jaczko: 3, pinto: 0, white: 0, zalesne: 2 } },
        { id: "D", label: "National political and fundraising networks", scores: { holbrook: 0, jaczko: 0, pinto: 1, white: 1, zalesne: 3 } }
      ]
    },
    {
      id: "economy",
      text: "What's the best way to rebuild DC's economy and use federal leverage?",
      type: "single",
      options: [
        // Both invoke a Puerto Rico-style model, so both score: Jaczko's is the signature broad version (exempt DC residents, "no taxation until representation"); White's is narrower (a tax incentive for businesses that relocate to DC), paired with his Appropriations push.
        { id: "A", label: "Exempt DC from federal taxes as leverage (“no taxation until representation”)", scores: { holbrook: 1, jaczko: 3, pinto: 1, white: 2, zalesne: 1 } },
        // White explicitly targets a House Appropriations seat to direct federal money to DC.
        { id: "B", label: "Win a House Appropriations seat to direct federal money to DC", scores: { holbrook: 1, jaczko: 1, pinto: 1, white: 3, zalesne: 1 } },
        // A shared lever: Pinto wants GSA land transferred for housing (her central plank); White wants L'Enfant Plaza land transferred (one piece of his D.C. Forward plan), so both score.
        { id: "C", label: "Transfer federal land and buildings to DC for housing and growth", scores: { holbrook: 1, jaczko: 1, pinto: 3, white: 2, zalesne: 1 } },
        // Zalesne's pitch: a national messaging campaign, a "statehood summit," and a regional Capitol Caucus.
        { id: "D", label: "Run a national messaging and coalition campaign", scores: { holbrook: 1, jaczko: 1, pinto: 1, white: 1, zalesne: 3 } }
      ]
    }
  ],
  tradeoffs: [
    {
      id: "inside-outside",
      when: [["style", "A"], ["background", "C"]],
      text:
        "Your criteria pull in different directions. The inside-game candidates (Holbrook, White) come from politics; the outside-politics experts (Jaczko, Zalesne) tend to favor outside-game strategies. Your top matches below show the closest fit, but no single candidate is the obvious answer to both."
    }
  ],
  rcvNote:
    "This race uses ranked-choice voting. Your ranking below pairs your strongest match with a different-profile second choice, so you're not doubling down on one theory of the job. Ranking a second or third choice never hurts your first choice."
};
