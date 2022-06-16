<template>
    <div  style="height:100%">
        <v-container v-if="selectedPage === 1" class="mb-7">
            <!-- <v-row justify="center">
                <h1>{{PCGroup.groupTag}}</h1>
            </v-row> -->
            <league-scroll :leagues="tournamentObj.ppLeagueType.leagues"/>
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
        <lock-guess v-else :guess="userGuess" :match="selectedPPRM.match" :refresh="refresh" class="mb-7"/>
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
            currentRoundIndex: this.tournamentObj.round_count -1
        }
    },
    computed:{
        paginationLength: {
            get(){
                if(!this.tournamentObj.ppRounds || this.tournamentObj.ppRounds.length === 0)return 1;                
                let roundMatches = this.tournamentObj.ppRounds[this.currentRoundIndex].ppRoundMatches;
                if(!roundMatches || roundMatches.length === 0)return 1;
                return 1 + roundMatches.length;
            }
        },
        selectedPPRM: {
            get(){
                return this.tournamentObj.ppRounds[this.currentRoundIndex].ppRoundMatches[this.selectedPage - 2];
            }
        },
        userGuess:{
            get(){
                return this.selectedPPRM.guesses.filter(g => g.user_id === this.currentUser.id)[0];
            }
        }
    },
    methods: {
        refresh(){
            console.log("locked guess refresh method -- TODO");
        }
    }
}
</script>