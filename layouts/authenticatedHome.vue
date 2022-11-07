<template>
	<client-only>
		<v-app>
			<!-- <p-p-header menu/>   -->
			<guard-logged-in v-if="!currentUser"/>
			<template v-else>
				<snackbar />
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
        this.$vuetify.theme.dark = true
    }
}
</script>
