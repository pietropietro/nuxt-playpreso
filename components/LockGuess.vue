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
        <lock-guess-card :guess="guess" style="height:50%"/>
        <v-row justify="center" class="my-10" >
            <v-btn v-if="!locked" @click="lockGuess" :loading="loading"  color="primary" text block><h1>LOCK</h1></v-btn>
            <h1 v-else>LOCKED</h1>
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
            loading: false
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