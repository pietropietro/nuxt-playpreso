<template>
    <div v-if="guess">
        <p-p-card :color="shades.verified"  style="max-width:300px">
            <v-row>
                <v-col cols="auto"
                    :style="{ backgroundColor: guess.verified_at ?  shades.verified : (guess.guessed_at ? shades.locked : shades.unlocked) }"
                >
                    <match-info-short :match="match"/>
                </v-col>
                <v-col  class="pa-0" >
                    <!-- MISSED -->
                    <v-row no-gutters class="h-100"
                        v-if="guess.verified_at && !guess.guessed_at"
                        justify="center" align="center"
                        :style="{ backgroundColor:  shades.verified}"
                    >
                     <v-container>
                        <v-row justify="center">
                            <p-p-emoji model="red-x" />
                        </v-row>
                        <v-row justify="center"><h4>MISSED</h4></v-row>
                     </v-container>
                    </v-row>
                    <!-- VERIFIED -->
                    <v-row no-gutters class="h-100"
                        v-else-if="guess.verified_at"
                        justify="center" align="center"
                        :style="{ backgroundColor:  shades.verified}"
                    >
                        <v-container class="pa-0">
                            <match-inner-values class="no-gutters mt-n3 mb-4"
                                v-if="guess.verified_at && !guess.PRESO"
                                :guess="guess" :match="match"
                            />
                            <v-row no-gutters>
                                <v-col>
                                    <guess-info :guess="guess" hideUsername presoColor="opposite"/>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-row>
                    <!-- LOCKED -->
                        <v-row no-gutters class="h-100"
                        v-else-if="guess.guessed_at"
                        justify="center" align="center"
                        :style="{ backgroundColor:  shades.locked}"
                    >
                        <v-container class="px-6" style="line-height:1.5rem;"
                            v-if="guess.guessed_at"
                        >
                            <v-row justify="center">
                                <h2>
                                    <p-p-emoji model="lock" />
                                </h2>
                            </v-row>
                            <v-row justify="center">
                                <h2 class="ocrastd"> {{guess.home}}-{{guess.away}}</h2>
                            </v-row>
                        </v-container>
                    </v-row>
                    <!-- UNLOCKED -->
                    <v-row v-else no-gutters class="h-100"
                        justify="center" align="center"
                        :style="{ backgroundColor: shades.unlocked}"
                    >
                        <v-container fill-height >
                            <guess-single-picker :guess="guess"/>
                            <guess-single-bottom-action
                                    :style="{ backgroundColor: shades.verified}"
                                    :guess="guess"
                                    :onclick="lockGuess"
                                />
                            </v-container >
                    </v-row>
                </v-col>
            </v-row>
        </p-p-card>
        <div class="ml-2" v-if="guess.ppTournamentType?.emoji">
            <h4>
                <em-emoji :native="guess.ppTournamentType.emoji" />
                {{ppTournamentTypeTitle(guess.ppTournamentType)}}
            </h4>
        </div>
    </div>
    <error-wall v-else/>
</template>
<script>
export default {
    props:{
        guess: {type: Object, required: true},
        match: {type: Object, required: true},
        rgb: {type: String}
    },
    data(){
        return{
            lockButtonLoading: false,
            shades:{
                verified: this.ppRGBA(this.rgb),
                locked:  this.ppRGBA(this.rgb, 0.6),
                unlocked:  this.ppRGBA(this.rgb, 0.4) 
            }
        }
    },
    methods:{
        async lockGuess(){
            this.lockButtonLoading = true;
            let home = this.guess.home ?? 0;
            let away = this.guess.away ?? 0;
      
            let values = { 
                "home": home,
                "away": away
            }
            
            let response = await this.$api.call(
                this.API_ROUTES.GUESS.LOCK + this.guess.id, values, 'POST'
            );

            if(response && response.status === "success"){
                this.guess.guessed_at = new Date();
                this.guess.home = home;
                this.guess.away = away;
            }
            this.lockButtonLoading = false;
        }
    }
}
</script>