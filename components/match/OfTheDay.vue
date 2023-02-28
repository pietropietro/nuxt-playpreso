<template>
    <loading-page v-if="loading"/>
    <v-container v-else-if="ppRoundMatch">
        <v-row align="center">
            <v-col cols="auto">
                <em-emoji id="alarm_clock" size="2.5em" class="mr-2"/>
            </v-col>
            <v-col>
                <v-row>
                    <h1>MOTD</h1>
                    <h4>(match of the day)</h4>
                </v-row>
                <v-row>
                    <div class="caption mt-n2">
                        picked each morning at 7am.
                    </div>
                </v-row>
            </v-col>
        </v-row>
        <v-row justify="center" align="center" class="mt-2">
            <v-col>
                <div style="min-width:250px; max-width:300px;">
                    <guess-single-card
                        :match="ppRoundMatch.match"
                        :guess="guess"
                        :setGuess="onLock"
                        rgb="217, 217, 217"
                    />
                </div>
            </v-col>
            <v-col class="text-center">
                <h1 >{{ppRoundMatch.aggr_count}}</h1>
                <div class="overline lh-1">locks</div>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data(){
        return {
            loading: true,
            ppRoundMatch: null,
            guess: null
        }
    },
    methods:{
        async getMotd(){
            let response = await this.$api.call(this.API_ROUTES.MOTD.GET);
            if(response && response.status === "success"){
                this.ppRoundMatch = response.message;
                this.guess = this.ppRoundMatch.guess ?? {home: null, away: null, verified_at: !response.message.can_lock};
            }
            this.loading = false;
        },
        onLock(val){
            this.guess=val;
            this.ppRoundMatch.aggr_count ++;
        }
    },
    async mounted(){
        await this.getMotd(); 
    }
}
</script>
