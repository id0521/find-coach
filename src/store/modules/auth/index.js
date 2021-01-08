import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export default {
  state() {
    return {
      userId: null,
      token: null,
      autoLogout: true
    };
  },
  mutations,
  actions,
  getters
};
