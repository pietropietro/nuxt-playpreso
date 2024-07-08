<template >
    <v-row 
        v-if="!loading && guesses[state]?.length > 0"
        class="mt-0"
    >
        <v-container class="pa-0">
            <v-slide-group
                prev-icon="<"
                next-icon=">"
                id="slider"
            >
                <v-slide-item style="width:100px;">
                    <guess-scroll-switch 
                        class="ml-4"
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
                    <div style="min-width:100px; max-width:100px;">
                        <guess-closed-box
                            :guess="guess"
                            :match="guess.match"
                            :rgb="guess.ppTournamentType.rgb"
                            :afterLock="afterLock"
                            :onUnlockedClick="selectGuess"
                        />
                    </div>
                </v-slide-item>
            </v-slide-group>
        </v-container>
    </v-row>
</template>
<script>
    export default {
        data(){
            return {
                loading: true,
                guesses: null,
                state: null
            }
        },
        computed:{
            availableStates(){
                return Object.keys(this.guesses);
            },
            refreshFlag() {
                return this.$store.getters['refreshFlag/guesses'];
            }
        },
        watch: {
            async refreshFlag() {
                await this.getGuesses();
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
            afterLock(){
                // todo
                this.guesses['unlocked'] =  this.guesses['unlocked'].filter((g) => {
                    return g.id != this.selectedGuess.id;
                }); 
                //TODO SORT ?        
                this.guesses['locked'].push(this.selectedGuess);  
                this.selectedGuess = null;      
            },
            async selectGuess(guess) {
                await this.triggerHapticFeedback();
                this.$store.dispatch('openGuesses/update', {
                    newGuess: guess,
                    newList: this.guesses['unlocked'], 
                });
            }
        },
        async mounted(){
            await this.getGuesses();
        },
    }
</script>