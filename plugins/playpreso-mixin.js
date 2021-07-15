import Vue from 'vue'

Vue.mixin({
    methods:{
        isMissed(guess){
            return guess.verified && guess.guess_home === 222
        }
    }
})