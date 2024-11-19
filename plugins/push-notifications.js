import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { API_ROUTES } from './constants';

export default ({ app, store }, inject) => {
    // Inject the push notification methods into the app context
    inject('pushNotificationsPlugin', {

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
                // If already granted, ensure the device is registered
                await PushNotifications.register();
            } else {
                console.log('Push notifications permission was previously denied');
            }
        },

        async sendTokenToServer(token, platform) {
            try {
                console.log(app.$api, API_ROUTES);
                console.log('trying');
                const resp = await app.$api.call(API_ROUTES.PUSH_NOTIFICATIONS.SAVE, { token, platform }, 'POST');
                console.log(resp);
            } catch (error) {
                console.error('Error sending token to server:', error);
            }
        },

        async removeNotificationTokenFromServer() {
            if (!Capacitor.isNativePlatform()) return;

            let notificationToken = store.state.notification.pushToken;
            console.log('remove token check token in store: ', notificationToken);
            if (!notificationToken) return;

            try {
                console.log('try http to remove');
                const resp = await app.$api.call(API_ROUTES.PUSH_NOTIFICATIONS.REMOVE, { token: notificationToken }, 'POST');
                console.log(resp, 'resp remove');
            } catch (error) {
                console.error('Error removing token from server:', error);
            }
        },

        async setupPushNotificationListeners() {
            
            if (!Capacitor.isNativePlatform()) return;

            try {
                const listenersSetUp = sessionStorage.getItem('pushListenersAdded');
                if (listenersSetUp) {
                    console.log('listener is set up');
                    return;
                }
        
                console.log('Setting up push notification listeners');
        
                // Register push notification listeners
                try {
                        PushNotifications.addListener('registration', async (token) => {
                        try {
                            await this.sendTokenToServer(token.value, Capacitor.getPlatform());
                            store.commit('token/updatePushToken', { pushToken: token.value }); // Store the token in Vuex
                        } catch (error) {
                            console.error('Error handling registration success:', error);
                        }
                    });
                } catch (error) {
                    console.error('Error registering push notification listeners:', error);
                }
        
                // Handle registration error
                try {
                    PushNotifications.addListener('registrationError', (error) => {
                        console.error('Error on registration:', error);
                    });
                } catch (error) {
                    console.error('Error handling registration error listener:', error);
                }

                PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
                    let route = notification.notification.data.route || '/';
                    console.log('Navigating to:', route);
                    app.router.push(route);  // Navigate to the specific page based on the notification data
                });
                
        
                // Handle notification received
                try {
                    PushNotifications.addListener('pushNotificationReceived', (notification) => {
                        try {
                            let count = store.state.notification.unreadCount;
                            count ++;
                            store.commit('notification/updateUnreadCount', {
                                unreadCount: count
                            }); 
                            console.log('Push received:', notification);
                        } catch (error) {
                            console.error('Error handling push notification received:', error);
                        }
                    });
                } catch (error) {
                    console.error('Error setting up notification received listener:', error);
                }
        
                // Handle notification action performed
                try {
                    PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
                        try {
                            console.log('Push action performed:', notification);
                        } catch (error) {
                            console.error('Error handling notification action performed:', error);
                        }
                    });
                } catch (error) {
                    console.error('Error setting up notification action performed listener:', error);
                }
        
                sessionStorage.setItem('pushListenersAdded', 'true');
            } catch (error) {
                console.error('Error during setup of push notification listeners:', error);
            }
        }
        
    });

};
