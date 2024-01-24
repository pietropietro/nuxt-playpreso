// plugins/push-notifications.client.js
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

export default ({ app }) => {
    if (Capacitor.isNativePlatform()) {
        // Request permission to use push notifications
        PushNotifications.requestPermissions().then(result => {
            if (result.receive === 'granted') {
                // Register with APNs or FCM
                PushNotifications.register();
            } else {
                // Handle user rejection
            }
        });

        // On successful registration, handle the registration token
        PushNotifications.addListener('registration', async token => {
            console.log('Push registration success, token:', token.value);

            try {
                let platform = Capacitor.getPlatform();
                console.log(platform, "platform");
                console.log(this.API_ROUTES.PUSH_NOTIFICATIONS.SAVE, "path");
                let resp = await app.$api.call(this.API_ROUTES.PUSH_NOTIFICATIONS.SAVE, { token: token.value, platform: platform }, 'POST');
                console.log(resp, "pn resp");
            } catch (error) {
                console.error('Error sending token to server:', error);
            }
        });

        // Handle errors
        PushNotifications.addListener('registrationError', error => {
            console.error('Error on registration:', error);
        });

        // Handle incoming notifications
        PushNotifications.addListener('pushNotificationReceived', notification => {
            console.log('Push received:', notification);
        });

        // Handle notification action
        PushNotifications.addListener('pushNotificationActionPerformed', notification => {
            console.log('Push action performed:', notification);
        });
    }
};