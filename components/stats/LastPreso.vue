<template>
    <div v-if="guesses && match">
        <v-row no-gutters ><h1 class="">LAST <span class="">PRESO!</span></h1></v-row>
        <v-row no-gutters class="px-4" @click="()=>(guessIndex < guesses.length -1) ? guessIndex ++ : guessIndex=0">
            <v-col>
                <match-info-short :match="match"/>
            </v-col>
            <v-col>
                <user-name 
                    
                    :user="guesses[guessIndex].user" 
                />
                <div class="overline lh-1" v-if="guesses.length>1"> and {{guesses.length - 1}} others</div>
            </v-col>
            
        </v-row>
    </div>
</template>
<script>
export default {
    data(){
        return {
            guesses: null,
            match: null,
            guessIndex: null
        }
    },
    methods:{
        async getLastPreso(){
            let response = await this.$api.call(this.API_ROUTES.STATS.LAST_PRESO);
            if(response && response.status === "success"){
                this.guesses = response.message?.guesses;
                this.match = response.message?.match;
                this.guessIndex = Math.floor(Math.random() * this.guesses.length)
            }
            this.loading = false;
        },
    },
    async mounted(){
        await this.getLastPreso(); 
    }
}
</script>