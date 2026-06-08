// DC Council Ward 1, Democratic primary.
// NOT in the source guide. Researched from The 51st's Ward 1 profile, WTOP
// candidate Q&As, Greater Greater Washington, DC YIMBYs, Jacobin, campaign
// sites, and reporting. Every claim is sourced. Questions/scoring constructed
// by this guide from documented positions (see methodology). Five candidates
// verified against The 51st and Ballotpedia. First open Ward 1 seat in 43 years.

const SRC_RAJ = { label: "The 51st Ward 1 profile; WTOP candidate Q&A; Jacobin; DC YIMBYs; GGWash", url: "https://51st.news/ward-1-dc-council-primary-election-candidates-2026/" };
const SRC_BROWN = { label: "The 51st Ward 1 profile; WTOP candidate Q&A; DC YIMBYs; GGWash", url: "https://wtop.com/dc-election/2026/06/get-to-know-ward-1-dc-council-candidate-rashida-brown/" };
const SRC_DERAMO = { label: "The 51st Ward 1 profile; WTOP candidate Q&A; DC YIMBYs", url: "https://wtop.com/dc-election/2026/06/get-to-know-ward-1-dc-council-candidate-miguel-trindade-deramo/" };
const SRC_REYES = { label: "The 51st Ward 1 profile; WTOP candidate Q&A; reporting", url: "https://wtop.com/dc-election/2026/06/get-to-know-ward-1-dc-council-candidate-jackie-reyes-yanes/" };
const SRC_LYNCH = { label: "The 51st Ward 1 profile; WTOP candidate Q&A", url: "https://wtop.com/dc-election/2026/06/get-to-know-ward-1-dc-council-candidate-terry-lynch/" };

