export default ({app, store},inject) => {
	inject('logout', {
        async logout(){
            await app.$pushNotificationsPlugin.removeNotificationTokenFromServer();
            store.commit('user/clearUser');
            app.router.push('/login');
        }
    })
}