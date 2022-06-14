<template>
    <div>
        <v-row><h3 class="ocrastd">{{$t('ppLeague.yours')}}</h3></v-row>
        <div v-if="!loading" class="mt-5">
            <v-row>
            <v-col cols="12" md="6" v-for="(participation, index) in ppLParticipations" :key="index">
                <nuxt-link :to="ROUTES.PPLEAGUE.DETAIL + participation.ppLeague_id" class="no-decoration">
                    <p-p-league-participation-card :participation="participation" class="ma-1"/>
                </nuxt-link>
            </v-col>
            </v-row>
        </div>
    </div>
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
        async getUserPPLeagues(){
            let response = await this.$api.call(this.API_ROUTES.ACTIVE_PPL_PARTICIPATIONS);
            if(response && response.status === "success"){
                this.ppLParticipations = response.message;
            }
            this.loading = false;
        },
    },
    async mounted(){
        await this.getUserPPLeagues();
    }
}
</script>