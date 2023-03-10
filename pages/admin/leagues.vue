<template>
    <loading-page v-if="loading"/>
    <v-container v-else>
        <v-tabs
            v-model="selectedTab"
            fixed-tabs
            hide-slider
        >
            <v-tab key="table" ripple>
                table
            </v-tab>
             <v-tab key="create" ripple>
                create
            </v-tab>
            <v-tab key="need-data">
                need data
            </v-tab>
            <v-tab-item key="table">
                <admin-league-table :leagues="leagues" :refresh="getLeagues" />
            </v-tab-item>
             <v-tab-item key="create">
                <h1>CREATE LEAGUE</h1>
                <admin-league-edit :leagues="leagues" :onSuccess="onCreate"/>
            </v-tab-item>
            <v-tab-item key="need-data">
                <admin-league-need-data />      
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>
<script>
export default {
    layout: "admin",
    data(){
        return{
            loading: true,
            selectedTab: 'table',
            leagues: null
        }
    },
    methods:{
        async getLeagues(){
            this.loading=true;
            let response = await this.$api.call(this.ADMIN_API_ROUTES.LEAGUE.GET);
            if(response && response.status === "success"){
                this.leagues = response.message;
            }
            this.loading = false;
        },
        async onCreate(){
            this.selectedTab='table';
            await this.getLeagues();
        }
    },
    async mounted(){
        await this.getLeagues();
    },
}
</script>

