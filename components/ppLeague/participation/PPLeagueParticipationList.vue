<template>
    <v-row v-if="!loading" class="mt-5">
        <v-col cols="12" md="6" v-for="(participation, index) in ppLParticipations" :key="index">
            <nuxt-link :to="ROUTES.PPLEAGUE.DETAIL + participation.ppLeague_id" class="no-decoration">
                <p-p-league-participation-card :participation="participation" class="ma-1"/>
            </nuxt-link>
        </v-col>
    </v-row>
</template>
<script>
export default {
    name: "PPLeagueParticipationList",
    data(){
        return {
            loading: true,
            ppLParticipations: null
        }
    },
    methods: {
        async getParticipations(){
            let response = await this.$api.call(this.API_ROUTES.USER_PARTICIPATION.PPLEAGUES);
            if(response && response.status === "success"){
                this.ppLParticipations = response.message;
            }
            this.loading = false;
        },
    },
    async mounted(){
        await this.getParticipations();
    }
}
</script>