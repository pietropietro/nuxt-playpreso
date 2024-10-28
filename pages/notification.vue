<template>
    <v-container class="pt-4" >
        <loading-page v-if="loading"/>
        <template v-else-if="userNotifications">
            <v-row v-for="(notification,i) in userNotifications" :key="notification.id"
                justify="center" 
                :style=" i % 2==0 ? {backgroundColor: 'var(--v-primary-darken3)'} 
                : {}" 
            >
               <template v-if="['guess_unlocked_starting', 'guess_verified'].includes(notification.event_type)">
                    <v-col cols="12" class="pt-1 pb-0 mb-n1">
                        <span class="overline lh-1">
                            {{notification.event_type == 'guess_unlocked_starting' ? 'lock reminder' : 'match finished'}}
                        </span>
                    </v-col>
                    <v-col cols="auto">
                        <guess-box-view
                            :guess="notification.guess"
                            :match="notification.guess.match"
                            :rgb="notification.guess.ppTournamentType.rgb"
                            :afterLock="null"
                            :onUnlockedClick="clickUnlocked"
                            :open="(notification.guess.guessed_at || notification.guess.verified_at) ?  true : false"
                            :setOpen="()=>null"
                        />
                    </v-col>
               </template>
               <template v-else-if="notification.event_type == 'ppleague_finished'">
                    <v-col cols="12" class="pt-1 pb-0 mb-n1">
                        <span class="overline lh-1">
                            P-LEAGUE FINISHED
                        </span>
                    </v-col>
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
                this.userNotifications = response.message;
                if(this.userNotifications.length == 0){
                    this.$router.push('/');
                }
            }
            this.loading = false;
        },
        async clickUnlocked(guess){
            await this.triggerHapticFeedback();
            
            let list = [];
            this.userNotifications.map((un)=>{
                if(un.guess && !un.guess.guessed_at && !un.guess.verified_at){
                    list.push(un.guess);
                }
            }
            );
            this.$store.dispatch('openGuesses/update', {
                newGuess: guess,
                newList:  list
            });
        }
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
