<template>
    <v-row justify="center" :class="locked ? 'grey lighten-2' : 'white--text primary'">
            <v-container fill-height>
                <v-row class="mt-4">
                    <v-col cols="5">
                        <h1 v-if="!locked" class="text-center">{{home + (home === 4 ? '+' : '')}}</h1>
                        <h1 v-else class="text-center">{{guess.guess_home + (guess.guess_home === 4 ? '+' : '')}}</h1>
                        <v-slider
                            class="mx-4"
                            :max="4"
                            :min="0"
                            v-model="home"
                            color="white"
                            :disabled="locked"
                        ></v-slider>
                    </v-col>
                    <v-col cols="2"><h1 class="text-center">-</h1></v-col>
                    <v-col cols="5">
                        <h1 v-if="!locked" class="text-center">{{away + (away === 4 ? '+' : '')}}</h1>
                        <h1 v-else class="text-center">{{guess.guess_away + (guess.guess_away === 4 ? '+' : '')}}</h1>
                        <v-slider
                            class="mx-4"
                            :max="4"
                            :min="0"
                            v-model="away"
                            color="white"
                            :disabled="locked"
                        ></v-slider>
                    </v-col>
                </v-row>
                <v-row justify="center" class="text-center">
                    <v-col cols="4">
                        <h3>{{computed1x2}}</h3>
                    </v-col>
                    <v-col cols="4">
                        <h3>{{computedUO}}</h3>
                    </v-col>
                    <v-col cols="4">
                        <h3>{{computedGGNG}}</h3>
                    </v-col>
                </v-row>
            </v-container>
        <!-- </v-card> -->
    </v-row>
</template>
<script>
export default {
    name: "LockGuessCard",
    props: {
        guess: {type: Object},
    },
    data(){
        return{
            home: 0,
            away:0,
            loading: false
        }
    },
    computed: {
        locked(){
            return this.guess.guess_home !== 222;
        },
        computed1x2(){
            let a = this.guess.guess_home === 222 ? this.home : this.guess.guess_home;
            let b = this.guess.guess_away === 222 ? this.away : this.guess.guess_away;
            if(a > b) return 1;
            if(b > a) return 2;
            return "X";
        },
        computedUO(){
            let a = this.guess.guess_home === 222 ? this.home : this.guess.guess_home;
            let b = this.guess.guess_away === 222 ? this.away : this.guess.guess_away;
            if(a + b > 2) return "OVER";
            return "UNDER";
        },
        computedGGNG(){
            let a = this.guess.guess_home === 222 ? this.home : this.guess.guess_home;
            let b = this.guess.guess_away === 222 ? this.away : this.guess.guess_away;
            if(a >0 && b > 0 )return "GOL";
            return "NOGOL";
        }
    },
}
</script>