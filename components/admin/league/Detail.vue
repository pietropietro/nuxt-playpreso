<template>
    <loading-page v-if="loading"/>
    <v-container class="mt-4 rounded" v-else >
        <template v-if="league">
            <admin-league-edit class="my-5" :league="league" :onSuccess="onEdit"/>
            <v-row class="pa-4">
                <v-expansion-panels>
                    <v-row>
                        <v-col>
                            <h3>LAST MATCHES</h3>
                            <template v-if="league.last_matches?.length">
                                <admin-match-expansion-panel 
                                    v-for="index in (displayMoreMatchesFlag ? league.last_matches.length : 1)"
                                    :key="league.last_matches[index - 1].id"
                                    :match="league.last_matches[index - 1]"
                                    class="my-1"
                                />
                            </template>
                            <div v-else>no data</div>
                        </v-col>
                        <v-col>
                            <h3>NEXT MATCHES</h3>
                            <template v-if="league.next_matches?.length">
                                <admin-match-expansion-panel 
                                    v-for="index in (displayMoreMatchesFlag ? league.next_matches.length : 1)"
                                    :key="league.next_matches[index - 1].id"
                                    :match="league.next_matches[index - 1]"
                                    class="my-1"
                                />
                            </template>
                            <div v-else>no data</div>
                        </v-col>
                    </v-row>
                </v-expansion-panels>
            </v-row>
            <v-row class="my-5 text-center" align="center" justify="center">
                <v-col>
                    <v-btn outlined small @click="()=> displayMoreMatchesFlag = !displayMoreMatchesFlag">
                        {{displayMoreMatchesFlag ? 'SEE LESS' : 'SEE MORE'}}
                    </v-btn>
                </v-col>
                <v-col>
                    <admin-league-fetch-button  :id="id" :ls_suffix="league.ls_suffix" :onSuccess="getLeague"/>
                </v-col>
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
    data:()=>({
        loading: true, 
        league: null, 
        matchSuffixModel: null,
        displayMoreMatchesFlag: false
    }),
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