export const state = () => ({
	currentUser: null,
	token: null
})

export const mutations = {
	updateCurrentUser (state, payload) {
        console.log("bef state curr user is ", state.currentUser);
		state.currentUser = payload.currentUser;
        console.log("after state curr user is ", state.currentUser);
	},

    updateToken (state, payload) {
		state.token = payload.token
	},
}
