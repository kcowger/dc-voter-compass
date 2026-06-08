// DC Council At-Large, Special election (McDuffie's seat).
// Open to ALL registered DC voters regardless of party. Ranked-choice.
// Content traces to The 51st's special-election profile (May 21, 2026).
// Scoring matrices taken verbatim from the guide's recommendation-logic.

const SOURCE = {
  label: "The 51st, “Meet the candidates running in the D.C. Council At-Large special election” (May 21, 2026)",
  url: "https://51st.news/dc-council-at-large-special-election-candidates-interview/"
};

export const atlargeSpecial = {
  id: "atlarge-special",
  group: "special",
  title: "Council At-Large, Special Election",
  shortTitle: "At-Large (special)",
  ballot: "Special election, all registered voters",
  allVoters: true,
  rcv: true,
  coverage: "full",
  seat:
    "Fills the rest of Kenyan McDuffie's At-Large term, ending January 2027. McDuffie stepped down to run for mayor.",
  overview:
    "A special election to serve out McDuffie's At-Large term. Unlike the primaries, every registered DC voter can vote in this race regardless of party. A separate November 2026 race decides the next full four-year term.",
  stakes:
    "This race is easy to miss, it sits separately on the ballot (on the back of page two of mail-in ballots). Two of the three candidates have formed a ranked-choice alliance against the third, which makes how you rank genuinely matter.",
  map: {
    x: { label: "Ideological lean (inferred)", left: "Progressive", right: "Moderate" },
    y: { label: "Experience profile", low: "Newer", high: "Experienced" },
    note: "Leans are inferred from endorsements and record, and flagged as inferred. The dashed link marks the Crawford–Patterson cross-endorsement.",
    links: [{ a: "crawford", b: "patterson", label: "Cross-endorsement" }]
  },
  candidates: [
    {
      id: "silverman",
      name: "Elissa Silverman",
      age: 53,
      neighborhood: "Capitol Hill",
      role: "Running for the At-Large seat she held 2015–2022",
      background:
        "Eight years as an At-Large councilmember; lost the seat to Kenyan McDuffie in 2022. The only candidate in this race with a substantial DC Council voting record. Briefly worked in Maryland Gov. Wes Moore's administration in 2024.",
      pos: [-0.7, 0.8],
      tagline: "Progressive · most Council experience",
      inferredLean:
        "Progressive. Labor + Sierra Club + Bike Walk Bus + Greater Greater Washington, plus her stated alignment with Janeese Lewis George, are a strong progressive signal cluster. (Inferred.)",
      priorities: [
        "Trump and federal interference: do a \"Trump analysis\" before the city acts in ways that might trigger federal pushback; coordinate with the AG and delegate",
        "Housing: coordinate DC's housing tools (vouchers, Housing Production Trust Fund, DCHA, private partnerships) under one \"north star\"",
        "Truancy: address ~40% student absenteeism, which she calls a \"house-on-fire issue\""
      ],
      positions: [
        "Lead sponsor on passing DC's paid family leave law, over Mayor Bowser's opposition with a veto-proof majority",
        "Helped create a maintenance and repair fund for public housing",
        "Entered the race because residents said the Council wasn't holding agencies accountable; oversight is her signature lane"
      ],
      endorsements: [
        "Multiple labor unions",
        "Sierra Club DC",
        "Bike Walk Bus PAC",
        "Greater Greater Washington (a strong pro-housing-supply signal)"
      ],
      strengths: [
        "Most Council experience of any candidate in this race (8 years)",
        "Track record of real legislative wins, including paid family leave over a mayoral veto",
        "Oversight is her core competency, not a talking point",
        "Greater Greater Washington endorsement signals pro-housing-supply"
      ],
      weaknesses: [
        "Lost in 2022; beaten in a head-to-head citywide race recently",
        "Acknowledges an adversarial relationship with Bowser during her prior tenure; promises a course correction voters can weigh",
        "Left the Wes Moore administration after only nine months"
      ],
      flags: [
        {
          id: "ocf",
          label: "2023 campaign-finance complaints (later all dismissed)",
          detail:
            "After 2022, she spent months fighting Office of Campaign Finance complaints; one was initially ruled a misuse of public funds, but by April 2023 all complaints were dismissed. She called it a \"smear campaign.\" The episode remains in the public record even though she was cleared."
        }
      ],
      source: SOURCE
    },
    {
      id: "patterson",
      name: "Jacque Patterson",
      age: 61,
      neighborhood: "Shipley Terrace (Ward 8)",
      role: "President and At-Large member of the DC State Board of Education",
      background:
        "Deep Ward 8 roots over decades. Five terms (10 years) as an ANC commissioner; roles under Mayors Williams and Gray, at two charter schools, and at nonprofits including the Federal City Council and Martha's Table. Won the At-Large SBOE seat in 2020 after three earlier unsuccessful runs.",
      pos: [0.2, -0.5],
      tagline: "Center-left · education + Ward 8 roots",
      inferredLean:
        "Center-left to moderate. Career under moderate mayors and a cross-endorsement with the more clearly moderate Crawford, though his $250M housing-fund target is a progressive position. (Inferred.)",
      priorities: [
        "Education (top priority, especially in the budget process)",
        "Public safety and youth well-being",
        "Affordable housing"
      ],
      positions: [
        "Wants more community schools that act as \"one-stop shops\" with services for students and families",
        "Supports curfew zones only temporarily, paired with investment in teen programming",
        "Wants denser, mixed-income housing; cites Barry Farm redevelopment as a model",
        "Wants to raise the Housing Production Trust Fund to $250 million per year (typically ~$100M; Bowser proposed a 50% cut)"
      ],
      endorsements: ["ElectED DC (education equity group)"],
      strengths: [
        "Most ambitious housing-financing position in this race ($250M HPTF target)",
        "Deep Ward 8 roots; lived in Shipley Terrace for decades",
        "Currently leads SBOE; familiar with citywide elected office",
        "Pairs accountability on teen behavior with programming investment"
      ],
      weaknesses: [
        "Lost three previous races before winning SBOE in 2020; mixed head-to-head record",
        "Less direct Council legislative experience than Crawford or Silverman",
        "Education-first framing may concern voters who want a broader policy lane"
      ],
      flags: [],
      crossEndorse: "crawford",
      source: SOURCE
    },
    {
      id: "crawford",
      name: "Doni Crawford",
      age: 36,
      neighborhood: "DC",
      role: "Interim At-Large Councilmember (appointed to fill McDuffie's seat)",
      background:
        "Originally from Pittsburgh; moved to DC in 2019 as a policy analyst at the DC Fiscal Policy Institute, a progressive think tank. Joined McDuffie's Council office in 2022, rising to director of the Committee on Business and Economic Development. Currently sits on the Council.",
      pos: [0.55, -0.2],
      tagline: "Moderate · current Council insider",
      inferredLean:
        "Moderate. A Realtors + Restaurant Association + Opportunity DC coalition and her close work with McDuffie are the strongest recent signals, though her Fiscal Policy Institute background complicates the label. (Inferred.)",
      priorities: [
        "Youth investment (out-of-school programming, behavioral-health clinicians in schools, extended rec-center hours)",
        "Housing supply (references this directly as a renter)",
        "Helping seniors pass homes to the next generation"
      ],
      positions: [
        "Proposed amendments to the teen-curfew bill (timing of police approach, programming requirements, sunset of zones by end of 2028)",
        "Worked on the RFK stadium deal as a McDuffie staffer",
        "Worked on putting funds toward a direct cash-assistance program",
        "Self-describes as a consensus builder willing to find middle ground on stuck issues"
      ],
      endorsements: [
        "Associations for DC's realtors",
        "Restaurant Association of Metropolitan Washington",
        "Opportunity DC (a pro-business group)"
      ],
      strengths: [
        "Currently sitting on the Council; has an actual voting record from her interim tenure",
        "Real consensus-building example via the curfew amendment work",
        "DC Fiscal Policy Institute background suggests budget literacy"
      ],
      weaknesses: [
        "Clearly aligned with McDuffie's politics; voters seeking a progressive shift will see continuity with the moderate wing",
        "Newer to DC (arrived 2019); shorter local roots than the others"
      ],
      flags: [],
      crossEndorse: "patterson",
      source: SOURCE
    }
  ],
  questions: [
    {
      id: "ideology",
      text: "Where do you want this seat to land ideologically?",
      type: "single",
      options: [
        { id: "A", label: "Progressive", scores: { crawford: 0, patterson: 1, silverman: 3 } },
        { id: "B", label: "Centrist / business-aligned", scores: { crawford: 3, patterson: 2, silverman: 0 } },
        { id: "C", label: "Ideology matters less than competence", scores: { crawford: 1, patterson: 1, silverman: 1 } }
      ]
    },
    {
      id: "issue",
      text: "Most important issue area for this seat?",
      help: "Choose up to two.",
      type: "multi",
      max: 2,
      options: [
        { id: "A", label: "Housing supply", scores: { crawford: 2, patterson: 2, silverman: 3 } },
        { id: "B", label: "Education", scores: { crawford: 1, patterson: 3, silverman: 1 } },
        { id: "C", label: "Federal / Trump resilience", scores: { crawford: 1, patterson: 1, silverman: 3 } },
        { id: "D", label: "Oversight of DC agencies", scores: { crawford: 1, patterson: 1, silverman: 3 } },
        { id: "E", label: "Public safety and youth", scores: { crawford: 3, patterson: 2, silverman: 1 } }
      ]
    },
    {
      id: "profile",
      text: "What kind of profile do you want?",
      type: "single",
      options: [
        { id: "A", label: "Past Council experience and a legislative track record", scores: { crawford: 2, patterson: 1, silverman: 3 } },
        { id: "B", label: "Education-system insider", scores: { crawford: 1, patterson: 3, silverman: 1 } },
        { id: "C", label: "Current Council insider with a consensus-building style", scores: { crawford: 3, patterson: 1, silverman: 1 } },
        { id: "D", label: "Ward 8 community-rooted voice", scores: { crawford: 0, patterson: 3, silverman: 0 } }
      ]
    }
  ],
  tradeoffs: [],
  rcvNote:
    "Crawford and Patterson have cross-endorsed each other and are asking supporters to rank the other one second, a coordinated, ranked-choice effort to edge out Silverman. So your second choice matters here. If Silverman is your first choice, ranking her alone is fine; a second choice only activates if she's eliminated and never hurts her. If Crawford or Patterson is your first choice, ranking the other second is exactly the alliance strategy in action.",
  crossEndorsement: {
    pair: ["crawford", "patterson"],
    against: "silverman",
    text:
      "Doni Crawford and Jacque Patterson have publicly cross-endorsed each other, asking their supporters to rank the other second. Under ranked-choice rules, that pools their support to try to push Elissa Silverman out. Knowing this helps you rank deliberately rather than by accident."
  }
};
