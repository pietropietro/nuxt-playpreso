// store/index.js

export const state = () => ({
    refreshFlag: 0
  });
  
  export const mutations = {
    incrementRefreshFlag(state) {
      state.refreshFlag += 1;
    }
  };
  
  export const actions = {
    async triggerDataRefresh({ commit }) {
      commit('incrementRefreshFlag');
    }
  };
  
  export const getters = {
    refreshFlag: (state) => state.refreshFlag
  };
  