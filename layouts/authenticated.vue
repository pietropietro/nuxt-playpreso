<template>
	<client-only>
		<v-app>
			<p-p-header />  
			<mundial-banner style="max-height:48px"/> 
			<!-- <p-p-logo-row class="my-5"/>  -->
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

