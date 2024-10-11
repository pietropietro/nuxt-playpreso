<template>
	<guest-screen v-if="!currentUser">
	  <template slot="content" v-if="termsFlag">
		  <!-- Close button to hide the terms -->
		  <v-row no-gutters justify="end" class="ocrastd mt-n4">
			<div @click="()=>termsFlag=false"><h2>X</h2></div>
		  </v-row>
  
		  <!-- Scrollable terms section -->
		  <div class="caption lh-1" style="max-height: 350px; overflow-y: auto;">
			<div class="terms-text">{{ termsContent }}</div>
		  </div>
		</template>
		<template slot="content" v-else>
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
			<v-row class="pb-4 mx-4">
				<div class="caption lh-1">
					<label>
						By signing up, you agree to the
						<span @click="()=>termsFlag=true" 
							style="text-decoration: underline;"	
						>
							Terms and Conditions
						</span>
					</label>
				</div>
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
			emailAdd: null,
			termsFlag: false,
			termsContent: null
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
		},
		async loadTerms() {
			try {
				const response = await fetch('/terms.txt'); // Fetches the terms.txt file from static
				this.termsContent = await response.text(); // Stores the content in termsContent
			} catch (error) {
				console.error('Error loading terms:', error);
				this.termsContent = 'Could not load terms at this time.';
			}
		}
	},
	async mounted() {
		console.log('mounted signup');
		await this.loadTerms();
	},
}
</script>

