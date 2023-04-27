<template>
    <div v-if="guess">
        <v-container style="max-width:300px">   
            <v-row
                class="rounded"
                @click="select"
                :style="{
                    height: cardHeight,
                    backgroundColor: guess.verified_at ?  shades.verified : (guess.guessed_at ? shades.locked : shades.unlocked)
                }"
            >   
                <template v-if="selectedView[0]==='preview'">
                    <v-col cols="auto"
                        :style="{
                            backgroundColor: ppRGBA(rgb),
                            width: '30px',
                            overflow: 'hidden'
                        }"
                        class="rounded-tl rounded-bl pa-1"
                        v-if="selectedIndex === 0"
                    >
                        <em-emoji
                            :native="guess?.ppTournamentType?.emoji"
                            size="50"
                        />
                    </v-col>
                    <v-col>
                        <v-row class="flex-column" style="height:100%" no-gutters  >
                            <v-row align="center" >
                                <v-col cols="auto" class="ml-2" style="z-index:2">
                                    <team-logo :id="match.homeTeam.id" :size="26"  />
                                </v-col>
                                <v-col>
                                    <div class="overline lh-1 ml-n2"
                                        :style="{fontWeight:'bold', fontSize:'1.2rem !important'}"
                                    >
                                        {{match.homeTeam.name.substr(0,3)}}
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row align="center"
                                :style="{backgroundColor: shades.locked}"
                            >
                                <v-col cols="auto" class="ml-2">
                                    <team-logo :id="match.awayTeam.id" :size="26" />
                                </v-col>
                                <v-col>
                                    <div class="overline lh-1 ml-n2"
                                        :style="{fontWeight:'bold', fontSize:'1.2rem !important'}"
                                    >
                                        {{match.awayTeam.name.substr(0,3)}}
                                    </div>
                                </v-col>
                            </v-row>
                        </v-row>
                    </v-col>
                </template>
                <template v-else>
                    <v-col cols="auto"
                        :style="{backgroundColor: ppRGBA(rgb)}"
                        class="rounded-tl rounded-bl pa-1"
                        v-if="selectedIndex === 0"
                    />
                    <v-col cols="auto" v-if="selectedView && selectedView.length">
                        <match-info-short v-if="selectedView[0] ===  'match_info'" :match="match"/>
                        <guess-single-view-points v-else-if="selectedView[0] === 'points'" :guess="guess"/>
                    </v-col>
                    <v-col class="pa-0" v-if="selectedView.length > 1" style="overflow:hidden">
                        <guess-single-view-locked v-if="selectedView[1] === 'locked'" :guess="guess"/>
                        <guess-single-view-unlocked v-else-if="selectedView[1] === 'lock'" :guess="guess" :rgb="rgb" :afterLock="afterLock"/>
                        <guess-single-view-stats-position v-else-if="selectedView[1] === 'stats_position'" :standings="standings" :height="cardHeight"/>
                        <guess-single-view-stats-last1x2 v-else-if="selectedView[1] === 'stats_last_matches'" :match="match" :height="cardHeight"/>
                        <guess-single-view-stats-gf-ga v-else-if="selectedView[1] === 'stats_gol'" :standings="standings" :height="cardHeight"/>
                        <guess-single-view-points v-else-if="selectedView[1] === 'points'" :guess="guess"/>
                        <template v-else-if="selectedView[1] === 'logos'">
                            <v-row :style="'max-height:' + cardHeight">
                                <v-col style="z-index: 2;" cols="12">
                                    <team-logo :id="match.homeTeam.id" :size="60" class="mr-n6" />
                                </v-col>
                                <v-col cols="12">
                                    <team-logo :id="match.awayTeam.id" :size="60" class="mt-n6 ml-n6" />
                                </v-col>
                            </v-row>
                        </template>
                    </v-col>
                </template>
            </v-row>
        </v-container>
    </div>
    <error-wall v-else/>
</template>
<script>
export default {
    props:{
        guess: {type: Object, required: true},
        afterLock: {type: Function},
        match: {type: Object, required: true},
        rgb: {type: String},
        setSelectedGuessId: {type: Function},
        selectedGuessId: {type: Number},
        extended: {type: Boolean}
    },
    data(){
        let unlckd =  [['preview']];
        unlckd.push(['match_info','lock']);
        if(this.match.league?.standings) unlckd.push(['match_info','stats_position']);
        if(this.match.homeTeam?.lastMatches) unlckd.push(['match_info','stats_last_matches']);
        if(this.match.league?.standings) unlckd.push(['match_info','stats_gol']);
        return{
            selectedIndex: 0,
            cardHeight: '90px',
            unlockedViews: unlckd,
            lockedViews: [
                ['match_info', 'locked']
            ],
            verifiedViews: [
                (this.extended ? ['match_info', 'points'] : ['points']), 
                ['match_info','locked']
            ],
            shades:{
                verified: this.ppRGBA(this.rgb, 0.2),
                locked:  this.ppRGBA(this.rgb, 0.8),
                unlocked:  this.ppRGBA(this.rgb, 0.6) 
            },
        }
    },
    computed:{
        availableViews(){
            if(this.guess.verified_at) return this.verifiedViews;
            if(this.guess.guessed_at) return this.lockedViews;
            return this.unlockedViews;
        },
        selectedView(){
            return this.availableViews[this.selectedIndex] ?? this.availableViews[0];
        },
        standings(){
            if(!this.homeStandings) return []
            return [this.homeStandings, this.awayStandings];
        },
        homeStandings(){
            if(!this.match.league?.standings)return;
            return this.match.league.standings.filter((e)=>e.id == this.match.homeTeam.id)[0];
        },
        awayStandings(){
            if(!this.match.league?.standings)return;
            return this.match.league.standings.filter((e)=>e.id == this.match.awayTeam.id)[0];
        }
    },
    methods:{
        select(){
            this.setSelectedGuessId(this.guess.id);
            if((this.selectedIndex + 1) < this.availableViews.length) return this.selectedIndex++;
            this.setSelectedGuessId(null);
        },
    },
    //close guess if other guess has been selected
    watch: {
        selectedGuessId (newId, oldId) {
           if(newId !== this.guess.id)this.selectedIndex=0;
        }
    },
}
</script>