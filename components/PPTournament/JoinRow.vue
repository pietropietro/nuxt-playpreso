<template>
    <v-row no-gutters justify="center">
        <v-btn text @click="join" :loading="loading">
            <h1>JOIN</h1>
        </v-btn>
    </v-row>
</template>
<script>
export default {
    props:{
        ppTournamentTypeId: {type: Number},
        isPPCup: {type: Boolean, default: false},
        onError: {type: Function}
    },
    data(){
        return{
            loading: false
        }
    },
    methods:{
        async join(){
            this.loading = true;
            try {
                let response = await this.$api.call(
                    this.API_ROUTES.PPTOURNAMENTTYPE.JOIN + this.ppTournamentTypeId, 
                    null, 
                    "POST"
                );
                if(response && response.status === "success"){
                    this.toJoinedTournament(response.message)
                }
            } catch (error) {
                if(!!this.onError)await this.onError();
            }
            finally{
                this.loading = false;
            }
        },
        toJoinedTournament(tournamentId){
            if(this.isPPCup){
                this.$router.push(this.ROUTES.PPCUP.DETAIL + tournamentId);
                return;
            }
            this.$router.push(this.ROUTES.PPLEAGUE.DETAIL + tournamentId);
        }
    }
}
</script>