<template>
        <v-container fluid class="ocrastd text-uppercase">
            <v-row no-gutters justify="center" align="center">
                <v-col class="text-center" cols="4">
                    <h1 style="font-size: 10vw;">{{average}}</h1>
                </v-col>
                <v-col>
                    <h1 style="font-size:8vw;">{{username}}</h1>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="4" class="text-center" style="font-size: 4vw;">LAST 3<br> MONTHS</v-col>
                <v-col style="font-size: 7vw;">{{guessesVerified.length}} MATCHES</v-col>
            </v-row>
            <v-row>
                <v-col v-if="lastPreso">
                    <v-row justify="center"> 
                        {{lastPreso.match.hometeam_name.substring(0,3)}} - {{lastPreso.match.awayteam_name.substring(0,3)}}
                    </v-row>
                    <v-row justify="center">
                        {{lastPreso.match.score_home}} - {{lastPreso.match.score_away}}
                    </v-row>
                </v-col>
                <v-col>
                    <v-row>
                        <v-col>
                            <div class="caption">1X2</div>
                            <h1>{{unox2}}%</h1>
                        </v-col>
                        <v-col>
                            <div class="caption">UO2.5</div>
                            <h1>{{uo25}}%</h1>
                        </v-col>
                        <v-col>
                            <div class="caption">GGNG</div>
                            <h1>{{ggng}}%</h1>
                        </v-col>    
                        <v-col>
                            <div class="caption">PRESO</div>
                            <h1>{{presoCount}}</h1>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    <!-- <v-row class="text-center">
        
    </v-row> -->
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
            lastPreso: null,
            presoCount: 0,
        }
    },
    mounted(){
        this.guessesVerified = this.guesses.filter(g => g.verified);
        this.lastPreso = this.guesses.filter(g => g.PRESO);
        this.presoCount = this.lastPreso.length;
        this.lastPreso = this.presoCount > 0 ? this.lastPreso[0] : null ;
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