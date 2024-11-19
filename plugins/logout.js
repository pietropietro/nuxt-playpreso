export default ({app, store},inject) => {
	inject('logout', {
        async logout(){
            if(store.state.user.currentUser == null && store.state.user.token == null)  return;
            await app.$pushNotificationsPlugin.removeNotificationTokenFromServer();
            store.commit('user/clearUser');
            app.router.push('/');
        }
    })
}