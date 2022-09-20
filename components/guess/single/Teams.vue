<template>
    <v-row align="center" no-gutters justify="space-between" >
        <v-col>
            <v-row no-gutters class="pl-2"><h1>{{match.score_home ?? ''}} {{match.homeTeam.name}}</h1></v-row>
            <v-row no-gutters class="pl-2"><h1>{{match.score_away ?? ''}} {{match.awayTeam.name}}</h1></v-row>
        </v-col>
        <v-col v-if="!guess.verified_at && !guess.guessed_at && homeStandings">
            <team-standings :standings="homeStandings"/>
            <team-standings :standings="awayStandings"/>
        </v-col>
        <v-col cols="auto" v-else>
            <guess-info :guess="guess" hideUsername/>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props: {
        match: {type: Object},
        guess: {type: Object}
    },
    computed:{
        homeStandings(){
            if(!this.match.league.standings)return;
            return this.match.league.standings.filter((e)=>e.id == this.match.homeTeam.id)[0];
        },
        awayStandings(){
            if(!this.match.league.standings)return;
            return this.match.league.standings.filter((e)=>e.id == this.match.awayTeam.id)[0];
        }
    }
}
</script>