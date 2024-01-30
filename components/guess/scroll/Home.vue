<template >
    <div v-if="!loading && guesses[state]?.length > 0">
        <v-row class="mt-0">
            <v-container class="pa-0">
                <div>
                    <v-slide-group
                        prev-icon="<"
                        next-icon=">"
                        id="slider"
                    >
                        <v-slide-item style="width:100px;">
                            <guess-scroll-switch 
                                :state="state" 
                                :setState="(val)=>state=val"
                                :availableStates="availableStates"
                            />
                        </v-slide-item>
                        <v-slide-item
                            v-for="guess in guesses[state]"
                            :key="guess.id"
                            class="mx-2"
                        >
                            <!-- width is necessary for slider to work on page landing :( -->
                            <div style="min-width:75px; max-width:350px;">
                                <guess-single-card
                                    :guess="guess"
                                    :match="guess.match"
                                    :rgb="guess.ppTournamentType?.rgb"
                                    :afterLock="afterLock"
                                    :selectedGuessId="selectedGuessId"
                                    :setSelectedGuessId="(val)=>selectedGuessId = val"
                                />
                            </div>
                        </v-slide-item>
                    </v-slide-group>
                </div>
            </v-container>
        </v-row>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                loading: true,
                guesses: null,
                selectedGuessId: null,
                state: null
            }
        },
        computed:{
            availableStates(){
                return Object.keys(this.guesses);
            }
        },
        methods:{
            async getGuesses(){
                this.loading =  true;
                let response = await this.$api.call(this.API_ROUTES.GUESS.USER_CURRENT);
                if(response && response.status === "success" && response.message != null){
                    this.guesses = response.message;
                    this.state = Object.keys(this.guesses)[0]
                }
                this.loading = false;
            },
            afterLock(guess){
                this.guesses['unlocked'] =  this.guesses['unlocked'].filter((g) => {
                    return g.id != guess.id;
                });      
                this.guesses['locked'].push(guess);        
                //TODO SORT ?   
            },
        },
        async mounted(){
            await this.getGuesses();
        },
    }
</script>