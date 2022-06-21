<template>
	<guest-screen v-if="!currentUser">
		<template slot="content">
			<v-row class="ocrastd">
				<v-col col="12">
					<v-text-field
						label="username"
						v-model="username"
					/>
				</v-col>
			</v-row>
			<v-row justify="center" class="py-5">
				<v-btn color="primary" block @click="recover" :loading="loading" :disabled="!username">
					<h1>RECOVER</h1>
				</v-btn>
			</v-row>
			<v-row  justify="space-between">
				<nuxt-link to="/login" class="no-decoration">
					<v-btn block text>
						<h4 class="text-center primary--text">LOGIN</h4>
					</v-btn>
				</nuxt-link>
				<nuxt-link to="/register" class="no-decoration">
					<v-btn block text>
						<h4 class="text-center primary--text">REGISTER</h4>
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
			loading: false
		}
	},
	methods:{
		async recover(){
			this.loading = true;
            let values = [
                {'action' : "resetPsw"},
                {'username': this.username},
            ]
            let resp = await this.$api.call(values);
			this.loading = false;
		},
	},
}
</script>