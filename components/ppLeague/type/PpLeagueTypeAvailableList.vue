<template>
    <p-p-scroll v-if="ppLeagueTypes.length">
        <p-p-numeric-info slot="info" label="available" :value="ppLeagueTypes.length"/>
        <v-slide-item slot="slide-item" v-for="(ppLT,index) in ppLeagueTypes" :key="index" class="px-2">
            <nuxt-link class="no-decoration" :to="ROUTES.PPLEAGUE.TYPE.DETAIL + ppLT.id">
                <p-p-league-type-card :ppLT="ppLT" style="height=100%; width:150px; height: 60px;" />
            </nuxt-link>
        </v-slide-item>
    </p-p-scroll>
</template>
<script>
export default {
    name: "PPLeagueTypeAvailableList",
    data(){
        return {
            loading: true,
            ppLeagueTypes: []
        }
    },
    methods:{
        async getAvailable(){
            let response = await this.$api.call(this.API_ROUTES.PPLEAGUE.TYPE.AVAILABLE);
            if(response && response.status === "success"){
                this.ppLeagueTypes = response.message;
            }
            this.loading = false;
        },
    },
    async mounted(){
        await this.getAvailable();
    }
}
</script>