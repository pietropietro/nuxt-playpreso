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
			let values = [
				{'action' : "logIn"},
				{'username': this.username},
				{'password': this.password}
			]
			let response = await this.$api.call(values);
			console.log("done");
			this.loading = false;
		}
	}
}
</script>