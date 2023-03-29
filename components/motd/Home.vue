<template>
    <!-- <loading-page v-if="loading"/> -->
    <v-container v-if="motds" >
        <v-row align="center">
            <v-col cols="auto">
                <h2 
                    @click="next" 
                    class="font-weight-bold">
                    <
                </h2>
            </v-col>
            <v-col cols="auto" class="px-0">
                <em-emoji :id="motdPPTT.emoji" size="2.5em" class="mr-2"/>
            </v-col>
            <v-col>
                <v-row>
                    <h1>MOTD</h1>
                </v-row>
                <v-row>
                    <div class="font-weight-bold caption mt-n4">
                        match of the day
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
        <!-- <v-row class="caption mt-n6">picked each morning at 7am.</v-row> -->
        <motd-single 
            :motd="motds[selectedIndex]" 
            :motdPPTT="motdPPTT"
            v-if="matchView" 
            class="mt-0"
        />
        <div v-else>
            <v-row no-gutters align="center" style="height:100px;" >
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
            selectedIndex: 0,
            loading: true,
            motds: null,
            motdPPTT: null,
            standings: null,
            matchView: true
        }
    },
    methods:{
        async getMotd(){
            let response = await this.$api.call(this.API_ROUTES.MOTD.GET);
            if(response && response.status === "success"){
                this.motds = response.message?.motds;
                this.motds.map((m)=>{
                    m.guess = m.guess ?? {home: null, away: null, verified_at: !m.can_lock};
                });
                this.standings = response.message?.standings;
                this.motdPPTT = response.message?.ppTournamentType;
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
