<template>
    <div  style="height:100%">
        <p-p-league-detail v-if="selectedPage === 1" class="mb-7" :tournamentObj="tournamentObj"/>
        <lock-guess v-else :guess="userGuess" :match="selectedPPRM.match" :refresh="refresh" class="mb-7"/>
        <v-pagination
            v-if="userInTournament"
            v-model="selectedPage"
            :length="paginationLength"
            circle
            color="transparent"
            class="pagination-fixed ocrastd"
        />
    </div>
</template>
<script>
export default {
    name: "PPTournamentPagination",
    props: {
        tournamentObj: {type: Object, required: true},
        userInTournament: {type: Boolean}
    },
    mounted(){
        let pag = document.querySelector('.pagination-fixed');
        pag.style.backgroundColor = this.ppRGBA(this.tournamentObj.ppLeagueType);
    },
    data(){
        return {
            selectedPage: 1,
            currentRoundIndex: this.tournamentObj.round_count -1
        }
    },
    computed:{
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
        }
    },
    methods: {
        refresh(){
            console.log("locked guess refresh method -- TODO");
        }
    }
}
</script>
<style>
    .v-pagination{
        padding: 0px;
        margin: 0;
    }
    .v-pagination__navigation{
        display: none !important;
    }
    .v-pagination__item{
        box-shadow: none !important;
        background-color: transparent !important;
        color: white !important;
    }
    .v-pagination__item--active {
        font-size: 26px;
        font-weight: bold;
        color: white !important;
        flex-direction: column-reverse;
    }
   
</style>
