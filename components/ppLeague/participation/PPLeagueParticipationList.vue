<template>
    <div>
        <v-row><h3 class="ocrastd">{{$t('ppLeague.yours')}}</h3></v-row>
        <div v-if="!loading" class="mt-5">
            <v-row>
            <v-col cols="6" v-for="(participation, index) in ppLParticipations" :key="index">
                <p-p-league-participation-card :participation="participation" class="ma-1"/>
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
            console.log("response: " + response);
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