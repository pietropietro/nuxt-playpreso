<template>
    <div style="height:100%">
        <p-p-tournament-home 
            v-if="selectedPage === 1" 
            class="mb-7" 
            :tournamentObj="tournamentObj
        "/>
        <guess-single-container
            v-else 
            :guess="userGuess" 
            :match="selectedPPRM.match" 
            class="mb-7"
        />
        <v-pagination
            v-if="userInTournament"
            v-model="selectedPage"
            :length="paginationLength"
            circle
            color="transparent"
            class="pagination-fixed no-arrows ocrastd"
        />
    </div>
</template>
<script>
export default {
    props: {
        tournamentObj: {type: Object, required: true},
    },
    mounted(){
        let pag = document.querySelector('.pagination-fixed');
        if(pag) pag.style.backgroundColor = !!this.tournamentObj.ppTournamentType ? 
            this.ppRGBA(this.tournamentObj.ppTournamentType) :
            this.ppRGBA(this.tournamentObj.ppTournamentType);
    },
    data(){
        return {
            selectedPage: 1,
            currentRoundIndex: this.tournamentObj.round_count -1
        }
    },
    computed: {
        paginationLength: {
            get(){
                if(!this.tournamentObj.ppRounds || this.tournamentObj.ppRounds.length === 0)return 1;                
                let roundMatches = this.tournamentObj.ppRounds[this.currentRoundIndex].ppRoundMatches;
                if(!roundMatches || roundMatches.length === 0)return 1;
                return 1 + roundMatches.length;
            }
        },
        selectedPPRM: {
            get(){
                return this.tournamentObj.ppRounds[this.currentRoundIndex].ppRoundMatches[this.selectedPage - 2];
            }
        },
        userGuess:{
            get(){
                return this.selectedPPRM.guesses.filter(g => g.user_id === this.currentUser.id)[0];
            }
        },
        userInTournament(){
            return this.tournamentObj.userParticipations.filter(up => up.user_id === this.currentUser.id).length > 0;
        }
    },
}
</script>
