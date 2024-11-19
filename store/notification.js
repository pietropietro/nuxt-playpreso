export const state = () => ({
	pushToken: null,
	unreadCount: 0
})

export const mutations = {
	updatePushToken(state, payload){
		state.pushToken = payload.pushToken
	},
	updateUnreadCount(state, payload){
		state.unreadCount = payload.unreadCount
	}
}
