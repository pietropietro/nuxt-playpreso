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
            if(!ppTournamentType)return null;
            return ppTournamentType.name + " " + (ppTournamentType.level ?? '');
        },
        cupGroupStageString(ppCupGroup, cupFormat){
            if(ppCupGroup.level==1 && cupFormat[0].name=='GROUP STAGE'){
                return 'GROUP ' + ppCupGroup.tag;
            }
            return cupFormat[ppCupGroup.level - 1].name +
                    (cupFormat[ppCupGroup.level - 1].name==='FINAL' ? '' 
                    : (' - ' + (cupFormat[ppCupGroup.level - 1].group_tags.indexOf(ppCupGroup.tag) + 1)));
        },
        nameToCompactHtml(name, smallTag='h6', bigTag='h4', limitOneWord=18, breaks=false){
            if (name.length <= limitOneWord) {
                return `<${bigTag}>${name}</${bigTag}>`;
            }

            let moreWordsLimit = 9;
            const words = name.split(' ');
            let bigText = '';
            let smallText = '';

            for (let i = 0; i < words.length; i++) {
                const word = words[i];
                if (bigText.length + word.length > moreWordsLimit || smallText.length) {
                    smallText += ` ${word}`;
                } else {
                    bigText += ` ${word}`;
                }
            }

            return `<${bigTag} style="display:inline">${bigText.trim()} ${breaks && bigText.length ? '<br>' : ''}<${smallTag} style="display:inline">${smallText.trim()}</${smallTag}></${bigTag}>`;
        }
    }
})