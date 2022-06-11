<template>
	<v-container v-if="!currentUser" fill-height>
		<v-row align="start" class="pa-4" style="height:100%" no-gutters>
				<v-col cols="12" >
					<v-row>
						<v-col cols="12">
							<v-text-field
								label="USERNAME"
								v-model="username"
							/>
						</v-col>
						<v-col cols="12">
							<v-text-field
								type="password"
								label="PASSWORD"
								v-model="password"
							/>
						</v-col>
					</v-row>
				</v-col>
				<v-col align-self="end">
					<v-row justify="center" class="mb-4">
						<!-- <v-btn color="primary" @click="doLogin" block :loading="loading" :disabled="!username || !password"> -->
						<v-btn color="primary" @click="doLogin" block :loading="loading">
							<h1>LOGIN</h1>
						</v-btn>
					</v-row>
					<v-row justify="center">
						<nuxt-link to="/resetPsw" class="no-decoration">
							<v-btn block text>
								<h4 class="text-center">RESET PSW</h4>
							</v-btn>
						</nuxt-link>
					</v-row>
				</v-col>
		</v-row>
	</v-container>
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
