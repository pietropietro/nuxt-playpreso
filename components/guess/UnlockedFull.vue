<template>
    <v-container style="height: 100%;" fluid>
        <v-app-bar
            class="pp-app-bar"
            color="var(--v-background-base)"
            flat 
            app
            height="180px"
        >
            <v-container fluid class="pb-0">
                <guess-header-time-row />
                <match-team-selection
                    v-if="openGuess"
                    class="pt-2"
                    :match="openGuess.match"
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
        
        
        <league-standings 
            v-if="selectedView == 'league'" 
            :standings="leagueStandings"
            :highlightTeamIds="[openGuess.match.homeTeam.id,openGuess.match.awayTeam.id]"
        />
        <team-last-matches
            v-else-if="selectedView == 'last-5'" 
            :lastMatches="lastMatches"
            :selectedTeamId="selectedTeamId"
        />

        <v-footer
            app
            color="var(--v-background-base)"
            class="d-flex flex-column align-center pt-5 pb-4 px-0"
        >
                <v-row  
                    style="width:100%"
                    align="center"
                >
                    <v-col cols="6">
                        <guess-score-picker
                            :guess="openGuess"
                            :setGuess="setGuess"
                            big
                        />
                    </v-col>
                    <v-spacer />
                    <v-col cols="5">
                        <v-row>
                            <guess-lock-action />
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
                            :guess="openGuess"
                        />
                    </v-col>
                    <v-spacer />
                    <v-col cols="5" class="px-0">
                        <v-row no-gutters>
                            <v-col class="caption  text-center font-italic">slide to lock</v-col>
                        </v-row>
                    </v-col>
                </v-row>
        </v-footer>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            selectedTeamId: null,
            selectedView: 'league',
            loading: false,
            leagueStandings: [],
            lastMatches: null
        }
    },
    computed:{
        canSelectTeam(){
            if(this.selectedView == 'last-5'){
                this.selectedTeamId = this.openGuess.match.homeTeam.id;
                return true;
            }
            return false;
        }
    },
    methods:{
        setGuess(val){
            this.$store.commit('openGuess/setGuess', val);
        },
        async getExtraData(){
            this.loading = true;
			try {
				const response = await this.$api.call(this.API_ROUTES.GUESS.GET_EXTRA_DATA + this.openGuess.id);
				if (response && response.status === 'success') {
					let extraData = response.message;
                    this.leagueStandings = extraData.leagueStandings;
                    this.lastMatches = extraData.lastMatches;
				}
			} catch (error) {
				console.error('Error fetching extra data:', error);
			}
			this.loading = false;
        }
    },
    async mounted(){
        // this.selectedTeamId = this.openGuess.match.homeTeam.id;
        await this.getExtraData();
    }
}
</script>
