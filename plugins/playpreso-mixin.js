import Vue from 'vue'

import data from '@emoji-mart/data'
import { init, SearchIndex } from 'emoji-mart'
import { Capacitor } from '@capacitor/core';

init({ data })

Vue.mixin({
    computed: {
        currentGuess() {
            return this.$store.getters['openGuesses/currentGuess'];
        },
        currentGuessList() {
            return this.$store.state.openGuesses.list.filter((e)=>e.id != this.currentGuess.id);
        },
        currentGuessIndex() {
            return this.$store.state.openGuesses.currentIndex;
        },
        canIncreaseOpenGuessIndex() {
            return this.currentGuessIndex !== null && this.currentGuessIndex < this.currentGuessList.length - 1;
        },
        canDecreaseOpenGuessIndex() {
            return this.currentGuessIndex !== null && this.currentGuessIndex > 0;
        },
        navigationTitle(){
            return  this.$store.state.navigation.title ?? null;;
        },
        navigationEmoji(){
            return  this.$store.state.navigation.emoji ?? null;;
        },
        navigationOverline(){
            return  this.$store.state.navigation.overline ?? null;;
        }
    },
    methods:{
        removeGuessFromCurrentList(guessId) {
            const newList = this.currentGuessList.filter(guess => guess.id !== guessId);
            this.$store.dispatch('openGuesses/updateList', { newList });
        },
        
        isLive(date_start){
            const start = new Date(date_start);
            const startRange = new Date(start.getTime() - 10 * 60000); // 10 minutes before
            const endRange = new Date(start.getTime() + 120 * 60000); // 120 minutes after
            const now = new Date();
            return now >= startRange && now <= endRange;
        },

        changeSelectedGuessIndex(filteredIndex){
            const originalList = this.$store.state.openGuesses.list;
        
            if (filteredIndex < 0 || filteredIndex >= this.currentGuessList.length) {
                return -1; // Invalid index
            }
        
            const itemId = this.currentGuessList[filteredIndex].id;
            let originalIndex = originalList.findIndex(item => item.id === itemId);

            this.$store.dispatch(
                'openGuesses/updateCurrentIndex', {newIndex: originalIndex}
            );
        },
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
            if(!ppCupGroup || !ppCupGroup.level || !cupFormat)return 'error'
            if(ppCupGroup.level==1 && cupFormat[0].name=='GROUP STAGE'){
                return 'GROUP ' + ppCupGroup.tag;
            }
            let indexFromLevel = ppCupGroup.level - 1;
            let currentLevelName = cupFormat[indexFromLevel].name;
            return currentLevelName + (currentLevelName ==='FINAL' ? '' 
                    : (' - ' + (cupFormat[indexFromLevel].group_tags.indexOf(ppCupGroup.tag) + 1)));
        },
        nameToCompactHtml(name, smallTag='h6', bigTag='h4', limitOneWord=12, limitBigMoreWords = 8, limitTotalSmall = 16,  breaks=false){
            if (name.length <= limitOneWord) {
                return `<${bigTag}>${name}</${bigTag}>`;
            }

            if (name.length > limitTotalSmall) {
                return `<${smallTag}>${name}</${smallTag}>`;
            }


            const words = name.split(' ');
            let bigText = '';
            let smallText = '';

            for (let i = 0; i < words.length; i++) {
                const word = words[i];
                if ( (bigText.length + word.length) > limitBigMoreWords || smallText.length) {
                    smallText += ` ${word}`;
                } else {
                    bigText += ` ${word}`;
                }
            }

            return `<${bigTag} style="display:inline">${bigText.trim()} ${breaks && bigText.length ? '<br>' : ''}<${smallTag} style="display:inline">${smallText.trim()}</${smallTag}></${bigTag}>`;
        },
        async triggerHapticFeedback() {
            if (Capacitor.getPlatform() === 'ios') {
                // Use custom plugin for iOS
                try {
                    await Capacitor.Plugins.PPHapticsPlugin.triggerHaptic();
                    console.log('Haptic feedback triggered on iOS');
                } catch (e) {
                    console.error('Error triggering haptic feedback on iOS', e);
                }
            } else if (Capacitor.getPlatform() === 'android' && 'vibrate' in navigator) {
                // Use Vibration API for Android
                navigator.vibrate(50); // Vibrate for 50 milliseconds
                console.log('Haptic feedback triggered on Android');
            } else {
                console.log('Haptic feedback not supported on this platform');
            }
        }
    }
})