export default ({ app, store }, inject) => {
	inject('notifier', {
		// showMessage ( content = '', color = ''  ) {
		// 	store.commit('snackbar/showMessage', { content, color })
		// },
		showError () {
			store.commit('snackbar/showMessage', { content: 'error', color: 'red' })
		}
	})
}