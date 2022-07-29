<template>
    <loading-page v-if="loading " />
    <v-container v-else>
        <v-row justify="center" class="py-4">
            <p-p-info label="cost" :value="ppLeagueType.cost" />
        </v-row>
        <league-scroll :leagues="ppLeagueType.leagues"/>
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
            ppLeagueTypeId: this.$route.params.ppLeagueTypeId,
            ppLeagueType: null
        }
    },
    methods:{
         async join(id){
            if(this.joinLoading)return;
            this.joinLoading = true;
            let response = await this.$api.call(this.API_ROUTES.PPLEAGUE.TYPE.JOIN + this.ppLeagueTypeId, null, "POST");
            if(response && response.status === "success"){
                this.$router.push(this.ROUTES.PPLEAGUE.DETAIL + response.message);
            }
            this.joinLoading = false;
        },
        async get(){
            let response = await this.$api.call(this.API_ROUTES.PPLEAGUE.TYPE.GET + this.ppLeagueTypeId, null, 'GET');
            if(response && response.status === "success"){
                this.ppLeagueType = response.message;
                this.$store.commit('navigation/setActive', {
                    title: this.ppLeagueTypeTitle(this.ppLeagueType),
                    color: this.ppRGBA(this.ppLeagueType)
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