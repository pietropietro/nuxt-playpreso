export default ({ app, store }, inject) => {
	inject('notifier', {
		showSuccess ( content = 'SUCCESS', color = 'green'  ) {
			store.commit('snackbar/showMessage', { content, color })
		},
		showError (content =  'error') {
			store.commit('snackbar/showMessage', { content, color: 'red' })
		}
	})
}