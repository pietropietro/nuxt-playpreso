<template>
    <p-p-scroll v-if="ppTournamentTypes.length">
        <p-p-info slot="info" label="available" :value="ppTournamentTypes.length"/>
        <v-slide-item slot="slide-item" v-for="(ppTT,index) in ppTournamentTypes" :key="index" class="px-2">
            <nuxt-link class="no-decoration" :to="ROUTES.PPTOURNAMENTTYPE.DETAIL + ppTT.id">
                <p-p-tournament-type-card :ppTT="ppTT" style="height=100%; width:150px; height: 60px;" />
            </nuxt-link>
        </v-slide-item>
    </p-p-scroll>
</template>
<script>
export default {
    data(){
        return {
            loading: true,
            ppTournamentTypes: []
        }
    },
    methods:{
        async getAvailable(){
            let response = await this.$api.call(this.API_ROUTES.PPTOURNAMENTTYPE.AVAILABLE);
            if(response && response.status === "success"){
                this.ppTournamentTypes = response.message;
            }
            this.loading = false;
        },
    },
    async mounted(){
        await this.getAvailable();
    }
}
</script>