<template >
    <v-row 
        v-if="guesses && guesses[state]?.length > 0"
        class="mt-0"
    >
        <v-container class="pa-0">
            <v-slide-group
                prev-icon="<"
                next-icon=">"
                ref="slider"
            >
                <v-slide-item style="width:100px;">
                    <div class="ml-4" style="height:100%">
                        <guess-scroll-switch
                            style="height:100%"
                            :state="state"
                            :setState="(val)=>state=val"
                            :availableStates="availableStates"
                        />
                    </div>
                </v-slide-item>
                <v-slide-item
                    v-for="guess in guesses[state]"
                    :key="guess.id"
                    class="mx-2"
                >
                    <div>
                        <guess-box-view
                            :guess="guess"
                            :match="guess.match"
                            :rgb="guess.ppTournamentType.rgb"
                            :afterLock="afterLock"
                            :onUnlockedClick="selectGuess"
                            :open="openId == guess.id"
                            :setOpen="(val)=>openId=val"
                        />
                    </div>
                </v-slide-item>
            </v-slide-group>
        </v-container>
    </v-row>
</template>
<script>
    import useHomepageApi from '~/composables/useHomepageApi';
    export default {
        data(){
            return {
                guesses: null,
                state: null,
                openId: null
            }
        },
        computed:{
            availableStates(){
                return Object.keys(this.guesses);
            },
        },
        methods:{
            async getGuesses(){
                let response = await this.$api.call(this.API_ROUTES.GUESS.USER_CURRENT);
                if(response && response.status === "success" && response.message != null){
                    this.guesses = response.message;
                    this.state = Object.keys(this.guesses)[0]
                }
                this.resetSlider();
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
            },
            resetSlider() {
                this.$nextTick(() => {
                    const slideGroupEl = this.$refs.slider?.$el.querySelector('.v-slide-group__content');
                    if (slideGroupEl) {
                    // Reset the transform property to bring it back to the first item
                    slideGroupEl.style.transform = 'translateX(0px)';
                    }
                });
            },
        },

        async mounted(){
            const { fetchData } = useHomepageApi(this.$store, 'guessScroll', this.getGuesses);
            await fetchData();
        },
        
    }
</script>