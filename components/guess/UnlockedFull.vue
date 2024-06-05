<template>
    <v-container style="height: 100%;" fluid>
        <v-app-bar
            class="pp-app-bar"
            color="var(--v-background-base)"
            flat 
            app
            :height="extraRow ? '240px' : '160px'"
        >
            <v-container fluid class="pb-0">
                <guess-header-time-row :extraRow="extraRow" :setExtraRow="(val)=>extraRow=val" />
                <match-team-selection
                    v-if="currentGuess"
                    class="pt-2"
                    :match="currentGuess.match"
                    :canSelect="canSelectTeam"
                    :selectedTeamId="selectedTeamId"
                    :setSelectedTeamId="(val)=>selectedTeamId=val"
                />
                <guess-view-selection
                    class="pt-2"
                    :selectedView="selectedView"
                    :setSelectedView="(val)=>selectedView=val"
                />
            </v-container>
        </v-app-bar>
        
        <loading-page v-if="loadingExtraData" />
        
        <template v-else>
            <league-standings
                v-if="selectedView == 'league'"
                :standings="leagueStandings"
                :highlightTeamIds="[currentGuess.match.homeTeam.id,currentGuess.match.awayTeam.id]"
            />
            <team-last-matches
                v-else-if="selectedView == 'last-5'"
                :lastMatches="lastMatches"
                :selectedTeamId="selectedTeamId"
            />
        </template>

        <v-footer
            app
            color="var(--v-background-base)"
            class="d-flex flex-column align-center pt-4 pb-4 px-0"
        >
                <v-row  
                    style="width:100%"
                    align="center"
                >
                    <v-col cols="6">
                        <guess-score-picker
                            :score="score"
                            :setScore="(val)=>score=val"
                            :disabled="viewDisabled"
                            big
                        />
                    </v-col>
                    <v-spacer />
                    <v-col cols="5">
                        <v-row justify="center">
                            <guess-lock-action 
                                :score="score"
                                :guess_id="currentGuess.id"
                                :afterLock="afterLock"
                                :disabled="viewDisabled"
                                :setDisabled="(val)=>viewDisabled = val"
                            />
                        </v-row>
                    </v-col>
                </v-row>
                <v-row
                    style="width:100%"
                    align="center"
                    class="mt-n4"
                >
                    <v-col cols="6" class="px-0">
                        <guess-single-values 
                            :score="score"
                        />
                    </v-col>
                    <v-spacer />
                    <v-col cols="5" class="px-0">
                    </v-col>
                </v-row>
        </v-footer>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            extraRow: false,
            selectedTeamId: null,
            selectedView: 'league',
            loadingExtraData: false,
            leagueStandings: [],
            lastMatches: null,
            viewDisabled: false,
            score: [0,0]
        }
    },
    computed:{
        canSelectTeam(){
            if(this.selectedView == 'last-5'){
                this.selectedTeamId = this.currentGuess.match.homeTeam.id;
                return true;
            }
            return false;
        }
    },
    watch: {
        currentGuess: {
            deep: true,
            async handler() {
                this.score = [0,0];
                await this.getExtraData();
            }
        }
    },
    methods:{
        setGuess(val){
            this.$store.dispatch('openGuesses/updateCurrentGuess', {
                    guess: val
                });
        },
        async getExtraData(){
            this.loadingExtraData = true;
			try {
				const response = await this.$api.call(this.API_ROUTES.GUESS.GET_EXTRA_DATA + this.currentGuess.id);
				if (response && response.status === 'success') {
					let extraData = response.message;
                    this.leagueStandings = extraData.leagueStandings;
                    this.lastMatches = extraData.lastMatches;
				}
			} catch (error) {
				console.error('Error fetching extra data:', error);
			}
			this.loadingExtraData = false;
        },
        afterLock(){
            this.removeGuessFromCurrentList(this.currentGuess.id);
        }
    },
    async mounted(){
        await this.getExtraData();
    }
}
</script>
