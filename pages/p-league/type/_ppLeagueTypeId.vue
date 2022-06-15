<template>
    <loading-page v-if="loading " />
    <v-container v-else>
        <v-row justify="center" class="py-4">
            <p-p-numeric-info label="cost" :value="ppLeagueType.cost" />
        </v-row>
        <v-row justify="center" >
            <v-btn @click="join" block x-large outlined :color="$store.state.navigation.color" :loading="joinLoading">
                <h1>JOIN</h1>
            </v-btn>
        </v-row>
    </v-container>
</template>
<script>
export default {
    layout: "authenticated",
    data(){
        return {
            loading: true,
            ppLeagueTypeId: this.$route.params.ppLeagueTypeId,
            ppLeagueType: null
        }
    },
    methods:{
         async join(id){
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