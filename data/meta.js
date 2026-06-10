// Site-wide metadata, voting logistics, and sourcing.
// Every factual claim here is verified against the cited sources.
// Last verified: 2026-06-08.

export const ELECTION = {
  dateLabel: "Tuesday, June 16, 2026",
  dateISO: "2026-06-16",
  pollHours: "7:00 a.m. to 8:00 p.m.",
  // Verified: Initiative 83 upheld in court June 2, 2026; Council funded RCV
  // (but not open primaries). Voters rank up to 5 candidates per office.
  rcvMax: 5,
  facts: [
    {
      text: "DC mails a ballot to every registered voter. You can fill it out at home and mail it back (postmark by June 16, must arrive by June 26), drop it at a ballot box by 8 p.m. on June 16, or vote in person during early voting (June 8 to 14) or on June 16.",
      source: { label: "ACLU of DC, How to Vote in the June 2026 DC Primary", url: "https://www.acludc.org/how-to-vote-in-the-june-2026-dc-primary-election/" }
    },
    {
      text: "This is the first DC election to use ranked-choice voting (RCV). For each office, you can rank up to five candidates in order of preference.",
      source: { label: "Washingtonian, “Your Guide to Ranked Choice Voting in the DC Primaries”", url: "https://washingtonian.com/2026/05/29/your-guide-to-ranked-choice-voting-in-the-dc-primaries/" }
    },
    {
      text: "RCV took effect through Initiative 83, which DC voters passed in November 2024 and a court upheld on June 2, 2026.",
      source: { label: "Campaign Legal Center, ranked-choice voting upheld in DC", url: "https://campaignlegal.org/press-releases/victory-dc-voters-ranked-choice-voting-semi-open-primaries-upheld-district" }
    },
    {
      text: "The party primaries are closed: you must be registered with a party to vote in its primary. Initiative 83's open-primary provision was not funded for 2026.",
      source: { label: "ACLU of DC, How to Vote in the June 2026 DC Primary", url: "https://www.acludc.org/how-to-vote-in-the-june-2026-dc-primary-election/" }
    },
    {
      text: "The At-Large Council special election is open to ALL registered DC voters, regardless of party. It appears separately on the ballot and is easy to miss.",
      source: { label: "TheDCLine, “Everyone can vote in the special election on June 16”", url: "https://thedcline.org/2026/05/22/jonetta-rose-barras-everyone-can-vote-in-the-special-election-on-june-16-regardless-of-party-or-nonparty/" }
    }
  ],
  // Authoritative resources surfaced to users for anything beyond this guide.
  resources: [
    { label: "DC Board of Elections, official voter information", url: "https://www.dcboe.org/" },
    { label: "The 51st, DCision2026 voter guide", url: "https://51st.news/washington-dc-2026-primary-election-june-16-mayor-council/" },
    { label: "ACLU of DC, 2026 Primary Voter Hub", url: "https://www.acludc.org/2026-d-c-primary-election-voter-hub/" }
  ]
};

// How this guide defines and ranks evidence. Shown on the methodology page.
export const EVIDENCE_HIERARCHY = [
  "Direct quotes from the candidate in published interviews",
  "Recorded votes and legislative records (DC Council)",
  "Endorsement lists reported by reputable local outlets",
  "Past employment or affiliations",
  "Stated priorities in published candidate profiles",
  "Inferred positions based on the above, always flagged as inferred"
];

export const NEVER_INCLUDED = [
  "Made-up endorsements, quotes, or positions",
  "Positions inferred from a candidate's demographic background",
  "Speculation about hypotheticals a candidate has not addressed"
];

// Primary sources, shown on the methodology page.
export const SOURCES = [
  { label: "The 51st, “Meet the candidates running to be D.C.'s delegate to Congress” (May 11, 2026)", url: "https://51st.news/" },
  { label: "The 51st, “Meet the candidates for an At-Large seat on the D.C. Council” (May 14, 2026)", url: "https://51st.news/" },
  { label: "The 51st, “Meet the candidates running in the D.C. Council At-Large special election” (May 21, 2026)", url: "https://51st.news/dc-council-at-large-special-election-candidates-interview/" },
  { label: "DC Council legislative records (lims.dccouncil.gov)", url: "https://lims.dccouncil.gov/" },
  { label: "Washington Post, WAMU/DCist, Axios DC, WJLA, WTOP, race reporting", url: "https://www.washingtonpost.com/dc-md-va/" }
];

// The public repository (linked in the footer and methodology) and the date
// candidate data was last reviewed claim-by-claim against sources.
export const REPO_URL = "https://github.com/kcowger/dc-voter-compass";
export const DATA_VERIFIED = "June 9, 2026";

export const DISCLAIMER = {
  independence: "This is an independent, open-source tool. It is not affiliated with, authorized by, or funded by any candidate, campaign, party, or government body.",
  purpose: "It helps you see which candidates align with your stated priorities, with the evidence shown for every claim. It is a starting point, not a substitute for reading candidates' own materials.",
  accuracy: "Candidate positions change and reporting evolves. Verify anything important against the candidate's own materials and the DC Board of Elections before you vote.",
  contact: "Found an error? This guide is open source, corrections are welcome via the project repository."
};
