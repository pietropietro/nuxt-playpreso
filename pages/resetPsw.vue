<template>
	<v-container v-if="!currentUser" class="pa-5 my-4">
		<v-row>
			<v-text-field
				label="username"
				v-model="username"
			/>
		</v-row>
		<v-row justify="center" style="width:95%; position:fixed; bottom:20px;" class="mr-4">
			<v-btn class="pa-2" color="primary" @click="resetPsw" block :loading="loading" :disabled="!username">
				<h1>RESET PASSWORD</h1>
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
			loading: false
		}
	},
	methods:{
		async resetPsw(){
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