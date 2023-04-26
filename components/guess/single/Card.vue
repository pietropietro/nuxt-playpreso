<template>
    <div v-if="guess">
        <v-container 
            style="max-width:350px"
        >   
            <v-row
                class="rounded"
                @click="onTouch"
                :style="{
                    height: cardHeight,
                    backgroundColor: guess.verified_at ?  shades.verified : (guess.guessed_at ? shades.locked : shades.unlocked)
                }"
            >
                <v-col cols="auto" 
                    :style="{backgroundColor: ppRGBA(rgb)}"
                    :class="open ? 'pa-0' : 'rounded-tl rounded-bl pa-1'"
                >
                </v-col>
                <v-col cols="auto" v-if="selectedView && selectedView.length">
                    <match-info-short v-if="selectedView[0] ===  'match_info'" :match="match"/>
                    <guess-single-view-points v-else-if="selectedView[0] === 'points'" :guess="guess"/>
                </v-col>
                <v-col class="pa-0" v-if="selectedView.length > 1">
                    <guess-single-view-locked v-if="selectedView[1] === 'locked'" :guess="guess"/>
                    <guess-single-view-unlocked v-else-if="selectedView[1] === 'lock'" :guess="guess" :rgb="rgb" :afterLock="afterLock"/>
                    <guess-single-view-stats-position v-else-if="selectedView[1] === 'stats_position'" :standings="standings" :height="cardHeight"/>
                    <guess-single-view-stats-last1x2 v-else-if="selectedView[1] === 'stats_last_matches'" :match="match" :height="cardHeight"/>
                    <guess-single-view-stats-gf-ga v-else-if="selectedView[1] === 'stats_gol'" :standings="standings" :height="cardHeight"/>
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
        rgb: {type: String}
    },
    data(){
        return{
            selectedIndex: 0,
            open: false,
            cardHeight: '90px',
            unlockedViews: [
                ['match_info'], 
                ['match_info','lock'], 
                ['match_info','stats_position'], 
                ['match_info','stats_last_matches'], 
                ['match_info','stats_gol']
            ],
            lockedViews: [
                ['match_info', 'locked']
            ],
            verifiedViews: [
                ['points'],['match_info','locked']
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
        onTouch(){
            if(!this.open && this.availableViews.length > 1){
                this.open = true;
            }
            if((this.selectedIndex + 1) < this.availableViews.length) return this.selectedIndex++;
            this.selectedIndex=0;
            this.open = false;
        },
    }
}
</script>