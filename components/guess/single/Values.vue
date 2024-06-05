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
        score: {type: Array},
    },
    computed:{
        computed1X2(){
            return this.score[0] === this.score[1] ? 'X' : this.score[0] > this.score[1] ? '1' : '2';
        },
        computedUO25(){
            return this.score[0] + this.score[1] > 2 ? 'OVER' : 'UNDER'
        },
        computedGGNG(){
            return this.score[0] > 0 && this.score[1] > 0 ? 'GOL' : 'NO GOL';
        }

    }
}
</script>