<template>
    <v-container class="ocrastd text-uppercase text-center">
        <v-row no-gutters justify="center" align="center">
            <h1>{{username}}</h1>
        </v-row>
        <v-row align="center">
            <v-col><span>LAST 3<br> MONTHS</span></v-col>
            <v-col><span>{{guessesVerified.length}} <br> MATCHES</span></v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="6" md="3">
                <div class="caption">AVG</div>
                <h1>{{Math.round(average * 10) / 10}}</h1>
            </v-col>
            <v-col cols="6" md="3">
                <div class="caption">1X2</div>
                <h1>{{Math.round(unox2 * 10) / 10}}%</h1>
            </v-col>
            <v-col cols="6" md="3">
                <div class="caption">UO2.5</div>
                <h1>{{Math.round(uo25 * 10) / 10}}%</h1>
            </v-col>
            <v-col cols="6" md="3">
                <div class="caption">GGNG</div>
                <h1>{{Math.round(ggng* 10) / 10}}%</h1>
            </v-col>    
            <v-col cols="6" md="3">
                <div class="caption">PRESO</div>
                <h1>{{presoCount}}</h1>
            </v-col>
            <v-col cols="6" md="3">
                <div class="caption">MISSED</div>
                <h1>{{missedCount}}</h1>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name: "UserMainData",
    props:{
        username: {type: String},
        guesses: {type: Array}
    },
    data(){
        return{
            guessesVerified : [],
            presoCount: 0,
            missedCount: 0,
        }
    },
    mounted(){
        this.guessesVerified = this.guesses.filter(g => g.verified);
        this.presoCount = this.guesses.filter(g => g.PRESO).length;
        this.missedCount = this.guesses.filter(g => this.isMissed(g)).length;
    },
    computed:{
        average(){
            let tot = 0;
            let count = 0;
            this.guessesVerified.map(g => {
                tot += g.preso_score;
                count ++;
            })
            return tot / count;
        },
        unox2(){
            let tot = 0;
            let count = 0;
            this.guessesVerified.map(g => {
                tot += g.UNOX2;
                count ++;
            })
            return tot / count * 100;
        },
        uo25(){
            let tot = 0;
            let count = 0;
            this.guessesVerified.map(g => {
                tot += g.UO25;
                count ++;
            })
            return tot / count * 100;
        },
        ggng(){
            let tot = 0;
            let count = 0;
            this.guessesVerified.map(g => {
                tot += g.GGNG;
                count ++;
            })
            return tot / count * 100;
        }
    }
}
</script>