<template>
    <loading-page v-if="loading" />
    <div v-else>
        {{ppLeagueType}}
        JOIN
    </div>
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
        async get(){
            let response = await this.$api.call(this.API_ROUTES.PPLEAGUE.TYPE.GET + this.ppLeagueTypeId, null, 'GET');
            if(response && response.status === "success"){
                this.ppLeagueType = response.message;
                this.$store.commit('navigation/setActive', { title: this.ppLeagueTypeTitle(this.ppLeagueType), color: this.ppRGBA(this.ppLeagueType)});
            }
            this.loading = false;
        },
    },
    async mounted(){
        //await to get jwt
        setTimeout(async () =>  await this.get(), 100);
    }
}