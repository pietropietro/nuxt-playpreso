<template>
	<guest-screen v-if="!currentUser">
		<template slot="content" v-if="!byebye">
			<v-row class="ocrastd" no-gutters>
				<v-col col="12">
					<v-text-field
						color="white"
						label="username"
						v-model="username"
					/>
				</v-col>
			</v-row>
			<v-row justify="center" class="py-5">
				<v-btn color="primary" block @click="recover" :loading="loading" :disabled="!username">
					<h1>RECOVER</h1>
				</v-btn>
			</v-row>
			<v-row  justify="space-between">
				<nuxt-link :to="ROUTES.LOGIN" class="no-decoration">
					<v-btn block text>
						<h4 class="text-center white--text">LOGIN</h4>
					</v-btn>
				</nuxt-link>
				<nuxt-link :to="ROUTES.SIGNUP" class="no-decoration">
					<v-btn block text>
						<h4 class="text-center white--text">SIGN UP</h4>
					</v-btn>
				</nuxt-link>
			</v-row>
		</template>
		<template slot="content" v-else>
			<v-row class="ocrastd">
				<h4>please check your inbox (and spam) for the reset link.</h4>
			</v-row>
		</template>
	</guest-screen>
	<go-home v-else/>
</template>
<script>
export default {
	layout: 'authProcess',
	data(){
		return{
			username: null,
			loading: false,
			byebye: false,
		}
	},
	methods:{
		async recover(){
			this.loading = true;
            let response = await this.$api.call(
                this.API_ROUTES.USER.RECOVER + this.username, null,  'POST'
            );
			if(response.status=='success'){
				this.byebye = true;
			}else{
				this.username=null;
			}
			this.loading = false;
		},
	},
}
</script>