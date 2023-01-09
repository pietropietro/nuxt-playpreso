<template>
    <v-container>
        <v-row><h1>P-LEAGUES</h1></v-row>
        <v-row align="center">
            <admin-select-p-p-tournament-type :model="ppTTselected" :setPPtt="(val)=>ppTTselected=val"/>
        </v-row>
        <v-row v-if="ppLeagues?.length">
            <v-col v-for="(ppLeague,index) in ppLeagues" :key="index">
                <nuxt-link :to="ADMIN_FEATURES.PPLEAGUES.DETAIL.ROUTE + ppLeague.id" class="no-decoration">
                    <v-card color="var(--v-pleague-base)">
                        <v-container>
                            <v-row>
                                <v-col>
                                    <div class="ocrastd">
                                        #{{ppLeague.id}}
                                    </div>
                                    <h2>{{ppTournamentTypeTitle(ppLeague.ppTournamentType)}}</h2>
                                </v-col>
                                <v-col class="overline lh-1">
                                    users: {{ppLeague.user_count}}
                                    <p-p-round-row-recap v-if="ppLeague.started_at"
                                        :currentRound="ppLeague.currentRound" :rounds="ppLeague.ppTournamentType.rounds"
                                        :playedInCurrentRound="ppLeague.playedInCurrentRound"
                                    />
                                </v-col>
                            </v-row>
                            <v-container class="mx-2 overline lh-1">
                                <v-row>created_at: {{ppLeague.created_at}}</v-row>
                                <v-row>started: <p-p-emoji :model="!!ppLeague.started_at ? 'green ok' :'red x'"/></v-row>
                                <v-row>finished: <p-p-emoji :model="!!ppLeague.finished_at ? 'green ok' :'red x'"/></v-row>
                            </v-container>
                        </v-container>
                    </v-card>
                </nuxt-link>
                <v-row v-if="ppLeague.started_at" class="flex-nowrap">
                    <v-col class="overline lh-1">
                        last<br>match
                        <v-expansion-panels v-if="ppLeague.lastMatch">
                            <v-col>
                                <admin-match-expansion-panel :match="ppLeague.lastMatch"/>
                            </v-col>
                        </v-expansion-panels>
                    </v-col>
                    <v-col class="overline lh-1">
                        next<br>match
                        <v-expansion-panels>
                            <v-col>
                                <admin-match-expansion-panel :match="ppLeague.nextMatch"/>
                            </v-col>
                        </v-expansion-panels>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row v-else>no p-leagues found.</v-row>
    </v-container>
</template>
<script>
export default {
    layout: "admin",
    data:()=>({
        loading: true,
        ppLeagues: [],
        ppTTselected: null,
    }),
    methods:{
        async getPPLeagues(){
            let response = await this.$api.call(
                this.ADMIN_API_ROUTES.PPLEAGUE.GET + (this.ppTTselected ? ('?ppTournamentTypeId=' + this.ppTTselected) : '')
            );
            if(response && response.status === "success"){
                this.ppLeagues = response.message;
            }
            this.loading = false;
        }
    },
    watch: {
        ppTTselected: async function () {
            await this.getPPLeagues();
        }
    },
    async mounted(){
        await this.getPPLeagues();
    }
}
</script>
