<template >
    <div v-if="!loading && (currentGuesses.notVerified?.length || currentGuesses.last?.length)">
        <v-row no-gutters align="center">
            <div class="overline font-weight-bold lh-1 mr-2">MATCHES</div>
            <v-chip-group
                mandatory
                class="h-100"
                active-class="primary"
                v-model="selected"
                @change="chipChange"
            >
                <div v-for="(s,i) in list" :key="i">
                    <v-chip
                        color="var(--v-background-lighten1)"
                        v-if="s.text =='last' && currentGuesses.verified 
                            || s.text === 'unlock' && unlockedList?.length
                            || s.text=== 'lock' &&  lockedList?.length
                        "
                        small 
                        :value="s"
                    >
                        <div class="overline lh-1">
                            <template
                                v-if="s.text=='unlock' && unlockedList.length"
                            >
                                <em-emoji 
                                    id="unlock" 
                                    size="1.3m" 
                                    class="mr-n1"
                                />
                                {{unlockedList.length}}
                            </template>
                            <template v-else-if="s.text==='lock' && lockedList.length">
                                <em-emoji 
                                    id="lock" 
                                    size="1.3m" 
                                    class="mr-n1"
                                />
                                {{lockedList.length}}
                            </template>
                            <template v-else>
                                {{s.text}}
                            </template>
                        </div>
                    </v-chip>
                </div>
            </v-chip-group>
        </v-row>
        <v-row class="mt-0" v-if="currentGuesses[selected.value]?.length>0">
            <v-container class="pa-0">
                <div v-for="e in list" :key="e.text">
                    <v-slide-group
                        :show-arrows="!$vuetify.breakpoint.xs"
                        prev-icon="<"
                        next-icon=">"
                        id="slider"
                        v-if="e.text==selected.text"
                    >
                        <v-slide-item
                            v-for="guess in selected.text === 'last' ? currentGuesses.verified
                                : (selected.text === 'unlock' ? unlockedList
                                    : lockedList
                                )"
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
                list: [ 
                    {text: 'unlock',value: 'notVerified'},
                    {text: 'lock',value: 'notVerified'},
                    {text: 'last',value: 'verified'}
                ],
                selected: 'notVerified',
                currentGuesses: null,
                selectedGuessId: null
            }
        },
        computed:{
            lockedList(){
                return this.currentGuesses['notVerified'].filter((g) => g.guessed_at);
            },
            unlockedList(){
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