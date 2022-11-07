<template>
	<client-only>
		<v-app>
			<p-p-header collapse/>  
			<p-p-cup-mundial-banner class="mb-5"/> 
			<guard-logged-in v-if="!currentUser"/>
			<template v-else>
				<snackbar />
				<v-main style="padding-top:0px;">
					<nuxt />
				</v-main>
			</template>
		</v-app>
	</client-only>
</template>
<script>
export default {
    mounted () {
        this.$vuetify.theme.dark = true
    }
}
</script>
