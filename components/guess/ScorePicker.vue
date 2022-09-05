<template>
    <v-row 
        v-if="guess.PRESO" 
        style="height:100%"
    />
    <v-row v-else justify="center" class="ocrastd">
        <v-container fill-height>
            <template>
                <v-row class="my-4">
                    <select-integer 
                        :model="home"
                        :setModel="(val)=>{home = val}"
                    />
                    <v-col cols="2">
                        <h1 class="text-center">-</h1>
                    </v-col>
                    <select-integer 
                        :disabled="pickerDisabled" 
                        :model="away" 
                        :setModel="(val)=>{away = val}"
                    />
                </v-row>
                <v-row justify="center" class="text-center">
                    <v-col cols="4">
                        <v-chip v-if="guess.UNOX2" label color="white">
                            <h3 class="green--text">{{computed1x2}}</h3>
                        </v-chip>
                        <h3 v-else>{{computed1x2}}</h3>
                    </v-col>
                    <v-col cols="4">
                        <v-chip v-if="guess.UO25" label color="white">
                            <h3 class="green--text">{{computedUO}}</h3>
                        </v-chip>
                        <h3 v-else>{{computedUO}}</h3>
                    </v-col>
                    <v-col cols="4">
                        <v-chip v-if="guess.GGNG" label color="white">
                            <h3 class="green--text">{{computedGGNG}}</h3>
                        </v-chip>
                        <h3 v-else>{{computedGGNG}}</h3>
                    </v-col>
                </v-row>
            </template>
        </v-container>
        <v-row justify="center" class="my-10" style="height:10vh" align="center">
            <h1 v-if="guess.verified_at" class="ocrastd">+{{guess.score}}</h1>
            <v-btn v-else-if="!guess.guessed_at" @click="lockGuess" :loading="loading"  color="primary" text block><h1>LOCK</h1></v-btn>
            <h1 v-else>LOCKED</h1>
        </v-row>
    </v-row>
</template>
<script>
export default {
    props: {
        guess: {type: Object},
    },
    data(){
        return{
            home: 0,
            away: 0,
            loading: false
        }
    },
    computed: {
        pickerDisabled(){
            return !!this.guess.guessed_at || !!this.guess.verified_at;
        },
        computed1x2(){
            if(this.isMissed(this.guess)) return "X";
            let a = this.guess.guess_home === 222 ? this.home : this.guess.guess_home;
            let b = this.guess.guess_away === 222 ? this.away : this.guess.guess_away;
            if(a > b) return 1;
            if(b > a) return 2;
            return "X";
        },
        computedUO(){
            if(this.isMissed(this.guess)) return "X";
            let a = this.guess.guess_home === 222 ? this.home : this.guess.guess_home;
            let b = this.guess.guess_away === 222 ? this.away : this.guess.guess_away;
            if(a + b > 2) return "OVER";
            return "UNDER";
        },
        computedGGNG(){
            if(this.isMissed(this.guess)) return "X";
            let a = this.guess.guess_home === 222 ? this.home : this.guess.guess_home;
            let b = this.guess.guess_away === 222 ? this.away : this.guess.guess_away;
            if(a >0 && b > 0 )return "GOL";
            return "NOGOL";
        }
    },
}
</script>