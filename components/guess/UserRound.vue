<template>
    <v-row 
        align="center" 
        justify="center" 
        class="text-center" 
        no-gutters
    >  
        <v-col 
            cols="4"
            v-for="pprm, index in ppRMs" 
            :key="index"
        >
            <guess-closed-box
                style="min-width:100px; max-width:100px;"
                :guess="pprm.guess"
                :match="pprm.match"
                :rgb="ppTournamentType.rgb"
                :onClick="selectGuess"
                thirdCellLocked="time"
            />
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        ppTournamentType: {tyep: Object},
        ppRMs: {type: Array}
    },
    data(){
        return {
            selectedGuessId: null
        }
    },
    methods:{
        async selectGuess(guess){
            if(guess.guessed_at || guess.verified_at)return;
            let guessList = this.ppRMs
                .filter(item => !item.guess.verified_at && !item.guess.guessed_at)
                .map(item => item.guess);
            await this.triggerHapticFeedback();

            this.$store.dispatch('openGuesses/update', {
                newGuess: guess,
                newList: guessList, 
            });
        }
    }
}
</script>