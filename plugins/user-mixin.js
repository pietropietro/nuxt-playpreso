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
                {'username': username},
                {'password': password}
            ]
            let response = await this.$api.call('/login', values, 'POST');
            if(response?.user?.username){
                this.$store.commit('user/updateCurrentUser', { currentUser: response.user});
                this.$store.commit('user/updateToken', { token: response.token});
            }
        },

        async register(username, password, email){
            let values = [
                {'username': username},
                {'password': password},
                {'email': email}
            ]
            let response = await this.$api.call('/users', values, 'POST');
            if(response?.user?.username){
                this.$router.push();            }
        },
        logout(){
            this.$store.commit('user/updateCurrentUser', { currentUser: null});
            this.$store.commit('user/updateToken', { token: null});
            this.$router.push('/');
        }
    }
})