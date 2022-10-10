import Vue from 'vue'

Vue.mixin({
    computed:{
        currentUser(){
            return  this.$store.state.user.currentUser ?? null;;
        },
        currentPoints(){
            return  this.$store.state.user.points ?? null;;
        }
    },
    methods:{
        async userLogin(username, password){
            let values = [
                {'username': username},
                {'password': password}
            ]
            let response = await this.$api.call(this.API_ROUTES.USER.LOGIN, values, 'POST', true);
            if(response && response.status === "success"){
                this.$store.commit('user/updateCurrentUser', { currentUser: response.message.user});
                this.$router.push(this.ROUTES.HOME);          
            }
        },

        async userSignUp(username, password, email){
            let values = [
                {'username': username},
                {'password': password},
                {'email': email}
            ]
            let response = await this.$api.call(this.API_ROUTES.USER.SIGNUP, values, 'POST', true);
            if(response.status === "success"){
                this.$notifier.showSuccess(this.$t('user.created'));
                this.$router.push(this.ROUTES.LOGIN);          
            }
        },
    }
})