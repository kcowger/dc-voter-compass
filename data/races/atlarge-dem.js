// DC Council At-Large, Democratic primary (Anita Bonds's seat).
// Base profiles come from The 51st's DCision2026 At-Large primary profile
// (May 14, 2026), then deepened June 8, 2026 by reading each candidate's own
// campaign site (see SITE below) plus HillRag's issue-split coverage. Where a
// candidate's own site contradicts or omits a secondhand claim (e.g. Owolewa's
// tax program, Chavous's 15% inclusionary-zoning figure), the text says so and
// scoring follows the candidate's own materials. Leans are inferred and flagged.

const SOURCE = {
  label: "The 51st, “Meet the candidates for an At-Large seat on the D.C. Council” (May 14, 2026)",
  url: "https://51st.news/washington-dc-2026-primary-election-june-16-mayor-council/"
};

// Candidates' own campaign sites, read June 8, 2026. Positions sourced to these
// take precedence over secondhand summaries; where a campaign site contradicts
// or omits a claim from The 51st, the candidate text says so explicitly.
const SITE = {
  nelson: { label: "Candace Tiana Nelson campaign platform (candacefordc.com)", url: "https://www.candacefordc.com/ourplatform" },
  raymond: { label: "Lisa Raymond campaign site (lisaraymondfordc.com)", url: "https://lisaraymondfordc.com/" },
  forester: { label: "Dyana Forester policy priorities (dyanafordc.com)", url: "https://www.dyanafordc.com/policy-priorities" },
  owolewa: { label: "Oye Owolewa issues (vote4oye.com/issues)", url: "https://www.vote4oye.com/issues" },
  chavous: { label: "Kevin Chavous platform (chavousfordc.com/platform)", url: "https://www.chavousfordc.com/platform" },
  jackson: { label: "Greg Jackson issues (jacksonfordc.com)", url: "https://www.jacksonfordc.com/issues" },
  jenkins: { label: "Leniqua’dominique Jenkins campaign site (votejenkinsfordc.com)", url: "https://www.votejenkinsfordc.com/" },
  davis: { label: "Dwight Davis issues (dwight4dccouncil.com/issues)", url: "https://dwight4dccouncil.com/issues/" },
  hill: { label: "Fred Hill issues (fredhill4dc.com/issues)", url: "https://fredhill4dc.com/issues/" }
};
const HILLRAG_SPLIT = { label: "HillRag, “At-Large race: candidates split on safety, housing, and DC’s future” (May 8, 2026)", url: "https://www.hillrag.com/2026/05/08/at-large-race-candidates-split-on-safety-housing-and-dcs-future/" };
const WTOP_OYE = { label: "WTOP, “Get to know At-Large candidate Oye Owolewa” (June 2026)", url: "https://wtop.com/dc-election/2026/06/get-to-know-dc-council-at-large-candidate-oye-owolewa/" };

