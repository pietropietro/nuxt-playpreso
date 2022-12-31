<template>
	<client-only>
		<v-app class="no-selection">
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
		setTimeout(()=>this.$vuetify.theme.dark = true);
    }
}
</script>
