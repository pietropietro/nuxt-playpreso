import Vue from 'vue'

Vue.mixin({
    methods:{
        isMissed(guess){
            return guess.verified && guess.guess_home === 222
        },
        rgbFromPPLT(ppLT){
            if(!ppLT) return null;
            return 'rgb(' + ppLT.red + ', ' + ppLT.green + ', ' + ppLT.blue + ')';
        }
    }
})