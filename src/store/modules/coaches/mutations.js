export default {
  registerCoach(state, payload) {
    state.coaches.push(payload);
  },
  getCoaches(state, payload) {
    state.coaches = payload;
  },
  setFetchTime(state) {
    state.lastFetch = new Date().getTime();
  }
};
