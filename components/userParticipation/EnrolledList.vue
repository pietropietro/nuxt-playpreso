<template>
    <v-container 
        v-if="(!loading.leagues || !loading.cups) && 
            (Object.keys(pplUpsByStatus)?.length > 0 || Object.keys(ppcUpsByStatus)?.length > 0)
        "
    >
        <v-row no-gutters align="end">
            <v-col cols="auto">
                <h1 v-if="!leagueCupFlag && Object.keys(pplUpsByStatus)?.length > 0">P-LEAGUES</h1>
                <div v-else class="overline font-weight-bold" @click="changeFlag">P-LEAGUES</div>
            </v-col>
            <v-spacer/>
            <v-col cols="auto" v-if="!loading.cups && Object.keys(ppcUpsByStatus)?.length > 0">
                <div v-if="!leagueCupFlag" class="overline font-weight-bold" @click="changeFlag">P-CUPS</div>
                <h1 v-else>P-CUPS</h1>
            </v-col>
        </v-row>
        <user-participation-selection 
           :statusUserParticipations="leagueCupFlag ? ppcUpsByStatus : pplUpsByStatus"
           :selected="selectedUp" :setSelected="(val)=>selectedUp = val"
           :inverted="leagueCupFlag"
        />
        <nuxt-link class="no-decoration" v-if="selectedUp"
            :to="selectedUp.ppLeague_id ? 
                    ROUTES.PPLEAGUE.DETAIL + selectedUp.ppLeague_id
                    : ROUTES.PPCUP.DETAIL + selectedUp.ppCup_id + '/' + selectedUp.ppCupGroup_id
            "
        >
            <user-participation-card 
                :class="!selectedUp.started ? 'mb-4' : ''"
                :participation="selectedUp"
            />
        </nuxt-link>
    </v-container>
</template>
<script>
export default {
    data(){
        return {
            leagueCupFlag:false,
            pplUpsByStatus: null,
            ppcUpsByStatus: null,
            selectedUp: null,
            loading: {
                leagues: true,
                cups: true
            },
        }
    },
    methods:{
        async getPPLeaguesParticipations(){
            let response = await this.$api.call(this.API_ROUTES.USER_PARTICIPATION.PPLEAGUES);
            if(response && response.status === "success"){
                this.pplUpsByStatus = response.message;
            }
            this.loading.leagues = false;
        },
        async getPPCupsParticipations(){
            let response = await this.$api.call(this.API_ROUTES.USER_PARTICIPATION.PPCUPGROUPS);
            if(response && response.status === "success"){
                this.ppcUpsByStatus = response.message;
            }
            this.loading.cups = false;
        },
        async changeFlag(){
            await this.triggerHapticFeedback();
            this.leagueCupFlag = !this.leagueCupFlag;
        }
    },
    async mounted(){
        await this.getPPLeaguesParticipations();
        await this.getPPCupsParticipations();
    },
}
</script>