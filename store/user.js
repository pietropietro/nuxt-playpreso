export const state = () => ({
	currentUser: null,
	token: null,
	points: null
})

export const mutations = {
	updateCurrentUser (state, payload) {
		state.currentUser = payload.currentUser;
	},

    updateToken (state, payload) {
		state.token = payload.token
	},

	updatePoints (state, payload) {
		state.points = payload.points
	},
}
