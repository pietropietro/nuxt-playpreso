<template>
    <v-row justify="center" align="center" class="mx-4 text-center">
        <v-col>
            <h5>{{computed1X2}}</h5>
        </v-col>
        <v-col>
            <h5>{{computedUO25}}</h5>
        </v-col>
        <v-col>
            <h5>{{computedGGNG}}</h5>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props: {
        guess: {type: Object},
    },
    computed:{
        computed1X2(){
            return this.guess.home === this.guess.away ? 'X' : this.guess.home > this.guess.away ? '1' : '2';
        },
        computedUO25(){
            return this.guess.home + this.guess.away > 2 ? 'OVER 2.5' : 'UNDER 2.5'
        },
        computedGGNG(){
            return this.guess.home > 0 && this.guess.away > 0 ? 'GOL' : 'NO GOL';
        }

    }
}
</script>