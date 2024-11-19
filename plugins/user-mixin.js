import Vue from 'vue'


Vue.mixin({
    computed:{
        currentUser() {
            let fromStore =  this.$store.getters['user/getCurrentUser'];
            if(fromStore.id){
                return fromStore;
            }
            return null;
        }   
    },
    methods:{
        async userLogin(username, password){
            let values = {
                'username': username,
                'password': password
            }
            
            let response = await this.$api.call(this.API_ROUTES.USER.LOGIN, values, 'POST');
            if(response && response.status === "success"){
                this.$router.push(this.ROUTES.HOME);          
            }
        },

        async userSignUp(username, password, email){
            let values = {
                'username': username,
                'password': password,
                'email': email
            }
            let response = await this.$api.call(this.API_ROUTES.USER.SIGNUP, values, 'POST');
            if(response.status === "success"){
                this.$notifier.showSuccess('User created!\nYou can now log-in and start playing.');
                this.$router.push(this.ROUTES.LOGIN);          
            }
        },
    }
})