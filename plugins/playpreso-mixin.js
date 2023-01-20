import Vue from 'vue'

import data from '@emoji-mart/data'
import { init, SearchIndex } from 'emoji-mart'
init({ data })

Vue.mixin({
    methods:{
        isMissed(guess){
            return guess.verified_at && !guess.guessed_at;
        },
        ppRGBA(rgb, opacity){
            let colorString = 'rgba(' + rgb + ', ' + (opacity?? '1') + ')';
            // let colorString = (!opacity || opacity==1) ? 'var(--v-primary-base)' : 'var(--v-primary-lighten1)';
            return colorString;
        },
        ppTournamentTypeTitle(ppTournamentType){
            return ppTournamentType.name + " " + (ppTournamentType.level ?? '');
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