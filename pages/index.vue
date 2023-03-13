<template>
    <v-container  class="pt-0">
        <guess-home-scroll />
        <v-row>
            <v-col cols="12" md="6" 
                class="pa-0"
            >
                <v-container class="pa-0">
                    <v-row no-gutters
                        style="height:160px; width:100%" 
                        justify="center" align="center"
                    >
                        <span class="text-h2 font-weight-bold">
                            {{currentPoints}} <em-emoji id="parking"/>
                        </span>
                    </v-row>
                    <p-p-league-available-list class="px-2 mb-5"/>
                </v-container>
                <v-container v-if="userParticipations?.length > 0">
                    <v-row no-gutters>
                        <h1>ENROLLED</h1>
                        <h4>({{userParticipations.length}})</h4>
                    </v-row>
                    <nuxt-link class="no-decoration"
                        v-for="(up, index) in userParticipations" :key="index"
                        :to="up.ppLeague_id ? ROUTES.PPLEAGUE.DETAIL + up.ppLeague_id
                            : ROUTES.PPCUP.DETAIL + up.ppCup_id + '/' + up.ppCupGroup_id
                        "
                    >
                        <user-participation-card :class="!up.started ? 'mb-4' : ''"
                            :participation="up"
                        />
                    </nuxt-link>
                </v-container>
            </v-col>
            <v-col cols="12" md="6">
                <match-of-the-day class="mt-md-5"/>
                <stats-top-users class="mt-5"/>
                <stats-last-preso class="mt-8 pb-5"/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    layout: "authenticated",
    data(){
        return {
            userParticipations: null,
            loadingParticipations: true,
        }
    },
    methods:{
        async getParticipations(){
            let response = await this.$api.call(this.API_ROUTES.USER_PARTICIPATION.GET);
            if(response && response.status === "success"){
                this.userParticipations = response.message;
            }
            this.loadingParticipations = false;
        },
    },
    async mounted(){
        // this.$store.commit('navigation/setActive', { title: null, color: null});
        await this.getParticipations();
    },

}
</script>