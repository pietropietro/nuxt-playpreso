// in vue 2.7 when the full view guess is closed
//the underneath view is not remounted, so we need a centralized
//trigger to refresh various data

export const state = () => ({
	guessesFlag: 0,
	motdFlag:0
});

export const mutations = {
	incrementGuessesFlag(state) {
		state.guessesFlag += 1;
	},
	incrementMotdFlag(state) {
		state.motdFlag += 1;
	}
};

export const actions = {
	async triggerGuesses({ commit }) {
		commit('incrementGuessesFlag');
	},
	async triggerMotd({ commit }) {
		commit('incrementMotdFlag');
	}
};

export const getters = {
	guesses: (state) => state.guessesFlag,
	motd: (state) => state.motdFlag
};
