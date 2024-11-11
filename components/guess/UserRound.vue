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
                        :match="pprm.match || pprm.guess.match"
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
        selectGuess(guess){
            if(guess.guessed_at || guess.verified_at)return;
            //if iit'ssomeone elses guess
            if(guess.user_id != this.currentUser.id) return;
            let guessList = this.ppRMs
                .filter(item => !item.guess.verified_at && !item.guess.guessed_at)
                .map(item => item.guess);

            this.$store.dispatch('openGuesses/update', {
                newGuess: guess,
                newList: guessList, 
            });
        }
    },
}
</script>