<template>
    <div v-if="guess">
        <v-container 
            style="max-width:300px"
        >   
        <v-row 
            :class="'rounded '"
            @click="flip" 
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
        <guess-tournament-subtitle v-if="guess.ppTournamentType" 
            class="no-gutters"
            :ppTournamentType="guess.ppTournamentType" 
        />
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
            cardHeight: '90px',
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
        flip(){
            if((this.selectedIndex + 1) < this.availableViews.length) return this.selectedIndex++;
            this.selectedIndex=0;
        },
    }
}
</script>