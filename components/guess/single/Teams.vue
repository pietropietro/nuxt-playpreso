<template>
    <v-row align="center" no-gutters justify="space-between" >
        <v-col  style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            <v-row no-gutters class="pl-2"><h1>{{match.score_home ?? ''}} {{match.homeTeam?.name}}</h1></v-row>
            <v-row no-gutters class="pl-2"><h1>{{match.score_away ?? ''}} {{match.awayTeam?.name}}</h1></v-row>
        </v-col>
        <v-col v-if="!guess.verified_at && !guess.guessed_at && homeStandings">
            <team-standings :standings="homeStandings"/>
            <team-standings :standings="awayStandings"/>
        </v-col>
        <v-col cols="auto" v-else>
            <div class="mx-2" v-if="guess.guessed_at && !guess.verified_at">
                <guess-single-picker :guess="guess"/>
                <h4>LOCKED</h4>
            </div>
            <guess-info class="" v-else :guess="guess" hideUsername/>
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
<style scoped>
.animated {
  overflow: hidden;
  width: 11rem;
  white-space: nowrap;
}

.animated > * {
  display: inline-block;
  position: relative;
  animation: 8s linear 0s infinite alternate move;
}

.animated > *.min {
  min-width: 100%;
}

@keyframes move {
  0%,
  25% {
    transform: translateX(0%);
    left: 0%;
  }
  75%,
  100% {
    transform: translateX(-100%);
    left: 100%;
  }
}


</style>