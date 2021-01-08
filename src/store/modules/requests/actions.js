import axios from 'axios';

export default {
  async addRequest(context, payload) {
    const newRequest = {
      ...payload
    };

    const res = await axios.post(
      `https://vue-http-demo-59296-default-rtdb.firebaseio.com/requests/${newRequest.coachId}.json`,
      newRequest
    );

    newRequest.id = res.data.name;

    context.commit('addRequest', newRequest);
  },
  async getRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await axios.get(
      `https://vue-http-demo-59296-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`
    );

    const data = response.data;
    const reqs = [];
    for (const key in data) {
      const req = {
        id: key,
        ...data[key]
      };
      reqs.push(req);
    }

    context.commit('getRequests', reqs);
  }
};
