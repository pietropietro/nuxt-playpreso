<template>
    <v-container v-if="userParticipations?.length > 0">
        <v-row no-gutters>
            <h1>ENROLLED</h1>
            <h4>({{userParticipations.length}})</h4>
        </v-row>
        <v-row no-gutters class="mb-4" align="end" justify="center">
            <v-col 
                v-for="(up, index) in userParticipations" :key="index"
                class="text-center"
            >
                <div @click="selectedIndex = index" :class="selectedIndex == index ? 'mx-2' : ''">
                    <em-emoji
                        :native="up.ppTournamentType.emoji" 
                        :size="selectedIndex == index ? '2.5em' : '1.5em'" 
                    />
                </div>
            </v-col>
        </v-row>
        <nuxt-link class="no-decoration"
            :to="userParticipations[selectedIndex].ppLeague_id ? 
                    ROUTES.PPLEAGUE.DETAIL + userParticipations[selectedIndex].ppLeague_id
                    : ROUTES.PPCUP.DETAIL + userParticipations[selectedIndex].ppCup_id + '/' + userParticipations[selectedIndex].ppCupGroup_id
            "
        >
            <user-participation-card 
                :class="!userParticipations[selectedIndex].started ? 'mb-4' : ''"
                :participation="userParticipations[selectedIndex]"
            />
        </nuxt-link>
    </v-container>
</template>
<script>
export default {
    data(){
        return {
            userParticipations: null,
            selectedIndex: 0,
            loading: true,
        }
    },
    methods:{
        async getParticipations(){
            let response = await this.$api.call(this.API_ROUTES.USER_PARTICIPATION.GET);
            if(response && response.status === "success"){
                this.userParticipations = response.message;
            }
            this.loading = false;
        },
    },
    async mounted(){
        await this.getParticipations();
    },
}
</script>