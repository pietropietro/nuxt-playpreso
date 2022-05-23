<template>
    <div>
        <v-row><h3 class="ocrastd">{{$t('ppLeague.available')}}</h3></v-row>
        <v-row>
            <v-simple-table :loading="loading">
                <tbody>
                    <tr v-if="!loading">
                        <td class="py-4" v-for="(ppLT,index) in ppLeagueTypes" :key="index">
                            <p-p-league-type-card :ppLT="ppLT"/>
                        </td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-row>
    </div>
</template>
<script>
export default {
    name: "PPLeagueTypeAvailableList",
    data(){
        return {
            loading: true,
            ppLeagueTypes: []
        }
    },
    methods:{
        async getAvailablePPLeagueTypes(){
            let response = await this.$api.call(this.API_ROUTES.AVAILABLE_PPLEAGUE_TYPES);
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