<template>
	<guest-screen v-if="!currentUser">
		<template slot="content">
			<v-row class="ocrastd">
				<v-col cols="12">
					<v-text-field
						label="username"
						v-model="username"
					/>
				</v-col>
				<v-col cols="12">
					<v-text-field
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
				<nuxt-link to="/register" class="no-decoration">
					<v-btn block text>
						<h4 class="text-center primary--text">REGISTER</h4>
					</v-btn>
				</nuxt-link>
				<nuxt-link :to="ROUTES.RECOVER" class="no-decoration">
					<v-btn block text>
						<h4 class="text-center primary--text">RECOVER</h4>
					</v-btn>
				</nuxt-link>
			</v-row>
		</template>
	</guest-screen>
	<go-home v-else/>
</template>
<script>
export default {
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
			let resp = await this.login(this.username, this.password);
			this.loading = false;
		},
	},
}
</script>
