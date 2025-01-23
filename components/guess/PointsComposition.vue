<template>
    <div class="overline font-weight-bold lh-08 pl-2" >
        <v-row no-gutters justify="center" :class="!guess.UNOX2 ? 'grey--text' : ''">
            <i>
                {{get1x2Symbol(match.score_home, match.score_away)}}
            </i>
        </v-row>
        <v-row  no-gutters justify="center" :class="!guess.UO25 ? 'grey--text' : ''">
            <i>{{ getUo25Symbol(match.score_home,match.score_away)}}</i>
        </v-row>
        <v-row no-gutters justify="center" :class="!guess.GGNG ? 'grey--text' : ''">
            <i>{{getGolNoGolSymbol(match.score_home,match.score_away)}}</i>
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