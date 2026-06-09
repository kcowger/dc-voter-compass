// DC Council Ward 5, Democratic primary.
// Researched from WTOP candidate Q&As, The 51st,
// Greater Greater Washington, Opportunity DC, campaign sites, and reporting.
// Every claim is sourced. Questions/scoring constructed by this guide from
// documented positions (see methodology). Candidate Bridget French is thinly
// documented; her scores reflect only her stated cost-of-living lane.

const SRC_PARKER = { label: "WTOP candidate Q&A; The 51st; Greater Greater Washington; Washington Examiner", url: "https://wtop.com/dc-election/2026/06/get-to-know-ward-5-dc-council-candidate-zachary-parker/" };
const SRC_CARMICHAEL = { label: "WTOP candidate Q&A; carmichael2026.com", url: "https://wtop.com/dc-election/2026/06/get-to-know-ward-5-dc-council-candidate-bernita-carmichael/" };
const SRC_FRENCH = { label: "frenchforfive.com; The 51st", url: "https://www.frenchforfive.com/meet-candidate/" };

export const ward5 = {
  id: "ward5",
  group: "ward",
  ward: 5,
  title: "Council, Ward 5",
  shortTitle: "Ward 5",
  ballot: "Democratic primary",
  allVoters: false,
  rcv: true,
  coverage: "researched",
  coverageNote:
    "This race was researched from local reporting and the candidates' own materials, with every claim sourced and the questions built from their documented positions. Note: Bridget French has the thinnest public record of the three, so she's scored only where her positions are documented.",
  seat: "Incumbent Zachary Parker, elected in 2022, seeks a second term against Bernita Carmichael and Bridget French.",
  overview:
    "Ward 5 spans Brookland, Eckington, Fort Totten, and the Rhode Island Avenue corridor. Parker chairs the Council's Committee on Youth Affairs and runs on a first-term legislative record.",
  stakes:
    "Incumbent Zachary Parker has a record to run on (the Local Child Tax Credit, labor guarantees in the RFK stadium deal). He faces two challengers: a community-rooted alternative and an outsider with a cost-of-living pitch.",
  map: {
    x: { label: "Ideological lean (inferred)", left: "Progressive", right: "Moderate" },
    y: { label: "Profile", low: "Outsider", high: "Incumbent" },
    note: "Leans are inferred and flagged as inferred. Open a candidate for the evidence."
  },
  candidates: [
    {
      id: "parker",
      name: "Zachary Parker",
      age: null,
      neighborhood: "Ward 5 (Eckington/Truxton Circle area)",
      role: "Ward 5 Councilmember (incumbent, since 2023)",
      background:
        "A former DCPS-supporting educator (Teach For America, then nearly a decade with Ward 5 schools) and former DC State Board of Education president. The Council's only openly gay member, and the first Black openly gay member in DC history. Chairs the Committee on Youth Affairs.",
      pos: [-0.5, 0.8],
      tagline: "Progressive incumbent · education + housing",
      inferredLean:
        "Progressive. Described as progressive by The 51st; redistributive wins (Child Tax Credit), labor guarantees, prevention-first safety framing, and a Greater Greater Washington (urbanist) endorsement. (Inferred.)",
      priorities: [
        "Affordable housing, converting vacant lots, requiring deeply affordable units, using gap financing",
        "Home Rule, defending DC against congressional interference",
        "Equitable development of commercial corridors like Rhode Island Avenue"
      ],
      positions: [
        "Housing near transit and on public land, plus \"gentle density\" via ADUs and small multifamily, paired with tenant protections; open to a citywide ~100,000-unit target",
        "Public safety: prevention over enforcement alone; backed the emergency youth curfew as temporary but \"not a durable long-term solution\"",
        "Education: equitable DCPS/charter funding, stronger OSSE oversight, tackling chronic absenteeism",
        "Championed DC's Local Child Tax Credit (up to $1,000 per child for lower-income families)",
        "On the RFK/Commanders deal, secured union jobs and a 51% DC-resident hiring guarantee"
      ],
      endorsements: [
        "Greater Greater Washington (with a qualified rationale that he isn't the most active member on their issues)",
        "Opportunity DC"
      ],
      strengths: [
        "The only candidate with a concrete legislative record",
        "Strong education background and youth-affairs portfolio",
        "Pairs pro-housing density with tenant protections"
      ],
      weaknesses: [
        "GGWash noted he \"may not be the most active councilmember\" on housing and transit",
        "As the incumbent, he owns whatever voters dislike about the status quo"
      ],
      flags: [],
      source: SRC_PARKER
    },
    {
      id: "carmichael",
      name: "Bernita Carmichael",
      age: null,
      neighborhood: "Ward 5 (raised in Riggs Park)",
      role: "Small-business owner and community advocate",
      background:
        "A DC native (daughter of a Gulf War Army medic) with a career across risk management, economic development, constituent services, and nonprofit leadership. Frames her run around safer neighborhoods, affordable housing, and dignity for longtime residents.",
      pos: [-0.1, 0.0],
      tagline: "Progressive-leaning · community benefits · safety",
      inferredLean:
        "Progressive-leaning moderate. Pro-tenant and community-benefits positions, paired with \"accountability for serious offenses,\" openness to targeted curfews, and a Native-Washingtonian framing more populist than urbanist. (Inferred.)",
      priorities: [
        "Public safety",
        "Affordable housing",
        "Economic opportunity, especially for longtime residents and local businesses"
      ],
      positions: [
        "Housing: strengthen TOPA, expand affordable units near transit, enforce inclusionary zoning, require Community Benefits Agreements; \"Growth is not the problem; exclusion from growth is\"",
        "Public safety: community-based violence intervention, mandatory body-camera compliance, independent use-of-force oversight, plus accountability for serious offenses",
        "On curfews: supports \"targeted, time-limited\" ones in high-risk areas paired with programming, but opposes citywide blanket curfews",
        "Education: equitable per-pupil funding, oversight of DCPS and charters, school-based mental health"
      ],
      endorsements: ["Not documented in available sources (she responded to the GGWash questionnaire but was not endorsed)."],
      strengths: [
        "Specific community-benefits and tenant-protection agenda",
        "Balances violence intervention with accountability",
        "Deep local roots and constituent-services background"
      ],
      weaknesses: [
        "No documented endorsements",
        "No concrete legislative record to run on"
      ],
      flags: [],
      source: SRC_CARMICHAEL
    },
    {
      id: "french",
      name: "Bridget French",
      age: null,
      neighborhood: "Ward 5 (Riggs Park/Fort Totten area)",
      role: "Clean-energy / energy-policy professional",
      background:
        "A nearly-20-year DC resident and former Peace Corps volunteer who worked on DC's early energy programs. Runs as a cost-of-living pragmatist and \"not a career politician.\" Her record on housing, public safety, and education is not documented in available sources.",
      pos: [0.2, -0.7],
      tagline: "Outsider · cost-of-living focus",
      inferredLean:
        "Pragmatic outsider, hard to place left-right. Messaging centers on costs, utilities, and government efficiency rather than ideological stances. (Inferred; thin documentation.)",
      priorities: [
        "Lowering everyday costs, especially utility bills",
        "Making existing city services actually work for families",
        "Supporting neighborhood small businesses"
      ],
      positions: [
        "\"We don't need more programs, we need the ones we already fund to actually work together\"",
        "Expanding access to energy-efficiency programs to cut household costs",
        "Reducing barriers to opening and operating small businesses",
        "Positions on housing, public safety, and education are not documented in available sources"
      ],
      endorsements: ["Not documented in available sources."],
      strengths: [
        "A focused, concrete cost-of-living and utilities message",
        "Energy-policy expertise relevant to affordability",
        "Outsider appeal for voters frustrated with city government"
      ],
      weaknesses: [
        "The thinnest public record of the three; few positions documented beyond costs",
        "Not covered in the WTOP candidate series or endorsed by the urbanist groups",
        "No legislative or elected experience documented"
      ],
      flags: [],
      source: SRC_FRENCH
    }
  ],
  questions: [
    {
      id: "ideology",
      text: "What kind of councilmember do you want for Ward 5?",
      type: "single",
      // Options intentionally lead with the moderate choice here (and progressive-first
      // elsewhere) so the quiz doesn't always present "progressive" as the default first pick.
      options: [
        { id: "B", label: "A pragmatic moderate", scores: { parker: 1, carmichael: 2, french: 2 } },
        { id: "A", label: "A progressive", scores: { parker: 3, carmichael: 2, french: 1 } },
        { id: "C", label: "Whoever is most competent, regardless of label", scores: { parker: 2, carmichael: 2, french: 2 } }
      ]
    },
    {
      id: "issue",
      text: "What should they prioritize? Rank these in order of importance.",
      help: "Tap in order of importance, your top priority first. Tap again to remove. Your #1 counts most.",
      type: "rank",
      options: [
        { id: "A", label: "Building more housing, especially near transit", scores: { parker: 3, carmichael: 1, french: 1 } },
        { id: "B", label: "Tenant protections and community benefits", scores: { parker: 2, carmichael: 3, french: 1 } },
        { id: "C", label: "Public safety", scores: { parker: 2, carmichael: 3, french: 1 } },
        { id: "D", label: "Lowering everyday costs and making city services work", scores: { parker: 1, carmichael: 1, french: 3 } },
        { id: "E", label: "Education", scores: { parker: 3, carmichael: 2, french: 1 } }
      ]
    },
    {
      id: "profile",
      text: "Incumbent, advocate, or outsider?",
      type: "single",
      options: [
        { id: "A", label: "An experienced incumbent with a record", scores: { parker: 3, carmichael: 0, french: 0 } },
        { id: "B", label: "A community advocate and longtime resident", scores: { parker: 0, carmichael: 3, french: 1 } },
        { id: "C", label: "An outsider who isn't a career politician", scores: { parker: 0, carmichael: 1, french: 3 } }
      ]
    },
    {
      id: "housing",
      text: "What's the right housing strategy for Ward 5?",
      type: "single",
      options: [
        // Parker backs transit-oriented and "gentle" density (ADUs, small multifamily).
        { id: "A", label: "More housing near transit, with gentle density", scores: { parker: 3, carmichael: 1, french: 1 } },
        // Carmichael leads with TOPA, inclusionary-zoning enforcement, and community benefits agreements.
        { id: "B", label: "Tenant protections and community benefits agreements", scores: { parker: 2, carmichael: 3, french: 1 } },
        // French's lane is lowering everyday costs and making existing services work, not new programs.
        { id: "C", label: "Lower everyday costs and make existing services work first", scores: { parker: 1, carmichael: 1, french: 3 } }
      ]
    },
    {
      id: "safety",
      text: "On public safety, what's the right approach for Ward 5?",
      type: "single",
      options: [
        // Parker frames safety as prevention over enforcement and calls the youth curfew non-durable.
        { id: "A", label: "Prevention-first, with less aggressive enforcement", scores: { parker: 3, carmichael: 1, french: 1 } },
        // Carmichael pairs community violence intervention with accountability and supports targeted, time-limited curfews.
        { id: "B", label: "Community intervention plus accountability and targeted curfews", scores: { parker: 1, carmichael: 3, french: 1 } },
        { id: "C", label: "A balance of both", scores: { parker: 2, carmichael: 2, french: 2 } }
      ]
    }
  ],
  tradeoffs: [],
  rcvNote:
    "This race uses ranked-choice voting. Your ranking pairs your top match with a different-profile second choice. Ranking a second or third choice never hurts your first."
};
