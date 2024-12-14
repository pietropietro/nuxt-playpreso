<template>
    <div class="pp-outer-container">
        <div class="pp-background-container"></div>
        <div class="app-rectangle-wrapper app-desktop-body">
            <v-app class="no-selection">
                <snackbar class="safe-area"/>
                <v-main>  
                    <guard-logged-in v-if="!currentUser"/>
                    <guard-version-update v-else-if="$store.state.apiResponses.versionUpdateNeeded" />
                    <guard-maintenance v-else-if="$store.state.apiResponses.maintenanceMode" />
                    <guard-offline v-else-if="!isOnline" />
                    <guess-unlocked-full
                        v-else-if="currentGuess"
                    />
                    <p-p-menu-brain
                        v-else-if="this.$store.getters['menu/currentMenuFlag']"
                    />
                    <nuxt v-else />
                </v-main>
            </v-app>
        </div>
    </div>
</template>
<script>
import { Capacitor } from '@capacitor/core';
import { Network } from '@capacitor/network';
import { App } from '@capacitor/app';

export default {
    data(){
        return {
            isOnline: true // Assume the app starts online
        }
    },
    async mounted(){
        this.setSwipeBack();
        await this.setNetworkCheck();
        this.setStateChange();
    },
    watch: {
        currentUser(newVal) {
            if (newVal && Capacitor.isNativePlatform()) {
                this.$pushNotificationsPlugin.setupPushNotificationListeners();
            }
        }
    },
    methods: {
        async setNetworkCheck(){
                // Check initial network status
                await this.checkNetworkStatus();
                // Listen for network status changes
                Network.addListener('networkStatusChange', (status) => {
                this.isOnline = status.connected;
            });
        },
        async checkNetworkStatus() {
            const status = await Network.getStatus();
            this.isOnline = status.connected;
        },

        setSwipeBack(){
            // Dynamically import the plugin
            const listenersSetUp = sessionStorage.getItem('swipeListenersAdded');
            if (listenersSetUp)return;
            import('~/capacitor-plugins/pp-capacitor-nuxt-swipe').then((module) => {
                const SwipeBackNavigationHandler = module.SwipeBackNavigationHandler;

                // Use the plugin here
                SwipeBackNavigationHandler.addSwipeGesture();
                SwipeBackNavigationHandler.addListener('onSwipeRight', this.handleSwipeRight);
                sessionStorage.setItem('swipeListenersAdded', 'true');
            }).catch(error => {
                console.error('Error loading the SwipeBackNavigationHandler plugin', error);
            });
            
        },
        handleSwipeRight() {
            if (this.$route.path !== this.ROUTES.HOME) { // Replace '/home' with your home route path
                this.$router.go(-1);
            }        
        },
        setStateChange(){
            App.addListener('appStateChange', (state) => {
                if (state.isActive) {
                    // The app has come to the foreground, so refresh the homepage.
                    this.$store.commit('homepageApi/setAllLoadingKeys', true);
                }
            });
        }
    }
}
</script>
