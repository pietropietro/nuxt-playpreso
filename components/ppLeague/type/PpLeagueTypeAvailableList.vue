<template>
    <v-row>
        <v-simple-table :loading="loading">
            <tbody>
                <tr v-if="!loading">
                    <td v-for="(ppLT,index) in ppLeagueTypes" :key="index">
                        {{ppLT}}
                        <!-- <pp-league-type-card :ppLT="ppLT"/> -->
                    </td>
                </tr>
            </tbody>
        </v-simple-table>
    </v-row>
</template>
<script>
export default {
    name: "PpLeagueTypeAvailableList",
    data(){
        return {
            loading: true,
            ppLeagueTypes: []
        }
    },
    methods:{
        async getAvailablePPLeagueTypes(){
            //TODO SOLVE CORS problem (again :( )
            let response = await this.$api.get(this.API_ROUTES.AVAILABLE_PP_LEAGUE_TYPES);
            console.log("response: " + response);
            if(response && response.status === "success"){
                this.ppLeagueTypes = response.message;
            }
            this.loading = false;
        },
    },
    async mounted(){
        await this.getAvailablePPLeagueTypes();
    }
}
</script>