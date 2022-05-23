<template>
    <div>
        <v-row><h3 class="ocrastd">{{$t('ppLeague.yours')}}</h3></v-row>
        <div v-if="!loading" class="mt-5">
            <v-row>
            <v-col cols="6" v-for="(ppL, index) in ppLeagues" :key="index">
                <p-p-league-card :ppL="ppL" class="ma-1"/>
            </v-col>
            </v-row>
        </div>
    </div>
</template>
<script>
export default {
    name: "PPLeagueUserActive",
    data(){
        return {
            loading: true,
            ppLeagues: null
        }
    },
    methods: {
        async getUserPPLeagues(){
            let response = await this.$api.call(this.API_ROUTES.ACTIVE_PPLEAGUES);
            console.log("response: " + response);
            if(response && response.status === "success"){
                this.ppLeagues = response.message;
            }
            this.loading = false;
        },
    },
    async mounted(){
        await this.getUserPPLeagues();
    }
}
</script>