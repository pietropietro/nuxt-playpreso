<template>
    <div  style="height:100%">
        <v-container v-if="selectedPage === 1" class="mb-7">
            <!-- <v-row justify="center">
                <h1>{{PCGroup.groupTag}}</h1>
            </v-row> -->
            <user-participation-standings :ups="tournamentObj.userParticipations"/>
            <!-- <cup-users-standings class="my-5" :users="PCGroup.users" :size="PCGroup.size" :level="PCGroup.level"/> -->
            <!-- <get-round
                v-if="canGetRound" :round="PCGroup.matchBlocks ? PCGroup.matchBlocks.length + 1 : 1"
                :groupId="PCGroup.id" class="my-7" :refresh="refresh"
            /> -->
            <p-p-round-slider class="pt-5" v-if="tournamentObj.ppRounds.length > 0"
                :ppRounds="tournamentObj.ppRounds" :rounds="tournamentObj.ppLeagueType.rounds"
            />
        </v-container>
        <!-- <lock-guess v-else :guess="selectedGuess" :match="selectedMBI.match" :refresh="refresh" class="mb-7"/> -->
        <v-pagination
            v-if="userInTournament"
            v-model="selectedPage"
            :length="paginationLength"
            circle
            class="pagination-fixed no-arrows"
        />
    </div>
</template>
<script>
export default {
    name: "PPTournamentPagination",
    props: {
        tournamentObj: {type: Object, required: true},
        userInTournament: {type: Boolean}
    },
    data(){
        return {
            selectedPage: 1,
        }
    },
    computed:{
        paginationLength: {
            get(){
                if(!this.tournamentObj.ppRounds || this.tournamentObj.ppRounds.length === 0) return 1;
                let roundIndex = this.tournamentObj.round_count -1;
                let roundMatches = this.tournamentObj.ppRounds[roundIndex].ppRoundMatches;
                if(!this.roundMatches || this.roundMatches.length === 0)return 1;
                return 1 + roundMatches.length;
            }
        }
    }
}
</script>