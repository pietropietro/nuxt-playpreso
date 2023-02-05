<template>
    <v-container v-if="ppLeague" >
        <v-row class="py-4"><h1>P-LEAGUE <span class="ocrastd">#{{ppLeague.id}}</span></h1></v-row>
        <v-card color="pleague">
            <v-container>
                <v-row align="center">
                    <v-col>
                        <h1>{{ppTournamentTypeTitle(ppLeague.ppTournamentType)}}</h1>
                    </v-col>
                </v-row>
                <v-expansion-panels class="py-10">
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            ROUNDS
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <loading-page v-if="loading" />
                            <template v-else-if="lastPPRound">
                                <v-row>
                                    <h2>ROUND {{lastPPRound.round}} <span class="ocrastd">#{{lastPPRound.id}}</span></h2>
                                </v-row>
                                <v-row>
                                    <v-col v-for="(pprm, index) in lastPPRound.ppRoundMatches" :key="pprm.id">
                                        <v-card>
                                            <v-container>
                                                <v-row class="ocrastd"><v-col>PPRM #{{pprm.id}}</v-col></v-row>
                                                <v-container>
                                                    <v-expansion-panels>
                                                        <admin-match-expansion-panel :match="pprm.match"/>
                                                    </v-expansion-panels>
                                                </v-container>
                                                <template v-if="!pprm.match.verified_at">
                                                    <v-row>
                                                        <v-col>
                                                            <v-text-field
                                                                placeholder="new match id"
                                                                v-model="swapIds[index]"
                                                            />
                                                        </v-col>
                                                    </v-row>
                                                    <v-row>
                                                        <v-spacer />
                                                            <v-col>
                                                                <v-btn :disabled="!swapIds[index]" @click="change(index)">SWAP</v-btn>
                                                            </v-col>
                                                        <v-spacer />
                                                    </v-row>
                                                </template>
                                            </v-container>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="auto">
                                        <v-card>
                                            <v-row>
                                                <v-col>
                                                    <v-text-field
                                                        placeholder="new match id"
                                                        v-model="newId"
                                                    />
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-spacer />
                                                    <v-col>
                                                        <v-btn :disabled="!newId" @click="createPPRM">CREATE PPRM</v-btn>
                                                    </v-col>
                                                <v-spacer />
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </template>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            UPS
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <p-p-league-standings-list
                                :ups="ppLeague.userParticipations"
                            />
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
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
            ppLeagueId: this.$route.params.ppLeagueId,
            lastPPRound: null,
            swapIds: [],
            newId: null
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
        async change(index){
            console.log(index);
            this.loading = true;
            let values = { 
                "newMatchId": this.swapIds[index],
            }
            
            let response = await this.$api.call(
                this.ADMIN_API_ROUTES.PPROUNDMATCH.SWAP + this.lastPPRound.ppRoundMatches[index].id, values, 'POST'
            );

            if(response && response.status === "success"){
                await this.getPPLeague();
            }
        },
        async createPPRM(){
            this.loading = true;
            let values = { 
                "newMatchId": this.newId,
            }
            
            let response = await this.$api.call(
                this.ADMIN_API_ROUTES.PPROUNDMATCH.CREATE + this.lastPPRound.id, values, 'POST'
            );

            if(response && response.status === "success"){
                await this.getPPLeague();
            }
        }
    },
    async mounted(){
       await this.getPPLeague();
    }
}
</script>
