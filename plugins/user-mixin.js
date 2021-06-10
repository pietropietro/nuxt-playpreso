import Vue from 'vue'

Vue.mixin({
    computed:{
        currentUser(){
            return  this.$store.state.user.currentUser;
        }
    },
    methods:{
        async login(username, password){
            let values = [
                {'action' : "logIn"},
                {'username': username},
                {'password': password}
            ]
            let response = await this.$api.call(values);
            if(response?.user?.username){
                this.$store.commit('user/updateCurrentUser', { currentUser: response.user});
                this.$store.commit('user/updateToken', { token: response.token});
            }
        },
        async register(username, password, emailAdd){
            let values = [
                {'action' : "signUp"},
                {'username': username},
                {'password': password},
                {'emailAdd': emailAdd}
            ]
            let response = await this.$api.call(values);
            if(response?.user?.username){
                this.$store.commit('user/updateCurrentUser', { currentUser: response.user});
                this.$store.commit('user/updateToken', { token: response.token});
            }
        },
        logout(){
            this.$store.commit('user/updateCurrentUser', { currentUser: null});
            this.$store.commit('user/updateToken', { token: null});
            this.$router.push('/');
        }
    }
})