export const state = () => ({
	currentUser: null,
	token: null
})

export const mutations = {
	updateCurrentUser (state, payload) {
		state.currentUser = payload.currentUser;
	},

    updateToken (state, payload) {
		state.token = payload.token
	},
}
