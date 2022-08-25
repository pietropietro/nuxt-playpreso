<template>
    <v-container>
        <cup-group-detail 
            v-if="isCupGroup" 
            :ppCupGroup="tournamentObj"
            class="py-5"
        />
        <league-scroll 
            v-if="!isCupGroup"
            :leagues="tournamentObj.ppTournamentType.leagues" 
            class="py-5"
        />
        <p-p-league-standings 
            v-if="!isCupGroup"  
            :ups="tournamentObj.userParticipations" 
            class="py-5"
        />
        <!-- TODO pointstopassthird from server -->
        <cup-group-standings
            v-else 
            :userParticipations="tournamentObj.userParticipations" 
            :participants="tournamentObj.participants" 
            class="my-5"
        />
        <p-p-round-pagination
            v-if="tournamentObj.ppRounds.length > 0"
            :ppRounds="tournamentObj.ppRounds" 
            :rounds="isCupGroup ? tournamentObj.rounds: tournamentObj.ppTournamentType.rounds"
            class="py-5"
        />
    </v-container>
</template>
<script>
export default {
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