<template>
    <div v-if="guess">
        <v-container 
            style="max-width:300px"
        >   
            <v-row 
                no-gutters
                v-if="!open"
                class="rounded"
                align="center"
                :style="{ 
                    height: cardHeight,
                    borderWidth:'2px',
                    borderColor: ppRGBA(guess.ppTournamentType?.rgb)
                }"
            >
                <v-col style="z-index:2" class="mr-n6"><team-example :matchId="match.id" :id="match.homeTeam?.id"/></v-col>
                <v-col style="z-index:2" ><team-example :matchId="match.id" :id="match.awayTeam.id"/></v-col>
                <v-col style="z-index:2" class=""><team-logo :id="match.homeTeam.id"/></v-col>
                <!-- <v-col  style="z-index:1"><em-emoji class="mr-n6" :native="guess.ppTournamentType?.emoji" size="3.5em" /></v-col> -->
                <v-col style="z-index:1"><team-logo :id="match.awayTeam.id"/></v-col>
            </v-row>
            <v-row 
                v-else
                class="rounded"
                @click="onTouch" 
                :style="{ 
                    height: cardHeight,
                    backgroundColor: guess.verified_at ?  shades.verified : (guess.guessed_at ? shades.locked : shades.unlocked) 
                }"
            >
                <v-col cols="auto">
                    <match-info-short :match="match"/>
                </v-col>
                <v-col class="pa-0" >
                    <guess-single-view-points v-if="selectedView === 'points'" :guess="guess"/>
                    <guess-single-view-locked v-else-if="selectedView === 'locked'" :guess="guess"/>
                    <guess-single-view-unlocked v-else-if="selectedView === 'lock'" :guess="guess" :rgb="rgb" :afterLock="afterLock"/>
                    <guess-single-view-stats-position v-else-if="selectedView === 'stats_position'" :standings="standings" :height="cardHeight"/>
                    <guess-single-view-stats-last1x2 v-else-if="selectedView === 'stats_last_matches'" :match="match" :height="cardHeight"/>
                    <guess-single-view-stats-gf-ga v-else-if="selectedView === 'stats_gol'" :standings="standings" :height="cardHeight"/>
                </v-col>
            </v-row>
        </v-container>
        <!-- <v-row justify="center" no-gutters class="rounded-br" :style="{backgroundColor: ppRGBA(guess.ppTournamentType?.rgb)}"> -->
            <!-- <v-chip v-if="guess.ppTournamentType" 
                small  > -->
                    <!-- <h2 class="ocrastd ">touch</h2> -->
            <!-- </v-chip> -->
            <!-- <em-emoji :native="guess.ppTournamentType.emoji" size="1.7em" /> -->
        <!-- </v-row> -->
        <!-- <guess-tournament-subtitle v-if="guess.ppTournamentType" 
            class="no-gutters"
            :ppTournamentType="guess.ppTournamentType" 
        /> -->
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
            cardHeight: '70px',
            unlockedViews: ['lock', 'stats_position', 'stats_last_matches', 'stats_gol'],
            lockedViews: ['locked'],
            verifiedViews: ['points', 'locked'],
            missedViews: ['points'],
            shades:{
                verified: this.ppRGBA(this.rgb, 0.2),
                locked:  this.ppRGBA(this.rgb, 0.8),
                unlocked:  this.ppRGBA(this.rgb, 0.6) 
            },
        }
    },
    computed:{
        availableViews(){
            if(this.isMissed(this.guess))return this.missedViews;
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
            if(!this.open){
                this.open = true;
                return;
            }
            if((this.selectedIndex + 1) < this.availableViews.length) return this.selectedIndex++;
            this.selectedIndex=0;
        },
    }
}
</script>