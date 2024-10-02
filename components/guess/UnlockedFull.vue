<template>
    <v-container style="height: 100%;" fluid>
        <v-app-bar
            class="pp-app-bar safe-area"
            color="var(--v-background-base)"
            flat 
            app
            :height="barHeight"
        >
            <v-container fluid class="pa-0" style="height: 100%;">
                <guess-header-row 
                    :extraRow="extraRow" 
                    :setExtraRow="setExtraRow"
                    :userParticipation="userParticipation"
                    v-if="!extraRow"
                    style="height:50px;"
                    class="mt-2 mb-3"
                    :onArrowClick="()=>setExtraRow(extraRow=='guessScroll' ? null : 'guessScroll')"
                />
                <!-- <transition name="fade"> -->
                    <guess-current-scroll
                        v-if="extraRow == 'guessScroll'"
                        :onSelect="selectIndex"
                        class="mb-4 py-2"
                        size="60px"
                    />
                    <user-participation-summary-row 
                        v-else-if="extraRow == 'userParticipation'"
                        :userParticipation="userParticipation" 
                        class="my-4 py-2 pl-4"
                    />
                <!-- </transition> -->
                <match-team-selection
                    v-if="currentGuess"
                    class="mt-0"
                    :match="currentGuess.match"
                    :canSelect="canSelectTeam"
                    :selectedTeamId="selectedTeamId"
                    :setSelectedTeamId="(val)=>selectedTeamId=val"
                    :onTeamNamesClick="()=>{}"
                />
                <guess-view-selection
                    class="pt-4"
                    :selectedView="selectedView"
                    :setSelectedView="(val)=>selectedView=val"
                    :selectableViews="selectableViews"
                />
            </v-container>
        </v-app-bar>
        
        <loading-page v-if="loadingExtraData" />
        
        <template v-else>
            <league-standings
                class="py-0"
                :style="{marginTop: negativeMarginTopInset}"
                v-if="selectedView == 'standings'"
                :standings="leagueStandings"
                :rgb="currentGuess.ppTournamentType?.rgb"
                :highlightTeamIds="[currentGuess.match.homeTeam.id,currentGuess.match.awayTeam.id]"
            />
            <team-last-matches
                v-else-if="selectedView == 'lastMatches'"
                :lastMatches="lastMatches"
                :side="currentGuess.match.homeTeam.id == selectedTeamId ? 'home' : 'away'"
                :selectedTeamId="selectedTeamId"
            />
        </template>

        <v-footer
            app
            color="var(--v-background-base)"
            class="d-flex flex-column align-center pt-4 pb-6 px-0"
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
            extraRow: null,
            selectedTeamId: null,
            selectedView: null,
            loadingExtraData: false,
            leagueStandings: [],
            lastMatches: null,
            userParticipation: null,
            viewDisabled: false,
            score: [0,0]
        }
    },
    computed:{
        canSelectTeam(){
            if(this.selectedView == 'lastMatches'){
                this.selectedTeamId = this.currentGuess.match.homeTeam.id;
                return true;
            }
            return false;
        },
        selectableViews(){
            let views = {date:0, standings:1};

            if(!this.leagueStandings){
                views.standings = 0;
            }
            if(this.lastMatches?.home.length > 0 || this.lastMatches?.away.length > 0 ){
                views.lastMatches = 1;
            }
            return views;
        },
        //for mobile safe-area adjustments
        barHeight() {
            const rootStyle = getComputedStyle(document.documentElement);
            const safeAreaInsetTop = parseFloat(rootStyle.getPropertyValue('--safe-area-top')) || 0;
            return !!this.extraRow ? `${210 + safeAreaInsetTop}px` : `${200 + safeAreaInsetTop}px`;
        },
        negativeMarginTopInset(){
            const rootStyle = getComputedStyle(document.documentElement);
            const safeAreaInsetTop = parseFloat(rootStyle.getPropertyValue('--safe-area-top')) || 0;
            return `-${safeAreaInsetTop}px`
        }
    },
    watch: {
        currentGuess: {
            deep: true,
            async handler() {
                this.score = [0,0];
                await this.getExtraData();
                this.setDefaultView();                
            }
        }
    },
    methods:{
        async getExtraData(){
            this.loadingExtraData = true;
			try {
				const response = await this.$api.call(
                    this.API_ROUTES.GUESS.GET_EXTRA_DATA + (this.currentGuess.id ?? 'motd')
                );
				if (response && response.status === 'success') {
					let extraData = response.message;
                    this.leagueStandings = extraData.leagueStandings;
                    this.lastMatches = extraData.lastMatches;
                    this.userParticipation = extraData.userParticipation;
				}
			} catch (error) {
				console.error('Error fetching extra data:', error);
			}
			this.loadingExtraData = false;
        },
        afterLock(){
            console.log(this.currentGuess.ppTournamentType.name);
            if(this.currentGuess.ppTournamentType.name=='MOTD'){
                console.log('hihi');
                this.$store.dispatch('refreshFlag/triggerMotd');
            }
            this.removeGuessFromCurrentList(this.currentGuess.id);
        },
        selectIndex(i){
            this.changeSelectedGuessIndex(i);
            this.extraRow = null;
        },
        setDefaultView(){
            this.selectedView = null;
            for (let menuKey in this.selectableViews) {
                if (this.selectableViews[menuKey] === 1) {
                    this.selectedView = menuKey;
                    break;
                }
            }
        },
        setExtraRow(val){
            if(this.loading) return;
            if(val == 'guessScroll' && !this.currentGuessList.length) return;
            this.extraRow=val;
        }
    },
    async mounted(){
        await this.getExtraData();
        this.setDefaultView();
    }
}
</script>

<style>
/* Custom transition styles if needed */
.fade-enter-active {
  transition: opacity 1.5s;
}
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>