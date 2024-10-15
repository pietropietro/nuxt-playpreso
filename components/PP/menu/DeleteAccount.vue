<template>
    <div>
      <!-- Step 1: Initial confirmation -->
      <div v-if="step === 1">
        <h3>Account Deletion</h3>
        <p><b>{{currentUser.username}}</b>, are you sure you want to delete your account? This action cannot be undone.</p>
        <v-btn color="red" @click="confirmFirstStep">Confirm Deletion</v-btn>
        <v-btn color="grey" @click="cancel">Cancel</v-btn>
      </div>
  
      <!-- Step 2: Final confirmation -->
      <div v-if="step === 2">
        <loading-page v-if="loading" />
        <template v-else>
            <div class="py-10" style="font-size:3rem">👼👼👼👼</div>
            <v-btn color="grey" @click="cancel">Cancel</v-btn>
            <v-btn color="red" @click="finalizeDeletion">DELETE</v-btn>
        </template>
      </div>
  
      
    </div>
  </template>
  
  <script>
  export default {
    props:{
        cancel: {type: Function}
    },
    data() {
      return {
        step: 1,
        loading: false // Step counter
      };
    },
    methods: {
      // Move to step 2
      confirmFirstStep() {
        this.step = 2;
      },
      // Finalize the deletion
      async finalizeDeletion() {
        // Trigger the backend API for account deletion here
        this.loading = true;
        let response = await this.$api.call(this.API_ROUTES.USER.DELETE, null, 'DELETE');
        if(response && response.status == 204 ){
            this.$logout.logout();
        }
        this.loading = false
      },
    },
  };
  </script>
  
  <style scoped>
  h3 {
    margin-bottom: 1rem;
  }
  </style>
  