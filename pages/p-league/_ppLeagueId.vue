<template>
    <loading-page v-if="loading" />
    <p-p-tournament-pagination :tournamentObj="ppLeague" :userInTournament="userInTournament" v-else />
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
    computed:{
        userInTournament: {
            get(){
                let result = false;
                this.ppLeague.userParticipations.map(up=>{
                    if(up.user_id === this.currentUser.id){
                        result = true;
                    }
                });
                return result;
            }
        }
    },
    methods:{
        async getPPLeague(){
            let response = await this.$api.call(this.API_ROUTES.PPLEAGUE + this.ppLeagueId, null, 'GET');
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