<template>
    <v-card :class="preso ? 'white--text pa-4 my-2' : 'pa-4 my-2'" :style="currentUser && currentUser.username === username ? 'border-top-width:6px; border-top-color: orange !important; border-style: solid' : ''"
        min-width="90px" min-height="90px" :color="colorGuess"
    >
        <v-row justify="center">
            <h3>{{username}}</h3>
        </v-row>
        <v-row v-if="!preso" justify="center">
            <h4 v-if="!missed">{{guess.guess_home + '-' + guess.guess_away}}</h4>
            <h4 v-else class="text-uppercase text-overline">{{$t('app.missed')}}</h4>
        </v-row>
        <v-row v-if="!missed" justify="center" style="height: 100%">
            <h2>{{guess.preso_score !== 0 ? '+' : ''}} {{guess.preso_score}}</h2>
        </v-row>
    </v-card>
</template>
<script>
export default {
    name: "GuessCard",
    props:{
        guess: {type: Object, required: true},
        //TODO remove
        username: {type: String, required: true},
    },
    computed:{
        preso(){
            return this.guess.preso_score === 19
        },
        missed(){
            return this.guess.verified && this.guess.guess_home === 222
        },
        colorGuess(){
            if(this.missed) return 'blue-grey lighten-4';
            if(this.preso) return 'primary'
            return '';
        }
    },
    
}
</script>