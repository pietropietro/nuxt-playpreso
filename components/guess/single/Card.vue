<template>
    <div v-if="guess">
        <v-container style="max-width:360px">   
            <v-row
                class="rounded"
                @click="select"
                :style="{
                    height: cardHeight,
                    overflow: 'hidden',
                    backgroundColor: guess.verified_at ?  shades.verified : (guess.guessed_at ? shades.locked : shades.unlocked)
                }"
            >   
                <v-col cols="auto"
                    :style="{
                        backgroundColor: ppRGBA(rgb),
                        width: '20px',
                        height: cardHeight,
                        overflow: 'hidden'
                    }"
                    class="rounded-tl rounded-bl pa-1"
                >
                    <em-emoji
                        style="display:flex"
                        class="ml-n6 mt-n3"
                        :native="guess?.ppTournamentType?.emoji"
                        size="70"
                    />
                </v-col>
                
                <v-col 
                    cols="auto"  
                    :style="{
                        overflow: 'hidden',
                        height:  ['graphic', 'lock'].includes(item) ? '100%' : ''
                    }"
                    :class="item !== 'graphic' && index == (selectedView.length - 1) ? 'pa-0' : ''"
                    v-for="(item, index) in selectedView"
                    :key="index"
                    align-self="center"
                >   
                    <template v-if="item === 'league_position'">
                        <league-detail big :league="match.league" />
                        <div class="overline lh-1 text-center">position</div>
                    </template>
                    <template v-else-if="item === 'league_gol'">
                        <league-detail big :league="match.league" />
                        <v-row no-gutters>
                            <v-spacer/>
                            <v-col>
                                <em-emoji size="1.2em" id="soccer" />
                            </v-col>
                            <v-spacer/>
                            <v-col>
                                <em-emoji size="1.2em" id="goal_net" />
                            </v-col>
                            <v-spacer/>
                        </v-row>
                    </template>
                    <template v-else-if="item === 'last_matches_intro'">
                        <div class="overline lh-1 text-center">last 3 <br> matches</div>
                    </template>
                    <match-info-short v-else-if="item ===  'match_info'" :match="match"/>
                    <match-graphic-preview 
                        v-else-if="item==='graphic'"
                        :rgb="rgb" 
                        :match="match" 
                        :logoOnly="index < (selectedView.length - 1)"
                    />
                    <guess-single-view-locked v-else-if="item === 'locked'" 
                        :guess="guess"
                    />
                    <guess-single-view-unlocked v-else-if="item === 'lock'" 
                        :guess="guess" 
                        :rgb="rgb" 
                        :afterLock="afterLock"
                    />
                    <guess-single-view-stats-position v-else-if="item === 'stats_position'" 
                        :standings="standings" 
                        :rgb="rgb" 
                        :style="{ height: cardHeight, width: '100px'}"
                        rowHeight="45px"
                    />
                    <guess-single-view-stats-last1x2 v-else-if="item === 'stats_last_matches'" 
                        :match="match" 
                        :style="{ height: cardHeight, width: '100px'}"
                        :rgb="rgb" 
                        rowHeight="45px"
                    />
                    <guess-single-view-stats-gf-ga v-else-if="item === 'stats_gol'" 
                        :standings="standings" 
                        :style="{ height: cardHeight, width: '100px'}"
                        :rgb="rgb" 
                        rowHeight="45px"                        
                    />
                    <guess-single-view-points v-else-if="item === 'points'" :guess="guess"/>
                </v-col>
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
        let unlckd =  [['graphic']];
        unlckd.push(['match_info','lock']);
        if(this.match.league?.standings) unlckd.push([ 'league_position' ,'graphic','stats_position']);
        if(this.match.league?.standings) unlckd.push(['league_gol', 'graphic','stats_gol']);
        if(this.match.homeTeam?.lastMatches) unlckd.push(['last_matches_intro', 'graphic','stats_last_matches']);
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