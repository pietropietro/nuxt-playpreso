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
                            type="password"
                            label="new password"
                            v-model="password"
                        />
                    </v-col>
                </v-row>
                <v-row justify="center" class="mt-3">
                    <v-btn color="primary" block @click="save" :loading="loadingSave" :disabled="!password">
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
    data(){
        return{
            password:null,
            loading: true,
            loadingSave: false,
            user: null,
            token: this.$route.params.token
        }
    },
    methods:{
        async save(){
            let values = { 
                "password": this.password,
                "token": this.token
            };

            let response = await this.$api.call(
                this.API_ROUTES.USER.PASSWORD_RESET + this.user.id, values, 'POST'
            );

            if(response.success){
                console.log("l");
            }

        },
        async validateToken(){
            let response = await this.$api.call(this.API_ROUTES.USER.VALIDATE_TOKEN + this.token, null, 'POST');
            if(response && response.message?.username ){
                this.user = response.message;
            }
            else{
                this.$notifier.showError('Invalid token');
                await this.$router.push(this.ROUTES.RECOVER);
            }
            this.loading = false;
        }
    },
    async mounted(){
        await this.validateToken();
    }
}
</script>