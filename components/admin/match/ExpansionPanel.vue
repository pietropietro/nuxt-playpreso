<template>
    <v-expansion-panel :style="matchStatusStyle" class="admin-match">
        <v-expansion-panel-header hide-actions class="pa-0">
            <template v-slot:default="{ open }">
                <v-container>
                    <template v-if="open">
                        <v-row no-gutters class="ocrastd mb-2">#{{match.id}}-{{match.ls_id}}</v-row>
                    </template>
                    <v-row no-gutters align="center">
                        <league-detail :league="match.league"/>
                        <v-chip class="mx-2" x-small outlined label>R{{match.round}}</v-chip>
                        <v-spacer/>
                        <span class="text-caption" v-if="timeOnly">{{formatTime(match.date_start)}}</span>
                        <span class="text-caption" v-else>{{formatDate(match.date_start, true)}}</span>
                    </v-row>
                    <v-row no-gutters style="line-height:1rem;" class="text-overline">
                        {{match.homeTeam?.name}}
                    </v-row>
                    <v-row no-gutters style="line-height:1rem;" class="text-overline">
                        {{match.awayTeam?.name}}
                    </v-row>
                    <v-row no-gutters v-if="!open" style="line-height:1rem;" class="text-overline">
                        <v-col>{{match.score_home}} - {{match.score_away}}</v-col>
                        <v-col v-if="match.notes"><h4>{{match.notes}}</h4></v-col>
                    </v-row>
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
                <span  v-if="match.verified_at" class="text-caption"><b>verified:</b> {{formatDate(match.verified_at, true)}}</span>
            </v-container>
            <h3 class="red--text pointer mt-5 text-center"  v-if="!match.aggregateGuesses && !match.verified_at && !!onDelete"
                @click="deleteMatch"
            >
                DELETE
            </h3>
        </v-expansion-panel-content>     
        <!-- style="var(background-color:--v-primary-lighten1);" -->
        <div v-if="match.aggregateGuesses">
            <v-container class="footer py-1" >
                <v-row no-gutters>
                    <v-col align-self="center">
                        <div style="line-height:1rem" class="overline"><b>{{match.aggregateGuesses}}</b></div>
                    </v-col>
                    <template v-if="match.verified_at">
                        <v-col>
                            <div style="line-height:1rem" class="overline"><b>{{match.aggregateUNOX2}}%</b></div>
                            <div class="caption">1X2</div>
                        </v-col>
                        <v-col>
                            <div style="line-height:1rem" class="overline"><b>{{match.aggregateGGNG}}%</b></div>
                            <div class="caption">GGNG</div>
                        </v-col>
                        <v-col>
                            <div style="line-height:1rem" class="overline"><b>{{match.aggregateUO25}}%</b></div>
                            <div class="caption">UO25</div>
                        </v-col>
                        <v-col>
                            <div style="line-height:1rem" class="overline"><b>{{match.aggregatePRESO}}%</b></div>
                            <div class="caption">PRESO</div>
                        </v-col>
                    </template>
                </v-row>
            </v-container>
        </div>  
    </v-expansion-panel>
</template>
<script>
export default {
    props:{
        match: {type: Object, required:true},
        timeOnly: {type: Boolean},
        onDelete:{type: Function}
    },
    data:()=>({homeModel:0, awayModel:0, loading: false}),
    computed:{
        matchStatusStyle:{
            get(){
                if(!!this.match.notes){
                    return "background-color:red;"
                }
                if(new Date(this.match.date_start).toISOString() < new Date().toISOString() && (this.match.score_home === null || !this.match.verified_at)){
                    return "background-color:orange;"
                }
                if(!this.match.verified_at){
                    return "background-color: var(--v-primary-lighten2);"
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
        },
        async deleteMatch(){
            this.loading = true;
            let response = await this.$api.call(
                this.ADMIN_API_ROUTES.MATCH.DELETE + this.match.id, null, 'DELETE'
            );
            if(response && response.status === "success"){
                this.onDelete();
            }
            this.loading=false;
        }
    }
}
</script>
<style>
.admin-match .v-expansion-panel-content__wrap{
    padding:0px !important;
}
.footer{
    background-color: var(--v-primary-darken1);
}
</style>