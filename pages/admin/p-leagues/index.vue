<template>
    <v-container>
        <v-row><h1>P-LEAGUES</h1></v-row>
        <v-row align="center">
            <admin-select-p-p-tournament-type :model="ppTTselected" :setPPtt="(val)=>ppTTselected=val"/>
        </v-row>
        <v-row justify="space-between" align="center">
            <v-col>
                <v-row justify="start">
                    <v-chip-group
                        active-class="primary"
                        v-model="startedModel"
                        v-for="st in startedTypes" :key="st"
                    >
                        <v-chip small :value="st">{{st}}</v-chip>
                    </v-chip-group>
                </v-row>
            </v-col>
             <v-col cols="auto">
                <v-chip 
                    @click="pausedModel = !pausedModel"
                    :class="pausedModel ? 'primary' : ''"
                    small
                >paused</v-chip>
            </v-col>
            <v-col>
                <v-row justify="end">
                    <v-chip-group
                        active-class="primary"
                        v-model="finishedModel"
                        v-for="ft in finishedTypes" :key="ft"
                    >
                        <v-chip small :value="ft">{{ft}}</v-chip>
                    </v-chip-group>
                </v-row>
            </v-col>
        </v-row>
        <loading-page v-if="loading" />
        <v-row v-else-if="ppLeagues?.length" class="mt-10">
            <v-col v-for="(ppLeague,index) in ppLeagues" :key="index" cols="12" sm="4">
                <v-card color="primary" class="">
                    <nuxt-link :to="ADMIN_FEATURES.PPLEAGUES.DETAIL.ROUTE + ppLeague.id" class="no-decoration">
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
                                <v-row>started: <emoji-flag :model="!!ppLeague.started_at ? 'green ok' :'red x'"/></v-row>
                                <v-row>finished: <emoji-flag :model="!!ppLeague.finished_at ? 'green ok' :'red x'"/></v-row>
                            </v-container>
                        </v-container>
                    </nuxt-link>
                    <v-row v-if="ppLeague.started_at" class="flex-nowrap" no-gutters>
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
                            <v-expansion-panels v-if="ppLeague.nextMatch">
                                <v-col>
                                    <admin-match-expansion-panel :match="ppLeague.nextMatch"/>
                                </v-col>
                            </v-expansion-panels>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else>no p-leagues found.</v-row>
    </v-container>
</template>
<script>
export default {
    layout: "admin",
    data:()=>({
        loading: false,
        ppLeagues: [],
        ppTTselected: null,
        finishedModel: 'all',
        finishedTypes: ['all', 'finished', 'not-finished'],
        startedModel: 'all',
        startedTypes: ['all', 'started', 'not-started'],
        pausedModel: false,
    }),
    methods:{
        async getPPLeagues(){
            if(this.loading)return;
            this.loading= true;
            let response = await this.$api.call(
                this.ADMIN_API_ROUTES.PPLEAGUE.GET 
                + '?ft=' + this.finishedModel
                + '&st=' + this.startedModel
                + '&paused=' + Number(this.pausedModel)
                + (this.ppTTselected ? ('&ppTournamentTypeId=' + this.ppTTselected) : '')
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
        },
        finishedModel: async function (newVal) {
            if(['finished', 'all'].includes(newVal)) this.pausedModel = false;
            await this.getPPLeagues();
        },
        startedModel: async function (newVal) {
            if(['not-started', 'all'].includes(newVal)) this.pausedModel = false;
            await this.getPPLeagues();
        },
        pausedModel: async function (newVal,oldVal) {
            if(newVal === true){
                this.finishedModel = 'not-finished'
                this.startedModel = 'started'
            }
            await this.getPPLeagues();
        }
    },
    async mounted(){
        await this.getPPLeagues();
    }
}
</script>
