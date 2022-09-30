<template>
    <div>
        <v-row align="center">
            <v-col cols="auto">
                <p-p-simple-pagination
                    :length="ppRounds.length"
                    :value="selectedRound"
                    :setValue="(newVal) => selectedRound = newVal"
                >
                    <v-row justify="center" align="end" slot="selected-page">
                        <p-p-info :value="selectedRound" :value2="rounds"/>
                    </v-row>
                </p-p-simple-pagination>
            </v-col>
            <!-- <v-col v-for="(item, index) in ppRounds[selectedRound - 1].best" :key="index" cols="6" md="3">
                <p-p-info :label="'#' + (index+1) " :value="item.username" :value2="'+'+item.sum_points" small/>
            </v-col> -->
        </v-row>
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