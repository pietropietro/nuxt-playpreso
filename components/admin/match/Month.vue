<template>
	<loading-page v-if="loading" />
	<v-container fluid v-else>
		<v-row class="px-10">
			<v-col cols="6">
				<v-row>
					<v-col cols="auto">
						<v-btn 
							@click="$refs.calendar.prev()"
						>
							< 
						</v-btn>
					</v-col>
					<v-col>
						<h2 class="text-center">
							{{ new Date(calendarValue).toLocaleDateString(undefined, { year: 'numeric', month: 'long' }) }}
						</h2>
					</v-col>
					<v-col cols="auto">
						<v-btn 
							@click="$refs.calendar.next()"
						>
							>
						</v-btn>
					</v-col>
				</v-row>
				<v-row>
					<v-sheet height="700" width="100%">
						<v-calendar
							color="primary"
							ref="calendar"
							:weekdays="[1, 2, 3, 4, 5, 6, 0]"
							:type="calendarType"
							:events="filteredMatches"
							:event-color="(event) => event.color || 'primary'"
							@click:date="calendarType='day'"
							v-model="calendarValue"
						/>
					</v-sheet>
				</v-row>
			</v-col>
			<v-col cols="6">
				<v-row class="px-5">
					<!-- SELECTED LIST -->
					<v-col cols="auto" v-if="selectedCountry || calendarType == 'day'">
						<v-card color="primary" rounded="lg" class="pa-2">
							<v-row align="center">
								<v-col v-if="calendarType == 'day'">
									<v-chip outlined @click="calendarType = 'month'">
										<span class="overline">{{ calendarValue }}</span>
									</v-chip>
								</v-col>
								<v-col v-if="selectedCountry">
									<v-chip 
										x-large 
										outlined 
										@click="selectedCountry = null" 
									>
										<emoji-flag class="pl-2 pt-4" :model="selectedCountry" size="4rem" />
									</v-chip>
								</v-col>
								<v-col v-if="selectedLeagueObj" class="py-2">
									<v-chip 
										outlined 
										@click="selectedLeagueId = null" 
									>
										<h4>{{ selectedLeagueObj.name }}</h4>
									</v-chip>
								</v-col>
								<v-col v-if="selectedSubLeagueObj">
									<v-chip 
										outlined 
										@click="selectedSubLeagueId = null" 
									>
										<h4>{{ selectedSubLeagueObj.name }}</h4>
									</v-chip>
								</v-col>
							</v-row>
						</v-card>
					</v-col>

					<!-- SELECTION -->
					<v-col v-if="!selectedCountry || !selectedLeagueId || (!selectedSubLeagueId && subLeagues.length > 0)">
						<v-card flat color="primary" rounded="lg" class="pa-2">
							<v-chip-group v-model="selectedCountry" column v-if="!selectedCountry">
								<v-row no-gutters>
									<v-col cols="auto" v-for="country in availableCountries" :key="country">
										<v-chip :outlined="selectedCountry != country" @click="selectedCountry = country"
											:value="country">
											<h4>{{ country }}</h4>
											<emoji-flag class="pl-2" :model="country" size="1.5rem" />
											<span class="ml-1 caption">({{ countMatchesFor('country',country) }})</span>
										</v-chip>
									</v-col>
								</v-row>
							</v-chip-group>

							<v-chip-group v-model="selectedLeagueId" column
								v-else-if="selectedCountry && !selectedLeagueId">
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
										@click="(league) => selectedLeagueId = league.id"
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
								v-model="selectedSubLeagueId" 
								column
							>
								<v-chip 
									v-for="subLeague in subLeagues"
									:key="subLeague.id"
									:color="getChipColor(subLeague.id)" 
									outlined 
									@click="(subLeague)=>selectedSubLeagueId = subLeague.id" 
									:value="subLeague.id"
									class="ma-2"
								>
									{{ subLeague.name }}
									<span class="caption ml-1">({{ countMatchesFor('subLeague', subLeague.id) }})</span>
								</v-chip>
							</v-chip-group>
						</v-card>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>


