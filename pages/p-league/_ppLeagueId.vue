<template>
    <loading-page v-if="loading" />
    <p-p-tournament-pagination v-else-if="ppLeague" :tournamentObj="ppLeague"  />
    <error-wall v-else/>
</template>
<script>
export default {
    layout: "authenticated",
    data(){
        return {
            loading: true,
            ppLeagueId: this.$route.params.ppLeagueId,
            ppLeague: null,
        }
    },
    methods:{
        async getPPLeague(){
            let response = await this.$api.call(this.API_ROUTES.PPLEAGUE.GET + this.ppLeagueId, null, 'GET');
            if(response && response.status === "success"){
                this.ppLeague = response.message;
                this.$store.commit('navigation/setActive', { title: this.ppLeagueTypeTitle(this.ppLeague.ppLeagueType), color: this.ppRGBA(this.ppLeague.ppLeagueType)});
            }
            this.loading = false;
        },
    },
    async mounted(){
        //await to get jwt
        setTimeout(async () =>  await this.getPPLeague(), 100);
    }
}
</script>