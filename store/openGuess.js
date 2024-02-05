export const state = () => ({
    guess: null,
    match: null,
    ppTournamentType: null,
})

export const mutations = {
    setGuess(state, newGuess) {
        state.guess = newGuess;
    },
    setMatch(state, newMatch) {
        state.match = newMatch;
    },
    setPPTournamentType(state, newPPTournamentType) {
        state.ppTournamentType = newPPTournamentType;
    },
}

export const actions = {
    update({ commit }, payload) {
        commit('setGuess', payload?.newGuess ?? null);
        commit('setMatch', payload?.newMatch ?? null);
        commit('setPPTournamentType', payload?.newPPTournamentType ?? null);
    },
};