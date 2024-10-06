<template>	
	<guest-screen v-if="!currentUser">
		<template slot="content">
			<div class="ocrastd">
				<v-row no-gutters>
					<v-col cols="12">
						<v-text-field
							color="white"
							label="email"
							v-model="emailAdd"
						/>
					</v-col>
					<v-col cols="12">
						<v-text-field
							color="white"
							label="username"
							v-model="username"
							@keypress="blockSpace"
							maxlength="10"
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
			</div>
			<v-row justify="center" class="py-5">
				<v-btn color="primary" block @click="doRegister" :loading="loading" :disabled="!username || !password || !emailAdd">
					<h1>SIGN UP</h1>
				</v-btn>
			</v-row>
			<v-row justify="space-between">
				<nuxt-link :to="ROUTES.LOGIN" class="no-decoration">
					<v-btn block text>
						<h4 class="text-center white--text">LOGIN</h4>
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
	data(){
		return{
			username: null,
			password: null,
			loading: false,
			emailAdd: null
		}
	},
	methods:{
		async doRegister(){
			this.loading = true;
			let resp = await this.userSignUp(this.username, this.password, this.emailAdd);
			this.loading = false;
		},
		blockSpace(e){
			if(e.keyCode === 32){
				e.preventDefault(); return;
			}
		}
	},
}
</script>