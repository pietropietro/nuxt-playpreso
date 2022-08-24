import Vue from 'vue'

Vue.mixin({
    methods:{
        isMissed(guess){
            return guess.verified_at && !guess.guessed_at;
        },
        ppRGBA(ppTT, opacity){
            if(!ppTT) return null;
            let colorString = 'rgba(' + ppTT.red + ', ' + ppTT.green + ', ' + ppTT.blue + ', ' + (opacity?? '1') + ')';
            return colorString;
        },
        ppTournamentTypeTitle(ppTournamentType){
            return ppTournamentType.name + " " + ppTournamentType.level;
        },
        getFlag(league){
            try { return require('@/assets/img/flags/' + league.country.toLowerCase() + '.png') }
            catch { return require('@/assets/img/flags/italy.png') }
        }
    }
})