<script>
export default {
	data() {
		return {
			calendarType: 'month',
			calendarValue: new Date().toISOString().split('T')[0], // Set to today's date in 'YYYY-MM-DD' format
			matchSummary: [],
			loading: false,
			selectedCountry: null,
			selectedLeagueId: null,
			selectedSubLeagueId: null,
			subLeagues: [],
			eventColors: {},
		};
	},
	computed: {
		uniqueCountries() {
			const countries = new Set();
			this.matchSummary.forEach((daySummary) => {
				Object.keys(daySummary.matches_from).forEach((country) => {
					countries.add(country);
				});
			});
			return Array.from(countries);
		},
		availableCountries() {
			if (this.calendarType == 'month') return this.uniqueCountries;
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
			if (this.calendarType == 'month') return this.uniqueLeagues;
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
		selectedLeagueObj() {
			if (!this.selectedLeagueId) return null;
			return this.uniqueLeagues.find((league) => league.id === this.selectedLeagueId);
		},
		selectedSubLeagueObj() {
			if (!this.selectedSubLeagueId || !this.selectedLeagueObj) return null;
			return this.subLeagues.find((league) => league.id === this.selectedSubLeagueId);
		},
		filteredMatches() {
			if (!this.selectedCountry && !this.selectedLeagueId && !this.selectedSubLeagueId && this.calendarType == 'month') {
				return this.formatEvents(this.matchSummary);
			}

			const filteredSummary = this.matchSummary.filter((daySummary) => {
				if (this.selectedCountry) {
					const matchCountry = daySummary.matches_from[this.selectedCountry];
					if (!matchCountry) return false;

					if (this.selectedLeagueId) {
						const matchLeague = matchCountry.find((league) => league.id === this.selectedLeagueId);
						if (!matchLeague) return false;

						if (this.selectedSubLeagueId) {
							const matchSubLeague = matchLeague.subLeagues?.find(
								(subLeague) => subLeague.id === this.selectedSubLeagueId
							);
							return !!matchSubLeague;
						}

						return true;
					}

					return true;
				}

				return true;
			});

			return this.formatEvents(filteredSummary);
		},
	},
	watch: {
		selectedCountry() {
			this.selectedLeagueId = null;
			this.selectedSubLeagueId = null;
			this.subLeagues = [];
		},
		selectedLeagueId() {
			this.selectedSubLeagueId = null;
			this.subLeagues = this.getSubLeaguesForLeague(this.selectedLeagueId);
		},
		async calendarValue(newVal, oldVal) {
			const newDate = new Date(newVal);
			const oldDate = new Date(oldVal);

			const newYearMonth = `${newDate.getFullYear()}-${newDate.getMonth() + 1}`;
			const oldYearMonth = `${oldDate.getFullYear()}-${oldDate.getMonth() + 1}`;

			if (newYearMonth !== oldYearMonth) {
				await this.getMatchSummary();
			}
		},
	},
	methods: {
		getChipColor(id) {
			if (!this.eventColors[this.selectedCountry]) {
				this.eventColors[this.selectedCountry] = {};
			}

			// Vuetify color list
			const colors = [
				'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green',
				'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'blue-grey', 'grey', 'red darken-1', 'pink darken-1',
				'purple darken-1', 'deep-purple darken-1', 'indigo darken-1', 'blue darken-1', 'light-blue darken-1', 'cyan darken-1',
				'teal darken-1', 'green darken-1', 'light-green darken-1', 'lime darken-1', 'yellow darken-1', 'amber darken-1',
				'orange darken-1', 'deep-orange darken-1', 'brown darken-1', 'blue-grey darken-1', 'grey darken-1', 'red lighten-1',
				'pink lighten-1', 'purple lighten-1', 'deep-purple lighten-1', 'indigo lighten-1', 'blue lighten-1', 'light-blue lighten-1',
				'cyan lighten-1', 'teal lighten-1', 'green lighten-1', 'light-green lighten-1', 'lime lighten-1', 'yellow lighten-1',
				'amber lighten-1', 'orange lighten-1', 'deep-orange lighten-1', 'brown lighten-1', 'blue-grey lighten-1', 'grey lighten-1'
			];

			if (!this.eventColors[this.selectedCountry][id]) {
				const availableColors = colors.filter(
					(color) => !Object.values(this.eventColors[this.selectedCountry]).includes(color)
				);
				this.eventColors[this.selectedCountry][id] = availableColors[0] || 'grey';
			}

			return this.eventColors[this.selectedCountry][id];
		},

		async getMatchSummary() {
			if (this.loading) return;
			this.loading = true;
			try {
				const date = this.calendarValue ? new Date(this.calendarValue) : new Date();
				const year = date.getFullYear();
				const month = date.getMonth() + 1; // Note: JavaScript months are 0-based

				const response = await this.$api.call(this.ADMIN_API_ROUTES.MATCH.GET_MONTH + `?year=${year}&month=${month}`);
				if (response && response.status === 'success') {
					this.matchSummary = response.message;
				}
			} catch (error) {
				console.error('Error fetching match summary:', error);
			}
			this.loading = false;
		},

		getEventFromSummary(summary, league) {
			if (league) {
				return {
					name: this.calendarType == 'day' ? `${league.name} (${league.league_day_count})` : league.league_day_count, // Include the count in the label
					start: summary.match_day,
					end: summary.match_day,
					match_count: summary.match_count,
					color: this.getChipColor(league.id),
					level: league.level,
				};
			}
			return {
				name: `${summary.match_count}`,
				start: summary.match_day,
				end: summary.match_day,
				match_count: summary.match_count,
			};
		},

		formatEvents(summary) {
			const events = [];
			const addedLeagues = new Set(); // Set to track added leagues and prevent duplicates

			summary.forEach((daySummary) => {
				if (this.selectedCountry && this.selectedLeagueId && this.selectedSubLeagueId) {
					const matchCountry = daySummary.matches_from[this.selectedCountry];
					const matchLeague = matchCountry.find((league) => league.id === this.selectedLeagueId);
					const matchSubLeague = matchLeague.subLeagues?.find((subLeague) => subLeague.id === this.selectedSubLeagueId);

					if (matchSubLeague) {
						events.push(this.getEventFromSummary(daySummary, matchSubLeague));
					}
				} else if (this.selectedCountry && this.selectedLeagueId) {
					const matchCountry = daySummary.matches_from[this.selectedCountry];
					const matchLeague = matchCountry.find((league) => league.id === this.selectedLeagueId);

					if (matchLeague && matchLeague.subLeagues?.length > 0) {
						matchLeague.subLeagues.forEach((subLeague) => {
							events.push(this.getEventFromSummary(daySummary, subLeague));
						});
					} else {
						events.push(this.getEventFromSummary(daySummary, matchLeague));
					}
				} else if (this.selectedCountry) {
					const matchCountry = daySummary.matches_from[this.selectedCountry];
					matchCountry.forEach((league) => {
						events.push(this.getEventFromSummary(daySummary, league));
					});
				} else if (this.calendarType == 'day') {
					const matchDay = this.matchSummary.find((day) => day.match_day === this.calendarValue);
					if (matchDay) {
						Object.keys(matchDay.matches_from).forEach((country) => {
							matchDay.matches_from[country].forEach((league) => {
								const leagueIdentifier = `${league.id}-${country}`; // Unique identifier for each league-country pair

								if (!addedLeagues.has(leagueIdentifier)) { // Check if this league has already been added
									events.push(this.getEventFromSummary(matchDay, league));
									addedLeagues.add(leagueIdentifier); // Mark this league as added
								}
							});
						});
					}
				} else {
					events.push(this.getEventFromSummary(daySummary));
				}
			});

			return events;
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
		}


	},
	async mounted() {
		await this.getMatchSummary();
	},
};
</script>

