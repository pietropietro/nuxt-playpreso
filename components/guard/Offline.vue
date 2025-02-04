<template>
    <v-container class="safe-area py-10 text-center" fill-height>
      <v-row class="align-center justify-center">
        <v-col>
          <h1>You are offline</h1>
          <p>Please check your connection.</p>
          <v-btn color="primary" @click="retryConnection">Retry</v-btn>
        </v-col>
      </v-row>
      <div>{{ $store.state.homepageApi.loadingDict }}</div>
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
  