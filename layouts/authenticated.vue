<template>
	<client-only>
		<v-app class="no-selection">
			<guard-logged-in v-if="!currentUser"/>
			<template v-else>
				<snackbar />
				<p-p-header :menuScreen="menuScreen" :setMenu="(val)=>menuScreen=val"/>  
				<v-overlay class="content-h100" :value="menuScreen" color="white" opacity="1" dark="false">
					<p-p-header :menuScreen="menuScreen" :setMenu="(val)=>menuScreen=val"/>  
					<p-p-menu />
				</v-overlay>
				<v-main>
					<nuxt />
				</v-main>
			</template>
		</v-app>
	</client-only>
</template>
<script>
export default {
    mounted () {
        setTimeout(()=>this.$vuetify.theme.dark = false);
    },
	data(){
		return{
			menuScreen: false
		}
	}
}
</script>
<style>
	.content-h100 .v-overlay__content{
		height: 100%;
		width:100%;
	}
</style>