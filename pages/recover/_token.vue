<template>
	<guest-screen v-if="!currentUser">
		<template slot="content" >
            <loading-page v-if="loading" />
            <template v-else-if="user">
                <div class="ocrastd mb-10">
                    <v-row justify="center">
                        <h2>hello {{user.username}}</h2>
                    </v-row>
                    <v-row justify="center">
                        <h4>choose a new password</h4>
                    </v-row>
                </div>
                <v-row class="ocrastd">
                    <v-col col="12">
                        <v-text-field
                            color="white"
                            type="password"
                            label="new password"
                            v-model="password"
                        />
                    </v-col>
                </v-row>
                <v-row justify="center" class="mt-3">
                    <v-btn color="primary" block @click="updatePassword" :loading="loadingSave" :disabled="!password">
                        <h1>SAVE</h1>
                    </v-btn>
                </v-row>
            </template>
		</template>
	</guest-screen>
	<go-home v-else/>
</template>
<script>
export default {
    layout: 'authProcess',
    data(){
        return{
            password:null,
            loading: true,
            loadingSave: false,
            user: null,
            token: this.$route.params.token,
        }
    },
    methods:{
        async updatePassword(){
            let values = { 
                "password": this.password,
                "token": this.token
            };

            let response = await this.$api.call(
                this.API_ROUTES.USER.PASSWORD_RESET, values, 'POST'
            );

            if(response.message){
                this.$notifier.showSuccess("password changed.");
                this.$router.push(this.ROUTES.LOGIN);
            }

        },
        async validateToken(){
            try{
                let response = await this.$api.call(this.API_ROUTES.USER.VALIDATE_TOKEN + this.token, null, 'POST');
                if(response && response.message?.username ){
                    this.user = response.message;
                }
                this.loading = false;
            }
            catch{
                this.$notifier.showError('Invalid token');
                this.$router.push(this.ROUTES.RECOVER);
            }
        }
    },
    async mounted(){
        await this.validateToken();
    }
}
</script>