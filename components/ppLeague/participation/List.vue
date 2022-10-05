<template>
    <v-row v-if="!loading">
        <v-col v-for="(participation, index) in ppLParticipations" :key="index"
            :cols="participationCols(participation, true)" :md="participationCols(participation, false)" 
        >
            <nuxt-link :to="ROUTES.PPLEAGUE.DETAIL + participation.ppLeague_id" class="no-decoration">
                <p-p-league-participation-card :participation="participation" class="ma-1"/>
            </nuxt-link>
        </v-col>
    </v-row>
</template>
<script>
export default {
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
        participationCols(participation, mobile){
            if(!participation.ppLeague.started_at){
                return mobile ? '6' : '3'
            }
            return mobile ? '12' : '6'

        }
    },
    async mounted(){
        await this.getParticipations();
    }
}
</script>