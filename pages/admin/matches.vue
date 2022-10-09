<template>
    <v-container>
        <v-row><h1>MATCHES</h1></v-row>
        <v-row v-if="!loading">
            <v-col cols="auto" v-for="match in matches" :key="match.id">
                <v-container>
                    <v-row>{{formatDate(match.date_start)}}</v-row>
                    <v-row>{{match.league.country}}</v-row>
                    <v-row>{{match.league.name}}</v-row>
                    <v-row>{{match.homeTeam.name}} - {{match.awayTeam.name}}</v-row>
                    <v-row>{{match.score_home}} - {{match.score_away}}</v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    layout: "admin",
    data:()=>({
        matches: null,
        loading: true
    }),
    async mounted(){
        await this.getMatches();
    },
    methods:{
        async getMatches(){
            let response = await this.$api.call(this.ADMIN_API_ROUTES.MATCHES);
            if(response && response.status === "success"){
                this.matches = response.message;
            }
            this.loading = false;
        },
    }
}
</script>
