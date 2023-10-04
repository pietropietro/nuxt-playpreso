<template>
    <!-- <loading-page v-if="loading"/> -->
    <v-container v-if="motds" >
        <v-row align="center">
            <v-col cols="auto">
                <v-row align="center" @click="selectedIndex=0">
                    <em-emoji :native="motdPPTT.emoji" size="4em"/>
                    <!-- <v-row> -->
                        <div class="text-h2 font-weight-bold">MOTD</div>
                    <!-- </v-row> -->
                </v-row>
            </v-col>
        </v-row>
        <v-row>
            <v-chip-group
                mandatory
                class="h-100"
                active-class="primary"
                v-model="selectedStat"
            >
                <v-chip small :value="s.value" v-for="(s,i) in ['today','last results', 'chart']" :key="i">
                    <div class="overline lh-1">{{s.text}}</div>
                </v-chip>
            </v-chip-group>
        </v-row>
        <!-- <v-row class="caption mt-n6">picked each morning at 7am.</v-row> -->
        <motd-single 
            :motd="motds[selectedIndex]" 
            :motdPPTT="motdPPTT"
            :userLast="userLast"
            v-if="matchView" 
            class="mt-4"
            matchOnly
        />
        <div v-else class="py-8">
            <v-row align="center" class="text-center" >
                <v-col cols="4" 
                    v-for="(st, i) in standings.best" :key="st.user_id"
                >
                    <!-- <div class="overline lh-1">{{st.username}}</div> -->
                    <h2>{{st.tot_points}}</h2>
                    <h4 class="mt-n2">{{st.username}}</h4>
                </v-col>
                <template v-if="standings.currentUserStat">
                    <v-col cols="4" class="mt-n6">
                        ...
                        <h2>{{standings.currentUserStat.tot_points}}</h2>
                        <h4 class="mt-n2">{{standings.currentUserStat.username}}</h4>
                    </v-col>
                </template>
            </v-row>
            <v-row justify="end">
                <div class="caption text-end">*last 7 MOTDs</div>
            </v-row>
        </div>
    </v-container>
</template>
<script>
export default {
    data(){
        return {
            selectedIndex: 0,
            loading: true,
            motds: null,
            motdPPTT: null,
            standings: null,
            matchView: true
        }
    },
    computed:{
        userLast(){
            let teams = this.motds.map(
                    pprm => pprm.match?.homeTeam.name.substr(0,3) 
                    + '<br>' + 
                    pprm.match?.awayTeam.name.substr(0,3)
            ).reverse();
            let points = this.motds.map(pprm => pprm.guess?.points ?? 0).reverse();
            points.pop();
            teams.pop();
            return {teams: teams, points: points}
        }
    },
    methods:{
        async getMotd(){
            let response = await this.$api.call(this.API_ROUTES.MOTD.GET);
            if(response && response.status === "success"){
                this.motds = response.message?.motds;
                this.standings = response.message?.standings;
                this.motdPPTT = response.message?.ppTournamentType;
                this.motds.map((m)=>{
                    m.guess = m.guess ?? 
                        {
                            home: null, 
                            away: null, 
                            verified_at: !m.can_lock,
                        };
                    m.guess.ppTournamentType= this.motdPPTT;
                });
            }
            this.loading = false;
        },
        next(){
            this.selectedIndex = this.selectedIndex == (this.motds.length -1) ? 0 : this.selectedIndex + 1;
        }
    },
    async mounted(){
        await this.getMotd(); 
    }
}
</script>
