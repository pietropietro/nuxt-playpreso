<template>
	<v-app>
        <p-p-header />    
		<login-guard v-if="!currentUser"/>
		<template v-else>
            <snackbar />
			<v-main>
				<nuxt />
			</v-main>
		</template>
  	</v-app>
</template>

