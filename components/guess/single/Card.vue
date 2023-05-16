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
                <v-col v-if="guess?.ppTournamentType && (selectedIndex>0 || guess?.guessed_at || guess?.verified_at)"
                    cols="auto"
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
                <!-- START ALARM IF LESS THAN 1 day not motd -->
                <v-col
                    v-if="selectedIndex == 0 && guess?.ppTournamentType?.name != 'MOTD' &&
                        isWithinNext24Hours"
                    cols="auto"
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
                        native="alarm_clock"
                        size="70"
                    />
                </v-col>
                <!-- END ALARM -->
                <v-col 
                    cols="auto"  
                    :style="{
                        overflow: 'hidden',
                        height:  ['graphic', 'lock', 'league_position', 'league_gol'].includes(item) ? '100%' : ''
                    }"
                    :class="(item !== 'graphic' && index == (selectedView.length - 1) )
                        || ['league_gol', 'league_position'].includes(item) 
                     ? 'pa-0' : ''"
                    v-for="(item, index) in selectedView"
                    :key="index"
                    align-self="center"
                >   
                    <template v-if="item === 'league_position'">
                            
                        <league-detail big :league="match.league" 
                            :style="{ width: '149px', height: '45px'}"
                        />
                        <v-row no-gutters justify="center"
                            :style="{ width: '149px', height: '45px'}">
                            <div class="mt-2 overline lh-1 text-center">position</div>
                        </v-row>
                    </template>
                    <template v-else-if="item === 'league_gol'">
                        <div
                            :style="{width: '149px'}"
                        >
                            <league-detail big :league="match.league"  
                            :style="{ width: '149px', height: '45px'}"
                        />
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
                        </div>
                    </template>
                    <template v-else-if="item === 'last_matches_intro'">
                        <div class="overline lh-1 text-center"
                            :style="{ width: widthCentral}"
                        >
                            last 3 <br> matches
                        </div>
                    </template>
                    <match-info-short v-else-if="item ===  'match_info'" :match="match"
                        :style="{ width: widthCentral}"
                    />
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
                        :style="{ width: '115px'}"
                    />
                    <guess-single-view-stats-position v-else-if="item === 'stats_position'" 
                        :standings="standings" 
                        :rgb="rgb" 
                        :style="{ height: cardHeight, width: widthFinal}"
                        rowHeight="45px"
                    />
                    <guess-single-view-stats-last1x2 v-else-if="item === 'stats_last_matches'" 
                        :match="match" 
                        :style="{ height: cardHeight, width: widthFinal}"
                        :rgb="rgb" 
                        rowHeight="45px"
                    />
                    <guess-single-view-stats-gf-ga v-else-if="item === 'stats_gol'" 
                        :standings="standings" 
                        :style="{ height: cardHeight, width: widthFinal}"
                        :rgb="rgb" 
                        rowHeight="45px"                        
                    />
                    <guess-single-view-points 
                        class="px-2" 
                        v-else-if="item === 'points'" 
                        :guess="guess" 
                        :style="{ height: cardHeight, width: widthFinal}"
                    />
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
        if(this.match.homeTeam?.lastMatches?.length) unlckd.push(['last_matches_intro', 'graphic','stats_last_matches']);
        return{
            selectedIndex: 0,
            cardHeight: '90px',
            widthCentral: '125px',
            widthFinal: '80px',
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
        },
        isWithinNext24Hours() {
            if(!this.guess || !this.match)return false;
            // Get the current timestamp
            let currentTime = new Date().getTime();

            // Calculate the timestamp for the current time plus 24 hours
            let next24Hours = currentTime + (24 * 60 * 60 * 1000);

            // Parse the given match's start date
            let matchDate = new Date(this.match?.date_start).getTime();

            // Compare the match's start date with the current time plus 24 hours
            return matchDate <= next24Hours;
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
        },
    },
}
</script>