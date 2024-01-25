import Vue from 'vue';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

let pushListenersAdded = false;

Vue.mixin({
    methods: {
        async requestPushNotifications() {
            if (!Capacitor.isNativePlatform() || pushListenersAdded) {
                return;
            }

            this.setupPushNotificationListeners(); // Ensure listeners are set up before registering

            const result = await PushNotifications.requestPermissions();
            if (result.receive === 'granted') {
                await PushNotifications.register();
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
            if (pushListenersAdded) {
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
            this.pushListenersAdded = true;
        }
    },
});
