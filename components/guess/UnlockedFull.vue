<template>
    <v-container style="height: 100%;" >
        <match-team-selection
            v-if="openMatch"
            :match="openMatch"
            :selectedTeamId="selectedTeamId"
            :setSelectedTeamId="(val)=>selectedTeamId=val"
        />
        <!-- <v-row style="font-size:5em; line-height: 1em;" class="font-weight-bold">
            {{openMatch.homeTeam.name}}
        </v-row>
        <v-row style="font-size:5em; line-height: 1em;" class="font-weight-bold">
            {{openMatch.awayTeam.name}}
        </v-row> -->
        
        <v-footer
            app
            color="var(--v-background-base)"
            class="d-flex flex-column align-center py-5"
        >
            <div class="d-flex flex-column align-center" style="width:100%">
                <guess-score-picker
                    :guess="openGuess"
                    :setGuess="setGuess"
                    class="pb-5"
                    big
                />
                <guess-lock-action />
            </div>
        </v-footer>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            selectedTeamId: null,
        }
    },
    methods:{
        setGuess(val){
            this.$store.commit('openGuess/setGuess', val);
        }
    },
    mounted(){
        this.selectedTeamId = this.openMatch.homeTeam.id;
    }
}
</script>
