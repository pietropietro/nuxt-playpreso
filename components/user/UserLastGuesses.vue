<template>
    <v-container v-if="guesses">
        <v-row v-for="(guess,i) in guesses" :key="guess.id" :class="guess.PRESO ? 'primary white--text' : i % 2 ? 'white' : 'blue lighten-4'" align="center">
            <v-col>
                {{guess.match.hometeam_name}} - {{guess.match.awayteam_name}}
            </v-col>
            <template v-if="!guess.PRESO && !isMissed(guess)">
                <v-col class="text-center caption">
                    <v-row no-gutters>
                        <v-col>
                            {{guess.match.score_home}} - {{guess.match.score_away}}
                        </v-col>
                        <v-col>
                            {{guess.guess_home}} - {{guess.guess_away}}
                        </v-col>
                    </v-row>
                    <v-row no-gutters justify="center">
                        <v-col>
                            <v-chip x-small v-if="guess.UNOX2" label color="green">
                                <span class="caption white--text"><b>1X2</b></span>
                            </v-chip>
                        </v-col>
                        <v-col class="px-1">
                            <v-chip x-small v-if="guess.UO25" label color="green">
                                <span class="caption white--text"><b>UO</b></span>
                            </v-chip>
                        </v-col>
                        <v-col>
                            <v-chip x-small v-if="guess.GGNG" label color="green">
                                <span class="caption white--text"><b>GOL</b></span>
                            </v-chip>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="2" class="text-center mr-1 mr-md-0">
                    <b>+{{guess.score}}</b>
                </v-col>
            </template>
            <template v-else-if="guess.PRESO">
                <v-col class="caption text-center">{{guess.match.score_home}} - {{guess.match.score_away}}</v-col>
                <v-col>
                    <h1 class="ocrastd text-center">PRESO!</h1>
                </v-col>
            </template>
            <v-col v-else-if="isMissed(guess)">
                <h3 class="ocrastd text-center">MISSED</h3>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name: "UserLastGuesses",
    props: {
        guesses: {type: Array},
    }
}
</script>