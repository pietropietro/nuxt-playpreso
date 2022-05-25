<template>
    <loading-page v-if="loading" />
    <v-container fluid v-else>
        <v-row :style="'background-color: ' + ppRGBA(ppLeague.ppLeagueType)" class="white--text" justify="center">
            <h1>{{ppLeague.ppLeagueType.type}} {{ppLeague.ppLeagueType.level}}</h1>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
               <user-participation-standings :ups="ppLeague.userParticipations"/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data(){
        return {
            loading: true,
            ppLeagueId: this.$route.params.ppLeagueId,
            ppLeague: null,
        }
    },
    methods:{
        async getPPLeague(){
            let response = await this.$api.call(this.API_ROUTES.PPLEAGUE + this.ppLeagueId, null, 'GET');
            console.log("response: " + response);
            if(response && response.status === "success"){
                this.ppLeague = response.message;
            }
            this.loading = false;
        },
    },
    mounted(){
        setTimeout(()=>this.getPPLeague(),200);
    }
}
</script>