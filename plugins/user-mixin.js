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
        async login(username, password){
            let values = [
                {'username': username},
                {'password': password}
            ]
            let response = await this.$api.call(this.API_ROUTES.LOGIN, values, 'POST');
            if(response && response.status === "success"){
                this.$store.commit('user/updateCurrentUser', { currentUser: response.message.user});
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
                this.$notifier.showSuccess(this.$t('user.created'));
                this.$router.push(this.ROUTES.LOGIN);          
            }
        },
    }
})