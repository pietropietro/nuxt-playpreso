<template>
    <v-container>
        <v-row><h1>P-LEAGUES</h1></v-row>
        <admin-p-p-tournament-type-filter
            :name="ppttNameModel" 
            :setName="(val)=>ppttNameModel=val"
            :level="ppttLevelModel" 
            :setLevel="(val)=>ppttLevelModel=val"
            :loading="loading"
            :onClear="clear"
        />
        <admin-tournament-status-filter 
            :finished="finishedModel" 
            :setFinished="(val)=>finishedModel=val"
            :started="startedModel" 
            :setStarted="(val)=>startedModel=val"
            :paused="pausedModel" 
            :setPaused="(val)=>pausedModel=val"
            :loading="loading"
        />

        <loading-page v-if="loading" />
        <v-row v-else-if="ppLeagues?.length" class="mt-10">
            <v-col v-for="(ppLeague,index) in ppLeagues" :key="index" cols="12" sm="4">
                <admin-p-p-league-detail :ppLeague="ppLeague" />
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
        ppttNameModel: null,
        ppttLevelModel: null,
        finishedModel: 'not-finished',
        startedModel: 'started',
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
                + (!!this.ppttNameModel ? '&ppTournamentTypeName='  + this.ppttNameModel : '')
                + (this.ppttLevelModel > 0 ? '&ppTournamentTypeLevel='  + this.ppttLevelModel : '')
            );
            if(response && response.status === "success"){
                this.ppLeagues = response.message;
            }
            this.loading = false;
        },
        clear(){
            this.finishedModel="not-finished";
            this.startedModel="started"
        }
    },
    watch: {
        ppttNameModel: async function () {
            await this.getPPLeagues();
        },
        ppttLevelModel: async function () {
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
