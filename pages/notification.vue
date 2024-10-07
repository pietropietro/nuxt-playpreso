<template>
    <v-container class="pt-4" >
        <loading-page v-if="loading"/>
        <template v-else-if="userNotifications">
            <v-row v-for="(notification,i) in userNotifications" :key="notification.id"
                justify="center" 
                :style=" i % 2==0 ? {backgroundColor: 'var(--v-primary-darken3)'} 
                : {}"
            >
               <template v-if="notification.event_type == 'guess_verified'">
                    <v-col cols="auto">
                        <guess-box-view
                            :guess="notification.guess"
                            :match="notification.guess.match"
                            :rgb="notification.guess.ppTournamentType.rgb"
                            :afterLock="null"
                            :onUnlockedClick="null"
                            :open="true"
                            :setOpen="()=>null"
                        />
                    </v-col>
               </template>
               <template v-else-if="notification.event_type == 'ppleague_finished'">
                    <v-col cols="auto">
                        <user-participation-card
                            :up="notification.userParticipation"
                        />
                    </v-col>
               </template>
               <template v-else>
                    {{ notification }}
               </template>
            </v-row>
        </template>
        <v-row v-else style="height:100%" align="center" justify="center">
          <em-emoji id="man-shrugging" size="5em" style="rotate:-18deg"/>
        </v-row>
    </v-container>
</template>
<script>
import { Badge } from '@capawesome/capacitor-badge';

export default {
    layout: "authenticated",
    data(){
        return {
            loading: false,
            userNotifications: []
        }
    },
    watch:{
        async page(){
            await this.getPPRankings();
        }
    },
    methods:{
        async getUserNotifications(){
            this.loading=true;
            let response = await this.$api.call(this.API_ROUTES.USER_NOTIFICATION.GET_UNREAD + '?enriched=1', null, 'GET');
            if(response && response.status === "success"){
                if(!response.message) this.$router.push('/');
                this.userNotifications = response.message;
            }
            this.loading = false;
        },
    },
    async mounted(){
        this.$store.dispatch(
            'navigation/updateTitle', 
            {
                newTitle: '📩',
                newEmoji: null,
                newOverline: null
            }        
        );
        await this.getUserNotifications();

        this.$store.commit('user/updateNotificationCount', { notificationCount: 0 }); 
        if (Capacitor.isNativePlatform()) {
            // Reset badge count 
            await Badge.clear();
        }
    }

}
</script>
