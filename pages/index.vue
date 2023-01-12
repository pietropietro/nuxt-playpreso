<template>
    <v-container  class="pt-0">
        
        <template v-if="currentGuesses?.length>0">
            <v-row no-gutters>
                    <h1>YOUR LOCKS</h1>
                <h4>({{currentGuesses.length}})</h4>
            </v-row>
            <v-row class="mt-0">
                <v-container class="pa-0">
                    <v-slide-group
                        :show-arrows="!$vuetify.breakpoint.xs"
                        prev-icon="<"
                        next-icon=">"
                    >
                        <v-slide-item v-for="guess in currentGuesses" :key="guess.id" class="mx-2">
                            <!-- width is necessary for slider to work on page landing :( -->
                            <div style="width:250px;">
                                <guess-single-card :guess="guess"  :match="guess.match"/>
                            </div>
                        </v-slide-item>
                    </v-slide-group>
                </v-container>
            </v-row>
        </template>
        <v-row>
            <v-col cols="12" md="6" 
                class="pa-0"
            >
                <v-container fluid>
                    <v-row no-gutters
                        style="height:160px; width:100%" 
                        justify="center" align="center"
                    >
                        <span class="text-h2 font-weight-bold">
                            {{currentPoints}} <p-p-emoji model="blue-p"/>
                        </span>
                    </v-row>
                <p-p-league-available-list />
                </v-container>
            </v-col>
            <v-col>
                <template v-if="userParticipations?.length > 0">
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
                </template>
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
            currentGuesses: null,
            loadingParticipations: true,
            loadingGuesses: true,
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
        async getCurrentGuesses(){
            let response = await this.$api.call(this.API_ROUTES.GUESS.NOT_VERIFIED);
            if(response && response.status === "success"){
                this.currentGuesses = response.message;
            }
            this.loadingGuesses = false;
        },
    },
    async mounted(){
        // this.$store.commit('navigation/setActive', { title: null, color: null});
        await this.getParticipations();
        await this.getCurrentGuesses();
    },


}
</script>