<template>
	<v-row align="center" style="height:100%" class="pa-10" v-if="!currentUser">
		<v-container>
			<v-row>
				<v-text-field
					label="email"
					v-model="emailAdd"
				/>
			</v-row>
			<v-row>
				<v-text-field
					label="username"
					v-model="username"
					@change="change"
					maxlength="10"
				/>
			</v-row>
			<v-row>
				<v-text-field
					type="password"
					label="password"
					v-model="password"
				/>
			</v-row>
            <v-row>
				<v-text-field
					type="password"
					label="confirmPassword"
					v-model="confirmPassword"
				/>
			</v-row>
			<v-row justify="center">
				<v-btn block color="primary" @click="doRegister" :loading="loading" :disabled="!username || !password || password !== confirmPassword || !emailAdd">
					REGISTER
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
			loading: false,
            confirmPassword: null,
			emailAdd: null
		}
	},
	methods:{
		async doRegister(){
			this.loading = true;
			let resp = await this.register(this.username, this.password, this.emailAdd);
			this.loading = false;
		},
		change(o,n){
			console.log(o,n);
		}
	},
}
</script>