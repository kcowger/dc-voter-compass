// Aggregates every race module and defines ballot grouping and ordering.
//
// Coverage levels (shown to users and explained on the methodology page):
//   "full"      , questions and scoring come directly from the source guide
//                  (The 51st DCision2026 series): Mayor, Delegate, both At-Large races.
//   "partial"   , limited to the well-documented front-runners (Mayor).
//   "researched", questions and scoring were constructed by this guide from
//                  sourced candidate positions (AG, Ward 1, Ward 5, Ward 6).
//
// RACE DATA SCHEMA (per race object):
//   id, group, title, shortTitle, ballot, allVoters(bool), rcv(bool),
//   coverage, coverageNote?, seat, overview, stakes,
//   map: { x:{label,left,right}, y:{label,low,high}, note, links?:[{a,b,label}] },
//   candidates: [{ id, name, chipName?(short map label for compound surnames),
//                  age|null, neighborhood, role, background, pos:[x,y],
//                  tagline, inferredLean, priorities[], positions[], endorsements[],
//                  strengths[], weaknesses[], flags:[{id,label,detail}],
//                  crossEndorse?, source:{label,url} }],
//   questions: [{ id, text, help?, type:'single'|'multi', max?, optional?,
//                 options:[{ id, label, scores:{candidateId:number} }] }],
//   tradeoffs: [{ id, when:[[qid,optId],...], text }],
//   rcvNote, comparison?, crossEndorsement?, raceContext?, notCovered?

import { mayor } from "./mayor.js";
import { ag } from "./ag.js";
import { delegate } from "./delegate.js";
import { atlargeDem } from "./atlarge-dem.js";
import { atlargeSpecial } from "./atlarge-special.js";
import { ward1 } from "./ward1.js";
import { ward5 } from "./ward5.js";
import { ward6 } from "./ward6.js";

export const RACES = [
  mayor,
  ag,
  atlargeDem,
  delegate,
  ward1,
  ward5,
  ward6,
  atlargeSpecial
];

export const RACE_MAP = RACES.reduce((m, r) => {
  m[r.id] = r;
  return m;
}, {});

// Logical groups for the race-selection screen.
export const GROUPS = [
  {
    id: "citywide",
    title: "Citywide races",
    blurb: "Every Democratic primary voter in DC votes on these.",
    raceIds: ["mayor", "ag", "atlarge-dem"]
  },
  {
    id: "special",
    title: "Special election, all voters",
    blurb: "Open to every registered DC voter, regardless of party. It sits separately on the ballot and is easy to miss.",
    raceIds: ["atlarge-special"]
  },
  {
    id: "ward",
    title: "Your ward's Council seat",
    blurb: "Only Wards 1, 5, and 6 have a contested Council primary this year. (Ward 3's seat is uncontested; Wards 2, 4, 7, and 8 are not on the ballot this cycle.)",
    raceIds: ["ward1", "ward5", "ward6"],
    wardPicker: true
  },
  {
    id: "federal",
    title: "Statehood & Congress",
    blurb: "DC's non-voting voices in Washington.",
    raceIds: ["delegate"]
  }
];

// Contested races this tool does not make interactive, listed for honesty so a
// voter knows the full picture. Each is verified against the cited sources.
export const UNCONTESTED = [
  {
    office: "Council Chairman",
    winner: "Phil Mendelson",
    note: "The incumbent chairman is running unopposed in the Democratic primary (a write-in challenger filed).",
    source: { label: "The 51st 2026 voter guide; DC Board of Elections", url: "https://51st.news/washington-dc-2026-primary-election-june-16-mayor-council/" }
  },
  {
    office: "Council, Ward 3",
    winner: "Matt Frumin",
    note: "The incumbent is running unopposed in the Democratic primary.",
    source: { label: "Wikipedia, 2026 DC Council election; DC Board of Elections", url: "https://en.wikipedia.org/wiki/2026_Council_of_the_District_of_Columbia_election" }
  },
  {
    office: "U.S. Shadow Representative",
    winner: "Franklin Garcia",
    note: "An open statehood-advocacy seat (incumbent Oye Owolewa is running for Council instead). Franklin Garcia, who held the role from 2015–2021, is the only candidate on the ballot.",
    source: { label: "DC Board of Elections; Wikipedia; Ballotpedia", url: "https://ballotpedia.org/Franklin_Garcia" }
  },
  {
    office: "U.S. Shadow Senator",
    winner: "Paul Strauss",
    note: "The incumbent statehood-advocacy senator runs unopposed after challenger Markus Batchelor reportedly fell about 70 signatures short of qualifying for the ballot.",
    source: { label: "DC Board of Elections candidate list; reporting on the petition shortfall", url: "https://ballotpedia.org/United_States_Senate_election_in_the_District_of_Columbia,_2026" }
  }
];