export const atlargeDem = {
  id: "atlarge-dem",
  group: "citywide",
  title: "Council At-Large, Democratic Primary",
  shortTitle: "At-Large (primary)",
  ballot: "Democratic primary",
  allVoters: false,
  rcv: true,
  coverage: "full",
  seat:
    "Open seat, Anita Bonds, an At-Large member for 13 years, is not running again. Nine Democrats are competing.",
  overview:
    "DC has four At-Large councilmembers who represent the whole city. Bonds was a moderate who often cast the deciding vote between the Council's progressive and centrist wings, usually siding with the center.",
  stakes:
    "This is the highest-stakes ideological inflection point on the ballot. Replacing the moderate swing vote could nudge the Council in either direction. It's the first time ranked-choice voting applies here, previously Bonds won primaries with as little as 35% as challengers split the field.",
  map: {
    x: { label: "Ideological lean (inferred)", left: "Progressive", right: "Moderate" },
    y: { label: "Profile", low: "Community", high: "Insider" },
    note: "Leans are inferred from endorsements, employers, and stated priorities, and flagged as inferred. Open any candidate for the evidence."
  },
  candidates: [
    {
      id: "nelson",
      name: "Candace Tiana Nelson",
      age: 50,
      neighborhood: "Brightwood (Ward 4)",
      role: "Most recently chief of staff to Ward 4 Councilmember Janeese Lewis George",
      background:
        "20 years across five DC government agencies under various mayors; led Attorney General Brian Schwalb's 2022 transition. The deepest insider profile in the field, with oversight as her signature issue.",
      pos: [-0.55, 0.85],
      tagline: "Progressive · oversight · deep insider",
      inferredLean:
        "Progressive. Chief of staff to one of the Council's most progressive members (Lewis George); note she's also worked under mayors of varying ideology over 20 years, so the recent JLG affiliation is the strongest signal. (Inferred.)",
      priorities: [
        "Council oversight of executive agencies",
        "Housing affordability and tenant protections",
        "Worker rights and fair wages"
      ],
      positions: [
        "Argues current Council oversight is \"performative\" and that not all members show up to hearings",
        "Housing: expand rent stabilization, strengthen TOPA, fully fund the Housing Production Trust Fund and First Right to Purchase, and fund vouchers, emergency rental assistance, and permanent supportive housing",
        "Proposes a standalone DC Department of Labor and a \"Workers' Bill of Rights\"; would repeal anti-union laws",
        "Wants a standalone Education Committee, a \"civic tech\" platform so residents can track and comment on bills, and the Council's own federal-affairs office"
      ],
      endorsements: ["Cross-endorsed by fellow at-large candidates Greg Jackson, Oye Owolewa, and Lisa Raymond"],
      strengths: [
        "Deepest insider profile in the field by a clear margin",
        "Oversight is her core competency, not a talking point",
        "Detailed, structural platform on housing affordability and labor"
      ],
      weaknesses: [
        "Affordability rules and tenant protections anchor her housing plan; less focused on accelerating new supply than Raymond",
        "A behind-the-scenes career means a limited public voting record",
        "Less direct east-of-the-river lived experience than several rivals"
      ],
      flags: [],
      sources: [SITE.nelson, SOURCE]
    },
    {
      id: "raymond",
      name: "Lisa Raymond",
      age: 56,
      neighborhood: "Capitol Hill",
      role: "Most recently chief of staff to AG Karl Racine (2018–2020)",
      background:
        "Got hooked on DC education at Cesar Chavez Public Charter School, rose to COO, served a term on the State Board of Education, then was senior education advisor to the Council's Committee of the Whole. The clearest pro-housing-supply candidate in the field.",
      pos: [0.4, 0.6],
      tagline: "Center-left · housing supply · education",
      inferredLean:
        "Center-left to moderate. A YIMBY + Realtors endorsement is a moderate-supply coalition; working for a progressive AG and starting at a charter school suggests center-left. Not as progressive as Nelson, Forester, or Owolewa. (Inferred.)",
      priorities: ["Education", "Housing supply and affordability", "Childcare"],
      positions: [
        "Housing: streamline permitting and zoning to speed construction, while cautioning it isn't \"an invitation to developers to do whatever they want\"; pairs more supply with defending rent stabilization",
        "Backs workforce and middle-income housing for teachers, nurses, and first responders, funding the Housing Production Trust Fund with strong oversight",
        "Childcare: notes DC has tools (the Pay Equity Fund) but needs to revisit childcare seat capacity"
      ],
      endorsements: [
        "Greater Greater Washington (their top At-Large pick)",
        "DC YIMBYs",
        "DC Association of Realtors / GCAAR",
        "IAFF Local 36 (firefighters), Opportunity DC, DC Charter School Action",
        "Ward 6 CM Charles Allen and former Ward 3 CM Mary Cheh"
      ],
      strengths: [
        "Clearest pro-housing-supply candidate, with the endorsements to back it",
        "Real Council experience (senior advisor to the Committee of the Whole)",
        "Multi-domain experience across education, nonprofits, and the AG's office"
      ],
      weaknesses: [
        "Connecticut native; may face the \"doesn't know DC well enough\" critique",
        "The Realtors endorsement is a moderate signal that may not appeal to voters seeking a progressive shift",
        "Less specific oversight or progressive-policy framing than several rivals"
      ],
      flags: [],
      sources: [SITE.raymond, HILLRAG_SPLIT, SOURCE]
    },
    {
      id: "forester",
      name: "Dyana Forester",
      age: 46,
      neighborhood: "Southeast DC (grew up there)",
      role: "Senior director of labor relations to Maryland Gov. Wes Moore",
      background:
        "Started as a community organizer; led the DC chapter of Jobs with Justice and the AFL-CIO's Metropolitan Washington Council. Became a mom at 18. The strongest working-class lived experience in the field.",
      pos: [-0.6, 0.1],
      tagline: "Progressive · labor · working-family focus",
      inferredLean:
        "Progressive. A labor-leader career, working-class lived experience, and a current role under progressive Maryland Gov. Wes Moore. (Inferred.)",
      priorities: [
        "Working families and a budget aligned with DC values",
        "Affordable housing for families",
        "Worker protections and labor"
      ],
      positions: [
        "Worked on successful DC minimum-wage and paid-family-leave legislation through UFCW",
        "Housing: strengthen TOPA and expand deeply affordable housing; cites the 142-unit, fully affordable Park Morton building she fought for, and resists deals that prioritize market-rate units",
        "Backs legislation limiting DC's cooperation with ICE, sanctuary protections, and funding for immigration legal defense",
        "Pushed back on \"build faster\" as the first housing priority, questioning whether speed alone creates family-affordable housing"
      ],
      endorsements: ["UFCW Local 400", "AFGE District 14, Plumbers & Gasfitters Local 5, and other building-trades unions"],
      strengths: [
        "Strongest working-class lived experience in the field",
        "Real legislative track record on minimum wage and paid family leave",
        "Authentic east-of-the-river roots and a clear values framework"
      ],
      weaknesses: [
        "Housing-supply skeptic: her quote questioning \"build faster\" is a flag for supply-focused voters",
        "Currently works in Maryland government, not DC",
        "Single-term plan may limit her ability to build seniority"
      ],
      flags: [],
      sources: [SITE.forester, SOURCE]
    },
    {
      id: "owolewa",
      name: "Oye Owolewa",
      age: 36,
      neighborhood: "Congress Heights (east of the river)",
      role: "DC's shadow representative (six years); pharmacist",
      background:
        "Won his first ANC race in 2018 by a single vote and has since served as an unpaid statehood advocate. The most reliably progressive voice in the field, with a real activist track record.",
      pos: [-0.85, -0.7],
      tagline: "Strongly progressive · activist · statehood",
      inferredLean:
        "Strongly progressive. The deepest and most left platform in the field: a millionaire's and land-value tax program, single-payer aspiration, ICE-protest leadership, broad union and Working Families Party backing, and vocal criticism of Council moderation. (Inferred.)",
      priorities: [
        "DC statehood (his core advocacy lane)",
        "Housing preservation and tenant protection",
        "Tuition-free UDC and progressive tax reform"
      ],
      positions: [
        "Tax program built on progressive revenue: a millionaire's tax on income above $500,000, a higher capital-gains tax, a stronger mansion tax, and a land-value tax near Metro stations to fund transit",
        "Housing \"preservation first\": dedicate a large share of the Housing Production Trust Fund to preservation and TOPA purchases, cap rent increases at inflation, and expand social housing and community land trusts",
        "Community-first public safety: remove armed officers from schools (counselors and nurses instead), shift traffic enforcement to a civilian agency, and oppose youth curfews",
        "Make UDC tuition-free; led protests against ICE headquarters construction on the St. Elizabeth's campus and faults the Council for not resisting federal interference harder"
      ],
      endorsements: ["Working Families Party", "Sierra Club", "Ward One Democrats", "Multiple labor unions and progressive groups"],
      strengths: [
        "Most reliably progressive voice in the field",
        "A real activist record, not just rhetoric",
        "Has actually won a citywide DC position before (shadow rep)"
      ],
      weaknesses: [
        "Limited insider profile (shadow rep has no formal power; ANC is hyperlocal)",
        "Statehood-focused career; less depth on housing-supply mechanics than tenant protection",
        "His ambitious tax and spending program may understate DC's real fiscal constraints"
      ],
      flags: [],
      sources: [SITE.owolewa, WTOP_OYE, SOURCE]
    },
    {
      id: "chavous",
      name: "Kevin Chavous",
      age: 41,
      neighborhood: "Ward 7 (east of the river)",
      role: "Director of a Council committee chaired by Anita Bonds",
      background:
        "A Howard Law lawyer and son of a former Ward 7 councilmember, with TOPA tenant-organizing experience. Anita Bonds, the retiring incumbent, has endorsed him as her continuation candidate.",
      pos: [0.6, 0.2],
      tagline: "Moderate · Bonds's continuity pick",
      inferredLean:
        "Moderate. The Bonds endorsement is the strongest possible signal, he worked directly for her and she chose him as the continuation candidate. (Inferred.)",
      priorities: ["Education and youth services", "Housing supply and tenant protections", "Seniors and aging in place"],
      positions: [
        "Wants a counselor and nurse in every school regardless of enrollment, plus out-of-school-time programming",
        "Housing on his own platform is supply via \"zoning updates, ADUs, and adaptive reuse\" plus tenant protections; The 51st reported he also favors raising inclusionary zoning toward 15%, a figure not stated on his campaign site",
        "Dedicated seniors plank: expand property-tax relief and housing supports so seniors can age in place",
        "Views the at-large role as \"listening and being a conduit from the community to the legislation\""
      ],
      endorsements: ["Anita Bonds (the retiring incumbent he would replace)", "Former U.S. Attorney General Eric Holder", "AFSCME District Council 20"],
      strengths: [
        "Runs a Council committee now; lowest learning curve",
        "Lifelong DC resident in an underrepresented part of the city",
        "Balances supply (zoning updates, ADUs) with tenant protection and a seniors focus"
      ],
      weaknesses: [
        "The Bonds endorsement marks him as continuity with the moderate swing-vote politics progressives may want to replace",
        "Housing specifics on his own site are lighter than the reported 15% inclusionary-zoning figure suggests",
        "The \"conduit\" framing is less assertive than rivals' theories of the office"
      ],
      flags: [],
      sources: [SITE.chavous, SOURCE]
    },
    {
      id: "jackson",
      name: "Greg Jackson",
      age: 41,
      neighborhood: "Congress Heights (east of the river)",
      role: "Public-safety advocate",
      background:
        "A gun-violence survivor (a 2013 Shaw shooting) who became deputy director of the White House Office of Gun Violence Prevention under Biden, after roles in the Bowser administration. The strongest public-safety credentials in the field.",
      pos: [0.18, 0.34],
      tagline: "Establishment Dem · public safety",
      inferredLean:
        "Establishment Democrat. A Bowser-administration plus Biden-White-House background suggests center-left rather than progressive-left. (Inferred.)",
      priorities: [
        "Public safety (gun-violence prevention)",
        "Jobs, schools, and mental health; home-ownership pathways",
        "Supporting small entrepreneurs; protecting home rule"
      ],
      positions: [
        "Public safety: targeted enforcement on serious violence paired with large-scale, evidence-based violence intervention, modeled on Baltimore and Miami",
        "Argues he's the only candidate who has \"battled in the congressional arena\"",
        "Expressed positive views of Davis, Raymond, and Nelson as possible second-choice ranks"
      ],
      endorsements: ["Brady PAC", "Opportunity DC", "U.S. Reps. Maxwell Frost (FL) and Gabe Amo (RI)", "Baltimore Mayor Brandon Scott", "Gun-violence-prevention leaders including David Hogg and Moms Demand Action"],
      strengths: [
        "Strongest public-safety credentials in the field",
        "Personal experience of gun violence gives moral authority to his policy",
        "Federal political experience, including the White House"
      ],
      weaknesses: [
        "Establishment profile may not appeal to voters wanting to push the Council left",
        "Risk of single-issue framing; less depth shown on other areas",
        "No Council or DC legislative experience"
      ],
      flags: [],
      sources: [SITE.jackson, HILLRAG_SPLIT, SOURCE]
    },
    {
      id: "jenkins",
      name: "Leniqua'dominique Jenkins",
      age: 40,
      neighborhood: "Deanwood (east of the river)",
      role: "Recently program director at a senior-services nonprofit",
      background:
        "Arrived in DC in 2010 as an unpaid Capitol Hill intern, earned an entrepreneurship certificate, and ran a home-care agency for 10 years. A former ANC commissioner focused on environmental justice who later staffed Anita Bonds for a year.",
      pos: [-0.35, -0.55],
      tagline: "Progressive-leaning · community-rooted",
      inferredLean:
        "Progressive-leaning, based on her equity framing and environmental-justice focus, but without strong ideological tells in the source. (Inferred.)",
      priorities: [
        "Equity, education, and environmental justice (\"the three E's\")",
        "Senior-services modernization",
        "Children reading on grade level by third grade"
      ],
      positions: [
        "Public safety through \"stability, fairness, and investment in people\": mental-health support and stronger community-police relationships; opposed citywide curfews",
        "Signature \"Bottle Bill\": a beverage-container deposit-return system framed around environmental justice and green jobs",
        "Build a unified dashboard for senior services; argues her career across small business, ANC, Council staff, and nonprofits gives multi-issue depth"
      ],
      endorsements: ["Not documented on her campaign site or in available coverage."],
      strengths: [
        "Strong personal narrative connecting affordability struggles to policy",
        "East-of-the-river roots and lived experience",
        "Multi-issue framing rather than a single lane"
      ],
      weaknesses: [
        "Limited insider profile relative to other candidates",
        "Lost in 2021 (didn't make the ballot); no established winning track record",
        "Policy positions are less developed in the source than for others"
      ],
      flags: [],
      sources: [SITE.jenkins, HILLRAG_SPLIT, SOURCE]
    },
    {
      id: "davis",
      name: "Dwight Davis",
      age: 51,
      neighborhood: "DC",
      role: "Former DCPS principal; 20+ years in DCPS",
      background:
        "Spent two decades in DC Public Schools as a teacher and administrator, with graduate degrees from Princeton, after a stint playing semi-pro basketball abroad. A native Washingtonian with deep education roots.",
      pos: [0.05, -0.4],
      tagline: "Moderate-pragmatic · educator",
      inferredLean:
        "Moderate-pragmatic. No clear ideological tells in the source material. (Inferred.)",
      priorities: ["Public education", "Affordability and workforce housing", "Government-agency oversight"],
      positions: [
        "Frames education as foundational to crime, food access, and other downstream issues",
        "Workforce housing for teachers, firefighters, nurses, and police, built near transit and jobs",
        "Full statehood and Home Rule plank: defend budget autonomy, the independent AG, and voting representation, and \"build national coalitions for DC statehood\"",
        "Argues his former-principal background equips him for agency oversight (\"there is a skill to providing feedback\")"
      ],
      endorsements: ["Not documented on his campaign site or in available coverage."],
      strengths: [
        "Deep DCPS experience as both teacher and administrator",
        "Native Washingtonian with old-school DC roots",
        "A clear theory of oversight as a skill, plus a developed statehood plank"
      ],
      weaknesses: [
        "No legislative or government experience",
        "Education-focused candidates often struggle to broaden their pitch",
        "Limited public profile"
      ],
      flags: [],
      sources: [SITE.davis, SOURCE]
    },
    {
      id: "hill",
      name: "Fred Hill",
      age: 57,
      neighborhood: "DC",
      role: "Federal contractor; recently stepped down from the Board of Zoning Adjustment",
      background:
        "Ran his own federal-contracting firm for nearly 30 years and chaired DC's Board of Zoning Adjustment for 10. Brings the deepest zoning expertise and a genuine business-operator perspective.",
      pos: [0.7, -0.6],
      tagline: "Moderate · business + zoning expertise",
      inferredLean:
        "Moderate. Business-friendly framing, support for McDuffie (the moderate mayoral candidate), and an explicit anti-activist self-description. (Inferred.)",
      priorities: [
        "Housing (fast-tracking)",
        "Small business and local job growth",
        "A strategic rather than activist approach to federal interference"
      ],
      positions: [
        "Fast-track any affordable-housing project that gets city financing so it isn't delayed in bureaucracy",
        "Public safety \"not through rhetoric or extremes, but through collaboration, accountability, and prevention,\" working with community leaders, nonprofits, mental-health professionals, and law enforcement",
        "Grow the tax base via small-business support and CBE-program reform; argues the Council needs at least one businessperson",
        "Describes a \"work the system\" rather than activist approach; reported to support Kenyan McDuffie for mayor"
      ],
      endorsements: ["Not documented on his campaign site or in available coverage."],
      strengths: [
        "Deepest zoning expertise in the field (10 years on the BZA)",
        "A genuine business-operator perspective underrepresented on the Council",
        "Concrete proposal on fast-tracking affordable projects"
      ],
      weaknesses: [
        "Self-identified moderate may not appeal to voters seeking a more progressive voice",
        "The reported McDuffie support signals broader moderate alignment",
        "\"Not an activist\" stance may not match the moment for voters wanting federal pushback"
      ],
      flags: [],
      sources: [SITE.hill, HILLRAG_SPLIT, SOURCE]
    }
  ],
  questions: [
    {
      id: "ideology",
      text: "Bonds was the moderate swing vote. Where do you want this seat to land ideologically?",
      type: "single",
      options: [
        { id: "A", label: "Shift it progressive", scores: { chavous: 0, davis: 1, forester: 3, hill: -1, jackson: 1, jenkins: 2, nelson: 3, owolewa: 3, raymond: 1 } },
        { id: "B", label: "Keep the centrist balance she provided", scores: { chavous: 3, davis: 2, forester: 1, hill: 3, jackson: 2, jenkins: 1, nelson: 1, owolewa: 0, raymond: 2 } },
        { id: "C", label: "Ideology matters less than competence and judgment", scores: { chavous: 1, davis: 2, forester: 1, hill: 1, jackson: 2, jenkins: 1, nelson: 2, owolewa: 1, raymond: 2 } }
      ]
    },
    {
      id: "issue",
      text: "What issue do you most want an at-large councilmember focused on?",
      help: "Choose up to two.",
      type: "multi",
      max: 2,
      options: [
        { id: "A", label: "Housing supply and affordability", scores: { chavous: 2, davis: 1, forester: 2, hill: 2, jackson: 1, jenkins: 1, nelson: 2, owolewa: 1, raymond: 3 } },
        { id: "B", label: "Public safety and crime", scores: { chavous: 1, davis: 1, forester: 1, hill: 2, jackson: 3, jenkins: 1, nelson: 1, owolewa: 1, raymond: 1 } },
        { id: "C", label: "Education quality and equity", scores: { chavous: 2, davis: 3, forester: 1, hill: 1, jackson: 1, jenkins: 2, nelson: 2, owolewa: 2, raymond: 3 } },
        { id: "D", label: "Government oversight, accountability, and budget discipline", scores: { chavous: 1, davis: 2, forester: 1, hill: 2, jackson: 1, jenkins: 1, nelson: 3, owolewa: 2, raymond: 2 } },
        { id: "E", label: "Federal resilience, DC autonomy, and economic stabilization", scores: { chavous: 1, davis: 2, forester: 2, hill: 1, jackson: 2, jenkins: 1, nelson: 2, owolewa: 3, raymond: 1 } }
      ]
    },
    {
      id: "profile",
      text: "What kind of profile do you want to elevate?",
      help: "Choose up to two.",
      type: "multi",
      max: 2,
      options: [
        { id: "A", label: "A deep policy expert in one domain", scores: { chavous: 2, davis: 2, forester: 2, hill: 3, jackson: 2, jenkins: 1, nelson: 2, owolewa: 1, raymond: 3 } },
        { id: "B", label: "A government insider who knows how DC agencies actually work", scores: { chavous: 3, davis: 1, forester: 2, hill: 2, jackson: 2, jenkins: 1, nelson: 3, owolewa: 1, raymond: 3 } },
        { id: "C", label: "A community-rooted advocate from an underrepresented part of the city", scores: { chavous: 3, davis: 2, forester: 3, hill: 1, jackson: 3, jenkins: 3, nelson: 1, owolewa: 3, raymond: 0 } },
        { id: "D", label: "A private-sector or outsider perspective", scores: { chavous: 1, davis: 1, forester: 1, hill: 3, jackson: 1, jenkins: 2, nelson: 0, owolewa: 1, raymond: 1 } }
      ]
    },
    {
      id: "housing",
      text: "On housing specifically, which approach fits you best?",
      type: "single",
      options: [
        // Raymond is the clearest pro-supply candidate (streamline permitting/zoning; GGW + YIMBYs + Realtors). Hill fast-tracks financed projects. Forester questioned "build faster."
        { id: "A", label: "Build a lot more housing, and build it faster", scores: { chavous: 1, davis: 1, forester: 0, hill: 3, jackson: 1, jenkins: 1, nelson: 1, owolewa: 1, raymond: 3 } },
        // Affordability-rules / tenant-protection is a crowded progressive lane: Forester (strengthen TOPA, deeply affordable), Nelson (expand rent stabilization, TOPA, fund HPTF/vouchers), Owolewa (preservation-first, rent control to CPI), Chavous (tenant protections). All from their own platforms.
        { id: "B", label: "Stronger affordability requirements and tenant protections", scores: { chavous: 3, davis: 1, forester: 3, hill: 0, jackson: 1, jenkins: 1, nelson: 3, owolewa: 3, raymond: 1 } },
        // Davis and Forester both explicitly call for workforce housing (teachers, nurses, first responders); Raymond funds workforce/middle-income housing too.
        { id: "C", label: "Workforce housing for teachers, nurses, and first responders", scores: { chavous: 1, davis: 3, forester: 3, hill: 1, jackson: 1, jenkins: 1, nelson: 1, owolewa: 1, raymond: 2 } },
        // Nelson's signature is oversight that gets more from existing spending; Davis frames oversight as a skill. (Owolewa's housing is spend-more/preservation, not efficiency-audits.)
        { id: "D", label: "Get more out of the housing money DC already spends", scores: { chavous: 1, davis: 2, forester: 1, hill: 1, jackson: 1, jenkins: 1, nelson: 3, owolewa: 1, raymond: 1 } }
      ]
    },
    {
      id: "safety",
      text: "On public safety, which approach fits you best?",
      help: "The field splits cleanly here, from prevention-first to staffing-first.",
      type: "single",
      options: [
        // Owolewa (remove school police, civilian traffic enforcement, opposes curfews), Jenkins (opposed curfews, "investment in people"), Forester (de-escalation, violence prevention) are prevention-first, from their own sites.
        { id: "A", label: "Invest in prevention first: violence interruption, youth programs, and mental health", scores: { chavous: 1, davis: 1, forester: 3, hill: 1, jackson: 2, jenkins: 3, nelson: 1, owolewa: 3, raymond: 1 } },
        // Jackson's own framing is "targeted enforcement paired with large-scale intervention"; Raymond pairs a staffed force with prevention; Chavous/Hill/Davis balance both.
        { id: "B", label: "Both at once: targeted enforcement on serious violence plus large-scale intervention", scores: { chavous: 2, davis: 2, forester: 2, hill: 2, jackson: 3, jenkins: 1, nelson: 1, owolewa: 1, raymond: 3 } },
        // Raymond backs a well-staffed, accountable force focused on serious violence; Chavous backs "smart, effective enforcement"; Owolewa is the opposite pole (remove police from schools).
        { id: "C", label: "Strengthen well-staffed, accountable policing focused on the most serious crime", scores: { chavous: 2, davis: 2, forester: 1, hill: 2, jackson: 2, jenkins: 1, nelson: 1, owolewa: 0, raymond: 3 } }
      ]
    },
    {
      id: "approach",
      text: "How should this councilmember actually operate?",
      type: "single",
      options: [
        // Nelson built her campaign on aggressive oversight; Davis frames oversight as a skill.
        { id: "A", label: "An aggressive watchdog who holds agencies accountable", scores: { chavous: 1, davis: 3, forester: 1, hill: 1, jackson: 1, jenkins: 1, nelson: 3, owolewa: 2, raymond: 1 } },
        // Chavous describes the role as a "conduit from the community"; Jenkins runs on multi-issue community representation.
        { id: "B", label: "A community conduit who listens and channels residents' needs", scores: { chavous: 3, davis: 2, forester: 2, hill: 1, jackson: 2, jenkins: 3, nelson: 1, owolewa: 1, raymond: 1 } },
        // Owolewa has a real activist record (ICE protests, criticizing Council moderation); Hill explicitly calls himself "not an activist."
        { id: "C", label: "An activist who isn't afraid to confront power", scores: { chavous: 1, davis: 1, forester: 2, hill: 0, jackson: 1, jenkins: 1, nelson: 1, owolewa: 3, raymond: 1 } },
        // Hill pitches a businessperson who "works the system"; Nelson, Jackson, and Raymond bring insider know-how.
        { id: "D", label: "A pragmatic operator who knows how to work the system", scores: { chavous: 2, davis: 1, forester: 1, hill: 3, jackson: 2, jenkins: 1, nelson: 2, owolewa: 1, raymond: 2 } }
      ]
    }
  ],
  tradeoffs: [
    {
      id: "prog-supply",
      when: [["ideology", "A"], ["issue", "A"]],
      text:
        "Your criteria pull in slightly different directions. Among the most progressive candidates (Forester, Nelson, Owolewa), housing-supply expansion is not the dominant framing, Forester has even questioned a \"build faster\" approach. Lisa Raymond is the strongest pro-supply candidate but sits closer to the center-left. Your top matches below show this tradeoff rather than papering over it."
    }
  ],
  rcvNote:
    "This race uses ranked-choice voting, and the field is large. Your ranking pairs your strongest match with candidates who cover different strengths, so you build a ballot of 2–5 rather than betting on one. Ranking lower choices never hurts your first."
};
