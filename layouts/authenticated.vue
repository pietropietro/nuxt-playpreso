<template>
    <div class="outer-container">
        <div class="background-container"></div>
        <div class="app-rectangle-wrapper app-desktop-body">
            <v-app class="no-selection">
                <guard-logged-in v-if="!currentUser"/>
                <template v-else>
                    <snackbar class="safe-area"/>
                    <p-p-app-bar class="pp-app-bar safe-area" v-if="!currentGuess && !this.$store.getters['menu/currentMenuFlag']"/>

                    <!-- APP -->
                    <v-main>   
                        <!-- <p-p-share-marquee /> -->
                            <guess-unlocked-full
                                v-if="currentGuess"
                            />
                            <p-p-menu-brain
                                v-if="this.$store.getters['menu/currentMenuFlag']"
                            />
                        <nuxt v-else/>
                    </v-main>
                </template>
            </v-app>
        </div>
    </div>
</template>
<script>
import { Capacitor } from '@capacitor/core';

export default {
    mounted () {
        setTimeout(()=>this.$vuetify.theme.dark =  true );
        
        if (Capacitor.isNativePlatform()) {
            // Dynamically import the plugin
            import('~/capacitor-plugins/pp-capacitor-nuxt-swipe').then((module) => {
                const SwipeBackNavigationHandler = module.SwipeBackNavigationHandler;

                // Use the plugin here
                SwipeBackNavigationHandler.addSwipeGesture();
                SwipeBackNavigationHandler.addListener('onSwipeRight', this.handleSwipeRight);
            }).catch(error => {
                console.error('Error loading the SwipeBackNavigationHandler plugin', error);
            });
        }

    },
    methods: {
        handleSwipeRight() {
            if (this.$route.path !== this.ROUTES.HOME) { // Replace '/home' with your home route path
                this.$router.go(-1);
            }        
        }
    }
}
</script>

<style lang="scss">
    .pt-sm-16{
        padding-top: 60px !important;

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

    .safe-area{
        padding-top: env(safe-area-inset-top);
    }

    .pp-app-bar {
        z-index: 6 !important;
        position: fixed !important;

        @media (min-width: $pp-mobile-height) {
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
        @media (min-width: $pp-mobile-height) {
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
        width: 100%;
         @media (min-width: $pp-mobile-width) {
            position: fixed;
            width: $pp-mobile-width;
            height: 100%;
        }
    }

    .v-footer {
        width: 100%;
        @media (min-width: $pp-mobile-width) {
            width: $pp-mobile-width;
            justify-self: center;
        }
    }


</style>
