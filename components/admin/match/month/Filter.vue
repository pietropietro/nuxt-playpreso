<template>
    <v-row>
        <!-- SELECTED LIST -->
        <v-col cols="auto" v-if="selectedCountry || selectedLevel || calendarType == 'day'">
            <v-card color="primary" rounded="lg" class="pa-2">
                <v-row align="center">
                    <v-col v-if="calendarType == 'day'">
                        <v-chip outlined @click="setCalendarType('month')">
                            <span class="overline">{{ calendarValue }}</span>
                            <v-btn small icon >x</v-btn>
                        </v-chip>
                    </v-col>
                    <v-col v-if="selectedLevel">
                        <v-chip 
                            outlined 
                            @click="setSelectedLevel(null)" 
                        >
                            <h4>LVL {{ selectedLevel }}</h4>
                            <v-btn small icon>x</v-btn>
                        </v-chip>
                    </v-col>
                    <v-col v-if="selectedCountry">
                        <v-chip 
                            x-large 
                            outlined 
                            @click="setSelectedCountry(null)" 
                        >
                            <emoji-flag class="pl-2 pt-4" :model="selectedCountry" size="4rem" />
                            <v-btn small icon>x</v-btn>
                        </v-chip>
                    </v-col>
                    <v-col v-if="selectedLeagueObj" class="py-2">
                        <v-chip 
                            outlined 
                            @click="setSelectedLeagueId(null)" 
                        >
                            <h4>{{ selectedLeagueObj.name }}</h4>
                            <v-btn small icon>x</v-btn>
                        </v-chip>
                    </v-col>
                    <v-col v-if="selectedSubLeagueObj">
                        <v-chip 
                            outlined 
                            @click="setSelectedSubLeagueId(null)" 
                        >
                            <h4>{{ selectedSubLeagueObj.name }}</h4>
                            <v-btn small icon>x</v-btn>
                        </v-chip>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>

        <!-- SELECTION -->
        <v-col>
            <v-card 
                flat 
                color="primary" 
                rounded="lg" 
                class="pa-2"
            >

                <v-chip-group 
                        v-model="selectedLevelModel" 
                        column 
                        v-if="!selectedLevel && ! selectedCountry"
                    >
                    <v-row no-gutters align="center">
                        <v-col cols="auto" class="pr-2"><div class="overline lh-1">LVL</div></v-col>
                        <v-col 
                            cols="auto" 
                            v-for="level in availableLevels" 
                            :key="level"
                        >
                            <v-chip 
                                :outlined="selectedLevel != level" 
                                @click="setSelectedLevel(level)"
                                :value="level"
                            >
                                <h4>{{ level }}</h4>
                            </v-chip>
                        </v-col>
                    </v-row>
                </v-chip-group>
            
                <template v-if="!selectedCountry || !selectedLeagueId || (!selectedSubLeagueId && subLeagues.length > 0)">
                    <v-chip-group
                        v-model="selectedCountryModel"
                        column
                        v-if="!selectedCountry"
                    >
                        <v-row no-gutters>
                            <v-col
                                cols="auto"
                                v-for="country in availableCountries"
                                :key="country"
                            >
                                <v-chip
                                    :outlined="selectedCountry != country"
                                    @click="setSelectedCountry(country)"
                                    :value="country"
                                >
                                    <h4>{{ country }}</h4>
                                    <emoji-flag class="pl-2" :model="country" size="1.5rem" />
                                    <span class="ml-1 caption">
                                        ({{ countMatchesFor('country',country) }})
                                    </span>
                                </v-chip>
                            </v-col>
                        </v-row>
                    </v-chip-group>
                    <v-chip-group
                        v-else-if="selectedCountry && !selectedLeagueId"
                        v-model="selectedLeagueIdModel"
                        column
                    >
                        <div
                            v-for="league in sortedAvailableLeagues"
                            :key="league.id"
                            class="ml-2"
                        >
                            <v-sheet :color="getChipColor(league.id)" class="text-center">
                                <b>LVL {{ league.level}}</b>
                            </v-sheet>
                            <v-chip
                                outlined
                                :color="getChipColor(league.id)"
                                @click="setSelectedLeagueId(league.id)"
                                :value="league.id"
                                class="ma-2"
                            >
                                {{ league.name }}
                                <span class="caption ml-1">({{ countMatchesFor('league', league.id) }})</span>
                            </v-chip>
                        </div>
                    </v-chip-group>
                    <v-chip-group
                        v-else-if="selectedLeagueId && subLeagues.length > 0 && !selectedSubLeagueId"
                        v-model="selectedSubLeagueIdModel"
                        column
                    >
                        <v-chip
                            v-for="subLeague in subLeagues"
                            :key="subLeague.id"
                            :color="getChipColor(subLeague.id)"
                            outlined
                            @click="setSelectedSubLeagueId(subLeague.id)"
                            :value="subLeague.id"
                            class="ma-2"
                        >
                            {{ subLeague.name }}
                            <span class="caption ml-1">
                                ({{ countMatchesFor('subLeague', subLeague.id) }})
                            </span>
                        </v-chip>
                    </v-chip-group>
                </template>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props:{
        calendarType: {default: null},
        setCalendarType: {type: Function},
        calendarValue: {default: null},
        selectedCountry: {default: null},
        setSelectedCountry: {type: Function},
        selectedLeagueId: {default: null},
        setSelectedLeagueId: {type: Function},
        selectedSubLeagueId: {default: null},
        setSelectedSubLeagueId: {type: Function},
        selectedLevel: {default: null},
        setSelectedLevel: {type: Function},
        getChipColor: {default: null},
        matchSummary: {default: null}
    },
    data(){
        return {
            subLeagues: [],
        }
    },  
    watch:{
        selectedCountry() {
			this.setSelectedLeagueId(null);
			this.setSelectedSubLeagueId(null);
            this.setSelectedLevel(null);
			this.subLeagues = [];
		},
		selectedLeagueId() {
			this.setSelectedSubLeagueId(null);
			this.subLeagues = this.getSubLeaguesForLeague(this.selectedLeagueId);
		}
    },
    computed:{
        selectedCountryModel:{
            get(){
                return this.selectedCountry;
            },
            set(val){
                this.setSelectedCountry(val);
            }
        },
        selectedLeagueIdModel:{
            get(){
                return this.selectedLeagueId;
            },
            set(val){
                this.setSelectedLeagueId(val);
            }
        },
        selectedSubLeagueIdModel:{
            get(){
                return this.selectedSubLeagueId;
            },
            set(val){
                this.setSelectedSubLeagueId(val);
            }
        },
        selectedLevelModel:{
            get(){
                return this.selectedLevel;
            },
            set(val){
                this.setSelectedLevel(val);
            }
        },
        uniqueCountries() {
			const countries = new Set();
			this.matchSummary.forEach((daySummary) => {
				Object.keys(daySummary.matches_from).forEach((country) => {
                    if(!this.selectedLevel)countries.add(country);
                    else{
                        if(daySummary.matches_from[country].filter(l=>l.level == this.selectedLevel).length > 0){
                            countries.add(country);
                        }
                    }
				});
			});
			return Array.from(countries);
		},
		availableCountries() {
			if (this.calendarType == 'month'){
               return this.uniqueCountries;
            } 
			const matchDay = this.matchSummary.find((day) => day.match_day === this.calendarValue);
			if (!matchDay) return this.uniqueCountries;
			return Object.keys(matchDay.matches_from);
		},
		uniqueLeagues() {
			if (!this.selectedCountry) return [];
			const leagues = new Map();
			this.matchSummary.forEach((daySummary) => {
				if (daySummary.matches_from[this.selectedCountry]) {
					daySummary.matches_from[this.selectedCountry].forEach((league) => {
						if (league && typeof league === 'object') {
							leagues.set(league.id, league);
						}
					});
				}
			});
			return Array.from(leagues.values());
		},
		availableLeagues() {
			if (this.calendarType == 'month'){
                return this.uniqueLeagues;
            }
			const matchDay = this.matchSummary.find((day) => day.match_day === this.calendarValue);
			if (!matchDay) return this.uniqueLeagues;
			const leagues = new Map();
			if (matchDay.matches_from[this.selectedCountry]) {
				matchDay.matches_from[this.selectedCountry].forEach((league) => {
					if (league && typeof league === 'object') {
						leagues.set(league.id, league);
					}
				});
			}
			return Array.from(leagues.values());
		},
        sortedAvailableLeagues() {
			return this.availableLeagues.sort((a, b) => a.level - b.level);
		},
        uniqueLevels() {
            const levels = new Set();
            this.matchSummary.forEach(daySummary => {
                Object.values(daySummary.matches_from).forEach(leagues => {
                    leagues.forEach(league => {
                        levels.add(league.level);
                    });
                });
            });
            return Array.from(levels).sort((a, b) => a - b);
        },

        availableLevels() {
            const levels = new Set();
            if (this.calendarType == 'month') {
                // Fetch levels from all countries and all days
                return this.uniqueLevels;
            } else {
                // Fetch levels for a specific day
                const daySummary = this.matchSummary.find(day => day.match_day === this.calendarValue);
                Object.values(daySummary.matches_from).forEach(leagues => {
                    leagues.forEach(league => {
                        levels.add(league.level);
                    });
                });
            }
            return Array.from(levels).sort((a, b) => a - b);
        },
        selectedLeagueObj() {
			if (!this.selectedLeagueId) return null;
			return this.uniqueLeagues.find((league) => league.id === this.selectedLeagueId);
		},
		selectedSubLeagueObj() {
			if (!this.selectedSubLeagueId || !this.selectedLeagueObj) return null;
			return this.subLeagues.find((league) => league.id === this.selectedSubLeagueId);
		},
    },
    methods:{
        // The type of entity (country, league, or subLeague).
		countMatchesFor(type, id) {
			let total = 0;

			const addMatches = (daySummary) => {
				Object.keys(daySummary.matches_from).forEach((country) => {
					daySummary.matches_from[country].forEach((league) => {
						if (type === 'country' && id === country) {
							total += league.league_day_count;
						} else if (type === 'league' && league.id === id) {
							total += league.league_day_count;
						} else if (type === 'subLeague' && league.subLeagues) {
							league.subLeagues.forEach((subLeague) => {
								if (subLeague.id === id) {
									total += subLeague.league_day_count;
								}
							});
						}
					});
				});
			};

			if (this.calendarType === 'day') {
				const matchDay = this.matchSummary.find((day) => day.match_day === this.calendarValue);
				if (matchDay) {
					addMatches(matchDay);
				}
			} else {
				this.matchSummary.forEach(addMatches);
			}

			return total;
		},
        getSubLeaguesForLeague(leagueId) {
			const subLeagues = new Map();
			this.matchSummary.forEach((daySummary) => {
				if (daySummary.matches_from[this.selectedCountry]) {
					daySummary.matches_from[this.selectedCountry].forEach((league) => {
						if (league.id === leagueId && league.subLeagues) {
							league.subLeagues.forEach((subLeague) => {
								subLeagues.set(subLeague.id, subLeague);
							});
						}
					});
				}
			});
			return Array.from(subLeagues.values());
		},
    }
}
</script>