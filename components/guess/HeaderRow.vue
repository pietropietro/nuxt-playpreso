<template>
        <v-row align="center" justify="center" class="text-center" no-gutters>
            <v-col cols="auto">
                <div class="ml-4 overline lh-1" @click="closeGuess">
                    close
                </div>
            </v-col>
            <v-spacer/>
            <v-col cols="auto">
                <em-emoji
                    :native="currentGuess.ppTournamentType?.emoji"
                    size="1.5rem"
                    class="lh-1 mt-n1 mr-4"
                    @click="goToTournament"
                />
            </v-col>
            <v-col cols="12" class="mt-n2" v-if="currentGuessList.length > 1">
                <v-col>
                    <h1 class="ocrastd" style="line-height: 0;"
                        @click="onArrowClick"
                    >
                        ^
                    </h1>
                </v-col>
            </v-col>
            <!-- :style="{
                    rotate: !!extraRow ? '-8deg' : '-21deg'
                }" -->
        </v-row>
</template>

<script>
export default {
    props:{
        userParticipation: {type: Object},
        onArrowClick: {type: Function}
    },
    methods:{
        closeGuess(){
            this.$store.commit('homepageApi/setLoadingKey', {key: 'guessScroll', isLoading: true});
            this.$store.dispatch('openGuesses/clear');
        },
        goToTournament(){
            console.log(this.userParticipation);
            if(!this.userParticipation)return;
            let route = this.userParticipation.ppLeague_id ? this.ROUTES.PPLEAGUE.DETAIL + this.userParticipation.ppLeague_id
                    : this.ROUTES.PPCUP.DETAIL + this.userParticipation.ppCup_id + '/' + this.userParticipation.ppCupGroup_id;
            this.$router.push(route);
            this.$store.dispatch('openGuesses/clear');
        }
    }
}
</script>
