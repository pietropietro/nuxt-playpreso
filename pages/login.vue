<template>
	<v-row align="center" style="height:100%" class="pa-10" v-if="!currentUser">
		<v-container>
			<v-row>
				<v-text-field
					label="username"
					v-model="username"
				/>
			</v-row>
			<v-row>
				<v-text-field
					type="password"
					label="password"
					v-model="password"
				/>
			</v-row>
			<v-row justify="center">
				<v-btn @click="doLogin" :loading="loading" :disabled="!username || !password">
					LOGIN
				</v-btn>
			</v-row>
		</v-container>
	</v-row>
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