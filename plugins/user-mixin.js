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
            let response = await this.$api.call(this.API_ROUTES.LOGIN, values, 'POST');
            if(response.status === "success"){
                this.$store.commit('user/updateCurrentUser', { currentUser: response.message.user});
                this.$store.commit('user/updateToken', { token: response.message.authorization});
                this.$router.push(this.ROUTES.HOME);          
            }
        },

        async register(username, password, email){
            let values = [
                {'username': username},
                {'password': password},
                {'email': email}
            ]
            let response = await this.$api.call(this.API_ROUTES.REGISTER, values, 'POST');
            if(response.status === "success"){
                this.$notifier.showSuccess("creato");
                this.$router.push(this.ROUTES.LOGIN);          
            }
        },

        logout(){
            this.$store.commit('user/updateCurrentUser', { currentUser: null});
            this.$store.commit('user/updateToken', { token: null});
            this.$router.push('/');
        }
    }
})