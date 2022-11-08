import Vue from 'vue'

Vue.mixin({
    methods:{
        isMissed(guess){
            return guess.verified_at && !guess.guessed_at;
        },
        ppRGBA(rgb, opacity){
            // let colorString = 'rgba(' + rgb + ', ' + (opacity?? '1') + ')';
            // let colorString = 'rgba(var(--v-primary-base), ' + (opacity ?? '1') + ')';
            let colorString = 'var(--v-primary-base)';
            return colorString;
        },
        ppTournamentTypeTitle(ppTournamentType){
            return ppTournamentType.name + " " + ppTournamentType.level;
        },
        getFlag(league){
            try { return require('@/assets/img/flags/' + league.country.toLowerCase() + '.png') }
            catch { return require('@/assets/img/flags/italy.png') }
        },
        cupGroupStageString(ppCupGroup, cupFormat){
            if(ppCupGroup.level==1 && cupFormat[0].name=='GROUP STAGE'){
                return 'GROUP ' + ppCupGroup.tag;
            }
            return cupFormat[ppCupGroup.level - 1].name +
                    (cupFormat[ppCupGroup.level - 1].name==='FINAL' ? '' 
                    : (' - ' + (cupFormat[ppCupGroup.level - 1].group_tags.indexOf(ppCupGroup.tag) + 1)));
        }
    }
})