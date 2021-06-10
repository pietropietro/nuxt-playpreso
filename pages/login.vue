<template>
	<v-container v-if="!currentUser" class="pa-5 my-4">
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
		<v-row justify="center" style="width:95%; position:fixed; bottom:20px;" class="mr-4">
			<v-btn class="pa-2" @click="doLogin" block :loading="loading" :disabled="!username || !password">
				<h1>LOGIN</h1>
			</v-btn>
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