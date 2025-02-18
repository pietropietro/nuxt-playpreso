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
                        <span class="overline lh-1" v-if="notification.ppRoundMatch?.guess?.ppTournamentType?.name=='Flash'">
                            {{notification.ppRoundMatch.guess.winner ?  'FLASH WIN!' : 'FLASH LOST'}}
                        </span>
                        <span class="overline lh-1" v-else>
                            {{notification.event_type == 'guess_unlocked_starting' ? 'lock reminder' : 'match finished'}}
                        </span>
                    </v-col>
                    <v-col cols="auto">
                        <guess-box-view
                            :guess="getNotificationGuess(notification)"
                            :match="getNotificationGuess(notification).match"
                            :rgb="getNotificationGuess(notification).ppTournamentType.rgb"
                            :afterLock="null"
                            :onUnlockedClick="clickUnlocked"
                            :open="(getNotificationGuess(notification).guessed_at || getNotificationGuess(notification).verified_at) ?  true : false"
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
               <template v-else-if="notification.event_type == 'year_wrapped'">
                    <v-col style="height:100px; overflow: hidden; position: relative;">
                        <wrapped-snowflake v-for="n in 200" :key="n" :style="getSnowflakeStyle(n)" :size="Math.random() * 15 + 10"/>
                        <nuxt-link to="/wrapped" class="no-decoration">
                            <v-row align="center" justify="center" style="height:100px">
                                <h2 class="ocrastd">2024 <br/>WRAPPED</h2>
                            </v-row>
                        </nuxt-link>
                    </v-col>
               </template>
               <template v-else-if="notification.event_type == 'inactive_user'">
                    <v-col class="text-center">
                        <h1>💩</h1>
                        <div class="caption"><i>You have been inactive lately..</i></div>
                    </v-col>
               </template>
               <template v-else-if="$config.DEBUG">
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

import { useSnowflakeStyle } from '~/composables/useSnowFlakes';

export default {
    layout: "private",
    data(){
        return {
            loading: false,
            userNotifications: []
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
        clickUnlocked(guess){
            
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
        },
        getSnowflakeStyle(index) {
            const { getSnowflakeStyle } = useSnowflakeStyle(); // Use the composable
            return getSnowflakeStyle(index);
        },
        getNotificationGuess(userNotification){
            if(userNotification.guess)return userNotification.guess;
            return userNotification.ppRoundMatch.guess;
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

        this.$store.commit('notification/updateUnreadCount', { unreadCount: 0 }); 
        if (Capacitor.isNativePlatform()) {
            // Reset badge count 
            await Badge.clear();
        }
    }

}
</script>
