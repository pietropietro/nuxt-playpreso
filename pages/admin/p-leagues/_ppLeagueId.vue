<template>
    <loading-page v-if="loading" />
    <v-container v-else>
            <v-row class="py-4"><h1>P-LEAGUE <span class="ocrastd">#{{ppLeague.id}}</span></h1></v-row>
            <v-card color="pleague">
                <v-container>
                    <v-row align="center">
                        <v-col>
                            <h1>{{ppTournamentTypeTitle(ppLeague.ppTournamentType)}}</h1>
                        </v-col>
                    </v-row>
                    <admin-p-p-tournament-expansion-panels 
                        tournamentColumn="ppLeague"
                        :tournamentId="ppLeagueId"
                        :userParticipations="ppLeague.userParticipations"
                        :lastPPRound="lastPPRound"
                        :onChange="getPPLeague"
                    />
                </v-container>
            </v-card>
        </v-container>
</template>
<script>
export default {
    layout: "admin",
    data(){
        return{
            loading: true,
            ppLeague: null,
            ppLeagueId: parseInt(this.$route.params.ppLeagueId),
            lastPPRound: null,
        }
    },
    methods:{
        async getPPLeague(){
            let response = await this.$api.call(this.API_ROUTES.PPLEAGUE.GET + this.ppLeagueId, null, 'GET');
            if(response && response.status === "success"){
                this.ppLeague = response.message;
                this.lastPPRound = [...this.ppLeague.ppRounds].pop();
            }
            this.loading = false;
        },
    },
    async mounted(){
       await this.getPPLeague();
    }
}
</script>
