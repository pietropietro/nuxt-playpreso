<template>
    <v-container fluid v-if="guess">
        <div style="height: 25vh" class="mb-2">
            <v-container fluid fill-height>
                <v-row justify="center">
                    <div>
                        <v-row no-gutters>
                            <v-col>
                                <h1 class="text-center">{{match.hometeam_name}} - {{match.awayteam_name}}</h1>
                            </v-col>
                        </v-row>
                        <v-row class="my-0" justify="center">
                            <match-date-score :match="match"/>
                        </v-row>
                    </div>
                </v-row>
            </v-container>
        </div>
        <lock-guess-card :guess="guess" style="height:40vh" :home="home" :away="away" :setHome="(val)=>home = val" :setAway="(val)=>away = val"/>
        <v-row justify="center" class="my-10" style="height:10vh" align="center">
            <h1 v-if="!locked && (match.score_home || guess.verified_at)">
                MISSED
            </h1>
            <h1 v-else-if="guess.verified_at" class="ocrastd">+{{guess.score}}</h1>
            <v-btn v-else-if="!locked" @click="lockGuess" :loading="loading"  color="primary" text block><h1>LOCK</h1></v-btn>
            <h1 v-else>LOCKED</h1>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name:"LockGuess",
    props:{
        guess: {type: Object, required: true},
        match: {type: Object, required: true},
        refresh: {type: Function}
    },
    data(){
        return{
            loading: false,
            home: 0,
            away:0,
        }
    },
    computed: {
        locked(){
            return this.guess.guess_home !== 222;
        },
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