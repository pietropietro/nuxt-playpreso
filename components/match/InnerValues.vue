<template>
    <v-row class="text-center pr-2">
        <v-col cols="4" :class="guess.UO25 ? 'opposite--text' : ''">
            {{guess.home + guess.away > 2 ? 'ovr' : 'und'}}
        </v-col>
        <v-col cols="4" :class="guess.UNOX2 ? 'opposite--text' : ''">
            {{
                guess.home == 3 && guess.away == 3 ? '1X2' : 
                (guess.home === guess.away ? 'X' : guess.home > guess.away ? '1' : '2')
            }}
        </v-col>
        <v-col cols="4" :class="guess.GGNG ? 'opposite--text' : ''">
            {{guess.home > 0 && guess.away > 0 ? 'gol' : 'ngl'}}
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        guess: {type: Object}
    }
}
</script>