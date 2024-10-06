export default ({app, store},inject) => {
	inject('logout', {
        async logout(){
            if(store.state.user.currentUser == null && store.state.user.token == null)  return;
            await app.$pushNotificationsPlugin.removeNotificationTokenFromServer();
            store.commit('user/updateNotificationToken', { notificationToken: null});
            store.commit('user/updateCurrentUser', { currentUser: null});
            store.commit('user/updateToken', { token: null});
            store.commit('user/updatePoints', { points: null});
            app.router.push('/');
        }
    })
}