<template>
    <v-expansion-panel :style="matchStatusStyle" class="admin-match">
        <v-expansion-panel-header hide-actions class="pa-0">
            <template v-slot:default="{ open }">
                <v-container>
                    <template v-if="open">
                        <v-row no-gutters class="ocrastd mb-2">#{{match.id}}-{{match.ls_id}}</v-row>
                    </template>
                    <v-row no-gutters align="center">
                        <v-col cols="auto" class="mr-2 pb-2">
                            <league-flag small :league="match.league" size="12"/>
                        </v-col>
                        <v-col cols="auto" class="text-overline" style="line-height:1rem;">{{match.league.tag}}</v-col>
                        <v-chip class="mx-2" x-small outlined label>R{{match.round}}</v-chip>
                        <v-spacer/>
                        <span class="text-caption">{{formatTime(match.date_start)}}</span>
                    </v-row>
                    <v-row no-gutters style="line-height:1rem;" class="text-overline">
                        {{match.homeTeam?.name}}
                    </v-row>
                    <v-row no-gutters style="line-height:1rem;" class="text-overline">
                        {{match.awayTeam?.name}}
                    </v-row>
                    <div v-if="!open" style="line-height:1rem;" class="text-overline">
                        {{match.score_home}} - {{match.score_away}}
                    </div>
                </v-container>
            </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="pa-2">
            <loading-page v-if="loading" />
            <v-container v-else class="pa-0 no-selection">
                <v-row no-gutters align="center" >
                    <select-integer justify="end"  @click.stop.native :model="homeModel" :setModel="(val)=>homeModel=val" :max="6"/>
                    <v-col cols="auto" class="px-4">
                        <h1>-</h1>
                    </v-col>
                    <select-integer  @click.stop.native :model="awayModel" :setModel="(val)=>awayModel=val" :max="6"/>
                </v-row>
                <v-row justify="center" class="pb-10">
                    <h3 class="pointer" @click="verify">VERIFY</h3>
                </v-row>
                <span class="text-caption"><b>created:</b> {{formatDate(match.created_at, true)}}</span>
                <span v-if="match.rescheduled_at" class="text-caption"><b>rescheduled:</b> {{formatDate(match.rescheduled_at, true)}}</span>
                <span  v-if="match.verified_at" class="text-caption"><b>verified:</b> {{formatDate(match.verified_at, true)}}</span>
            </v-container>
        </v-expansion-panel-content>                       
    </v-expansion-panel>
</template>
<script>
export default {
    props:{
        match: {type: Object, required:true},
    },
    data:()=>({homeModel:0, awayModel:0, loading: false}),
    computed:{
        matchStatusStyle:{
            get(){
                if(new Date(this.match.date_start).toISOString() < new Date().toISOString() && (this.match.score_home === null || !this.match.verified_at)){
                    return "background-color:orange;"
                }
            }
        }
    },
    methods:{
        async verify(){
            this.loading = true;
            let values = { 
                "home": this.homeModel,
                "away": this.awayModel
            }
            
            let response = await this.$api.call(
                this.ADMIN_API_ROUTES.MATCH.VERIFY + this.match.id, values, 'POST'
            );

            if(response && response.status === "success"){
                this.match.score_home = this.homeModel;
                this.match.score_away = this.awayModel;
                this.match.verified_at = response.message;
            }
            this.loading = false;
        }
    }
}
</script>
<style>
.admin-match .v-expansion-panel-content__wrap{
    padding:0px !important;
}
</style>