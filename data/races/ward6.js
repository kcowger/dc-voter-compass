// DC Council Ward 6, Democratic primary.
// NOT in the source guide. Researched from WTOP candidate Q&As, HillRag, The
// 51st, Greater Greater Washington, campaign sites, and reporting on the 2024
// recall and the 2025 MPD crime-data findings. Every claim is sourced.
// Questions and scoring were constructed by this guide from documented
// positions (see methodology). Three candidates verified against the DCBOE
// ballot list (a fourth OCF registrant did not qualify).

const SRC_ALLEN = { label: "WTOP candidate Q&A; charlesallen2026.com; The 51st; reporting on the 2024 recall", url: "https://wtop.com/dc-election/2026/06/get-to-know-ward-6-dc-council-candidate-charles-allen/" };
const SRC_MURPHY = { label: "WTOP candidate Q&A; murphyforward6.com; The Hill op-ed", url: "https://wtop.com/dc-election/2026/06/get-to-know-ward-6-dc-council-candidate-michael-murphy/" };
const SRC_NAUDEN = { label: "WTOP candidate Q&A; gloriaforward6.com; HillRag", url: "https://wtop.com/dc-election/2026/06/get-to-know-ward-6-dc-council-candidate-gloria-ann-nauden/" };

export const ward6 = {
  id: "ward6",
  group: "ward",
  ward: 6,
  title: "Council, Ward 6",
  shortTitle: "Ward 6",
  ballot: "Democratic primary",
  allVoters: false,
  rcv: true,
  coverage: "researched",
  coverageNote:
    "Not in the source guide; researched from local reporting and the candidates' materials, with every claim sourced. The questions and scoring here were built by this guide from documented positions.",
  seat: "Incumbent Charles Allen, in office since 2015, seeks a fourth term against Michael Murphy and Gloria Nauden.",
  overview:
    "Ward 6 covers Capitol Hill, Navy Yard, NoMa, the Wharf, and surrounding neighborhoods. The race is shaped by Allen's long record chairing public safety and a 2024 recall attempt he survived.",
  stakes:
    "Allen chaired the Council's public-safety committee for years and was the target of a 2024 recall over crime. The race is a referendum on his record at a moment when DC's official crime statistics are themselves in dispute.",
  map: {
    x: { label: "Orientation", left: "Progressive", right: "Reform" },
    y: { label: "Profile", low: "Outsider", high: "Incumbent" },
    note: "Leans are inferred from records and platforms and flagged as inferred. Open a candidate for the evidence."
  },
  candidates: [
    {
      id: "allen",
      name: "Charles Allen",
      age: null,
      neighborhood: "Capitol Hill",
      role: "Ward 6 Councilmember (incumbent, since 2015)",
      background:
        "Former chief of staff to Councilmember Tommy Wells; chaired the Judiciary and Public Safety Committee for about six years and now chairs Transportation and the Environment. Runs a no-corporate-money campaign under public financing.",
      pos: [-0.5, 0.85],
      tagline: "Progressive incumbent · deep record",
      inferredLean:
        "Progressive establishment. Working Families Party, Sierra Club, JUFJ, and labor endorsements; a pro-density-with-affordability housing record; authorship of police-accountability and second-chance sentencing laws. (Inferred.)",
      priorities: [
        "Building on recent public-safety gains",
        "Tackling DC's high cost of living",
        "Schools: grade-level reading, attendance, modern facilities"
      ],
      positions: [
        "Housing: \"Build First\" (new units before demolition to avoid displacement); authored the RENTAL Act to cut development red tape; supports gentle density with affordability requirements",
        "Public safety: led comprehensive policing reform, banned ghost guns, created DC's red-flag gun law; also supported the 2024 \"Secure DC\" package with curfew zones and expanded pre-trial detention",
        "Signature laws: Books from Birth, DC Fair Elections public financing, the STEER Act, the Healthy Homes Act, an e-bike rebate",
        "Campaigns on a reported 29% drop in violent crime in 2025 (a figure now contested, see race context)"
      ],
      endorsements: [
        "Greater Greater Washington (which noted his opponents didn't return its questionnaire)",
        "Sierra Club DC, Jews United for Justice Campaign Fund, Working Families Party",
        "Labor: ATU 689, LIUNA, SEIU 32BJ, AFL-CIO, Washington Teachers' Union; plus DC-YIMBY and Bike Walk Bus"
      ],
      strengths: [
        "By far the deepest legislative record and endorsement base in the race",
        "Authored major public-safety and gun-safety laws",
        "Strong climate and transportation record as committee chair"
      ],
      weaknesses: [
        "Survived a 2024 recall over crime; the issue still defines the race",
        "Runs on a crime-decline figure that federal investigators have called into question"
      ],
      flags: [
        {
          id: "recall",
          label: "Target of a 2024 recall effort over crime (it failed)",
          detail:
            "After the 2023 crime spike, organizers blamed Allen's Judiciary chairmanship and launched a recall. It collected about 5,500 signatures against a ~6,400 requirement and failed to qualify. No DC Council recall has ever succeeded. Allen called it a \"bad faith\" effort."
        }
      ],
      source: SRC_ALLEN
    },
    {
      id: "murphy",
      name: "Michael Murphy",
      age: null,
      neighborhood: "Capitol Hill",
      role: "Consumer/whistleblower litigator (Bailey & Glasser LLP)",
      background:
        "A class-action and whistleblower attorney who earlier worked for the Teamsters' research department and as a paralegal in the DC corporation counsel's office. His campaign is built on government transparency and a crime-data-integrity fight he started in 2025.",
      pos: [-0.05, -0.5],
      tagline: "Reform · oversight · crime-data integrity",
      inferredLean:
        "Reform-minded accountability Democrat. To Allen's right on policing (more officers, tougher youth accountability) but strongly pro-housing-supply and pro-democracy-reform (open primaries, RCV, term limits). (Inferred.)",
      priorities: [
        "Truancy as both symptom and cause of public-safety problems",
        "Public safety, including his 2025 work challenging MPD's crime statistics",
        "Meaningful Council oversight with accountability for results"
      ],
      positions: [
        "Says he was first to publicly challenge MPD in 2025 for \"systematically manipulating violent crime\" data, a thesis later echoed by a House Oversight report",
        "Wants MPD data aligned with FBI reporting; would rebuild police staffing from a \"50-year low\"",
        "Would overhaul the Youth Rehabilitation Act and strengthen consequences for violent juvenile offenses",
        "Housing: revisit the Height Act, density bonuses near Metro, a 120-day office-to-residential \"shot clock,\" \"missing middle\" homes",
        "Backs fully funding open primaries, ranked-choice voting, and term limits"
      ],
      endorsements: ["Not documented in available sources (he did not return the GGWash questionnaire)."],
      strengths: [
        "His signature crime-data concern was later substantiated by a federal investigation",
        "Detailed, pro-supply housing platform",
        "Good-government reform agenda (transparency, term limits)"
      ],
      weaknesses: [
        "No documented endorsements",
        "Tougher-enforcement positions may not appeal to prevention-first voters"
      ],
      flags: [],
      source: SRC_MURPHY
    },
    {
      id: "nauden",
      name: "Gloria Nauden",
      age: null,
      neighborhood: "Capitol Hill (H Street NE area)",
      role: "Interim CEO of Philanthropy DMV; former ANC commissioner",
      background:
        "A 30-plus-year Ward 6 resident with a career in economic development, the arts, and community-development finance (including VP roles at a CDFI). Credits helping more than 1,000 DC small businesses. A stability-and-delivery candidate.",
      pos: [0.15, -0.3],
      tagline: "Pragmatic · small business · anti-displacement",
      inferredLean:
        "Mainstream, pragmatic Democrat with a community-development orientation. Progressive-leaning housing tools paired with a moderate \"fully staff MPD plus prevention\" safety stance. (Inferred.)",
      priorities: [
        "Public safety and accountability",
        "Affordable housing and preventing displacement",
        "Small business, schools, and responsive city services"
      ],
      positions: [
        "Housing: mandatory affordable units in new development, stronger tenant protections, Community Benefits Agreements; \"development should be evaluated through the lens of who gets to stay\"",
        "Public safety: full MPD staffing combined with community policing, violence interruption, civilian oversight, and transparent data",
        "Pairs police staffing with youth prevention, programming, and mentorship",
        "Invest in neighborhood commercial corridors and small business"
      ],
      endorsements: ["Not documented in available sources (she did not return the GGWash questionnaire)."],
      strengths: [
        "Deep economic-development and small-business experience",
        "Balances police staffing with prevention and oversight",
        "Anti-displacement housing focus"
      ],
      weaknesses: [
        "No documented endorsements",
        "Less specific legislative agenda than the other two"
      ],
      flags: [],
      source: SRC_NAUDEN
    }
  ],
  questions: [
    {
      id: "orientation",
      text: "What kind of councilmember do you want for Ward 6?",
      type: "single",
      options: [
        { id: "A", label: "A progressive with a long legislative record", scores: { allen: 3, murphy: 1, nauden: 2 } },
        { id: "B", label: "A reformer focused on accountability and change", scores: { allen: 1, murphy: 3, nauden: 2 } },
        { id: "C", label: "A pragmatic problem-solver focused on delivery", scores: { allen: 2, murphy: 2, nauden: 3 } }
      ]
    },
    {
      id: "issue",
      text: "What should they prioritize? Rank these in order of importance.",
      help: "Tap in order of importance, your top priority first. Tap again to remove. Your #1 counts most.",
      type: "rank",
      options: [
        { id: "A", label: "Building more housing", scores: { allen: 3, murphy: 3, nauden: 1 } },
        { id: "B", label: "Tenant protections and preventing displacement", scores: { allen: 2, murphy: 1, nauden: 3 } },
        { id: "C", label: "Public safety and policing", scores: { allen: 2, murphy: 3, nauden: 2 } },
        { id: "D", label: "Government oversight and transparency", scores: { allen: 1, murphy: 3, nauden: 2 } },
        { id: "E", label: "Climate, transit, and the environment", scores: { allen: 3, murphy: 1, nauden: 1 } }
      ]
    },
    {
      id: "safety",
      text: "Ward 6's incumbent chaired public safety, and DC's crime stats are now disputed. What matters most?",
      type: "single",
      options: [
        { id: "A", label: "An experienced legislator with a deep public-safety and police-reform record", scores: { allen: 3, murphy: 0, nauden: 1 } },
        { id: "B", label: "A watchdog on crime-data integrity who wants tougher enforcement", scores: { allen: 0, murphy: 3, nauden: 1 } },
        { id: "C", label: "Fresh leadership focused on delivery and community trust", scores: { allen: 1, murphy: 1, nauden: 3 } }
      ]
    },
    {
      id: "housing",
      text: "What's the right housing strategy for Ward 6?",
      type: "single",
      options: [
        // Murphy is the most aggressively pro-supply (revisit the Height Act, density bonuses, a permitting "shot clock"); Allen backs "Build First" and authored the RENTAL Act.
        { id: "A", label: "Cut red tape and build a lot more", scores: { allen: 2, murphy: 3, nauden: 1 } },
        // Nauden leads with mandatory affordability, tenant protections, and "who gets to stay."
        { id: "B", label: "Require affordability and prevent displacement", scores: { allen: 2, murphy: 1, nauden: 3 } },
        // Allen chairs Transportation & Environment and is Sierra Club-endorsed; climate-smart, transit-oriented growth is his lane.
        { id: "C", label: "Climate-smart, transit-oriented growth", scores: { allen: 3, murphy: 1, nauden: 1 } }
      ]
    }
  ],
  tradeoffs: [],
  rcvNote:
    "This race uses ranked-choice voting. Your ranking below pairs your top match with a meaningfully different second choice. Ranking a second or third choice never hurts your first.",
  raceContext: {
    title: "Context: the disputed crime numbers",
    text:
      "Allen runs on a roughly 29% drop in violent crime in 2025. In December 2025, a House Oversight report and a DOJ draft alleged MPD leadership deliberately downgraded crime classifications, making some reported declines \"likely unreliable,\" and the police chief resigned. This isn't an allegation against Allen, but it complicates the figure he runs on, and it substantially echoes challenger Murphy's signature issue. Mayor Bowser has defended the decline as real.",
    sources: [
      { label: "House Oversight, report on MPD crime-data manipulation", url: "https://oversight.house.gov/release/oversight-committee-releases-bombshell-report-revealing-d-c-s-police-chief-deliberately-manipulated-crime-data/" },
      { label: "WUSA9, DOJ draft and chief's resignation", url: "https://www.wusa9.com/article/news/local/dc/doj-draft-accuses-dc-police-of-manipulating-crime-data-amid-chief-smiths-sudden-resignation-crime/65-b9462d84-62aa-4414-86a0-19613b39152e" }
    ]
  }
};
