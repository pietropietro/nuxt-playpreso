<template>
	<v-row align="center" style="height:100%">
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
				<v-btn @click="login" :loading="loading" :disabled="!username || !password">
					LOGIN
				</v-btn>
			</v-row>
		</v-container>
	</v-row>
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
		async login(){
			this.loading = true;
			let resp = await this.doLogin(this.username, this.password);
			this.loading = false;
			console.log("resp", resp);
		}
	}
}
</script>