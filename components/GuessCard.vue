<template>
    <v-card :class="guess.PRESO ? 'white--text pa-4 my-2' : 'pa-4 my-2'" 
        :style="currentUser && currentUser.id === guess.user_id ? 'border-top-width:6px; border-top-color: yellow !important; border-style: solid' : ''"
        min-width="100px" 
        height="90px" 
        :color="colorGuess"
    >
        <v-row justify="center" class="text-center" no-gutters>
            <v-col cols="12">
                <h3>{{guess.username}}</h3>
            </v-col>

            <template v-if="guess.verified_at">
                <v-col cols="12" v-if="!guess.PRESO && !isMissed(guess)">
                    <v-row no-gutters align="center" justify="center">
                        <v-col cols="6" >
                            <h4>{{guess.guess_home + '-' + guess.guess_away}}</h4>
                        </v-col>
                        <v-col cols="6">
                            <h2>{{guess.score !== 0 ? '+' : ''}}{{guess.score}}</h2>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col v-else-if="isMissed(guess)" cols="12">
                    <h4 class="text-uppercase text-overline">{{$t('app.missed')}}</h4>
                </v-col>
                <v-col cols="12" v-if="guess.PRESO">
                    <h2>+{{guess.score}}</h2>
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
    },
    computed:{
        colorGuess(){
            if(this.isMissed(this.guess)) return 'blue-grey lighten-4';
            if(this.guess.PRESO) return this.$store.state.navigation.color;
            return '';
        }
    },
    
}
</script>