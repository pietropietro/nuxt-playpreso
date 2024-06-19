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
        <!-- GUESSES -->
        <template  v-if="tournamentObj.ppRounds.length > 0">
            <v-container class="py-4 px-0">
                <p-p-section-title text="ROUNDS" class="px-4" />
                <p-p-round-pagination
                    :ppRounds="tournamentObj.ppRounds" 
                    :rounds="isCupGroup ? tournamentObj.rounds : tournamentObj.ppTournamentType.rounds"
                    :ppTournamentType="tournamentObj.ppTournamentType"
                    :userInTournament="userInTournament"
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
        missingUsers(){
            return (this.isCupGroup ? this.tournamentObj.participants : this.tournamentObj.ppTournamentType.participants)
                - this.tournamentObj.userParticipations.length;
        }
    }
}
</script>
