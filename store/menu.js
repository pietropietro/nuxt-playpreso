export const state = () => ({
    menuFlag: false,
  });
  
  export const mutations = {
    setMenu(state, newVal) {
      state.menuFlag = newVal;
    },
  };
  
  export const actions = {
    updateMenu({ commit }, payload) {
      commit('setMenu', payload?.newVal ?? false);
    },
  };
  
  export const getters = {
    currentMenuFlag: (state) => {
      return state.menuFlag || null;
    }
  };