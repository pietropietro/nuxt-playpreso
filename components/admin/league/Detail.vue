<template>
    <loading-page v-if="loading"/>
    <v-container v-else-if="league">
        <v-row>
            <v-col><b>ls_suffix:</b> {{league.ls_suffix}}</v-col>
            <v-col><b>use_match_ls_suffix:</b> {{league.use_match_ls_suffix}}</v-col>
            <v-col><b>last_updated:</b> {{league.updated_at}}</v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    props:{
        id: {type: Number}
    },
    data:()=>({loading: true, league: null}),
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