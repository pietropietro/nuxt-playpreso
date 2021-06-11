<template>
    <v-card :class="preso ? 'white--text pa-4 my-2' : 'pa-4 my-2'" 
        :style="currentUser && currentUser.username === username ? 'border-top-width:6px; border-top-color: yellow !important; border-style: solid' : ''"
        min-width="100px" height="90px" :color="colorGuess"
    >
        <v-row justify="center" class="text-center" no-gutters>
            <v-col cols="12">
                <h3>{{username}}</h3>
            </v-col>
            <template v-if="guess.verified">
                <v-col cols="12" v-if="!preso && !missed">
                    <v-row no-gutters align="center" justify="center">
                        <v-col cols="6" >
                            <h4>{{guess.guess_home + '-' + guess.guess_away}}</h4>
                        </v-col>
                        <v-col cols="6">
                            <h2>{{guess.preso_score !== 0 ? '+' : ''}}{{guess.preso_score}}</h2>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col v-else-if="missed" cols="12">
                    <h4 class="text-uppercase text-overline">{{$t('app.missed')}}</h4>
                </v-col>
                <v-col cols="12" v-if="preso">
                    <h2>+{{guess.preso_score}}</h2>
                </v-col>
            </template>
            <v-col v-else cols="12">
                <h1 v-if="guess.guess_home === 222">?</h1>
                <h4 v-else class="text-uppercase text-overline">LOCKED</h4>
            </v-col>
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