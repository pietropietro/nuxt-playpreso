<template>
    <v-container style="height: 100%;">
        <v-app-bar
            color="var(--v-background-base)"
            flat 
            app
            height="140px"
        >
            <v-container fluid>
                <guess-header-time-row />
                <match-team-selection
                    v-if="openMatch"
                    class="py-2"
                    :match="openMatch"
                    :selectedTeamId="selectedTeamId"
                    :setSelectedTeamId="(val)=>selectedTeamId=val"
                />
            </v-container>
        </v-app-bar>
        
        <v-chip-group 
            style="padding-top:60px;"
            class="text-center"
            v-model="selectedTab" 
            column 
        >
            <v-row>
                <v-col 
                    v-for="tab in ['league', 'last-5', 'pptt']" 
                    :key="tab"
                >
                    <v-chip 
                        :outlined="tab != selectedTab" 
                        @click="(val)=> selectedTab=val"
                        :value="tab"
                    >
                        <h4>{{ tab }}</h4>
                    </v-chip>
                </v-col>
            </v-row>
        </v-chip-group>

        <league-standings 
            v-if="selectedTab == 'league'" 
            :standings="leagueStandings"
            :highlightTeamIds="[openMatch.homeTeam.id,openMatch.awayTeam.id]"
        />

        <v-footer
            app
            color="var(--v-background-base)"
            class="d-flex flex-column align-center py-5"
            style="border-top: 2px red solid;"
        >
                <v-row  style="width:100%" >
                    <v-col cols="auto">
                        <guess-single-values :guess="openGuess"/>
                    </v-col>
                    <v-spacer/>
                    <v-col cols="auto">
                        <guess-score-picker
                            :guess="openGuess"
                            :setGuess="setGuess"
                            class="pb-5"
                            big
                        />
                    </v-col>
                </v-row>
                <guess-lock-action />
        </v-footer>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            selectedTeamId: null,
            selectedTab: 'league',
            loading: false,
            leagueStandings: []
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
				}
			} catch (error) {
				console.error('Error fetching extra data:', error);
			}
			this.loading = false;
        }
    },
    async mounted(){
        // this.selectedTeamId = this.openMatch.homeTeam.id;
        await this.getExtraData();
    }
}
</script>
