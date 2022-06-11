<template>
	<v-container v-if="!currentUser" fluid fill-height pa-0 class="background">
		<v-row style="height:100%;" justify="center" no-gutters>
			<v-col align-self="center" class="pa-4 mx-6" style="background: white; border-radius:25px; max-width:400px">
				<v-container>
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
						<nuxt-link to="/resetPsw" class="no-decoration">
							<v-btn block text>
								<h4 class="text-center primary--text">RESET PSW</h4>
							</v-btn>
						</nuxt-link>
					</v-row>
				</v-container>
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
<style scoped>
	.background {
		background-image: url("assets/img/background.jpg");
	}
</style>
