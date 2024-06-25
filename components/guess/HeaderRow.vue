<template>
        <v-row align="center" no-gutters>
            <v-col>
                <div class="ml-4 overline lh-1" @click="closeGuess">
                    close
                </div>
            </v-col>
            <v-spacer/>
            <v-spacer/>
            <v-spacer/>

            <em-emoji
                :native="currentGuess.ppTournamentType?.emoji"
                size="5rem"
                class="lh-1 mt-n1"
                :style="{
                    rotate: !!extraRow ? '-8deg' : '-21deg'
                }"
                @click="goToTournament" 
            />
            <v-spacer/>
        </v-row>
</template>

<script>
export default {
    props:{
        extraRow: {type: String},
        setExtraRow: {type: Function},
        userParticipation: {type: Object}
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
                this.$store.dispatch('refreshFlag/triggerDataRefresh');
                this.$store.dispatch('openGuesses/clear');
        },
        goToTournament(){
            if(!this.userParticipation)return;
            let route = this.userParticipation.ppLeague_id ? this.ROUTES.PPLEAGUE.DETAIL + this.userParticipation.ppLeague_id
                    : this.ROUTES.PPCUP.DETAIL + this.userParticipation.ppCup_id + '/' + this.userParticipation.ppCupGroup_id;
            this.$router.push(route);
            this.$store.dispatch('openGuesses/clear');
        }
    }
}
</script>
