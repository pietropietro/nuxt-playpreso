<template>
    <loading-page v-if="loading"/>
    <admin-league-detail v-else-if="selected.length > 0" :id="selected[0].id" :close="()=>selected=[]"/>
    <v-container v-else-if="leagues">
        <v-data-table 
            single-select
            v-model="selected"
            show-select
            :items-per-page="-1" :items="leagues"  
            :headers="headers" hide-default-header hide-default-footer>
        ></v-data-table>
    </v-container>
    <error-wall v-else/>
</template>
<script>
export default {
    layout: "admin",
    data:()=>({
        leagues: null,
        loading: true,
        selected: [],
        headers: [{ value: 'tag' }, { value: 'name' }, { value: 'country' },]
    }),
    async mounted(){
        await this.getLeagues();
    },
    methods:{
        async getLeagues(){
            let response = await this.$api.call(this.ADMIN_API_ROUTES.LEAGUE.GET);
            if(response && response.status === "success"){
                this.leagues = response.message;
            }
            this.loading = false;
        },
    }
}
</script>