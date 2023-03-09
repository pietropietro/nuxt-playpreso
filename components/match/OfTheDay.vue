<template>
    <loading-page v-if="loading"/>
    <v-container v-else-if="ppRoundMatch" >
        <v-row align="center">
            <v-col cols="auto" class="px-0">
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
            <v-col cols="auto" >
                <div class="overline lh-1" 
                    v-html="matchView == true ? 'chart' : 'match'"
                    @click="()=>matchView=!matchView"
                />
            </v-col>
        </v-row>
        <v-row justify="center" align="center" v-if="matchView">
            <v-col>
                <div style="min-width:250px; max-width:300px;">
                    <guess-single-card
                        :match="ppRoundMatch.match"
                        :guess="guess"
                        :setGuess="onLock"
                        rgb="194, 214, 214"
                    />
                </div>
            </v-col>
            <v-col class="text-center">
                <h1 >{{ppRoundMatch.aggr_count}}</h1>
                <div class="overline lh-1">locks</div>
            </v-col>
        </v-row>
        <div v-else>
            <v-row no-gutters class="mt-2" align="center" style="height:100px;" >
                <v-col class="text-center" v-for="(st, i) in standings" :key="st.user_id" cols="4">
                    <!-- <div class="overline lh-1">{{st.username}}</div> -->
                    <h1>{{st.tot_points}}</h1>
                    <h4 class="mt-n2">{{st.username}}</h4>
                </v-col>
            </v-row>
            <v-row no-gutters justify="end">
                <div class="caption text-end">*last 7 MOTDs</div>
            </v-row>
        </div>
    </v-container>
</template>
<script>
export default {
    data(){
        return {
            loading: true,
            ppRoundMatch: null,
            standings: null,
            guess: null,
            matchView: true
        }
    },
    methods:{
        async getMotd(){
            let response = await this.$api.call(this.API_ROUTES.MOTD.GET);
            if(response && response.status === "success"){
                this.ppRoundMatch = response.message?.motd;
                this.standings = response.message?.standings;
                this.guess = this.ppRoundMatch.guess ?? {home: null, away: null, verified_at: !this.ppRoundMatch.can_lock};
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
