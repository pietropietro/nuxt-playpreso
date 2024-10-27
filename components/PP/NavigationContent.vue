<template>
    <v-row v-if="$route.path !== '/' && navigationTitle"
        no-gutters align="center"
    >
        <div class="mx-4" @click="handleGoBack">
            <h2 class="ocrastd"><</h2>
        </div>
        <v-spacer/>
        <v-toolbar-title class="ml-n4">
            <!-- <div class="overline lh-1">{{ navigationOverline }}</div> -->
            <h2 class="ocrastd">{{ navigationTitle }}</h2>
        </v-toolbar-title>
        <v-spacer/>
    </v-row>

    <!-- if not loaded don't show -->
    <v-row v-else-if="$route.path !== '/'"></v-row>
    
    <!-- if no vuex title -->
    <v-row v-else align="center">
        <v-col></v-col>
        <v-col>
            <p-p-logo-toolbar />
        </v-col>
        <v-col class="mt-n1">
            <nuxt-link :to="ROUTES.NOTIFICATION">
                <v-avatar color="red" size="19" v-if="$store.state.user.notificationCount">
                    <span class="overline lh-1 font-weight-bold">{{ $store.state.user.notificationCount }}</span>
                </v-avatar>
            </nuxt-link>
        </v-col>
    </v-row>
</template>
<script>
export default {
    watch: {
        async currentUser(newVal) {
            if (newVal) {
                await this.getUserNotifications();
            }
        }
    },
    methods:{
        async getUserNotifications(){
            let response = await this.$api.call(this.API_ROUTES.USER_NOTIFICATION.GET_UNREAD, null, 'GET');
            if(response && response.status === "success"){
                this.$store.commit('user/updateNotificationCount', { notificationCount: response.message.length }); 
            }
        },
        handleGoBack() {
            const referer = document.referrer;
            const isInternal = referer.includes(window.location.origin);

            if (isInternal) {
                this.$router.go(-1); // Go back if the referer was internal
            } else {
                this.$router.push('/'); // Go to homepage if there's no internal history
            }
        }
    },
   
}
</script>
