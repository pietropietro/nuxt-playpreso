<template>
	<client-only>
		<v-app class="no-selection" >
			<guard-logged-in v-if="!currentUser"/>
			<template v-else>
				<snackbar />
				<p-p-header v-if="!menuScreen" :menuScreen="menuScreen" :setMenu="(val)=>menuScreen=val"/>  
				<v-overlay class="content-h100" :value="menuScreen" color="var(--v-background-base)" opacity="1" :dark="false">
					<p-p-header :menuScreen="menuScreen" :setMenu="(val)=>menuScreen=val"/>  
					<p-p-menu class="pt-14 pt-md-16"/>
				</v-overlay>
				<v-main :style="menuScreen ? 'position: fixed' : ''" >
					<nuxt />
				</v-main>
			</template>
		</v-app>
	</client-only>
</template>
<script>
export default {
    mounted () {
        setTimeout(()=>this.$vuetify.theme.dark = this.$store.state.user.darkMode ? true : false);
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