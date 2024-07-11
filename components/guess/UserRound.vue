<template>
    <v-row 
        align="center" 
        justify="center" 
        class="text-center" 
        no-gutters
    >  
        <v-col 
            :cols="openId == pprm.guess.id ? '12' : '4'"
            v-for="pprm, index in computedPPRMs" 
            :key="index"
        >
            <v-row justify="center" no-gutters >
                <v-col cols="auto">
                    <guess-box-view
                        :guess="pprm.guess"
                        :match="pprm.match"
                        :rgb="rgb"
                        :onUnlockedClick="selectGuess"
                        :open="openId == pprm.guess.id"
                        :setOpen="(val)=>openId=val"
                    />
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        rgb: {tyep: String},
        ppRMs: {type: Array}
    },
    data(){
        return {
            selectedGuessId: null,
            openId:null
        }
    },
    // maybe find a less expensive way (needed on round button change)
    watch: {
        ppRMs: {
            deep: true,
            handler() {
                this.openId=null
            }
        }
    },
    computed:{
        computedPPRMs(){
            if(!this.openId)return this.ppRMs;
            return this.ppRMs.filter((i)=> i.guess.id == this.openId);
        }
    },
    methods:{
        async selectGuess(guess){
            if(guess.guessed_at || guess.verified_at)return;
            let guessList = this.ppRMs
                .filter(item => !item.guess.verified_at && !item.guess.guessed_at)
                .map(item => item.guess);
            await this.triggerHapticFeedback();

            this.$store.dispatch('openGuesses/update', {
                newGuess: guess,
                newList: guessList, 
            });
        }
    }
}
</script>