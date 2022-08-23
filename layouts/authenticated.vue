<template>
	<v-app>
        <client-only>
			<p-p-header />    
		</client-only>
		<login-guard v-if="!currentUser"/>
		<template v-else>
            <snackbar />
			<v-main>
				<nuxt />
			</v-main>
		</template>
  	</v-app>
</template>

