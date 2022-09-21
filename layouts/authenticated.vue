<template>
	<client-only>
		<v-app>
			<p-p-header />   
			<!-- <p-p-logo-row class="my-5"/>  -->
			<login-guard v-if="!currentUser"/>
			<template v-else>
				<snackbar />
				<v-main>
					<nuxt />
				</v-main>
			</template>
		</v-app>
	</client-only>
</template>

