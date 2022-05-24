import Vue from 'vue'

Vue.mixin({
    methods:{
        isMissed(guess){
            return guess.verified && guess.guess_home === 222
        },
        rgbaFromPPLT(ppLT, opacity){
            if(!ppLT) return null;
            let colorString = 'rgba(' + ppLT.red + ', ' + ppLT.green + ', ' + ppLT.blue + ', ' + (opacity?? '1') + ')';
            return colorString;
        }
    }
})