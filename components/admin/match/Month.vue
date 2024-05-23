<template>
	<loading-page v-if="loading" />
	<v-container fluid v-else>
		<v-row class="px-10">
			<v-col cols="6">
				<v-row>
					<v-col cols="auto">
						<v-btn @click="prevMonth">
							< </v-btn>
					</v-col>
					<v-col>
						<h2 class="text-center">
							{{ new Date(calendarValue).toLocaleDateString(undefined, { year: 'numeric', month: 'long' }) }}
						</h2>
					</v-col>
					<v-col cols="auto">
						<v-btn @click="nextMonth">
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
							:event-color="(event)=>event.color || 'primary'" 
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
			calendarValue: '',
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
		sortedUniqueLeagues() {
			return this.uniqueLeagues.sort((a, b) => a.level - b.level);
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

			return this.formatEvents(filteredSummary, this.selectedCountry, this.selectedLeagueId, this.selectedSubLeagueId);
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

				const response = await this.$api.call(this.ADMIN_API_ROUTES.MATCH.GET_MONTH+ `?year=${year}&month=${month}`);
				if (response && response.status === 'success') {
					this.matchSummary = response.message;
				}
			} catch (error) {
				console.error('Error fetching match summary:', error);
			}
			this.loading = false;
		},
		formatEvents(summary, selectedCountry = null, selectedLeagueId = null, selectedSubLeagueId = null) {
			const events = [];
			summary.forEach((daySummary) => {
				if (selectedCountry && selectedLeagueId && selectedSubLeagueId) {
					const matchCountry = daySummary.matches_from[selectedCountry];
					const matchLeague = matchCountry.find((league) => league.id === selectedLeagueId);
					const matchSubLeague = matchLeague.subLeagues?.find((subLeague) => subLeague.id === selectedSubLeagueId);

					if (matchSubLeague) {
						events.push({
							name: matchSubLeague.name,
							start: daySummary.match_day,
							end: daySummary.match_day,
							match_count: daySummary.match_count,
							color: this.getChipColor(matchSubLeague.id),
							level: matchSubLeague.level, // Add level here if available
						});
					}
				} else if (selectedCountry && selectedLeagueId) {
					const matchCountry = daySummary.matches_from[selectedCountry];
					const matchLeague = matchCountry.find((league) => league.id === selectedLeagueId);

					if (matchLeague && matchLeague.subLeagues?.length > 0) {
						matchLeague.subLeagues.forEach((subLeague) => {
							events.push({
								name: subLeague.name,
								start: daySummary.match_day,
								end: daySummary.match_day,
								match_count: daySummary.match_count,
								color: this.getChipColor(subLeague.id),
								level: subLeague.level, // Add level here if available
							});
						});
					} else {
						events.push({
							name: matchLeague.name,
							start: daySummary.match_day,
							end: daySummary.match_day,
							match_count: daySummary.match_count,
							color: this.getChipColor(matchLeague.id),
							level: matchLeague.level, // Add level here
						});
					}
				} else if (selectedCountry) {
					const matchCountry = daySummary.matches_from[selectedCountry];
					matchCountry.forEach((league) => {
						events.push({
							name: league.name,
							start: daySummary.match_day,
							end: daySummary.match_day,
							match_count: daySummary.match_count,
							color: this.getChipColor(league.id),
							level: league.level, // Add level here
						});
					});
				} else if (this.calendarType == 'day') {
					const matchDay = this.matchSummary.find((day) => day.match_day === this.calendarValue);
					if (matchDay) {
						Object.keys(matchDay.matches_from).forEach((country) => {
							matchDay.matches_from[country].forEach((league) => {
								events.push({
									name: league.name,
									start: matchDay.match_day,
									end: matchDay.match_day,
									match_count: matchDay.match_count,
									color: this.getChipColor(league.id),
									level: league.level, // Add level here
								});
							});
						});
					}
				} else {
					events.push({
						name: `${daySummary.match_count}`,
						start: daySummary.match_day,
						end: daySummary.match_day,
						match_count: daySummary.match_count,
					});
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
		async prevMonth() {
			this.$refs.calendar.prev();
			await this.getMatchSummary();
		},
		async nextMonth() {
			this.$refs.calendar.next();
			await this.getMatchSummary();
		},
	},
	async mounted() {
		this.calendarValue = new Date().toISOString().split('T')[0]; // Set to today's date in 'YYYY-MM-DD' format
		await this.getMatchSummary();
	},
};
</script>
