<template>
    <div>
        <v-row no-gutters class="my-4 pr-3 pr-md-0">    
            <v-col v-for="i in 5" :key="i">
                <h4 v-if="i<=ppRounds.length"
                    class="pointer text-center rounded" 
                    :style="selectedRound===i ? 'background-color:' + ppRGBA($store.state.navigation.rgb,0.6) : ''" 
                    @click="()=>selectedRound = i" > {{i}}
                </h4> 
                <div class=" text-center" v-else>{{i}}</div>
            </v-col>
        </v-row>
        <p-p-round-display
            class="ma-0"
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