export default {
  addRequest(state, payload) {
    state.requests.push(payload);
  },
  getRequests(state, payload) {
    state.requests = payload;
  }
};
