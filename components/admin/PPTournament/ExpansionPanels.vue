<template>
    <loading-page v-if="loading" />
    <v-expansion-panels class="py-10" v-else >
        <v-expansion-panel>
            <v-expansion-panel-header>
                ROUNDS
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <loading-page v-if="loading" />
                <template v-else>
                    <v-row>
                        <v-spacer />
                            <v-col>
                                <v-btn @click="createPPR">CREATE PPRound</v-btn>
                            </v-col>
                        <v-spacer />
                    </v-row>
                    <template v-if="lastPPRound">
                        <v-row>
                            <h2>ROUND {{lastPPRound.round}} <span class="ocrastd">#{{lastPPRound.id}}</span></h2>
                        </v-row>
                        <v-row class="caption"> enter 123 to activate delete button</v-row>
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
                                                <v-col>
                                                    <v-btn :disabled="swapIds[index] != '123'" @click="deletePPRM(pprm.id)">DELETE</v-btn>
                                                </v-col>
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
                </template>
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
            <v-expansion-panel-header>
                UPS
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-row>
                    <v-col v-for="up in userParticipations" :key="up.id">
                        #{{up.user_id }} p.{{up.position}} {{up.username}}: {{up.points}}
                    </v-col>
                </v-row>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>
<script>

export default {
    props:{
        // can be ppLeague OR ppCupGroup
        tournamentColumn: {type: String},
        tournamentId: {type: Number},
        onChange: {type: Function},
        lastPPRound: {type: Object},
        userParticipations: {type: Array},
    },
    data(){
        return{
            loading: false,
            swapIds: [],
            newId: null
        }
    },
    methods:{
        async change(index){
            this.loading = true;
            let values = { 
                "newMatchId": this.swapIds[index],
            }
            
            let response = await this.$api.call(
                this.ADMIN_API_ROUTES.PPROUNDMATCH.SWAP + this.lastPPRound.ppRoundMatches[index].id, values, 'POST'
            );

            if(response && response.status === "success"){
                await this.onChange();
            }
            this.swapIds = [];
            this.loading = false;
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
                await this.onChange();
            }
            this.newId = null;
            this.loading = false;
        },
        async createPPR(){
            if(!['ppLeague', 'ppCupGroup'].includes(this.tournamentColumn)) return;
            this.loading = true;
            let values = { 
                "tournament": this.tournamentColumn,
            }
            
            let response = await this.$api.call(
                this.ADMIN_API_ROUTES.PPROUND.CREATE + this.tournamentId, values, 'POST'
            );
            if(response && response.status === "success"){
                await this.onChange();
            }
            this.loading = false;

        },
        async deletePPRM(ppRoundMatchId){
            this.loading = true;
            let response = await this.$api.call(
                this.ADMIN_API_ROUTES.PPROUNDMATCH.DELETE + ppRoundMatchId, null, 'DELETE'
            );
            if(response && response.status === "success"){
                await this.onChange();
            }
            this.loading = false;
        }
    },
}
</script>

