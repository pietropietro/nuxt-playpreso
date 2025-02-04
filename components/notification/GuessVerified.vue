<template>
    <v-chip
        :color="ppRGBA(guess.ppTournamentType.rgb, 0.4)"
        :class="['pa-0','o-100',un.guess?.PRESO ? 'brilliance' : '']"
    >
        <v-row align="center" no-gutters class="h-100" >
            <template v-if="!active">
                <v-col class="px-3 br-4 h-100" :style="{
                        backgroundColor: ppRGBA(guess.ppTournamentType.rgb, 0.4)
                    }"   
                >
                    <!-- <div class="h-100"> -->
                        <v-row no-gutters align="center" class="h-100">
                            <h2>{{guess.ppTournamentType.emoji }}</h2>
                        </v-row>
                    <!-- </div class="h-100"> -->
                </v-col>
                <v-col v-if="guess.winner" class="pl-2">
                    <div class="overline lh-08 text-center gold--text">
                        win<br>{{guess.winner_prize}}
                    </div>
                </v-col>
                <v-col class="px-3">
                    <h2 v-if="!guess.guessed_at">❌</h2>
                    <h2 v-else-if="guess?.PRESO" class="ocrastd">
                        PRESO!
                    </h2>
                    <h2 v-else>{{ guess.points }}</h2>
                </v-col>
            </template>
            <template v-else>
                <v-col
                    class="br-4 h-100" :style="{
                        overflow: 'hidden',
                        backgroundColor: ppRGBA(guess.ppTournamentType.rgb, 0.4),
                        border:' solid 3px ' + ppRGBA(guess.ppTournamentType.rgb)
                        
                    }" 
                >
                    <v-row class="flex-nowrap">
                        <v-col class="pl-1">
                            <team-logo
                                style="padding-top:2px; display: block; rotate:10deg; z-index: 1;"
                                :id="guess.match.homeTeam.id"
                                :name="guess.match.homeTeam.name"
                                size="54"
                            />
                        </v-col>
                        <v-col class="ml-n5 mr-1">
                            <team-logo
                                style="padding-top:2px; display: block; rotate:10deg; z-index: 10;"
                                :id="guess.match.awayTeam.id"
                                :name="guess.match.awayTeam.name"
                                size="54"
                            />
                        </v-col>
                    </v-row>
                </v-col>
                <v-col class="mr-n4" v-if="guess.guessed_at" style="font-size:0.8em">
                    <v-row style="min-width: 40px;" class="mb-n2" no-gutters justify="center" align="center">
                        🔒
                    </v-row>
                    <v-row style="min-width: 40px; " no-gutters justify="center" align="center">
                        <v-col>
                            <select-integer
                                justify="end"
                                :disabled="true"
                                :model="guess.home"
                                :setModel="null"
                                small
                            />
                        </v-col>
                        <v-col cols="auto"
                            :style="guess.home==3 ? 'margin-left:-2px' : '' "
                        >
                            <h4 class="text-center" style="user-select: none;">-</h4>
                        </v-col>
                        <v-col>
                            <select-integer
                                justify="start"
                                :disabled="true"
                                :model="guess.away"
                                :setModel="null"
                                small
                            />
                        </v-col>
                    </v-row>
                </v-col>
                <v-col class="pr-1" style="font-size:0.8em">
                    <v-row style="min-width: 40px;" class="mb-n2" no-gutters justify="center" align="center">
                        🏁
                    </v-row>
                    <v-row style="min-width: 40px; " no-gutters justify="center" align="center">
                        <h4>{{ guess.match.score_home  }}-{{ guess.match.score_away }}</h4>
                    </v-row>
                </v-col>
            </template>
        </v-row>
    </v-chip>
</template>
<script>
    export default {
        props:{
            un: {type: Object},
            active: {type: Boolean}
        },
        computed:{
            guess(){
                if(this.un.ppRoundMatch)return this.un.ppRoundMatch.guess;
                return this.un.guess;
            }
        }
    }
</script>