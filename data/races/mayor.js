// DC Mayor, Democratic primary (open seat; Bowser is not running again).
// Field confirmed against the DC Board of Elections certified candidate list:
// seven Democrats are on the printed ballot. All seven are scored here from
// each candidate's own campaign platform, deepened June 8, 2026. Depth varies,
// and candidates with thin published platforms are scored only on what they
// have actually stated; this is noted, never papered over. Kathy Henderson and
// Stanley Lawson were disqualified and are not on the ballot. Three others
// (Ford, Muhammad, Shuler) qualified only as write-ins. Ethics items are
// disclosed for every candidate where documented, never hidden.

const S = {
  jlg: { label: "Janeese Lewis George campaign endorsements (janeesefordc.com)", url: "https://janeesefordc.com/endorsements/" },
  jlgBase: { label: "Lewis George campaign site, DC Council records, The 51st, Axios DC", url: "https://www.janeesefordc.com/" },
  mcd: { label: "Kenyan McDuffie campaign endorsements (kenyanmcduffie.com)", url: "https://kenyanmcduffie.com/endorsements" },
  mcdBase: { label: "McDuffie campaign site, DC Council records, The 51st, Axios DC", url: "https://www.kenyanmcduffie.com/" },
  orange: { label: "Vincent Orange, “The Orange Plan” (orangeformayor.com)", url: "https://orangeformayor.com/the-orange-plan/" },
  orangeWiki: { label: "Wikipedia, Vincent Orange (record and 2016 ethics matter)", url: "https://en.wikipedia.org/wiki/Vincent_Orange" },
  goodweather: { label: "Gary Goodweather issues (goodweatherfordc.com/issues)", url: "https://www.goodweatherfordc.com/issues" },
  goodweatherWtop: { label: "WTOP, “Get to know mayoral candidate Gary Goodweather”", url: "https://wtop.com/dc-election/2026/06/get-to-know-dc-mayoral-candidate-gary-goodweather/" },
  johnson: { label: "Ernest Johnson campaign site (ernestformayor2026.com)", url: "https://ernestformayor2026.com/" },
  johnsonWtop: { label: "WTOP, “Get to know mayoral candidate Ernest Johnson”", url: "https://wtop.com/dc-election/2026/06/get-to-know-dc-mayoral-candidate-ernest-johnson/" },
  sampath: { label: "Rini Sampath platform (riniformayor.com/our-platform)", url: "https://riniformayor.com/our-platform" },
  solomon: { label: "Hope Solomon campaign site (hopefordc.com/about)", url: "https://hopefordc.com/about" },
  solomonAxios: { label: "Axios DC, “A DOGE'd federal worker is running for mayor”", url: "https://www.axios.com/local/washington-dc/2026/02/13/doged-federal-worker-running-for-mayor-dc" },
  the51st: { label: "The 51st, DCision2026 mayoral coverage", url: "https://51st.news/washington-dc-2026-primary-election-june-16-mayor-council/" },
  dmvnl: { label: "DMV New Liberals endorsements", url: "https://dmvnewliberals.org/endorsements" },
  the51stTimers: { label: "The 51st, “Meet the first-time candidates running for mayor”", url: "https://51st.news/dc-mayoral-race-goodweather-solomon-sampath-2026/" },
  the51stFact: { label: "The 51st, mayoral-race attacks fact-check", url: "https://51st.news/dc-mayoral-race-attacks-fact-check-2/" },
  jlgWtop: { label: "WTOP, “Get to know mayoral candidate Janeese Lewis George”", url: "https://wtop.com/dc-election/2026/06/get-to-know-dc-mayoral-candidate-janeese-lewis-george/" },
  jlgPlatformHomes: { label: "Lewis George platform, Homes for All", url: "https://janeesefordc.com/platform/homes-for-all/" },
  jlgPlatformSafety: { label: "Lewis George platform, Safe Communities for All", url: "https://janeesefordc.com/platform/safe-communities-for-all/" },
  jlgPlatformChildcare: { label: "Lewis George platform, Childcare for All", url: "https://janeesefordc.com/platform/childcare-for-all/" },
  jlgPlatformFederal: { label: "Lewis George platform, Stand Up for All DC", url: "https://janeesefordc.com/platform/stand-up-for-all-dc/" },
  mcdWtop: { label: "WTOP, “Get to know mayoral candidate Kenyan McDuffie”", url: "https://wtop.com/dc-election/2026/06/get-to-know-dc-mayoral-candidate-kenyan-mcduffie/" },
  wjlaRental: { label: "WJLA, Council passes the RENTAL Act 10-3", url: "https://wjla.com/features/i-team/dc-council-votes-yes-rental-act-reform-rental-housing-laws-dc-landlords-eviction-mayor-bowser-approve-small-multifamily-owners-association-tenant-opportunity-to-purchase-act-topa" },
  dclineOcf: { label: "The DC Line, OCF inquiry into the Lewis George campaign (May 1, 2026)", url: "https://thedcline.org/2026/05/01/jonetta-rose-barras-has-janeese-lewis-georges-mayoral-campaign-violated-dc-election-finance-laws/" },
  jewishInsider: { label: "Jewish Insider on the Trayon White remarks (May 2026)", url: "https://jewishinsider.com/2026/05/janeese-lewis-george-campaign-trayon-white-antisemitic-history/" },
  wikiMayor: { label: "Wikipedia, 2026 DC mayoral election", url: "https://en.wikipedia.org/wiki/2026_Washington,_D.C.,_mayoral_election" },
  orangeWtop: { label: "WTOP, “Get to know mayoral candidate Vincent Orange”", url: "https://wtop.com/dc-election/2026/06/get-to-know-dc-mayoral-candidate-vincent-orange/" },
  sampathWtop: { label: "WTOP, “Get to know mayoral candidate Rini Sampath”", url: "https://wtop.com/dc-election/2026/06/get-to-know-dc-mayoral-candidate-rini-sampath/" },
  ramw: { label: "Restaurant Association of Metropolitan Washington endorsements", url: "https://www.ramw.org/ramw-announces-endorsements-dc-primary-election-races" },
  georgetowner: { label: "Georgetowner, 2026 mayoral candidate tracker", url: "https://georgetowner.com/articles/2026/05/12/dc-mayor-race-2026-candidate-tracker/" }
};

