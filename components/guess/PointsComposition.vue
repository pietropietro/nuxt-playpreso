<template>
    <div class="overline font-weight-bold lh-08 pl-2" >
        <!-- if guess.UNOX2 is true it means that if user home > away then it was indeed 1, if it was = it was x, if away was > home it was 2 -->
        <!--  if guess.UNOX2 is false do not write nothing   -->
        <v-row v-if="guess.UNOX2" no-gutters justify="center">
            <!-- if user put 3+ and 3+ than match score is correct -->
            <i v-if="guess.home ==3 && guess.away == 3">
                {{get1x2Symbol(match.score_home, match.score_away)}}
            </i>
            <i v-else> {{get1x2Symbol(guess.home, guess.away)}} </i>
        </v-row>
        <!-- similarly if guess.uo25 prediction was correct (i.e. uo25==1) it measn that if guess.home + guess.away > 2 then should write 'over' otherwise 'under' -->
        <!-- if guess.uo25 is false, do not write -->
        <v-row  v-if="guess.UO25" no-gutters justify="center">
            <i>{{ getUo25Symbol(guess.home,guess.away)}}</i>
        </v-row>
        <!-- here if guess.ggng was correct (1) it means that user correctly predicted if both team scored or not. then write gol or no-gol -->
        <!-- if guess.ggng is false, do not write -->
        <v-row v-if="guess.GGNG" no-gutters justify="center">
            <i>{{getGolNoGolSymbol(guess.home,guess.away)}}</i>
        </v-row>
    </div>
</template>

<script>
export default { 
    props:{
        guess: {type: Object},
        match: {type: Object},
    }
}
</script>