<template>
    <div v-if="guesses && match">
        <v-row no-gutters class="mt-4 flex-nowrap"
            @click="()=>(guessIndex < guesses.length -1) ? guessIndex ++ : guessIndex=0"
        >
            <v-col cols="auto">
                <h1 style="line-height:1em;">LAST<br v-if="$vuetify.breakpoint.mobile"> PRESO</h1>
                <user-name class="pl-2"
                    :user="guesses[guessIndex].user"
                />
                <div class="overline lh-1" v-if="guesses.length>1"> and {{guesses.length - 1}} others</div>
            </v-col>    
            <v-spacer/> 
            <v-col cols="auto" class="pt-4">
                <v-row>
                    <v-card flat class="rounded" :color="ppRGBA(guesses[guessIndex].ppTournamentType?.rgb)">
                        <v-container>
                            <match-info-short :match="match"/>
                        </v-container>
                    </v-card>
                </v-row>
                <v-row>
                    <h4 v-if="guesses[guessIndex].ppTournamentType">
                        <em-emoji :native="guesses[guessIndex].ppTournamentType.emoji" />
                        {{ppTournamentTypeTitle(guesses[guessIndex].ppTournamentType)}}
                    </h4>
                </v-row>
            </v-col>                
            <v-spacer/>
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