<template>
    <v-row class="overline text-center pr-2">
        <v-col cols="4" :class="guess.UO25 ? 'opposite--text' : ''">
            {{match.score_home + match.score_away > 2 ? 'ovr' : 'und'}}
        </v-col>
        <v-col cols="4" :class="guess.UNOX2 ? 'opposite--text' : ''">
            {{
                match.score_home == 3 && match.score_away == 3 ? '1X2' : 
                (match.score_home === match.score_away ? 'X' : match.score_home > match.score_away ? '1' : '2')
            }}
        </v-col>
        <v-col cols="4" :class="guess.GGNG ? 'opposite--text' : ''">
            {{match.score_home > 0 && match.score_away > 0 ? 'gol' : 'ngl'}}
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        guess: {type: Object},
        match: {type: Object}
    }
}
</script>