<template>
    <v-container class="safe-area text-center py-10">
      <h1>Update Required</h1>
      <p>A new version of the app is available. Please update the app to continue.</p>
      <v-btn color="primary" @click="handleUpdate">Update Now</v-btn>
    </v-container>
  </template>
  
  <script>
  import { Capacitor } from '@capacitor/core';
  
  export default {
    methods: {
      handleUpdate() {
        if (Capacitor.isNativePlatform()) {
          const platform = Capacitor.getPlatform();
          if (platform === 'ios') {
            //TODO add ios playpreso id
            window.open('https://apps.apple.com', '_system');
          } else if (platform === 'android') {
            window.open('https://play.google.com/store/apps/details?id=com.playpreso.app', '_system');
          }
        } else {
          alert('Please refresh the web page to get the latest version.');
        }
      }
    }
  };
  </script>
  