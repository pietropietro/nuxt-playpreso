<template>
    <div>
        <v-row><h3 class="ocrastd">{{$t('ppLeague.available')}}</h3></v-row>
        <v-row>
            <v-simple-table :loading="loading">
                <tbody>
                    <tr v-if="!loading" align="start" >
                        <td class="py-4" v-for="(ppLT,index) in ppLeagueTypes" :key="index">
                            <nuxt-link class="no-decoration" :to="ROUTES.PPLEAGUE.TYPE.DETAIL + ppLT.id">
                                <p-p-league-type-card :ppLT="ppLT" style="height=100%; width:150px; height: 120px;" />
                            </nuxt-link>
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
        async getAvailable(){
            let response = await this.$api.call(this.API_ROUTES.PPLEAGUE.TYPE.AVAILABLE);
            if(response && response.status === "success"){
                this.ppLeagueTypes = response.message;
            }
            this.loading = false;
        },
    },
    async mounted(){
        await this.getAvailable();
    }
}
</script>