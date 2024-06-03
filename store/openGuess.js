export const state = () => ({
    guess: null,
})

export const mutations = {
    setGuess(state, newGuess) {
        state.guess = newGuess;
    },
}

export const actions = {
    update({ commit }, payload) {
        commit('setGuess', payload?.newGuess ?? null);
    },
};