<template>
    <loading-page v-if="loading"/>
    <v-container class="mt-4 rounded" v-else >
        <template v-if="league">
            <admin-league-edit class="my-5" :league="league" :onSuccess="onEdit"/>
            <v-row class="pa-4">
                <v-expansion-panels>
                    <v-row>
                        <v-col>
                            <h3>LAST MATCH</h3>
                            <template v-if="league.last_next_matches[0]">
                                <span>{{formatDate(league.last_next_matches[0].date_start)}}</span>
                                <admin-match-expansion-panel :match="league.last_next_matches[0]"/>
                            </template>
                            <div v-else>no data</div>
                        </v-col>
                        <v-col>
                            <h3>NEXT MATCH</h3>
                            <template v-if="league.last_next_matches[1]">
                                <span>{{formatDate(league.last_next_matches[1].date_start)}}</span>
                                <admin-match-expansion-panel :match="league.last_next_matches[1]"/>
                            </template>
                            <div v-else>no data</div>
                        </v-col>
                    </v-row>
                </v-expansion-panels>
            </v-row>
            <v-row class="my-5 text-center" align="center" justify="center">
                <admin-league-fetch-button :id="id" :ls_suffix="league.ls_suffix" :onSuccess="getLeague"/>
            </v-row>
        </template>
        <error-wall v-else/>
    </v-container>
</template>
<script>
export default {
    props:{
        id: {type: Number},
        onEdit: {type: Function}
    },
    data:()=>({loading: true, league: null, matchSuffixModel: null}),
    async mounted(){
        await this.getLeague();
    },
    methods:{
        async getLeague(){
            let response = await this.$api.call(this.ADMIN_API_ROUTES.LEAGUE.GET + '/' + this.id);
            if(response && response.status === "success"){
                this.league = response.message;
            }
            this.loading = false;
        },
    }
}
</script>