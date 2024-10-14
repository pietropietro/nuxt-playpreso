<template>
    <v-container class="text-center" fill-height>
      <v-row class="align-center justify-center">
        <v-col>
          <h1>You are offline</h1>
          <p>It seems like you don't have an internet connection. Please check your connection and try again.</p>
          <v-btn color="primary" @click="retryConnection">Retry</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    methods: {
      retryConnection() {
        this.$router.go(0); // Simple page refresh
      }
    }
  };
  </script>
  