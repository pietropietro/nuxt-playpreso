<template>
    <v-row justify="center" :class="colorRow">
        <v-container fill-height>
            <v-row class="mt-4">
                <lock-score :blocked="blocked" :missed="missed" :guess_score="guess.guess_home" :model="homeModel" :setModel="(val)=>{homeModel = val}"/>
                <v-col cols="2"><h1 class="text-center">-</h1></v-col>
                <lock-score :blocked="blocked" :missed="missed" :guess_score="guess.guess_away" :model="awayModel" :setModel="(val)=>{awayModel = val}"/>
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
    </v-row>
</template>
<script>
export default {
    name: "LockGuessCard",
    props: {
        guess: {type: Object},
        home: {type: Number},
        away: {type: Number},
        setHome: {type: Function},
        setAway: {type: Function},
    },
    data(){
        return{
            loading: false
        }
    },
    computed: {
        homeModel:{
            get(){
                return this.home
            },
            set(val){
                this.setHome(val);
            }
        },
        awayModel:{
            get(){
                return this.away
            },
            set(val){
                this.setAway(val);
            }
        },
        colorRow(){
            if(this.missed) return'blue-grey lighten-4 ocrastd';
            if(this.locked) return 'amber accent-2 ocrastd';
            return 'white--text primary ocrastd';
        },
        blocked(){
            return this.locked || this.guess.verified;
        },
        locked(){
            return this.guess.guess_home !== 222;
        },
        missed(){
            return !this.locked && this.guess.verified;
        },
        computed1x2(){
            if(this.missed) return "X";
            let a = this.guess.guess_home === 222 ? this.home : this.guess.guess_home;
            let b = this.guess.guess_away === 222 ? this.away : this.guess.guess_away;
            if(a > b) return 1;
            if(b > a) return 2;
            return "X";
        },
        computedUO(){
            if(this.missed) return "X";
            let a = this.guess.guess_home === 222 ? this.home : this.guess.guess_home;
            let b = this.guess.guess_away === 222 ? this.away : this.guess.guess_away;
            if(a + b > 2) return "OVER";
            return "UNDER";
        },
        computedGGNG(){
            if(this.missed) return "X";
            let a = this.guess.guess_home === 222 ? this.home : this.guess.guess_home;
            let b = this.guess.guess_away === 222 ? this.away : this.guess.guess_away;
            if(a >0 && b > 0 )return "GOL";
            return "NOGOL";
        }
    },
}
</script>