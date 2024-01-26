import Vue from 'vue';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';


Vue.mixin({
    methods: {
        async requestPushNotifications() {
            if (!Capacitor.isNativePlatform()) {
                return;
            }

            // Check the current permission status
            const status = await PushNotifications.checkPermissions();
            if (status.receive === 'prompt') {
                // Request permissions only if the status is 'prompt'
                const result = await PushNotifications.requestPermissions();
                if (result.receive === 'granted') {
                    await PushNotifications.register();
                } else {
                    console.log('Push notifications permission was denied');
                }
            } else if (status.receive === 'granted') {
                // If already granted, you might want to ensure the device is registered
                await PushNotifications.register();
            } else {
                console.log('Push notifications permission was previously denied');
            }
        },

        async sendTokenToServer(token, platform) {
            try {
                const resp = await this.$api.call(this.API_ROUTES.PUSH_NOTIFICATIONS.SAVE, { token, platform }, 'POST');
            } catch (error) {
                console.error('Error sending token to server:', error);
            }
        },

        setupPushNotificationListeners() {
            const listenersSetUp = sessionStorage.getItem('pushListenersAdded');

            if (listenersSetUp) {
                return;
            }
            console.log('Setting up push notification listeners');

            PushNotifications.addListener('registration', token => {
                console.log('Push registration success, token:', token.value);
                this.sendTokenToServer(token.value, Capacitor.getPlatform());
            });
            PushNotifications.addListener('registrationError', error => {
                console.error('Error on registration:', error);
            });
            PushNotifications.addListener('pushNotificationReceived', notification => {
                console.log('Push received:', notification);
            });
            PushNotifications.addListener('pushNotificationActionPerformed', notification => {
                console.log('Push action performed:', notification);
            });

            sessionStorage.setItem('pushListenersAdded', 'true');
        }
    },
    mounted(){
        // Ensure listeners are set up before registering
        if (Capacitor.isNativePlatform()) {
            this.setupPushNotificationListeners(); 
        }
    }
});
