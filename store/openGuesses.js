export const state = () => ({
    list: [],
    currentIndex: null,
  });
  
  export const mutations = {
    setList(state, newList) {
      state.list = newList;
    },
    setCurrentIndex(state, newIndex) {
      state.currentIndex = newIndex;
    },
    setCurrentGuess(state, guess) {
      state.list[state.currentIndex] = guess;
    },
    clear(state) {
        state.list = [];
        state.currentIndex = null;
    },
    changeIndex(state, direction) {
        if (direction === 'increase' && state.currentIndex < state.list.length - 1) {
            state.currentIndex++;
        } else if (direction === 'decrease' && state.currentIndex > 0) {
            state.currentIndex--;
        }
    }
  };
  
  export const actions = {
    clear({ commit }) {
      commit('clear');
    },
    updateList({ commit }, payload) {
      commit('setList', payload?.newList ?? []);
    },
    updateCurrentIndex({ commit }, payload) {
      commit('setCurrentIndex', payload?.newIndex ?? null);
    },
    updateCurrentGuess({ commit }, payload) {
      commit('setCurrentGuess', payload?.guess ?? null);
    },
    update({ commit, state }, payload) {
      commit('setList', payload?.newList ?? state.list);
      const guessIndex = state.list.findIndex(guess => guess.id === payload.newGuess.id);
      commit('setCurrentIndex', guessIndex);
    },
    //direction = increase or decreas
    changeIndex({ commit }, direction) {
        commit('changeIndex', direction);
    }
  };
  
  export const getters = {
    currentGuess: (state) => {
      return state.list[state.currentIndex] || null;
    },
    currentGuessList: (state) => {
      return state.list || null;
    }
  };