export const ward1 = {
  id: "ward1",
  group: "ward",
  ward: 1,
  title: "Council, Ward 1",
  shortTitle: "Ward 1",
  ballot: "Democratic primary",
  allVoters: false,
  rcv: true,
  coverage: "researched",
  coverageNote:
    "Not in the source guide; researched from The 51st, WTOP, Greater Greater Washington, DC YIMBYs, and the candidates' materials, with every claim sourced. Questions and scoring were built by this guide from documented positions.",
  seat: "Open seat, incumbent Brianne Nadeau is not running, the first open Ward 1 seat in 43 years. Five Democrats are competing.",
  overview:
    "Ward 1 covers Columbia Heights, Mount Pleasant, U Street, Adams Morgan, and Shaw, dense, diverse, and a focal point for housing and immigration debates.",
  stakes:
    "With a five-way open race and ranked-choice voting, this seat could go in very different directions, from movement-left organizer to Bowser-aligned moderate. Two candidates have already formed a ranked-choice alliance.",
  map: {
    x: { label: "Ideological lean (inferred)", left: "Progressive", right: "Moderate" },
    y: { label: "Profile", low: "Outsider", high: "Insider" },
    note: "Leans are inferred from records, endorsements, and platforms, and flagged as inferred. The dashed link marks the Brown–Deramo cross-endorsement.",
    links: [{ a: "brown", b: "deramo", label: "Cross-endorsement" }]
  },
  candidates: [
    {
      id: "raj",
      name: "Aparna Raj",
      age: 32,
      neighborhood: "Columbia Heights",
      role: "Communications manager at Local Progress; tenant organizer",
      background:
        "Former chair of the Metro DC chapter of the Democratic Socialists of America, with a background in immigrants' rights, food justice, and tenant organizing. The field's top fundraiser. Pitches herself as an \"organizer in office.\"",
      pos: [-0.8, -0.6],
      tagline: "Movement left · housing + immigrant defense",
      inferredLean:
        "Progressive / democratic-socialist left. Self-identified DSA member and former chapter chair, with DSA and broad union backing. (Inferred, though her DSA affiliation is self-described.)",
      priorities: [
        "Affordability and housing, more supply plus expanded rent stabilization",
        "Universal free childcare funded by corporate taxes",
        "Immigrant protections and DC autonomy"
      ],
      positions: [
        "First bill would \"fully restore\" TOPA; would end exclusionary zoning to legalize multifamily citywide and fully fund the Housing Production Trust Fund",
        "Greater Greater Washington noted she \"writes most convincingly\" about the need for more market-rate housing",
        "Opposes youth curfews; backs violence interruption and community responders for mental-health crises",
        "Signature issue: ending MPD–ICE cooperation and strengthening the Sanctuary Values Act"
      ],
      endorsements: [
        "Broadest labor coalition in the race (30+ groups, 17 unions)",
        "Metro DC DSA, Working Families Party",
        "Greater Greater Washington (first choice); Jews United for Justice; DC YIMBYs (third choice)"
      ],
      strengths: [
        "Top fundraiser with the broadest labor and progressive coalition",
        "Endorsed by both the urbanist (GGWash) and good-government left",
        "Clear, consistent movement-progressive platform"
      ],
      weaknesses: [
        "DC YIMBYs flagged her \"limited governing experience\"",
        "No prior elected office"
      ],
      flags: [],
      source: SRC_RAJ
    },
    {
      id: "deramo",
      name: "Miguel Trindade Deramo",
      chipName: "Trindade Deramo",
      age: 39,
      neighborhood: "U Street area (ANC 1B)",
      role: "Chair of ANC 1B; co-founder of Grow Democracy DC",
      background:
        "A former State Department consular officer and DHS visa analyst who led Initiative 83, the 2024 ballot measure that brought ranked-choice voting to DC with 73% support. Would be the first Latino on the Council and its second openly LGBTQ+ member.",
      pos: [-0.5, 0.1],
      tagline: "Pro-housing urbanist · transit-first",
      inferredLean:
        "Pro-housing progressive / urbanist. DC YIMBYs' first choice, with the strongest by-right-development and parking-reform record, plus progressive policing and immigration positions. (Inferred.)",
      priorities: [
        "Housing affordability via faster construction plus anti-displacement",
        "Safe streets through rebuilt community-police trust and violence interruption",
        "Vibrant commercial corridors"
      ],
      positions: [
        "More family-sized apartments and higher density; backs the Housing Production Omnibus Act and a social-housing model; would strengthen TOPA and DOPA",
        "DC YIMBYs praised his by-right-development support, parking reform, and gentle-density resolution through ANC 1B",
        "Opposes permanent youth curfews as a \"band-aid\"; backs civilian oversight of MPD",
        "Signature issue: transit, dedicated bus lanes on every key corridor and a connected protected-bike-lane network"
      ],
      endorsements: [
        "DC YIMBYs (first choice)",
        "Greater Greater Washington (third choice)",
        "Mutual cross-endorsement with Rashida Brown"
      ],
      strengths: [
        "Deepest pro-housing-supply record; led the RCV ballot measure",
        "Concrete transit and zoning agenda",
        "Current ANC chair with a governing track record"
      ],
      weaknesses: [
        "Moved into the ward in 2023; shorter local roots",
        "Lower fundraising than the front-runners"
      ],
      flags: [],
      crossEndorse: "brown",
      source: SRC_DERAMO
    },
    {
      id: "brown",
      name: "Rashida Brown",
      age: 47,
      neighborhood: "Lower Georgia Avenue",
      role: "ANC commissioner (~10 years); early-childhood policy consultant",
      background:
        "A Howard-trained social worker, former OSSE policy director, and founder of Georgia Avenue Thrive, with 20+ years in early-childhood and public service. Endorsed by the outgoing incumbent.",
      pos: [-0.35, 0.5],
      tagline: "Establishment progressive · housing + youth",
      inferredLean:
        "Establishment-backed progressive / center-left. Endorsed by progressive incumbent Nadeau and opposes curfews, but frames herself through institutional policy experience rather than movement organizing. (Inferred.)",
      priorities: [
        "Affordable housing",
        "Protecting immigrants from federal overreach",
        "Public safety through evidence-based violence prevention"
      ],
      positions: [
        "Update the Comprehensive Plan for more housing; restore TOPA; fund home-purchase and emergency rental assistance",
        "DC YIMBYs notes she backed major projects (Bruce Monroe, McMillan) and supports legalizing sixplexes citywide",
        "Opposes youth curfews: \"Young people deserve investment and opportunity, not incarceration\"",
        "Transportation: protected bike lanes, bus priority, fare-free buses"
      ],
      endorsements: [
        "Outgoing incumbent Brianne Nadeau",
        "LiUNA and SEIU 32BJ; Jews United for Justice",
        "Greater Greater Washington (second choice); DC YIMBYs (second choice)",
        "Mutual cross-endorsement with Miguel Trindade Deramo"
      ],
      strengths: [
        "Both urbanist groups' clear second choice; broad institutional support",
        "Deep policy and early-childhood experience",
        "Endorsed by the retiring incumbent"
      ],
      weaknesses: [
        "Neither urbanist group's first choice",
        "Less of a distinct signature issue than some rivals"
      ],
      flags: [],
      crossEndorse: "deramo",
      source: SRC_BROWN
    },
    {
      id: "reyesyanes",
      name: "Jackie Reyes-Yanes",
      age: 48,
      neighborhood: "Mount Pleasant",
      role: "Former Director of the Mayor's Office on Community Affairs",
      background:
        "Came to DC from El Salvador in 1990 fleeing civil war; a former teen mother who experienced homelessness, then 25+ years in DC public service, including leading the Mayor's Office on Latino Affairs. Would be Ward 1's first Latina councilmember.",
      pos: [0.6, 0.7],
      tagline: "Moderate · safety + small business",
      inferredLean:
        "Moderate / establishment. A longtime Bowser appointee, the only candidate explicitly positioning as a moderate alternative, with a Realtors endorsement. (Inferred.)",
      priorities: [
        "Revitalizing neighborhood business corridors block-by-block",
        "Expanding and preserving genuinely affordable housing to prevent displacement",
        "Hands-on, results-visible governance"
      ],
      positions: [
        "Housing: preserve/expand truly affordable housing, early community engagement, use public land; anti-displacement framing",
        "The field's most detailed public-safety plan: a Ward 1 violence-intervention task force, gang-conflict mediation, post-shooting outreach, guaranteed youth jobs, and a streetlight audit",
        "Supports \"limited, targeted\" youth curfews paired with community supports",
        "Proposes a Ward 1 small-business grant fund and a constituent \"solution center\""
      ],
      endorsements: ["Greater Capital Area Association of Realtors (not endorsed by GGWash or DC YIMBYs)"],
      strengths: [
        "Deepest DC-government experience in the field",
        "Most detailed public-safety plan",
        "Strong small-business and constituent-services focus"
      ],
      weaknesses: [
        "Tied to the Bowser administration, which some Ward 1 voters resist",
        "Not endorsed by the urbanist or progressive groups"
      ],
      flags: [
        {
          id: "photos",
          label: "2018: altered photos removed protesters (as a mayoral official)",
          detail:
            "In October 2018, as the Mayor's Director of Latino Affairs, she posted altered Fiesta DC parade photos to Facebook with activist protesters digitally removed. The images were deleted; the Mayor's office said they were not official photos."
        }
      ],
      source: SRC_REYES
    },
    {
      id: "lynch",
      name: "Terry Lynch",
      age: 66,
      neighborhood: "Mount Pleasant",
      role: "Executive Director, Downtown Cluster of Congregations (40+ years)",
      background:
        "A longtime civic activist known for filing thousands of 311 service requests across the city, with decades of work on homelessness, safety, and housing. Runs on municipal competence over national activism.",
      pos: [0.45, -0.3],
      tagline: "Civic fixer · safety-first",
      inferredLean:
        "Idiosyncratic, older-homeowner-oriented moderate. The only candidate supporting youth curfews, with an enforcement and \"basic services\" focus and governance-by-oversight style. (Inferred.)",
      priorities: [
        "Safety, including closing open-air drug markets in Columbia Heights",
        "Restoring basic public services",
        "Attacking blight, vacant buildings, and pests"
      ],
      positions: [
        "Signature \"use it or lose it\" housing idea: the city buys vacant/blighted properties at market value and redevelops them (he estimates ~5,000 Ward 1 units); also close rent-control loopholes",
        "The only candidate who clearly supports youth curfews, paired with expanded afterschool arts/athletics",
        "Foot patrols, streetlight fixes, and closing active drug markets",
        "Prefers hands-on oversight via hearings and agency reviews over new legislation"
      ],
      endorsements: ["Not documented in available sources."],
      strengths: [
        "Decades of granular knowledge of city service failures",
        "An aggressive vacant-property housing idea",
        "Clear focus on basic municipal competence"
      ],
      weaknesses: [
        "Smallest campaign war chest by far",
        "A long reputation as a civic \"gadfly\"; no group endorsements"
      ],
      flags: [],
      source: SRC_LYNCH
    }
  ],
  questions: [
    {
      id: "ideology",
      text: "Where do you want this seat to land?",
      type: "single",
      options: [
        { id: "A", label: "Progressive / movement left", scores: { raj: 3, brown: 2, deramo: 2, reyesyanes: 0, lynch: 1 } },
        { id: "B", label: "Pragmatic / moderate", scores: { raj: 0, brown: 1, deramo: 1, reyesyanes: 3, lynch: 2 } },
        { id: "C", label: "Ideology matters less than competence", scores: { raj: 1, brown: 1, deramo: 1, reyesyanes: 1, lynch: 1 } }
      ]
    },
    {
      id: "issue",
      text: "What should your councilmember prioritize?",
      help: "Choose up to two.",
      type: "multi",
      max: 2,
      options: [
        { id: "A", label: "Building more housing", scores: { raj: 2, brown: 2, deramo: 3, reyesyanes: 1, lynch: 2 } },
        { id: "B", label: "Tenant protections and preventing displacement", scores: { raj: 2, brown: 2, deramo: 2, reyesyanes: 3, lynch: 1 } },
        { id: "C", label: "Public safety", scores: { raj: 1, brown: 2, deramo: 2, reyesyanes: 3, lynch: 3 } },
        { id: "D", label: "Immigrant protection and DC autonomy", scores: { raj: 3, brown: 2, deramo: 2, reyesyanes: 2, lynch: 1 } },
        { id: "E", label: "Small business and commercial corridors", scores: { raj: 1, brown: 1, deramo: 2, reyesyanes: 3, lynch: 2 } }
      ]
    },
    {
      id: "safety",
      text: "On public safety, what's your approach?",
      type: "single",
      options: [
        { id: "A", label: "Prevention-first; skeptical of youth curfews", scores: { raj: 3, brown: 3, deramo: 3, reyesyanes: 1, lynch: 0 } },
        { id: "B", label: "Enforcement-inclusive; targeted curfews are fine", scores: { raj: 0, brown: 0, deramo: 0, reyesyanes: 2, lynch: 3 } },
        { id: "C", label: "A balance of enforcement and prevention", scores: { raj: 1, brown: 1, deramo: 1, reyesyanes: 3, lynch: 1 } }
      ]
    },
    {
      id: "profile",
      text: "What kind of councilmember?",
      type: "single",
      options: [
        { id: "A", label: "Fresh organizer with outsider energy", scores: { raj: 3, brown: 1, deramo: 2, reyesyanes: 0, lynch: 1 } },
        { id: "B", label: "An experienced insider who knows DC government", scores: { raj: 0, brown: 2, deramo: 1, reyesyanes: 3, lynch: 2 } },
        { id: "C", label: "A local civic fixer focused on the basics", scores: { raj: 1, brown: 2, deramo: 2, reyesyanes: 2, lynch: 3 } }
      ]
    },
    {
      id: "housing",
      text: "What's the right housing strategy for Ward 1?",
      type: "single",
      options: [
        // Deramo is DC YIMBYs' first choice (by-right development, parking reform); Raj and Brown also back legalizing more density.
        { id: "A", label: "Legalize more density and let more get built", scores: { raj: 2, brown: 2, deramo: 3, reyesyanes: 1, lynch: 1 } },
        // Raj's first bill would restore TOPA and expand rent stabilization; Brown, Deramo, and Reyes-Yanes back tenant protections too.
        { id: "B", label: "Expand rent stabilization and tenant protections", scores: { raj: 3, brown: 2, deramo: 2, reyesyanes: 2, lynch: 1 } },
        // Lynch's signature "use it or lose it": the city buys vacant/blighted property and redevelops it.
        { id: "C", label: "Force vacant and blighted buildings back into use", scores: { raj: 1, brown: 1, deramo: 1, reyesyanes: 1, lynch: 3 } },
        // Reyes-Yanes leads with anti-displacement and building affordable housing on public land.
        { id: "D", label: "Build affordable on public land and prevent displacement", scores: { raj: 2, brown: 2, deramo: 1, reyesyanes: 3, lynch: 1 } }
      ]
    }
  ],
  tradeoffs: [],
  rcvNote:
    "This race uses ranked-choice voting. Rashida Brown and Miguel Trindade Deramo have cross-endorsed each other, asking supporters to rank them 1 and 2 in either order, reportedly the first such alliance in a DC Council race. Your ranking below pairs your top match with a different second choice; ranking lower choices never hurts your first."
};
