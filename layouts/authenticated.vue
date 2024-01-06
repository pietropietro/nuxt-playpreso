<template>
    <div class="outer-container">
        <div class="background-container"></div>
        <div class="app-rectangle-wrapper app-desktop-body">
            <v-app class="no-selection">
                <guard-logged-in v-if="!currentUser"/>
                <template v-else>
                    <snackbar />
                    <p-p-app-bar class="pp-app-bar" :menu="menu" :setMenu="(val)=>menu=val"/>
                    
                    <!-- MENU -->
                    <v-overlay class="menu-overlay app-desktop-body" 
                        :value="menu"  opacity="1" 
                        color="var(--v-background-base)"
                    >
                        <p-p-menu-brain />
                    </v-overlay>

                    <!-- APP -->
                    <v-main class="pt-sm-16" 
                        :style="(!$vuetify.breakpoint.smAndUp && menu) ? {position: 'fixed'} : {}"
                    >
                        <!-- <p-p-share-marquee /> -->
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
			menu: false
		}
	},
}
</script>

<style lang="scss">

    .pt-sm-16{
        @media (min-width: 600px) {
            padding-top: 64px;
        }
    }

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

    .pp-app-bar {
        padding-top: env(safe-area-inset-top);
        z-index: 6 !important;
        position: fixed !important;

        @media (min-width: 600px) {
            border-radius: 50px 50px 0 0 !important;
            border-top: 3px solid white !important;
            border-right: 3px solid white !important;
            border-left: 3px solid white !important;
            border-bottom: none;
            width: $pp-mobile-width;
            left: calc(50% - #{$pp-mobile-width / 2}) !important;
        }
    }
	
    .app-rectangle-wrapper {
        position: relative; // Ensure this div is positioned relative
        overflow-x: hidden;
        overflow-y: auto;
        
        .v-main__wrap{
            padding-top: env(safe-area-inset-top);
        }
    }

    .menu-overlay {
        @media (min-width: 600px) {
            top: calc(50% - #{$pp-mobile-height / 2}); // Center vertically in the viewport
            left: calc(50% - #{$pp-mobile-width / 2}); // Center horizontally in the viewport
            z-index: 2; // Ensure it's above other content but below the app bar
        }

        .v-overlay__content{
            height: 100%;
            padding-top: calc(64px + env(safe-area-inset-top));
        }
    }

    .app-desktop-body {
         @media (min-width: 600px) {
            position: fixed;
            width: $pp-mobile-width;
            height: $pp-mobile-height;
            border-top:none; // Border on top
            border-right: 3px solid white; // Border on right
            border-left: 3px solid white; // Border on left
            border-bottom:  3px solid white; // No border at the bottom
            border-radius: 50px;
        }
    }


</style>