export const mayor = {
  id: "mayor",
  group: "citywide",
  title: "Mayor",
  shortTitle: "Mayor",
  ballot: "Democratic primary",
  allVoters: false,
  rcv: true,
  coverage: "researched",
  coverageNote:
    "All seven candidates on the printed Democratic ballot are scored here, each from their own campaign platform. Depth varies: Lewis George and McDuffie have the most detailed records, while some candidates publish only high-level platforms (Hope Solomon's, for example, is largely a list of grievances), so they are scored only on positions they have actually stated. Kathy Henderson and Stanley Lawson were disqualified and are not on the ballot.",
  seat:
    "It's an open seat. Mayor Muriel Bowser is not seeking a fourth term, which makes this the first contested open mayoral primary in 20 years. Seven Democrats are on the ballot.",
  overview:
    "In heavily Democratic DC, the primary winner is widely expected to win in November. Seven Democrats are running. By fundraising and polling it has looked like a competitive top-tier race between Ward 4 Councilmember Janeese Lewis George (progressive) and former councilmember Kenyan McDuffie (moderate), with five other candidates offering distinct alternatives, from a veteran fiscal moderate to first-time outsiders.",
  stakes:
    "The next mayor sets the city's direction on housing scale, policing, taxes, and how confrontational to be with the Trump administration, at a moment of real federal pressure on DC. Ranked-choice voting is new here, so second and third choices can decide a close race.",
  map: {
    x: { label: "Ideological lean (inferred)", left: "Progressive", right: "Moderate" },
    y: { label: "Political profile", low: "Outsider", high: "Seasoned insider" },
    note: "Two axes: ideological lean and political profile (newcomer to longtime insider). Both are inferred from each candidate's documented positions, record, and endorsements, and flagged as inferred. Open any candidate for the evidence."
  },
  candidates: [
    {
      id: "lewisgeorge",
      name: "Janeese Lewis George",
      chipName: "Lewis George",
      age: 38,
      neighborhood: "Ward 4 (third-generation Washingtonian)",
      role: "Ward 4 Councilmember since 2021",
      background:
        "Former Assistant Attorney General under Karl Racine who also worked for the DC State Board of Education. A self-identified democratic socialist, the first on the Council since 1998. Her platform centers on affordability, economic populism, and standing up to the Trump administration.",
      pos: [-0.78, 0.45],
      tagline: "Progressive · prevention-first · ambitious scale",
      inferredLean:
        "Progressive / democratic socialist, this is her self-description, not an inference.",
      priorities: [
        "Affordability across housing, childcare, and utilities",
        "Economic populism funded by progressive revenue",
        "A confrontational posture toward federal interference"
      ],
      positions: [
        { text: "Housing: target of 72,000 new units over five years (roughly six times McDuffie's pace), plus \"Dignified Homes DC\" social housing", src: S.jlgWtop },
        "Proposes financing affordable housing construction with billions from the city's pension funds (a Washington Post opinion piece criticized this)",
        { text: "Voted NO on the 2025 RENTAL Act (one of three no votes), seeking to soften its eviction provisions", src: S.wjlaRental },
        { text: "Public safety: \"prevention, intervention, and enforcement,\" Community Hubs in all eight wards, no stated MPD hiring target", src: S.jlgPlatformSafety },
        "Voted for the original July 2025 emergency youth curfew, then against extending it four times; says she would end the policy as mayor",
        { text: "Childcare: universal subsidy capping family cost at 7% of income", src: S.jlgPlatformChildcare },
        { text: "Backs progressive revenue, including a Business Activity Tax", src: S.the51stFact },
        { text: "Would rescind the order letting MPD cooperate with ICE; \"I'm not complying in advance\"", src: S.jlgPlatformFederal },
        "Schools: reduce mayoral control, giving the State Board of Education authority over the Superintendent"
      ],
      endorsements: [
        { text: "Greater Greater Washington and Free DC", src: S.jlg },
        { text: "Working Families Party, Metro DC DSA, Our Revolution DC, Sierra Club DC, DC YIMBYs", src: S.jlg },
        { text: "Washington Teachers Union, Metro Washington AFL-CIO, SEIU 32BJ, UFCW Local 400, ATU Local 689, UNITE HERE 23 & 25", src: S.jlg },
        { text: "Jews United for Justice Campaign Fund", src: S.jlg },
        { text: "Councilmembers Robert White, Brianne Nadeau, Zachary Parker, and Charles Allen; former AG Karl Racine", src: S.jlg }
      ],
      strengths: [
        "Most ambitious affordability agenda in the race (housing scale, universal childcare)",
        "Clear, consistent progressive record voters can check against her votes",
        "By far the broadest labor and progressive coalition in the field"
      ],
      weaknesses: [
        "Social-housing mechanism is unproven at DC scale",
        "Pension-fund housing financing is contested and drew published criticism",
        "No stated MPD hiring target may concern voters focused on police staffing"
      ],
      flags: [
        {
          id: "ethics",
          label: "An open campaign-finance inquiry and a disclosure complaint (both contested)",
          detail:
            "An open DC Office of Campaign Finance inquiry into alleged improper coordination with organized labor; and a May 2026 Campaign for Accountability complaint to BEGA alleging she failed to properly disclose her family's financial assets. Her campaign calls both baseless and politically motivated. Neither is a finding of wrongdoing.",
          src: S.dclineOcf
        },
        {
          id: "trayon",
          label: "Called Councilmember Trayon White a \"mentor\"",
          detail:
            "In May 2026 she referred to Ward 8 Councilmember Trayon White (under federal bribery indictment, expelled by the Council in 2025 and then re-elected in that July's special election) as a \"mentor.\" She administered his oath of office in January 2025, and voted with the Council supermajority to expel him.",
          src: S.jewishInsider
        }
      ],
      sources: [S.jlg, S.jlgBase, S.the51st]
    },
    {
      id: "mcduffie",
      name: "Kenyan McDuffie",
      age: null,
      neighborhood: "DC",
      role: "Former At-Large Councilmember (stepped down to run for mayor)",
      background:
        "A former postal worker and aide to Delegate Norton, then a civil-rights attorney at the U.S. DOJ under Obama. Elected to represent Ward 5 in 2012, then At-Large in 2022. Campaign frame is making DC \"the most affordable city in the U.S.\" through lower costs rather than new taxes.",
      pos: [0.5, 0.7],
      tagline: "Moderate · enforcement-forward · fiscally cautious",
      inferredLean:
        "Moderate. Business and real-estate-aligned coalition; emphasis on lowering costs without broad tax increases. (Inferred from his coalition and platform.)",
      priorities: [
        "Lower cost of living without raising taxes",
        "Expand opportunity in every ward",
        "Strengthen public safety, including police staffing"
      ],
      positions: [
        { text: "Housing: 12,000 new units by 2030, preserve 20,000 affordable units, cut approval timelines by 50%", src: S.mcdWtop },
        { text: "Voted YES on the 2025 RENTAL Act; would expand down-payment assistance and streamline approvals", src: S.wjlaRental },
        { text: "Public safety: hire 1,000 additional MPD officers; authored the NEAR Act and launched one of the nation's first large-scale police body-camera programs", src: S.mcdWtop },
        "Backed the youth curfew repeatedly, calling it part of a broader strategy, \"not a standalone fix\"",
        "Childcare: expand the Local Child Tax Credit and employer incentives rather than a universal subsidy",
        "No broad-based tax increases; as business committee chair, shepherded the Capital One Arena deal and worked on the RFK stadium agreement",
        { text: "Would end ICE raids and revoke MPD cooperation with ICE on day one: \"The ICE raids have to end\"", src: S.mcdWtop },
        "Schools: continue mayoral control"
      ],
      endorsements: [
        { text: "Former Mayors Anthony \"Tony\" Williams and Sharon Pratt", src: S.wikiMayor },
        { text: "Sen. Angela Alsobrooks (MD); Councilmembers Anita Bonds and Wendell Felder; former CMs Mary Cheh, Charlene Drew Jarvis, and Linda Cropp", src: S.wikiMayor },
        { text: "Tom Perez and former AG Eric Holder", src: S.wikiMayor },
        { text: "DMV New Liberals (their first choice)", src: S.dmvnl },
        { text: "Restaurant Association of Metropolitan Washington, DC Association of Realtors, GCAAR", src: S.ramw },
        { text: "Washington Jewish Week", src: S.wikiMayor }
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
            "His coalition is heavily real-estate and business; voters concerned about developer influence may weigh this."
        },
        {
          id: "enforcement",
          label: "Curfew and detention votes",
          detail:
            "His support for the youth curfew and expanded pre-trial detention is out of step with many criminal-justice reform advocates. He frames the curfew as one tool in a broader strategy, not a standalone fix."
        }
      ],
      sources: [S.mcd, S.mcdBase, S.the51st]
    },
    {
      id: "orange",
      name: "Vincent Orange",
      age: 69,
      neighborhood: "DC",
      role: "Former DC Councilmember (Ward 5, then At-Large); former DC Chamber of Commerce CEO",
      background:
        "A veteran of DC government: Ward 5 Councilmember 1999–2007, At-Large 2011–2016, then president and CEO of the DC Chamber of Commerce 2016–2020. A licensed CPA with a law degree and a tax LL.M. Runs as the experienced fiscal moderate, framing his pitch as \"operational, not ideological.\"",
      pos: [0.6, 0.9],
      tagline: "Moderate · fiscal discipline · seasoned insider",
      inferredLean:
        "Moderate. Explicit \"economic growth without raising taxes\" platform, a fiscal-discipline / restore-AAA-credit frame, and a long establishment record. (Inferred from his platform and record.)",
      priorities: [
        "Public safety as the foundation, including restoring police staffing",
        "Economic growth without raising taxes",
        "Fiscal discipline and restoring DC's AAA credit rating"
      ],
      positions: [
        { text: "Public safety: restore roughly 4,100 sworn MPD officers and impose a youth curfew (under-18, Sunday–Thursday, 11 p.m.–6 a.m.)", src: S.orange },
        { text: "Taxes/economy: \"economic growth without raising taxes\"; keep \"DC dollars\" circulating by expanding Certified Business Enterprise contracting (toward $2 billion)", src: S.orange },
        { text: "Housing: expand attainable homeownership and rental for working families, seniors, and young professionals, including workforce housing and tiny homes for those earning $50,000 or less, with housing policy aligned to transit and jobs", src: S.orange },
        { text: "Education: students reading and doing basic arithmetic by 4th grade; four post-secondary paths (tuition-free UDC, four-year college via TAG, apprenticeship, or entrepreneurship)", src: S.orange },
        { text: "Federal: \"work pragmatically with federal partners... we will not negotiate in fear, nor fear to negotiate\"; preserve Home Rule while pursuing statehood", src: S.orange },
        { text: "Backs ranked-choice voting explicitly, framing it as rewarding consensus", src: S.orange }
      ],
      endorsements: ["Not documented on his campaign site or in available coverage."],
      strengths: [
        "Deepest executive and legislative experience in the field (Council plus Chamber of Commerce CEO)",
        "Only CPA in the race; a specific fiscal-discipline and CBE-contracting agenda",
        "Clear, costed public-safety staffing target"
      ],
      weaknesses: [
        "Long electoral history includes several past losses (2006 and 2014 mayoral bids, 2016 At-Large loss)",
        "Youth curfew is opposed by many criminal-justice reform advocates",
        "No endorsements documented this cycle"
      ],
      flags: [
        {
          id: "chamber2016",
          label: "2016 conflict-of-interest question (cleared by the ethics board)",
          detail:
            "In 2016 he took the DC Chamber of Commerce CEO job while still serving on the Council, drawing conflict-of-interest criticism. The DC Board of Ethics and Government Accountability reviewed it and ruled in September 2016 that he did not break ethics laws. (Per Wikipedia.)"
        }
      ],
      sources: [S.orange, S.orangeWiki, S.the51st]
    },
    {
      id: "goodweather",
      name: "Gary Goodweather",
      age: null,
      neighborhood: "DC",
      role: "Real-estate manager and former U.S. Army captain",
      background:
        "A first-time candidate: former Army captain with an MBA in finance from Johns Hopkins and a career in real-estate development. He was the first 2026 mayoral candidate certified for DC's Fair Elections public-financing program, and runs on \"a city that works in real life.\"",
      pos: [0.0, -0.55],
      tagline: "Center · outsider executive · build more",
      inferredLean:
        "Center / pragmatic. The 51st notes he can appeal to progressives and moderates alike; he pairs an ambitious build-more housing plan with a fully-staff-MPD-plus-prevention safety stance. (Inferred from his platform.)",
      priorities: [
        "Build much more housing people can actually afford",
        "Fully staff MPD and fix the 911 system",
        "Lower the cost of living, including free transit"
      ],
      positions: [
        { text: "Housing \"Affordable DC\": 50,000 new homes by 2032, including 36,000 \"truly affordable\"; cut permitting timelines, allow missing-middle housing (duplexes, small apartments), and end parking mandates near Metro", src: S.goodweatherWtop },
        { text: "Public safety: fully staff MPD and fix the 911 system for faster response, paired with prevention (youth engagement, mental health, workforce pathways)", src: S.goodweather },
        { text: "Signature idea, Fare-Free DC: free Metrobus and Metrorail for DC residents, funded through telecom partnerships, congestion pricing, and fees on delivery and ride-hail companies", src: S.goodweatherWtop },
        { text: "Education: every child reading by third grade", src: S.goodweatherWtop },
        { text: "Federal: protect Home Rule, fight for statehood, and \"strongly oppose any further attempt from the White House to seize control of local policing\"", src: S.goodweatherWtop },
        "Other ideas: a \"Power DC\" plan to cut utility costs via solar and sewer-heat systems"
      ],
      endorsements: [{ text: "DMV New Liberals (their second choice)", src: S.dmvnl }],
      strengths: [
        "Housing scale rivals Lewis George's, paired with concrete supply reforms (missing-middle, parking)",
        "Outsider executive and veteran profile with a marquee idea (free transit)",
        "First candidate certified for public financing, powered by small-dollar donations"
      ],
      weaknesses: [
        "No elected experience or governing record",
        "Fare-Free DC's funding mechanisms are unproven at the needed scale",
        "Less detail on taxes and budget than the costed proposals he makes elsewhere"
      ],
      flags: [],
      sources: [S.goodweather, S.goodweatherWtop, S.the51st]
    },
    {
      id: "johnson",
      name: "Ernest Johnson",
      age: null,
      neighborhood: "DC (native Washingtonian)",
      role: "Chairman and CEO of the nonprofit Friends of Frank Reeves Center",
      background:
        "A native Washingtonian who runs a community nonprofit providing school supplies and services to elementary schools, and a real-estate broker who sits on the DC Apprenticeship Council. He managed Marion Barry's first mayoral campaign decades ago and has run for mayor before. Pitches \"trauma-informed leadership\" rooted in community.",
      pos: [-0.35, -0.45],
      tagline: "Populist outsider · community roots · accountability",
      inferredLean:
        "Populist / outsider. Anti-establishment framing, developer-accountability and prevention-focused safety, and opposition to a permanent youth curfew lean left-of-center, but he is not part of the progressive coalition. (Inferred from his platform.)",
      priorities: [
        "Affordability and holding developers accountable",
        "Public safety through prevention, not blanket curfews",
        "Education and youth opportunity"
      ],
      positions: [
        { text: "Housing: audit the last 36 months of residential development for compliance with affordability commitments; partner with nonprofits, community land trusts, and minority contractors; leverage public assets like RFK", src: S.johnsonWtop },
        { text: "Public safety: accountable policing, better training, and prevention; explicitly opposes a broad permanent youth curfew, saying it \"cannot substitute for real investment in our young people\"", src: S.johnsonWtop },
        { text: "Signature idea: a Mayor's Beautification Task Force employing 3,000 DC youth", src: S.johnsonWtop },
        { text: "Stadium: would renegotiate the Commanders/RFK deal and pursue a 26% public ownership stake for DC taxpayers", src: S.johnsonWtop },
        "Taxes/economy: create jobs without raising taxes on working families",
        { text: "Education: proficiency in reading, writing, and arithmetic by 5th grade; workforce and vocational pipelines", src: S.johnsonWtop }
      ],
      endorsements: ["Not documented on his campaign site or in available coverage."],
      strengths: [
        "Distinctive ideas no one else offers (developer audit, public stake in the Commanders deal)",
        "Long community-organizing roots and a nonprofit track record",
        "Prevention-first safety stance with a clear anti-curfew position"
      ],
      weaknesses: [
        "Longshot with no elected experience; has run for mayor before without winning",
        "Was not included in the top-tier debates (organizers limited those to the leading candidates)",
        "Federal/statehood posture is thin beyond \"communication\" with Congress"
      ],
      flags: [],
      sources: [S.johnson, S.johnsonWtop, S.the51st]
    },
    {
      id: "sampath",
      name: "Rini Sampath",
      age: 31,
      neighborhood: "U Street corridor (Ward 1)",
      role: "Cybersecurity director and federal-program consultant",
      background:
        "A first-time candidate who immigrated from India at age 7 and has lived in DC for over a decade. A federal contractor who works on government programs and citizen services, and a former USC student-body president. She entered the race after the city's February 2026 snowstorm cleanup failed, running on competent execution: \"I'm not a politician.\"",
      pos: [0.15, -0.8],
      tagline: "Pragmatic outsider · fix the basics · technocrat",
      inferredLean:
        "Pragmatic centrist. Defers big new programs until government \"handles the basics\" and focuses on execution over ideology, while taking a firm line against federal interference. (Inferred from her platform.)",
      priorities: [
        "Fix the basics and make city services actually work",
        "Lower the cost of living by cutting fees, not raising taxes",
        "Protect renters while building more housing"
      ],
      positions: [
        { text: "Signature \"Fix the Basics\" campaign, with working demo tools her team built: a 311 app, a tax-spending dashboard, and a small-business concierge", src: S.sampath },
        { text: "Public safety framed through response and street design: fully staff 911 call centers (\"residents suffer and in some cases die while on hold\") and execute Vision Zero rather than \"brand\" it", src: S.sampath },
        { text: "Housing: a day-one enforcement push on high-complaint buildings (illegal fees, delayed repairs), plus streamlined permitting and faster construction near transit", src: S.sampath },
        { text: "Taxes/economy: inventory every city tax and fee, eliminate duplicative ones, add automatic sunset reviews, and \"broaden the tax base where appropriate rather than increasing rates\"", src: S.sampath },
        { text: "Childcare: expand subsidies via cost-based reimbursement; holds off on proposing big new programs \"until we actually clean up our city\"", src: S.sampath },
        { text: "Federal: says she will not cooperate with any federal takeover of MPD or with ICE, and calls Bowser \"too quick to appease the White House\"", src: S.sampathWtop }
      ],
      endorsements: [{ text: "DMV New Liberals (their third choice)", src: S.dmvnl }],
      strengths: [
        "The most detailed execution-and-services platform among the outsiders, with actual prototypes",
        "A clear, disciplined message (fix the basics) backed by a government-services career",
        "Concrete on fees, 911, and permitting where others are vague"
      ],
      weaknesses: [
        "No elected experience or governing record",
        "Little on K-12 schools beyond childcare",
        "Deliberately avoids the big-program debate, which may read as thin to some voters"
      ],
      flags: [],
      sources: [S.sampath, S.the51st]
    },
    {
      id: "solomon",
      name: "Hope Solomon",
      age: 42,
      neighborhood: "Dupont Circle (DC native)",
      role: "Small-business owner; former federal national-security contractor",
      background:
        "A born-and-raised Washingtonian and DCPS graduate whose family has run a Georgetown formalwear business since 1977. She spent roughly 17 years as a federal employee and contractor in national security (FBI, DHS, DOD) before being laid off amid DOGE cuts in 2025, which prompted her run. Pitches \"common-sense leadership and accountability.\"",
      pos: [0.45, -0.85],
      tagline: "Outsider · efficiency-first · common sense",
      inferredLean:
        "Center-right of the field on spending. Efficiency-and-accountability framing, opposition to new taxes and to Initiative 82's burden on small business, closer to McDuffie's lane than Lewis George's, but with a thin published platform. (Inferred.)",
      priorities: [
        "Affordability and government efficiency",
        "Cutting red tape for small businesses",
        "Reforming the public-schools lottery"
      ],
      positions: [
        { text: "Signature \"common-sense leadership\": audit city agencies to stem overspending and \"fix\" system failures rather than \"spin\" them", src: S.solomon },
        { text: "Taxes/economy: affordability through prioritization, not new taxes; opposes the burden of Initiative 82 on restaurants and bars; wants to cut small-business red tape", src: S.the51stTimers },
        "Education: critiques the DCPS lottery (\"a guaranteed school doesn't mean a guaranteed education\") and wants to change it, though without a detailed reform",
        "Public safety: framed mainly through retail theft and its impact on small business, without a specific policing plan",
        "Housing: no stated position",
        "Federal: no stated position (her candidacy is itself a response to DOGE-driven federal layoffs)"
      ],
      endorsements: ["Not documented; did not respond to the DMV New Liberals candidate questionnaire."],
      strengths: [
        "Authentic lived-DC and small-business perspective, plus a national-security operations background",
        "A clear efficiency-and-accountability message",
        "Names a concrete frustration (the school lottery) that resonates with many parents"
      ],
      weaknesses: [
        "The thinnest published platform in the field, more a list of grievances than detailed plans",
        "No stated position on housing or federal/Trump relations",
        "No elected experience and no documented endorsements"
      ],
      flags: [],
      sources: [S.solomon, S.solomonAxios, S.the51st]
    }
  ],
  questions: [
    {
      id: "ambition",
      text: "What should the next mayor's basic approach to government be?",
      type: "single",
      options: [
        // Lewis George: social housing + universal childcare. Goodweather: 50k homes + Fare-Free DC (ambitious, fee-funded). Others reject big new programs.
        { id: "A", label: "Launch major new public programs (social housing, universal childcare, free transit)", scores: { lewisgeorge: 3, mcduffie: 0, orange: 0, goodweather: 2, johnson: 1, sampath: 0, solomon: 0 } },
        // McDuffie + Orange: no big new programs, fiscal caution / no new taxes.
        { id: "B", label: "Stay fiscally cautious; no big new programs given budget pressure", scores: { lewisgeorge: 0, mcduffie: 3, orange: 3, goodweather: 1, johnson: 1, sampath: 1, solomon: 2 } },
        // Sampath ("fix the basics") and Solomon ("audit and fix") run explicitly on competence-before-ambition.
        { id: "C", label: "Fix the basics and make government work before anything ambitious", scores: { lewisgeorge: 0, mcduffie: 1, orange: 1, goodweather: 1, johnson: 1, sampath: 3, solomon: 3 } }
      ]
    },
    {
      id: "safety",
      text: "What's the right public-safety approach?",
      type: "single",
      options: [
        // Lewis George (end the curfew) and Johnson (opposes permanent curfew, prevention) are prevention-first.
        { id: "A", label: "Prevention-first: youth programs, mental health, and jobs, with limited use of curfews", scores: { lewisgeorge: 3, mcduffie: 0, orange: 0, goodweather: 1, johnson: 3, sampath: 1, solomon: 1 } },
        // McDuffie (1,000 officers, curfew) and Orange (4,100 officers, curfew); Goodweather fully staffs MPD.
        { id: "B", label: "Enforcement-first: a larger, well-staffed police force and youth curfews", scores: { lewisgeorge: 0, mcduffie: 3, orange: 3, goodweather: 2, johnson: 0, sampath: 0, solomon: 1 } },
        // Sampath: staff 911, faster response, Vision Zero street design. Goodweather: fix 911.
        { id: "C", label: "Fix the basics of safety: staff 911, faster response, safer street design", scores: { lewisgeorge: 1, mcduffie: 1, orange: 1, goodweather: 2, johnson: 1, sampath: 3, solomon: 2 } }
      ]
    },
    {
      id: "education",
      text: "What should the mayor prioritize on schools and kids?",
      type: "single",
      options: [
        // Lewis George: universal childcare subsidy. McDuffie: Local Child Tax Credit + employer incentives. Sampath: childcare subsidies via cost-based reimbursement (defers big new programs until the basics work).
        { id: "A", label: "Expand early childhood and make childcare affordable", scores: { lewisgeorge: 3, mcduffie: 2, orange: 1, goodweather: 1, johnson: 1, sampath: 2, solomon: 1 } },
        // Lewis George would reduce mayoral control (empower the State Board); McDuffie would keep it (a documented opposite). Others have no stated governance position.
        { id: "B", label: "Give schools more independence from City Hall (rethink mayoral control)", scores: { lewisgeorge: 3, mcduffie: 0, orange: 1, goodweather: 1, johnson: 1, sampath: 1, solomon: 1 } },
        // Orange: four post-secondary paths (tuition-free UDC, TAG, apprenticeship, entrepreneurship). Johnson: workforce pipelines + vocational training. Goodweather: "world-class education," read by third grade.
        { id: "C", label: "Strengthen academics and career and vocational pathways", scores: { lewisgeorge: 1, mcduffie: 1, orange: 3, goodweather: 2, johnson: 3, sampath: 1, solomon: 1 } },
        // Solomon's signature education critique is changing the DCPS lottery.
        { id: "D", label: "Fix school choice and the lottery", scores: { lewisgeorge: 1, mcduffie: 1, orange: 1, goodweather: 1, johnson: 1, sampath: 1, solomon: 3 } }
      ]
    },
    {
      id: "housing",
      text: "What's the right housing strategy?",
      type: "single",
      options: [
        // Lewis George (72k + social housing) and Goodweather (50k, missing-middle) are the build-a-lot candidates.
        { id: "A", label: "Build dramatically more, including missing-middle and publicly owned social housing", scores: { lewisgeorge: 3, mcduffie: 1, orange: 1, goodweather: 3, johnson: 1, sampath: 1, solomon: 1 } },
        // McDuffie (12k + preserve + RENTAL Act) and Orange (homeownership, workforce, tiny homes) emphasize a steady pace and ownership.
        { id: "B", label: "Build at a steady pace with ownership pathways and tenant protections", scores: { lewisgeorge: 1, mcduffie: 3, orange: 3, goodweather: 1, johnson: 1, sampath: 2, solomon: 1 } },
        // Johnson (audit developers) and Sampath (enforce against bad landlords, lease existing units) focus on accountability and existing stock.
        { id: "C", label: "Crack down on bad landlords and developers and get more from existing housing", scores: { lewisgeorge: 2, mcduffie: 1, orange: 1, goodweather: 1, johnson: 3, sampath: 3, solomon: 1 } }
      ]
    },
    {
      id: "taxes",
      text: "How should DC pay for its priorities?",
      type: "single",
      options: [
        // Only Lewis George supports new progressive taxes (2021 income-tax hike, Business Activity Tax). The rest oppose new taxes.
        { id: "A", label: "Raise progressive revenue (taxes on the wealthy and corporations)", scores: { lewisgeorge: 3, mcduffie: 0, orange: 0, goodweather: 1, johnson: 0, sampath: 0, solomon: 0 } },
        // McDuffie + Orange (no new taxes, grow the base); Johnson, Solomon, Goodweather also oppose new taxes.
        { id: "B", label: "No new taxes; grow the economy and the tax base instead", scores: { lewisgeorge: 0, mcduffie: 3, orange: 3, goodweather: 2, johnson: 2, sampath: 1, solomon: 2 } },
        // Sampath (cut fees, sunset reviews) and Solomon (audit spending) lead the cut-waste-first lane; Orange's fiscal-discipline frame fits too.
        { id: "C", label: "Cut wasteful fees and audit spending before anything else", scores: { lewisgeorge: 0, mcduffie: 1, orange: 2, goodweather: 1, johnson: 1, sampath: 3, solomon: 3 } }
      ]
    },
    {
      id: "jobs",
      text: "How should the mayor grow jobs and help small businesses?",
      type: "single",
      options: [
        // Sampath ("One Business, One Portal," cut fees) and Solomon (cut red tape, oppose Initiative 82) lead the cut-burdens-for-small-business lane.
        { id: "A", label: "Cut red tape, fees, and taxes that burden small businesses", scores: { lewisgeorge: 1, mcduffie: 1, orange: 1, goodweather: 1, johnson: 1, sampath: 3, solomon: 3 } },
        // Orange's signature: keep "DC dollars within the District" by expanding Certified Business Enterprise contracting toward $2 billion.
        { id: "B", label: "Keep city dollars local: steer contracts to DC-based and small businesses", scores: { lewisgeorge: 1, mcduffie: 1, orange: 3, goodweather: 1, johnson: 1, sampath: 1, solomon: 1 } },
        // McDuffie chaired the business/economy committee and secured the Capital One Arena and RFK deals; runs on "opportunity in every ward."
        { id: "C", label: "Recruit big employers and land development deals that bring jobs", scores: { lewisgeorge: 1, mcduffie: 3, orange: 1, goodweather: 1, johnson: 1, sampath: 1, solomon: 1 } },
        // Lewis George: worker-focused economic populism with deep labor backing. Johnson: jobs without new taxes plus a 3,000-youth jobs corps.
        { id: "D", label: "Raise wages and strengthen workers and unions", scores: { lewisgeorge: 3, mcduffie: 1, orange: 1, goodweather: 1, johnson: 2, sampath: 1, solomon: 1 } },
        // Goodweather's economic lane is lowering everyday costs: a "Power DC" utility-savings plan and Fare-Free DC transit. Sampath also targets fees.
        { id: "E", label: "Lower everyday costs of living (utilities, transit, fees)", scores: { lewisgeorge: 1, mcduffie: 1, orange: 1, goodweather: 3, johnson: 1, sampath: 2, solomon: 1 } }
      ]
    },
    {
      id: "profile",
      text: "What kind of mayor do you want?",
      type: "single",
      options: [
        // Orange + McDuffie are the seasoned insiders; Lewis George also holds office.
        { id: "A", label: "A seasoned insider with a long governing record", scores: { lewisgeorge: 2, mcduffie: 3, orange: 3, goodweather: 0, johnson: 0, sampath: 0, solomon: 0 } },
        // Lewis George is the progressive change candidate.
        { id: "B", label: "A progressive willing to fight the establishment", scores: { lewisgeorge: 3, mcduffie: 0, orange: 0, goodweather: 0, johnson: 1, sampath: 0, solomon: 0 } },
        // Goodweather, Sampath, Solomon are first-time outsiders; Johnson is an anti-establishment community figure.
        { id: "C", label: "A fresh outsider who isn't a career politician", scores: { lewisgeorge: 0, mcduffie: 0, orange: 0, goodweather: 3, johnson: 2, sampath: 3, solomon: 3 } }
      ]
    },
    {
      id: "federal",
      text: "What's the right posture toward Trump and federal interference?",
      help: "Optional. Some candidates have detailed positions here and others have said little, so this mainly separates the ones who have spoken to it.",
      type: "single",
      optional: true,
      options: [
        // Lewis George ("I'm not complying in advance") and Sampath (won't cooperate with a federal MPD takeover or ICE; calls Bowser too quick to appease) have documented confrontational stances. Solomon has no documented federal plank (neutral 1).
        { id: "A", label: "Confrontational: refuse to comply in advance and draw clear lines", scores: { lewisgeorge: 3, mcduffie: 1, orange: 0, goodweather: 1, johnson: 1, sampath: 2, solomon: 1 } },
        // Orange ("not negotiate in fear, nor fear to negotiate") and McDuffie (strategic) favor pragmatic defense of home rule; Goodweather opposes federal seizure of policing.
        { id: "B", label: "Pragmatic: protect home rule and pursue statehood through negotiation", scores: { lewisgeorge: 1, mcduffie: 3, orange: 3, goodweather: 2, johnson: 1, sampath: 1, solomon: 1 } }
      ]
    }
  ],
  tradeoffs: [
    {
      id: "outsider-cluster",
      when: [["profile", "C"], ["ambition", "C"]],
      text:
        "You're drawn to a fix-the-basics outsider. Three candidates share that lane, Rini Sampath, Hope Solomon, and (as a build-more outsider) Gary Goodweather, so your top matches may sit close together. Their platforms differ in depth: Sampath's is the most detailed, Solomon's is the thinnest. Open each to compare before you rank."
    }
  ],
  rcvNote:
    "This race uses ranked-choice voting and the field is large, so you can rank up to five candidates. Rank everyone you'd genuinely be glad to see win, in your order of preference. By fundraising and polling it has looked like a close contest at the top between Lewis George and McDuffie, so if your first choice is one of the others, your second and third choices can still matter. Ranking a later choice never hurts your first.",
  notCovered: {
    note:
      "Three more people qualified only as write-in candidates and will not appear on the printed ballot:",
    others: ["Yaida Ford", "Talib Karim Muhammad", "Melodie Shuler"],
    links: [
      { label: "DC Board of Elections certified candidate list", url: "https://www.dcboe.org/getmedia/7f585e7c-887c-42c5-988f-9a9c59ba9020/2026-PRIMARY-CANDIDATES-02022026.pdf" },
      { label: "The 51st, DCision2026 mayoral coverage", url: "https://51st.news/washington-dc-2026-primary-election-june-16-mayor-council/" }
    ]
  }
};
