// DC Attorney General, Democratic primary.
// Researched from authoritative reporting (WTOP
// candidate Q&As, HillRag, The 51st, campaign sites, OAG releases). Every
// candidate claim is sourced. The questions and scoring below were constructed
// by this guide from the candidates' documented positions, not from the source
// guide, see the methodology page. Coverage is asymmetric: the incumbent's
// record is far better documented than the challenger's.

const SRC_SCHWALB = { label: "WTOP candidate Q&A; OAG releases; HillRag (June 5, 2026)", url: "https://wtop.com/dc-election/2026/06/get-to-know-dc-attorney-general-candidate-brian-schwalb/" };
const SRC_SZYM = { label: "WTOP candidate Q&A; HillRag (June 5, 2026); jp4dc.com", url: "https://wtop.com/dc-election/2026/06/get-to-know-dc-attorney-general-candidate-jp-szymkowicz/" };

export const ag = {
  id: "ag",
  group: "citywide",
  title: "Attorney General",
  shortTitle: "Attorney General",
  ballot: "Democratic primary",
  allVoters: false,
  rcv: true,
  coverage: "researched",
  coverageNote:
    "This race was researched from local reporting and the candidates' own materials, and every claim links to its source. Coverage is uneven: incumbent Brian Schwalb has a long public record, while challenger J.P. Szymkowicz is more thinly documented, so we score what's documented and say where it's thin.",
  seat: "Incumbent Brian Schwalb, elected in 2022, seeks a second term against challenger J.P. Szymkowicz.",
  overview:
    "The DC Attorney General is the city's independently elected top lawyer: consumer protection, antitrust, housing and wage enforcement, juvenile and lower-level prosecutions, and defending DC's autonomy in court. (Most adult criminal cases are handled by the federally appointed U.S. Attorney, not the AG.)",
  stakes:
    "The contest turns on one real disagreement: how broadly to define the office, and how aggressively to prosecute, especially juveniles. That sits on top of a contested debate about whether DC's crime is at historic lows or in crisis.",
  map: {
    x: { label: "Enforcement posture", left: "Prosecutorial discretion", right: "Maximum enforcement" },
    y: { label: "Scope of the office", low: "Crime focus", high: "Broad mandate" },
    note: "Positions are drawn from each candidate's documented statements. Open a candidate for the evidence."
  },
  candidates: [
    {
      id: "schwalb",
      name: "Brian Schwalb",
      age: 58,
      neighborhood: "Chevy Chase",
      role: "DC Attorney General (incumbent, since 2023)",
      background:
        "Third-generation Washingtonian and roughly 30-year trial lawyer; former partner-in-charge of Venable LLP's DC office and earlier a DOJ trial attorney. Running through DC's Fair Elections public-financing program.",
      pos: [-0.5, 0.7],
      tagline: "Broad mandate · discretion · incumbent record",
      inferredLean:
        "Mainstream progressive Democrat. Antitrust/consumer enforcement, wage-theft and housing enforcement, an anti-Trump litigation posture, and a labor + Working Families Party + Sierra Club endorsement base. (Inferred.)",
      priorities: [
        "A safer, stronger, and more affordable DC",
        "Enforce wage-theft, antitrust, consumer-protection, and housing laws against \"powerful interests and bad actors\"",
        "Defend DC's Home Rule and autonomy against unlawful federal interference"
      ],
      positions: [
        "Juvenile justice: \"careful balancing of accountability, rehabilitation, fairness, and public safety\"; prosecuting every juvenile case \"is not what the law requires, [n]or what we want\"",
        "Says his office prosecuted 85% of cases police brought",
        "Took on Amazon, TikTok, Meta, Google, Live Nation, and StubHub; reached a $9.9M Live Nation settlement over deceptive ticket pricing",
        "Sued the Trump administration in 2025 to stop a federal takeover of MPD and to end the National Guard deployment",
        "Investigating conservative activist Leonard Leo's donor network (House Republicans opened a counter-inquiry)"
      ],
      endorsements: [
        "Labor: SEIU 32BJ, UNITE HERE Local 25, Metro Washington Council AFL-CIO, Washington Teachers' Union, and the building trades",
        "Working Families Party, Sierra Club, Jews United for Justice Campaign Fund, DC Latino Caucus, Capital Stonewall Democrats, DC NOW",
        "Moms Demand Action 2026 Gun Sense Candidate distinction"
      ],
      strengths: [
        "A documented record across consumer, antitrust, housing, and federal-pushback litigation",
        "Deep, broad endorsement base, especially labor",
        "Frames the office as more than a criminal prosecutor"
      ],
      weaknesses: [
        "Missed or had conflicts for several candidate forums",
        "The \"crime at a 30-year low\" framing he runs on is contested (see race context)"
      ],
      flags: [],
      source: SRC_SCHWALB
    },
    {
      id: "szymkowicz",
      name: "J.P. Szymkowicz",
      age: null,
      neighborhood: "Foxhall Village (Ward 3)",
      role: "Four-term Advisory Neighborhood Commissioner; practicing attorney",
      background:
        "Fifth-generation Washingtonian who began in the Prince George's County State's Attorney's juvenile division, then 30+ years in private practice at the family firm. Running a low-budget, change-focused campaign centered on crime.",
      pos: [0.6, -0.7],
      tagline: "Crime-first · maximal prosecution · change",
      inferredLean:
        "Public-safety-first Democrat, to Schwalb's right on criminal enforcement. He keeps conventional Democratic consumer and tenant positions, so this is a law-and-order emphasis within the primary, not a cross-party shift. (Inferred.)",
      priorities: [
        "Crime, overwhelmingly: \"Fighting crime is my number one, two and three priority\"",
        "Frames DC as in a \"crime crisis\" throughout Schwalb's tenure",
        "Consumer protection against predatory landlords and contractors"
      ],
      positions: [
        "Would \"prosecute EVERY case where the facts and law reveal that the defendant committed a criminal offense\"",
        "Would charge parents with \"contributing to the delinquency of a minor\" and relax juvenile-record privacy for victims",
        "Wants to amend the Home Rule Act to expand the AG's prosecution authority beyond juvenile and misdemeanor cases",
        "Ties crime to MPD staffing shortages; wants more resources to hire and support officers",
        "Entered partly over pedestrian/cyclist deaths; would pull vehicles with unpaid violations off the streets"
      ],
      endorsements: ["Not documented in available sources."],
      strengths: [
        "A clear, single-minded public-safety message",
        "Long courtroom experience as a practicing litigator",
        "Offers voters a sharp contrast to the incumbent's approach"
      ],
      weaknesses: [
        "Running a low-budget campaign, far outraised by the incumbent's publicly-financed war chest, and lightly documented",
        "No documented endorsements",
        "\"Prosecute every case\" would be a major shift in prosecutorial discretion"
      ],
      flags: [],
      source: SRC_SZYM
    }
  ],
  questions: [
    {
      id: "scope",
      text: "What should DC's Attorney General focus on most?",
      type: "single",
      options: [
        { id: "A", label: "A broad mandate: consumer protection, antitrust, housing, and labor enforcement, plus crime", scores: { schwalb: 3, szymkowicz: 1 } },
        { id: "B", label: "Crime, first and foremost", scores: { schwalb: 1, szymkowicz: 3 } },
        { id: "C", label: "Standing up to federal and Trump-administration overreach in court", scores: { schwalb: 3, szymkowicz: 2 } }
      ]
    },
    {
      id: "prosecution",
      text: "How should the AG handle juvenile and lower-level offenses?",
      type: "single",
      options: [
        { id: "A", label: "Use discretion: diversion and restorative justice for non-violent cases, prosecute the serious ones", scores: { schwalb: 3, szymkowicz: 0 } },
        { id: "B", label: "Prosecute every case the facts support, with tougher consequences", scores: { schwalb: 0, szymkowicz: 3 } }
      ]
    },
    {
      id: "change",
      text: "Incumbent record, or a change in direction?",
      type: "single",
      options: [
        { id: "A", label: "Keep the experienced incumbent with a track record", scores: { schwalb: 3, szymkowicz: 0 } },
        { id: "B", label: "Bring in a new, crime-focused approach", scores: { schwalb: 0, szymkowicz: 3 } }
      ]
    },
    {
      id: "federal",
      text: "How should the AG push back on federal overreach in DC?",
      type: "single",
      options: [
        // Schwalb has an active litigation record (suing over the MPD takeover and National Guard deployment).
        { id: "A", label: "Aggressive litigation against the administration", scores: { schwalb: 3, szymkowicz: 1 } },
        // Szymkowicz wants to amend the Home Rule Act to expand the locally elected AG's prosecution authority.
        { id: "B", label: "Reform the law to expand the elected AG's local authority", scores: { schwalb: 1, szymkowicz: 3 } }
      ]
    }
  ],
  tradeoffs: [],
  rcvNote:
    "This race uses ranked-choice voting, but with only two candidates a first choice is usually enough. You can still rank a second if you'd accept either.",
  raceContext: {
    title: "Context: the contested crime numbers",
    text:
      "Schwalb argues there's \"no crime emergency,\" citing violent crime at a 30-year low and down 26% year-over-year (corroborated by MPD year-end data and the U.S. Attorney's office). A December 2025 House Oversight report and a DOJ draft, however, alleged MPD leadership manipulated crime classifications, making some reported declines unreliable; the police chief resigned. Szymkowicz argues DC has been in a \"crime crisis\" throughout Schwalb's tenure. Both points are real; weigh them yourself.",
    sources: [
      { label: "DOJ / USAO-DC, violent crime hits 30-year low", url: "https://www.justice.gov/usao-dc/pr/violent-crime-dc-hits-30-year-low" },
      { label: "WUSA9, questions over MPD crime-data integrity", url: "https://www.wusa9.com/article/news/local/dc/doj-draft-accuses-dc-police-of-manipulating-crime-data-amid-chief-smiths-sudden-resignation-crime/65-b9462d84-62aa-4414-86a0-19613b39152e" }
    ]
  }
};
