<template >
    <div v-if="!loading && (currentGuesses?.notVerified?.length || currentGuesses?.last?.length)">
        <p-p-selection-chips 
            :model="model" 
            :setModel="(val)=>model=val"
            :list="menuList" 
            :onChange="chipChange" 
        />
        <v-row class="mt-0" v-if="currentGuesses[model.value]?.length>0">
            <v-container class="pa-0">
                <div v-for="e in menuList" :key="e.text">
                    <v-slide-group
                        :show-arrows="!$vuetify.breakpoint.xs"
                        prev-icon="<"
                        next-icon=">"
                        id="slider"
                        v-if="e.text==model.text"
                    >
                        <v-slide-item
                            v-for="guess in 
                                model.text === 'last' ? 
                                    currentGuesses.verified
                                    : (model.text === 'unlock' ? guessesUnlocked : guessesLocked)"
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
                model: 'notVerified',
                currentGuesses: null,
                selectedGuessId: null
            }
        },
        computed:{
            menuList(){
                let list = [];
                if(this.guessesUnlocked?.length > 0){
                    list.push( {text: 'unlock',value: 'notVerified'});
                }
                if(this.guessesLocked?.length > 0){
                    list.push( {text: 'lock',value: 'notVerified'});
                }
                if(this.currentGuesses['verified']){
                    list.push( {text: 'last',value: 'verified'});
                }
                this.model = list[0];
                return list;
            },
            guessesLocked(){
                return this.currentGuesses['notVerified'].filter((g) => g.guessed_at);
            },
            guessesUnlocked(){
                return this.currentGuesses['notVerified'].filter((g) => !g.guessed_at);
            }
        },
        methods:{
            async getCurrentGuesses(){
                this.loading =  true;
                let response = await this.$api.call(this.API_ROUTES.GUESS.USER_CURRENT);
                if(response && response.status === "success"){
                    this.currentGuesses = response.message;
                }
                this.loading = false;
            },
            afterLock(guess){
                this.currentGuesses.notVerified = this.currentGuesses.notVerified?.map((g) => {
                    return g.id == guess.id ? guess : g
                });                
            },
            chipChange(){
                setTimeout(()=>{
                    //scrolls to 0 in x axis
                    document.getElementsByClassName("v-slide-group__content")[1].style.transform = 'translateX(0)';
                });
            }
        },
        async mounted(){
            await this.getCurrentGuesses();
        },
    }
</script>