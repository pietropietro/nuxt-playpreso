<template>
    <div>
        <v-row no-gutters class="my-4 px-4">    
            <v-col v-for="i in rounds" :key="i" 
                :cols="rounds.length === 1 ? '4' : ''"
            >
                <h4 v-if="i<=ppRounds.length"
                    :class="'pointer text-center rounded ' + (selectedRound===i ? ' white--text' : '')" 
                    :style="selectedRound===i ? 'background-color:' + ppRGBA(ppTournamentType.rgb) : ''" 
                    @click="()=>selectedRound = i" 
                > 
                    {{i}}
                </h4> 
                <div class=" text-center" v-else>{{i}}</div>
            </v-col>
        </v-row>
        <guess-user-round 
            v-if="userInTournament"
            :ppRMs="userCurrentRound" 
            :rgb="ppTournamentType.rgb" 
            class="my-10"
        />
        <p-p-round-display
            class="ma-0 pl-4"
            v-for="(ppRM, i) in ppRounds[selectedRound - 1].ppRoundMatches" 
            :ppRM="ppRM" :key="i"
            :color="ppRGBA(ppTournamentType.rgb)"
        />
    </div>
</template>
<script>
export default {
    props:{
        ppRounds: {type: Array, required: true},
        rounds: {type: Number, required: true},
        ppTournamentType: {type: Object},
        userInTournament: {type: Boolean}
    },
    data(){
        return{
            selectedRound: this.ppRounds.length
        }
    },
    computed:{
        userCurrentRound(){
            if(!this.ppRounds) return null;
            return this.ppRounds[this.selectedRound - 1].ppRoundMatches.map((pprm) => {
                let guess = pprm.guesses.filter(g => g.user_id === this.currentUser.id)[0];
                guess.ppTournamentType = this.ppTournamentType;
                guess.match = pprm.match;
                return {
                    match: pprm.match,
                    guess: guess
                };
            });
        },
    },
}
</script>

<style>

    .v-pagination__navigation{
        box-shadow: none !important;
    }
</style>