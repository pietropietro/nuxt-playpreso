<template>
    <v-row justify="center" align="center" class="ocrastd">
            <select-integer
                @click.native.stop
                justify="end"
                :disabled="disabled"
                :model="score[0]"
                :setModel="(val)=>setScore([val,score[1]])"
                :big="big"
            />
        <v-col cols="auto" class="pa-1">
            <h1 class="text-center" style="user-select: none;">-</h1>
        </v-col>
            <select-integer
                @click.native.stop
                justify="start"
                :disabled="disabled"
                :model="score[1]"
                :setModel="(val)=>setScore([score[0],val])"
                :big="big"
            />
    </v-row>
</template>
<script>
export default {
    props: {
        // guess: {type: Object},
        // setGuess: {type: Function},
        big: {type: Boolean, default: false},
        score: {type: Array},
        setScore: {type: Function},
        disabled: {type: Boolean}
    },
    computed: {
        // pickerDisabled(){
        //     return !!this.guess.guessed_at || !!this.guess.verified_at;
        // }
    },
    methods:{
        // setScore(val, homeAway){
        //     let copy = JSON.parse(JSON.stringify(this.guess));
        //     if(!homeAway){
        //         copy.home = val;
        //     } else {
        //         copy.away = val;
        //     }
        //     this.setGuess(copy);
        // }
    }
}
</script>