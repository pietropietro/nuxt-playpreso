<template>
    <v-container  class="pt-0">
        <v-row v-if="currentGuesses"
        >
            <v-container fluid>
                <h1>YOUR LOCKS</h1>
                <v-slide-group 
                    :show-arrows="!$vuetify.breakpoint.xs"
                    prev-icon="<"
                    next-icon=">"
                >
                    <v-slide-item v-for="guess in currentGuesses" :key="guess.id" class="mx-2">
                        <div>
                            <guess-single-card :guess="guess"  :match="guess.match"/>
                        </div>
                    </v-slide-item>
                </v-slide-group>                    
                <!-- </p-p-slider> -->
            </v-container>
        </v-row>
        <v-row>
            <v-col cols="12" md="6" 
                class="pa-0"
            >
                <v-container fluid
                style="background-color: var(--v-background2-base);"
                >
                    <h1>AVAILABLE</h1>
                    <p-p-league-available-list />
                </v-container>
            </v-col>
            <v-col 
            style="background-color: var(--v-background-base);">
                <h1>ENROLLED</h1>
                <user-participation-list :userParticipations="userParticipations"/>
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
        await this.getParticipations();
        await this.getCurrentGuesses();
        this.$store.commit('navigation/setActive', { title: null, color: null});
    },


}
</script>