<template>
    <loading-page v-if="loading"/>
    <p-p-tournament-home v-else-if="ppCupGroup" :tournamentObj="ppCupGroup" />
    <error-wall v-else />
</template>
<script>
export default {
    layout: "authenticated",
    data(){
        return {
            loading: false,
            groupId: this.$route.params.groupId,
            ppCupGroup: null,
        }
    },
    async mounted(){
        await this.getPPCupGroup();
    },
    methods:{
        async getPPCupGroup(){
            this.loading = true;
            let response = await this.$api.call(this.API_ROUTES.PPCUP.GROUP.GET + this.groupId, null, 'GET');
            if(response && response.status === "success"){
                this.ppCupGroup = response.message;
            }
            this.loading = false;
        },
    }
}
</script>