<template>
    <v-container v-if="guesses">
        <v-row v-for="(guess,i) in guesses" :key="guess.id" :class="i % 2 ? 'blue lighten-4' : 'white'" align="center">
            <v-col>
                {{guess.match.hometeam_name}} - {{guess.match.awayteam_name}}
            </v-col>
            <v-col class="text-center caption">
                <v-row no-gutters>
                    <v-col>
                        {{guess.match.score_home}} - {{guess.match.score_away}}
                    </v-col>
                    <v-col>
                        {{guess.guess_home}} - {{guess.guess_away}}
                    </v-col>
                     <v-col class="text-right"><b>+{{guess.preso_score}}</b></v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col>
                        <v-chip small v-if="guess.UNOX2" label color="green">
                            <span class="caption white--text"><b>1X2</b></span>
                        </v-chip>
                    </v-col>
                    <v-col>
                        <v-chip v-if="guess.UO25" label color="green">
                            <span class="caption white--text"><b>UO</b></span>
                        </v-chip>
                    </v-col>
                    <v-col>
                        <v-chip v-if="guess.GGNG" label color="green">
                            <span class="caption white--text"><b>GGNG</b></span>
                        </v-chip>
                    </v-col>
                </v-row>
            </v-col>
            <!-- <v-divider/> -->
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