<template>
    <div class="outer-container">
        <div class="background-container"></div>
        <div class="app-rectangle-wrapper">
            <v-app class="no-selection">
                <guard-logged-in v-if="!currentUser"/>
                <template v-else>
                    <snackbar />
                    <v-app-bar color="var(--v-background-base)" flat :app="!$vuetify.breakpoint.smAndUp">
                        <h1 class="ocrastd">PLAYPRESO</h1>
                    </v-app-bar>
                    <p-p-menu :value="menuScreen" :setValue="(val)=>menuScreen=val" />
                    <v-main :style="menuScreen ? 'position: fixed' : ''" >
                        <p-p-share-marquee />
                        <nuxt />
                    </v-main>
                </template>
            </v-app>
        </div>
    </div>
</template>
<script>

export default {
    mounted () {
        setTimeout(()=>this.$vuetify.theme.dark =  true );
    },
	data(){
		return{
			menuScreen: false
		}
	}
}
</script>

<style lang="scss" scoped>

	.outer-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh; /* Full height of the viewport */
		position: relative; /* Ensures proper stacking context */
	}


	.background-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		min-height: 100vh; // Use min-height to ensure it covers at least the full viewport height
		z-index: -1; /* Ensure it stays behind the content */
		background-color: #00001a;
	}
	
    .app-rectangle-wrapper {
        position: relative; // Ensure this div is positioned relative
        overflow-x: hidden;
        overflow-y: auto;
        
        @media (min-width: 600px) {
            width: $pp-mobile-width;
            height: $pp-mobile-height;
			border: solid white 3px;
            border-radius: 50px; // Add border for desktop
        }
    }


   

</style>
