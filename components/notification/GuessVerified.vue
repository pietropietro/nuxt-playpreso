<template>
    <v-chip
        :color="ppRGBA(guess.ppTournamentType.rgb, 0.6)"
        :class="['o-100',un.guess?.PRESO ? 'brilliance' : '']"
        @click="flipped = !flipped"
    >
        <v-row align="center" >
            <template v-if="!flipped">
                <v-col class="pr-0">
                    <h2>{{guess.ppTournamentType.emoji }}</h2>
                </v-col>
                <v-col v-if="guess.winner" class="pr-0">
                    <div class="overline lh-08 text-center gold--text">
                        win<br>{{guess.winner_prize}}
                    </div>
                </v-col>
                <v-col>
                    <h2 v-if="!guess.guessed_at">❌</h2>
                    <h2 v-else-if="guess?.PRESO" class="ocrastd">
                        PRESO!
                    </h2>
                    <h2 v-else>{{ guess.points }}</h2>
                </v-col>
            </template>
            <template v-else>
                <v-col class="pl-0">
                    <team-logo
                        style="padding-top:2px; display: block; rotate:10deg; z-index: 1;"
                        :id="guess.match.homeTeam.id"
                        :name="guess.match.homeTeam.name"
                        size="40"
                    />
                </v-col>
                <v-col class="ml-n3 mr-1">
                    <team-logo
                        style="padding-top:2px; display: block; rotate:10deg; z-index: 10;"
                        :id="guess.match.awayTeam.id"
                        :name="guess.match.awayTeam.name"
                        size="40"
                    />
                </v-col>
                <v-col class="pa-0" :style="'backgroundColor:' + ppRGBA(guess.ppTournamentType.rgb, 0.4)">
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
                <v-col class="pa-0 pr-2">
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
            un: {type: Object}
        },
        data(){
            return{
                flipped: false
            }
        },
        computed:{
            guess(){
                if(this.un.ppRoundMatch)return this.un.ppRoundMatch.guess;
                return this.un.guess;
            }
        }
    }
</script>