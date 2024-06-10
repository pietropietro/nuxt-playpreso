<template>
    <div>
        <!-- INTRO -->
        <v-container class="pb-4"
            v-if="!isCupGroup"
        >
           
            <p-p-league-intro
            
                :ppTournamentType="tournamentObj.ppTournamentType"
                :ppLeagueId="tournamentObj.id"
            />
        </v-container>
        <p-p-cup-group-intro
            v-else
            :ppCupGroup="tournamentObj"
        />
        <!-- STANDINGS -->
        <v-container class="py-4">
            <template v-if="!isCupGroup">
                <p-p-section-title text="PLAYERS"/>
                <p-p-league-standings-list
                    :ppTournamentType="tournamentObj.ppTournamentType"
                    :ups="tournamentObj.userParticipations"
                />
            </template>
            <p-p-cup-group-standings
                v-else
                :group="tournamentObj"
                :cupFormat="tournamentObj.ppTournamentType.cup_format"
                isDetailPage
            />
        </v-container>
        <!-- USER GUESSES -->
        <template  v-if="tournamentObj.ppRounds.length > 0">
            <v-container v-if="userCurrentRound" class="py-4">
                <p-p-section-title text="YOUR LOCKS" />
                <guess-user-round 
                    :ppRMs="userCurrentRound" 
                    :ppTournamentType="tournamentObj.ppTournamentType" 
                />
            </v-container>
            <v-container class="py-4 pr-0 pr-md-3 ">
                <p-p-section-title text="ROUNDS" />
                <p-p-round-pagination
                    :ppRounds="tournamentObj.ppRounds" :setPPRounds="(val)=>tournamentObj.ppRounds = val"
                    :rounds="isCupGroup ? tournamentObj.rounds : tournamentObj.ppTournamentType.rounds"
                    :rgb="tournamentObj.ppTournamentType.rgb"
                />
            </v-container>
        </template>
        <template v-else>
            <v-container class="pt-2 pt-sm-10 pb-10 ocrastd">
                <v-row no-gutters justify="center"><h1>NOT STARTED</h1></v-row>
                <v-row no-gutters justify="center" v-if="missingUsers">
                    <h2>waiting for {{missingUsers}} more users</h2>
                </v-row>
            </v-container>
        </template>
    </div>
</template>
<script>
export default {
    props:{
        tournamentObj: {type: Object, required: true},
    },
    computed:{
        isCupGroup(){
            return this.tournamentObj.ppTournamentType.cup_format;
        },
        userInTournament(){
            return this.tournamentObj.userParticipations.filter(up => up.user_id === this.currentUser.id).length > 0;
        },
        userCurrentRound(){
            if(!this.userInTournament || !this.tournamentObj.ppRounds) return null;
            return this.tournamentObj.ppRounds[this.tournamentObj.ppRounds.length-1].ppRoundMatches.map((pprm) => {
                let guess = pprm.guesses.filter(g => g.user_id === this.currentUser.id)[0];
                guess.ppTournamentType = this.tournamentObj.ppTournamentType;
                guess.match = pprm.match;
                return {
                    match: pprm.match,
                    guess: guess
                };
            });
        },
        missingUsers(){
            return (this.isCupGroup ? this.tournamentObj.participants : this.tournamentObj.ppTournamentType.participants)
                - this.tournamentObj.userParticipations.length;
        }
    }
}
</script>
