<template>
    <div>
        <v-row class="overline lh-1 font-weight-bold text-center flex-nowrap">
            <v-col cols="auto">
                <div
                    :style="guess.UO25 ? {backgroundColor: 'var(--v-pleague-lighten2)' } : null"
                    :class="guess.UO25 ? 'pleague-lighten5 rounded ' : ''"
                >
                        {{match.score_home + match.score_away > 2 ? 'ovr' : 'und'}}
                </div>
            </v-col>
            <v-col cols="auto" class="px-2" >
                <div
                    :style="guess.UNOX2 ? {backgroundColor: 'var(--v-pleague-lighten2)'} : null"
                    :class="guess.UNOX2 ? 'pleague-lighten5 rounded px-2 ' : ''"
                >
                    {{
                        match.score_home == 3 && match.score_away == 3 ? '1X2' :
                        (match.score_home === match.score_away ? 'X' : match.score_home > match.score_away ? '1' : '2')
                    }}
                </div>
            </v-col>
            <v-col cols="auto">
                <div
                    :style="guess.GGNG ? {backgroundColor: 'var(--v-pleague-lighten2)'} : null"
                    :class="guess.GGNG ? 'pleague-lighten5 rounded' : ''"
                >
                    {{match.score_home > 0 && match.score_away > 0 ? 'gol' : 'ngl'}}
                </div>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    props:{
        guess: {type: Object},
        match: {type: Object}
    }
}
</script>