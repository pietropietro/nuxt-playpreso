<template>
    <v-container fluid>
        <div style="height:20%">
            <v-row class="mt-2 mx-2" no-gutters>
                <v-col>
                    <h1 class="text-center">{{match.hometeam_name}} - {{match.awayteam_name}}</h1>
                </v-col>
            </v-row>
            <v-row class="my-0" justify="center"><span class="caption">{{match.date_start}}</span></v-row>
        </div>
        <v-card style="height:50%">
            <v-container fill-height>
                <v-row class="mt-4">
                    <v-col cols="5">
                        <h1 v-if="guess.guess_home===222" class="text-center">{{home + (home === 4 ? '+' : '')}}</h1>
                        <h1 v-else class="text-center">{{guess.guess_home + (guess.guess_home === 4 ? '+' : '')}}</h1>
                        <v-slider
                            class="mx-4"
                            :max="4"
                            :min="0"
                            v-model="home"
                        ></v-slider>
                    </v-col>
                    <v-col cols="2"><h1 class="text-center">-</h1></v-col>
                    <v-col cols="5">
                        <h1 v-if="guess.guess_away===222" class="text-center">{{away + (away === 4 ? '+' : '')}}</h1>
                        <h1 v-else class="text-center">{{guess.guess_away + (guess.guess_away === 4 ? '+' : '')}}</h1>
                        <v-slider
                            class="mx-4"
                            :max="4"
                            :min="0"
                            v-model="away"
                        ></v-slider>
                    </v-col>
                </v-row>
                <v-row justify="center" class="text-center">
                    <v-col cols="4">
                        <v-chip color="primary">
                            <h3>{{computed1x2}}</h3>
                        </v-chip>
                    </v-col>
                    <v-col cols="4">
                        <v-chip color="primary">
                            <h3>{{computedUO}}</h3>
                        </v-chip>
                    </v-col>
                    <v-col cols="4">
                        <v-chip color="primary">
                            <h3>{{computedGGNG}}</h3>
                        </v-chip>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
        <v-row justify="center" class="my-1" style="position:fixed; bottom:70px; width:100%;">
            <v-btn @click="lockGuess" :loading="loading" v-if="guess.guess_home === 222" color="primary" text block><h1>LOCK</h1></v-btn>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name:"LockGuess",
    props:{
        guess: {type: Object},
        match: {type: Object},
        refresh: {type: Function}
    },
    data(){
        return{
            home: 0,
            away:0,
            loading: false
        }
    },
    computed: {
        computed1x2(){
            if(this.home > this.away) return 1;
            if(this.away > this.home) return 2;
            return "X";
        },
        computedUO(){
            if(this.home + this.away > 2) return "OVER";
            return "UNDER";
        },
        computedGGNG(){
            if(this.home >0 && this.away > 0 )return "GOL";
            return "NOGOL";
        }
    },
    methods:{
        async lockGuess(){
            this.loading = true;
            let values = [
                {'action' : "lockGuess"},
                {'guessid' : this.guess.guess_id},
                {'guessHome' : this.home},
                {'guessAway' : this.away},
            ];
            let resp = await this.$api.call(values);
            this.loading = false;
            this.refresh();
        }
    }
}
</script>