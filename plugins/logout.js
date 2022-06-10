export default ({store, router},inject) => {
	inject('logout', {
        logout(){
            store.commit('user/updateCurrentUser', { currentUser: null});
            store.commit('user/updateToken', { token: null});
            router.push('/');
        }
    })
}