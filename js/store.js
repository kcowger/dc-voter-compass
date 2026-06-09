// App state. Persisted to localStorage ONLY, nothing is ever sent anywhere.
// Holds which races you picked, your answers, candidates you've set aside, and
// your ward. Clearable from the UI.

const KEY = "dcvg.v1";
const DEFAULT = { selectedRaceIds: [], answers: {}, excluded: {}, ward: null };

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && typeof s === "object" && !Array.isArray(s)) {
      const merged = { ...structuredClone(DEFAULT), ...s };
      // Coerce each field to its expected shape; tolerate hand-edited/corrupt storage.
      const obj = (v) => (v && typeof v === "object" && !Array.isArray(v)) ? v : {};
      merged.answers = obj(merged.answers);
      merged.excluded = obj(merged.excluded);
      if (!Array.isArray(merged.selectedRaceIds)) merged.selectedRaceIds = [];
      return merged;
    }
  } catch (e) { /* ignore corrupt/unavailable storage */ }
  return structuredClone(DEFAULT);
}

let state = load();
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* private mode etc. */ }
}

export const store = {
  get state() { return state; },

  getAnswers(rid) { return state.answers[rid] || {}; },
  setAnswer(rid, qid, val) {
    if (!state.answers[rid]) state.answers[rid] = {};
    if (val == null || (Array.isArray(val) && val.length === 0)) delete state.answers[rid][qid];
    else state.answers[rid][qid] = val;
    save();
  },
  hasAnswers(rid) { return Object.keys(state.answers[rid] || {}).length > 0; },

  getExcluded(rid) { return state.excluded[rid] || []; },
  isExcluded(rid, cid) { return (state.excluded[rid] || []).includes(cid); },
  toggleExcluded(rid, cid) {
    const set = new Set(state.excluded[rid] || []);
    set.has(cid) ? set.delete(cid) : set.add(cid);
    state.excluded[rid] = [...set];
    save();
    return set.has(cid);
  },

  isSelected(rid) { return state.selectedRaceIds.includes(rid); },
  toggleSelected(rid) {
    const set = new Set(state.selectedRaceIds);
    set.has(rid) ? set.delete(rid) : set.add(rid);
    state.selectedRaceIds = [...set];
    save();
    return set.has(rid);
  },
  setSelected(ids) { state.selectedRaceIds = [...new Set(ids)]; save(); },

  get ward() { return state.ward; },
  setWard(w) { state.ward = w; save(); },

  resetRace(rid) { delete state.answers[rid]; delete state.excluded[rid]; save(); },
  resetAll() { state = structuredClone(DEFAULT); save(); }
};
