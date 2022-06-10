export default ({app, store},inject) => {
	inject('logout', {
        logout(){
            store.commit('user/updateCurrentUser', { currentUser: null});
            store.commit('user/updateToken', { token: null});
            app.router.push('/');
        }
    })
}