<template>
	<guest-screen v-if="!currentUser">
		<template slot="content">
			<v-row class="ocrastd" no-gutters>
				<v-col cols="12">
					<v-text-field
						color="white"
						label="username"
						v-model="username"
					/>
				</v-col>
				<v-col cols="12">
					<v-text-field
						color="white"
						type="password"
						label="password"
						v-model="password"
					/>
				</v-col>
			</v-row>
			<v-row justify="center" class="mb-4">
				<v-btn color="primary" @click="doLogin" block :loading="loading" :disabled="!username || !password">
					<h1>LOGIN</h1>
				</v-btn>
			</v-row>
			<v-row justify="space-between">
				<nuxt-link :to="ROUTES.SIGNUP" class="no-decoration">
					<v-btn block text>
						<h4 class="text-center white--text">SIGN UP</h4>
					</v-btn>
				</nuxt-link>
				<nuxt-link :to="ROUTES.RECOVER" class="no-decoration">
					<v-btn block text>
						<h4 class="text-center white--text">RECOVER</h4>
					</v-btn>
				</nuxt-link>
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
			password: null,
			loading: false
		}
	},
	methods:{
		async doLogin(){
			this.loading = true;
			let resp = await this.userLogin(this.username, this.password);
			this.loading = false;
		},
	},
}
</script>
