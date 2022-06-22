<template>
    <div>
        <v-row justify="space-between" class="mb-2 px-2">
            <h1>{{$t('app.round') + ' ' + selectedRound}}</h1>
            <v-pagination
                v-if="ppRounds.length > 1"
                v-model="selectedRound"
                :length="ppRounds.length"
                circle
                class="pagination-arrows-only"
            />
        </v-row>
        <p-p-round-match
            v-for="(ppRM,i) in ppRounds[selectedRound - 1].ppRoundMatches" 
            :ppRM="ppRounds[selectedRound - 1].ppRoundMatches[i]" :key="i"
        />
        
    </div>
</template>
<script>
export default {
    name: "PPRoundSlider",
    props:{
        ppRounds: {type: Array, required: true},
        rounds: {type: Number, required: true},
    },
    data(){
        return{
            selectedRound: this.ppRounds.length
        }
    },
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