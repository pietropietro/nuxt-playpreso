<template>
    <v-card flat class="transparent">
        <match-time-row :match="match" :style="'background-color: ' + ppRGBA($store.state.navigation.rgb)"/>
        <div :style="'background-color: ' + ppRGBA($store.state.navigation.rgb, .6)">
            <team-row 
                :teamName="match.homeTeam.name" 
                :teamStandings="homeStandings" 
                :lockedText="guess.guessed_at ? guess.home + '-' + guess.away : null"
            />
            <team-row 
                :teamName="match.awayTeam.name" 
                :teamStandings="awayStandings" 
                :lockedText="guessStatus"
            />
        </div>
        <template v-if="!guess.guessed_at && !guess.verified_at">
            <guess-single-picker
                class="py-5"
                :guess="guess"
                :style="'background-color: ' + ppRGBA($store.state.navigation.rgb, .2)"
            />
            <guess-single-bottom-action
                :style="'background-color: ' + ppRGBA($store.state.navigation.rgb)"
                :guess="guess"
                :onclick="lockGuess"
            />
        </template>
    </v-card>
</template>
<script>
export default {
    props:{
        guess: {type: Object, required: true},
        match: {type: Object, required: true},
    },
    data(){
        return{
            lockButtonLoading: false
        }
    },
    computed:{
        guessStatus(){
            if(this.guess.guessed_at && this.guess.verified_at) return (this.guess.points > 0 ? '+' : '') + this.guess.points  ;
            if(!this.guess.guessed_at && !this.guess.verified_at) return null;
            if(!this.guess.guessed_at && this.guess.verified_at) return 'MISSED'
            return 'LOCKED';
        },
        homeStandings(){
            if(!this.match.league.standings)return;
            return this.match.league.standings.filter((e)=>e.id == this.match.homeTeam.id)[0];
        },
        awayStandings(){
            if(!this.match.league.standings)return;
            return this.match.league.standings.filter((e)=>e.id == this.match.awayTeam.id)[0];
        }
    },
    methods:{
        async lockGuess(){
            this.lockButtonLoading = true;
            let home = this.guess.home ?? 0;
            let away = this.guess.away ?? 0;
      
            let values = { 
                "home": home,
                "away": away
                }
            
            
            let response = await this.$api.call(
                this.API_ROUTES.GUESS.LOCK + this.guess.id, values, 'POST'
            );

            if(response && response.status === "success"){
                this.guess.guessed_at = new Date();
            }
            this.lockButtonLoading = false;
        }
    }
}
</script>