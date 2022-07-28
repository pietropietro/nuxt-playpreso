<template>
    <v-container>
        <v-row v-if="isCupGroup" justify="center" class="py-5">
            <nuxt-link :to="{
                            path: ROUTES.PPCUP.DETAIL + tournamentObj.ppCup_id, 
                            query: { level: tournamentObj.level }
                        }">
                <v-img contain style="max-height: 40px"
                    :src="require('@/assets/img/cup/' + (tournamentObj.level - 1) + '.png')"
                />
            </nuxt-link>
            <h1>{{tournamentObj.groupTag}}</h1>
        </v-row>
        <league-scroll 
            v-if="tournamentObj.ppLeagueType"
            :leagues="tournamentObj.ppLeagueType.leagues" 
            class="py-5"
        />
        <user-participation-standings v-if="!isCupGroup"  :ups="tournamentObj.userParticipations" class="py-5"/>
        <!-- TODO pointstopassthird from server -->
        <cup-users-standings 
            :userParticipations="tournamentObj.userParticipations" 
            :size="tournamentObj.participants" 
            :level="tournamentObj.level"
            class="my-5"
        />
        <p-p-round-slider v-if="tournamentObj.ppRounds.length > 0"
            :ppRounds="tournamentObj.ppRounds" 
            :rounds="isCupGroup ? tournamentObj.rounds: tournamentObj.ppLeagueType.rounds"
            class="py-5"
        />
    </v-container>
</template>
<script>
export default {
    name: "PPLeagueDetail",
    props:{
        tournamentObj: {type: Object, required: true},
    },
    computed:{
        isCupGroup(){
            return this.tournamentObj.groupTag;
        }
    }
}
</script>