<template >
    <v-row 
        v-if="!loading && guesses[state]?.length > 0 && !selectedGuess"
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
                    <div style="min-width:75px; max-width:130px;">
                        <guess-match-intro-box
                            :guess="guess"
                            :match="guess.match"
                            :rgb="guess.ppTournamentType.rgb"
                            :afterLock="afterLock"
                            :onClick="selectGuess"
                        />
                    </div>
                </v-slide-item>
            </v-slide-group>
        </v-container>
    </v-row>
    <div v-else-if="selectedGuess">
        <guess-open-boxed
            :guess="selectedGuess"
            :match="selectedGuess.match"
            :ppTournamentType="selectedGuess.ppTournamentType"
            :afterLock="afterLock"
            :close="()=>selectedGuess=null"
        />
    </div>
</template>
<script>
    export default {
        data(){
            return {
                loading: true,
                guesses: null,
                selectedGuess: null,
                state: null
            }
        },
        computed:{
            availableStates(){
                return Object.keys(this.guesses);
            },
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
                this.guesses['unlocked'] =  this.guesses['unlocked'].filter((g) => {
                    return g.id != this.selectedGuess.id;
                }); 
                //TODO SORT ?        
                this.guesses['locked'].push(this.selectedGuess);  
                this.selectedGuess = null;      
            },
            async selectGuess(guess){
                await this.triggerHapticFeedback();
                this.selectedGuess = guess;
            }
        },
        async mounted(){
            await this.getGuesses();
        },
    }
</script>