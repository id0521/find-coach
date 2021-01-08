import axios from 'axios';

export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;

    const token = context.rootGetters.token;

    await axios.put(
      `https://vue-http-demo-59296-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,
      payload
    );

    const coachData = { ...payload, id: userId };

    context.commit('registerCoach', coachData);
  },
  async getCoaches(context) {
    const response = await axios.get(
      `https://vue-http-demo-59296-default-rtdb.firebaseio.com/coaches.json`
    );
    const coaches = [];
    const data = response.data;

    for (const key in data) {
      const coach = {
        ...data[key],
        id: key
      };

      coaches.push(coach);
    }
    context.commit('getCoaches', coaches);
    context.commit('setFetchTime');
  }
};
