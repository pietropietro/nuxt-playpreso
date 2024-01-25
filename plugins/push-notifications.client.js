import Vue from 'vue';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

Vue.mixin({
    data() {
        return {
            pushListenersAdded: false,
        };
    },
    methods: {
        async requestPushNotifications() {
            if (Capacitor.isNativePlatform()) {
                console.log('try to request permissions');
                const result = await PushNotifications.requestPermissions();
                console.log('result is', result);
                if (result.receive === 'granted') {
                    console.log('inside granted');
                    PushNotifications.register();
                    console.log('after granted');
                } else {
                    console.log('Push notifications permission was denied');
                }
            }
        },

        async sendTokenToServer(token, platform) {
            console.log('send token to server', token);
            try {
                const resp = await this.$api.call(this.API_ROUTES.PUSH_NOTIFICATIONS.SAVE, { token, platform }, 'POST');
                console.log(resp, "pn resp");
            } catch (error) {
                console.error('Error sending token to server:', error);
            }
        },

        setupPushNotificationListeners() {
            if (this.pushListenersAdded) {
                return;
            }
            console.log('setup listeners');

            const vueInstance = this;

            PushNotifications.addListener('registration', async token => {
                console.log('Push registration success, token:', token.value);
                const platform = Capacitor.getPlatform();
                vueInstance.sendTokenToServer(token.value, platform);
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
    mounted() {
        if (Capacitor.isNativePlatform()) {
            this.setupPushNotificationListeners();
        }
    }
});
