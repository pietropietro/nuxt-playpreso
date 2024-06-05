<template>
    <div>
        <v-row no-gutters class="my-4 pr-3 pr-md-0">    
            <v-col v-for="i in rounds" :key="i" 
                :cols="rounds.length === 1 ? '4' : ''"
            >
                
                <h4 v-if="i<=ppRounds.length"
                    :class="'pointer text-center rounded ' + (selectedRound===i ? ' white--text' : '')" 
                    :style="selectedRound===i ? 'background-color:' + ppRGBA(rgb) : ''" 
                    @click="()=>selectedRound = i" 
                > 
                    {{i}}
                </h4> 
                <div class=" text-center" v-else>{{i}}</div>
            </v-col>
        </v-row>
        <p-p-round-display
            class="ma-0"
            v-for="(ppRM, i) in ppRounds[selectedRound - 1].ppRoundMatches" 
            :ppRM="ppRM" :key="i"
            :color="ppRGBA(rgb)"
        />
        <!--  :onLastLock="selectedRound == ppRounds.length ? fetchRound : null" -->
    </div>
</template>
<script>
export default {
    props:{
        ppRounds: {type: Array, required: true},
        rounds: {type: Number, required: true},
        setPPRounds: {type: Function},
        rgb: {type: String}
    },
    data(){
        return{
            selectedRound: this.ppRounds.length
        }
    },
    methods: {
        async fetchRound(ppRoundId){           
            let response = await this.$api.call(this.API_ROUTES.PPROUND.GET + ppRoundId);
            if(response && response.status === "success"){
                this.ppTournamentTypes = response.message;
            }
            let copy = this.ppRounds.map((r) => {
                if(r.id === ppRoundId) return response.message;
                return r;
            });
            this.setPPRounds(copy);
        }
    }
}
</script>

<style>

    .v-pagination__navigation{
        box-shadow: none !important;
    }
</style>