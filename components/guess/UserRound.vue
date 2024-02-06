<template>
    <v-row>
        <v-col 
            v-for="pprm, index in ppRMs" :key="index"
            cols="12"
            :class="index == 1 && !$vuetify.breakpoint.mdAndUp ? 'my-2' : ''"
        >
            <v-row justify="center" >
                <guess-match-intro-box
                    :guess="pprm.guess"
                    :match="pprm.match"
                    :rgb="ppTournamentType.rgb"
                    :onClick="selectGuess"
                />
                <!--                     :afterLock="afterLock" -->
            </v-row>
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
        async selectGuess(guess, match){
            await this.triggerHapticFeedback();
            this.$store.dispatch(
                'openGuess/update', 
                {
                    newGuess: guess,
                    newMatch: match,
                    newPPTournamentType: this.ppTournamentType
                }
            );
        }
    }
}
</script>