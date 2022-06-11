import Vue from 'vue'

Vue.mixin({
    methods:{
        isMissed(guess){
            return guess.verified_at && guess.guess_home === 222
        },
        ppRGBA(ppLT, opacity){
            if(!ppLT) return null;
            let colorString = 'rgba(' + ppLT.red + ', ' + ppLT.green + ', ' + ppLT.blue + ', ' + (opacity?? '1') + ')';
            return colorString;
        }
    }
})