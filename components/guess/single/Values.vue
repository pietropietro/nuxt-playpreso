<template>
    <v-row no-gutters class="overline lh-1 text-center mx-4">
        <v-spacer />
        <v-col cols="auto">
            {{computed1X2}}
        </v-col>
        <v-spacer />
        <v-col class="mx-2">
            {{computedUO25}}
        </v-col>
        <v-spacer />
        <v-col cols="auto">
            {{computedGGNG}}
        </v-col>
        <v-spacer />
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
            return this.guess.home + this.guess.away > 2 ? 'OVER' : 'UNDER'
        },
        computedGGNG(){
            return this.guess.home > 0 && this.guess.away > 0 ? 'GOL' : 'NO GOL';
        }

    }
}
</script>