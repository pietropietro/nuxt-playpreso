<template>
    <div>
        <p-p-simple-pagination 
            :length="ppRounds.length" 
            :value="selectedRound" 
            :setValue="(newVal) => selectedRound = newVal"
        >
            <v-row justify="center" align="end" slot="selected-page">
                <p-p-info wide :label="$t('app.round')" :value="selectedRound" :value2="rounds"/>
            </v-row>
        </p-p-simple-pagination>
        <!-- <guess-user-round v-if="cuInTournament" :ppRMs="userCurrentRound"/> -->
        <p-p-round-display
            v-for="(ppRM,i) in ppRounds[selectedRound - 1].ppRoundMatches" 
            :ppRM="ppRounds[selectedRound - 1].ppRoundMatches[i]" :key="i"
        />
    </div>
</template>
<script>
export default {
    props:{
        ppRounds: {type: Array, required: true},
        rounds: {type: Number, required: true},
        // cuInTournament: {type: Boolean}
    },
    data(){
        return{
            selectedRound: this.ppRounds.length
        }
    },
    // computed:{
        // userCurrentRound(){
        //     return this.ppRounds[this.selectedRound-1].ppRoundMatches.map((pprm) => {
        //         return {
        //             match: pprm.match,
        //             guess: pprm.guesses.filter(g => g.user_id === this.currentUser.id)[0]
        //         };
                
        //     });
        // },
    // }
}
</script>

<style>
    .pagination-arrows-only .v-pagination__item{
        display: none !important;
    }
    .pagination-arrows-only .v-pagination__more{
        display: none;
    }
    .v-pagination__navigation{
        box-shadow: none !important;
    }
</style>