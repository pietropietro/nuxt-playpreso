<template>
    <v-container>
        <v-row align="center">
            <admin-select-p-p-tournament-type :model="ppTTselected" :setPPtt="(val)=>ppTTselected=val"/>
        </v-row>
        <loading-page v-if="loading"/>
        <template v-else>
            <v-row>
                <v-col v-for="league in leagues" :key="league.id">
                    <league-detail :league="league" class="text-h3"></league-detail>
                </v-col>
            </v-row>
            <v-container>
                <v-row>
                    <h1>PICKED</h1>
                </v-row>
                <v-row>
                    <v-expansion-panels class="py-4">
                        <v-row v-if="picked.length > 0">
                            <v-col v-for="match in picked" :key="match.id" >
                                <admin-match-expansion-panel :match="match"/>
                            </v-col>
                        </v-row>
                        <v-row v-else-if="called" justify="center" class="py-5">
                            <b>no matches found</b>
                        </v-row>
                    </v-expansion-panels>
                </v-row>
                <v-row>
                    <h1>ALL ({{all.length}})</h1>
                </v-row>
                <v-row>
                    <v-expansion-panels class="py-4">
                        <v-row v-if="all.length > 0">
                            <v-col v-for="match in all" :key="match.id" >
                                <admin-match-expansion-panel :match="match"/>
                            </v-col>
                        </v-row>
                    </v-expansion-panels>
                </v-row>
            </v-container>
        </template>
    </v-container>
</template>
<script>
export default {
    data:()=>({ppTTselected:null, loading:false, picked:[], leagues: [], all:[], called: false}),
    watch: {
        ppTTselected: async function () {
            await this.testPick();
        }
    },    
    methods:{
        async testPick(){
            if(!this.ppTTselected)return;
            this.loading=true;
            let response = await this.$api.call(this.ADMIN_API_ROUTES.MATCH.PICK + this.ppTTselected);
            if(response && response.status === "success"){
                this.picked = response.message.picked_matches;
                this.all = response.message.all_matches;
                this.leagues = response.message.leagues;
            }
            this.called=true;
            this.loading = false;
        },
    }
}
</script>