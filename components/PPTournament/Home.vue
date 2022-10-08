<template>
    <div>
        <v-container class="pb-4">
            <p-p-cup-group-detail
                v-if="isCupGroup"
                :ppCupGroup="tournamentObj"
            />
            <p-p-league-intro
                v-else
                :ppTournamentType="tournamentObj.ppTournamentType"
            />
        </v-container>
        <!-- STANDINGS -->
        <v-container class="py-4">
            <template v-if="!isCupGroup">
                <p-p-section-title text="PLAYERS"/>
                <p-p-league-standings-list
                    :ups="tournamentObj.userParticipations"
                />
            </template>
            <p-p-cup-group-standings
                v-else
                :group="tournamentObj"
                :cupFormat="tournamentObj.ppTournamentType.cup_format"
            />
        </v-container>
        <!-- USER GUESSES -->
        <template  v-if="tournamentObj.ppRounds.length > 0">
            <v-container v-if="userCurrentRound" class="py-4">
                <p-p-section-title text="YOUR GUESSES" />
                <guess-user-round class="mt-0" :ppRMs="userCurrentRound" />
            </v-container>
            <v-container class="py-4 pr-0 pr-md-3 ">
                <p-p-section-title text="ROUNDS" />
                <p-p-round-pagination
                    :ppRounds="tournamentObj.ppRounds"
                    :rounds="isCupGroup ? tournamentObj.rounds: tournamentObj.ppTournamentType.rounds"
                />
            </v-container>
        </template>
        <v-row v-else-if="!isCupGroup" class="mx-2 py-5 ocrastd" justify="center">
            <h2>
                waiting for 
                {{tournamentObj.ppTournamentType.participants - tournamentObj.userParticipations.length}}
                more users
            </h2>
        </v-row>
    </div>
</template>
<script>
export default {
    props:{
        tournamentObj: {type: Object, required: true},
    },
    computed:{
        isCupGroup(){
            return this.tournamentObj.tag;
        },
        userInTournament(){
            return this.tournamentObj.userParticipations.filter(up => up.user_id === this.currentUser.id).length > 0;
        },
        userCurrentRound(){
            if(!this.userInTournament || !this.tournamentObj.ppRounds) return null;
            return this.tournamentObj.ppRounds[this.tournamentObj.ppRounds.length-1].ppRoundMatches.map((pprm) => {
                return {
                    match: pprm.match,
                    guess: pprm.guesses.filter(g => g.user_id === this.currentUser.id)[0]
                };
                
            });
        },
    }
}
</script>
