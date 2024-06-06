<template>
        <v-row align="center" no-gutters>
            <v-col>
                <div class="ml-4 overline lh-1" @click="closeGuess">
                    close
                </div>
            </v-col>
            <v-spacer/>
            <em-emoji
                :native="currentGuess.ppTournamentType.emoji"
                size="5rem"
                class="lh-1 mt-n1"
                @click="setExtraUp"
                :style="{
                    rotate: !!extraRow ? '-8deg' : '-21deg'
                }"
            />
            <v-spacer/>
        </v-row>
</template>

<script>
export default {
    props:{
        extraRow: {type: String},
        setExtraRow: {type: Function}
    },
    methods:{
        setExtraUp(){
            if(this.extraRow=='userParticipation'){
                this.setExtraRow(null);
                return;
            }
            this.setExtraRow('userParticipation');
        },
        closeGuess(){
            this.$store.dispatch('openGuesses/clear');
        }
    }
}
</script>
