<template>
    <div v-if="guess">
        <v-container 
            style="max-width:300px"
        >
            <v-row v-if="!flipped" :style="'heihgt: ' + cardHeight"
                :class="guess.verified_at ? 'constrastOnDark--text' : ''"
            >
                <v-col cols="auto"
                @click="flip"
                    class="rounded-tl rounded-bl"
                    :style="{ backgroundColor: guess.verified_at ?  shades.verified : (guess.guessed_at ? shades.locked : shades.unlocked) }"
                >
                    <match-info-short :match="match"/>
                </v-col>
                <v-col  class="pa-0" >
                    <!-- MISSED -->
                    <v-row no-gutters class="h-100 rounded-tr rounded-br"
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
                    <v-row no-gutters class="h-100 rounded-tr rounded-br"
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
                                    <guess-info :guess="guess" hideUsername presoColor="oppositeText"/>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-row>
                    <!-- LOCKED -->
                        <v-row no-gutters class="h-100 rounded-tr rounded-br"
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
                    <v-row v-else no-gutters class="h-100 rounded-tr rounded-br" 
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
            <v-row v-else
                @click="flip" 
                align="center"
                class="rounded"
                :style="{ height: cardHeight, backgroundColor: guess.verified_at ?  shades.verified : (guess.guessed_at ? shades.locked : shades.unlocked) }"
            >
                <v-container class="pa-0" >
                    <v-row no-gutters class=" text-center overline lh-1 mt-1">
                        <v-col cols="4" class=" mx-2 l-h1"></v-col>
                        <v-spacer />
                        <v-col cols="2" class="">pos</v-col>
                        <v-col cols="4" class="">gol</v-col>
                    </v-row>
                    <v-row no-gutters 
                        v-for="i in 2" :key="i"
                    >
                        <v-col style="overflow:hidden" cols="4" class=" mx-2 l-h1">
                            <h4>{{i===1 ? match.homeTeam.name : match.awayTeam.name}}</h4>
                        </v-col>
                        <v-spacer />
                        <v-col cols="2" class="lh-1 "><h4>{{standings[i - 1].position}}°</h4></v-col>
                        <v-col cols="2" class="lh-1 text-center overline">+{{standings[i - 1].gf}}</v-col>
                        <v-col cols="2" class="lh-1 text-center overline">-{{standings[i - 1].ga}}</v-col>
                    </v-row>
                </v-container>
            </v-row>
        </v-container>
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
            flipped: false,
            cardHeight: '90px',
            lockButtonLoading: false,
            shades:{
                verified: this.ppRGBA(this.rgb),
                locked:  this.ppRGBA(this.rgb, 0.8),
                unlocked:  this.ppRGBA(this.rgb, 0.6) 
            },
            
        }
    },
    computed:{
        standings(){
            return [this.homeStandings, this.awayStandings];
        },
        homeStandings(){
            if(!this.match.league.standings)return;
            return this.match.league.standings.filter((e)=>e.id == this.match.homeTeam.id)[0];
        },
        awayStandings(){
            if(!this.match.league.standings)return;
            return this.match.league.standings.filter((e)=>e.id == this.match.awayTeam.id)[0];
        }
    },
    methods:{
        flip(){
            this.flipped = !this.flipped
        },
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