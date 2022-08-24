<template>
    <loading-page v-if="loading " />
    <v-container v-else>
        <v-row justify="center" class="py-4">
            <p-p-info label="cost" :value="ppTournamentType.cost" />
        </v-row>
        <league-scroll :leagues="ppTournamentType.leagues"/>
        <v-row justify="center" align="center"  @click="join" class="pagination-fixed white--text" 
            :style="'height:80px; background-color:' + $store.state.navigation.color" 
            :loading="joinLoading"
        >
            <h1 v-if="!joinLoading">JOIN</h1>
        </v-row>
    </v-container>
</template>
<script>
export default {
    layout: "authenticated",
    data(){
        return {
            loading: true,
            joinLoading: false,
            ppTournamentTypeId: this.$route.params.ppTournamentTypeId,
            ppTournamentType: null
        }
    },
    methods:{
         async join(id){
            if(this.joinLoading)return;
            this.joinLoading = true;
            let response = await this.$api.call(this.API_ROUTES.PPTOURNAMENTTYPE.JOIN + this.ppTournamentTypeId, null, "POST");
            if(response && response.status === "success"){
                this.$router.push(this.ROUTES.PPLEAGUE.DETAIL + response.message);
            }
            this.joinLoading = false;
        },
        async get(){
            let response = await this.$api.call(this.API_ROUTES.PPTOURNAMENTTYPE.GET + this.ppTournamentTypeId, null, 'GET');
            if(response && response.status === "success"){
                this.ppTournamentType = response.message;
                this.$store.commit('navigation/setActive', {
                    title: this.ppTournamentTypeTitle(this.ppTournamentType),
                    color: this.ppRGBA(this.ppTournamentType)
                });
            }
            this.loading = false;
        },
    },
    async mounted(){
        setTimeout(async () =>  await this.get(), 100);
    }
}
</script>