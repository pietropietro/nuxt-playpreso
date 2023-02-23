<template>
    <div v-if="guess">
        <v-container 
            style="max-width:300px"
        >   
        <v-row 
            :class="'rounded '"
            @click="flip" 
            :style="{ 
                height: cardHeight,
                backgroundColor: guess.verified_at ?  shades.verified : (guess.guessed_at ? shades.locked : shades.unlocked) 
            }"
        >
            <v-col cols="auto">
                <match-info-short :match="match"/>
            </v-col>

            <v-col class="pa-0" >

                <template v-if="availableViews[selectedIndex] === 'points'">
                    <v-row no-gutters class="h-100"
                        v-if="guess.verified_at"
                        justify="center" align="center"
                    >
                        <em-emoji v-if="isMissed(guess)" id="x" size="2em"/>
                        <template v-else>
                            <h2 class="ocrastd" v-if="guess.PRESO">PRESO!</h2>
                            <h1 v-else>
                                {{guess.points}}
                                <em-emoji id="parking"/>
                            </h1>
                        </template>
                    </v-row>
                </template>
                <template v-else-if="availableViews[selectedIndex] === 'locked'">
                    <!-- LOCKED -->
                        <v-row no-gutters 
                            class="h-100"
                            justify="center" align="center"
                        >
                        <v-container class="px-6" style="line-height:1.5rem;"
                            v-if="guess.guessed_at"
                        >
                            <v-row justify="center" v-if="!guess.verified_at">
                                <em-emoji id="lock" size="1.5em" />
                            </v-row>
                            <match-inner-values v-else :match="match" :guess="guess" />
                            <v-row justify="center">
                                <h2 class="ocrastd"> {{guess.home}}-{{guess.away}}</h2>
                            </v-row>
                        </v-container>
                    </v-row>
                </template>
                <template v-else-if="availableViews[selectedIndex] === 'lock'">
                    <!-- UNLOCKED -->
                    <v-row no-gutters class="h-100"
                        justify="center" align="center"
                    >
                        <v-container fill-height>
                            <guess-single-picker :guess="guess"/>
                            <guess-single-bottom-action
                                    @click.native.stop
                                    :style="{ backgroundColor: ppRGBA(rgb)}"
                                    :guess="guess"
                                    :onclick="lockGuess"
                                    class="rounded-br"
                                />
                            </v-container >
                    </v-row>
                </template>
                <template v-else-if="availableViews[selectedIndex] === 'stats_position'">
                    <v-row
                        align="center"
                        no-gutters
                        class="h-100"
                        :style="{ height: cardHeight}"
                    >
                        <v-col cols="12" class="mt-n4 pr-1" >
                        <v-row no-gutters>
                                <v-spacer />
                                <div class="overline lh-1 mt-1">position</div>
                                <v-spacer />
                            </v-row>
                            <v-row no-gutters 
                                v-for="(s,i) in standings" :key="i"
                            >
                                <v-col cols="12" class="lh-1 text-center"><h4>{{s.position}}°</h4></v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </template>

                <template v-else-if="availableViews[selectedIndex] === 'stats_last_matches'">
                    <v-row 
                        align="center"
                        no-gutters
                        class="h-100"
                        :style="{ height: cardHeight}"
                    >
                        <v-col cols="12" class="" v-if="match.homeTeam?.lastMatches">
                            <!-- <v-row no-gutters class="overline lh-1 mt-1">
                                <v-spacer />
                                <div>last 3</div>
                                <v-spacer />
                            </v-row> -->

                            <!-- NESTED LOOPING DOES NOT WORK :( em-emoji issue -->
                            <v-row no-gutters justify="center"
                                class=""
                            >
                                <v-col cols="auto" class="mx-1" 
                                    v-for="(m,ind) in match.homeTeam.lastMatches"  
                                    :key="ind"
                                >
                                    <em-emoji size="1.3em" class="emoji-mart-emoji" :id="emojiForWDL(m.wdl)" />
                                </v-col>
                            </v-row>
                            <v-row no-gutters justify="center"
                                class=""
                            >
                                <v-col cols="auto" class="mx-1" 
                                    v-for="(m,ind) in match.awayTeam.lastMatches"  
                                    :key="ind"
                                >
                                    <em-emoji size="1.3em" class="emoji-mart-emoji" :id="emojiForWDL(m.wdl)" />
                                </v-col>
                            </v-row>

                        </v-col>
                        <v-col v-else>error</v-col>
                    </v-row>
                </template>

                <template v-else-if="availableViews[selectedIndex] === 'stats_gol'">
                    <v-row
                        align="center"
                        no-gutters
                        class="h-100"
                        :style="{ height: cardHeight}"
                    >
                        <v-col cols="12" class="mt-n4 pr-1" >
                            <v-row no-gutters class="overline lh-1 mt-1">
                                <v-spacer />
                                <em-emoji size="1.5em" id="soccer"/>
                                <v-spacer />
                            </v-row>
                            <v-row no-gutters  justify="center"
                                v-for="(s,i) in standings" :key="i"
                            >
                                <v-col cols="auto" class="lh-1 text-center overline font-weight-bold mx-2">+{{s.gf}}</v-col>
                                <v-col cols="auto" class="lh-1 text-center overline font-weight-bold mx-2">-{{s.ga}}</v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </template>
            </v-col>
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
            selectedIndex: 0,
            cardHeight: '90px',
            lockButtonLoading: false,
            unlockedViews: ['lock', 'stats_position', 'stats_last_matches', 'stats_gol'],
            lockedViews: ['locked'],
            verifiedViews: ['points', 'locked'],
            missedViews: ['points'],
            shades:{
                verified: this.ppRGBA(this.rgb, 0.2),
                locked:  this.ppRGBA(this.rgb, 0.8),
                unlocked:  this.ppRGBA(this.rgb, 0.6) 
            },
        }
    },
    computed:{
        availableViews(){
            if(this.isMissed(this.guess))return this.missedViews;
            if(this.guess.verified_at) return this.verifiedViews;
            if(this.guess.guessed_at) return this.lockedViews;
            return this.unlockedViews;
        },
        standings(){
            if(!this.homeStandings) return []
            return [this.homeStandings, this.awayStandings];
        },
        homeStandings(){
            if(!this.match.league?.standings)return;
            return this.match.league.standings.filter((e)=>e.id == this.match.homeTeam.id)[0];
        },
        awayStandings(){
            if(!this.match.league?.standings)return;
            return this.match.league.standings.filter((e)=>e.id == this.match.awayTeam.id)[0];
        }
    },
    methods:{
        flip(){
            if((this.selectedIndex + 1) < this.availableViews.length) return this.selectedIndex++;
            this.selectedIndex=0;
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
        },
        emojiForWDL(wdl){
            if(wdl === 'W') return 'white_check_mark';
            if(wdl === 'L') return 'x';
            return 'heavy_minus_sign';
        }
    }
}
</script>