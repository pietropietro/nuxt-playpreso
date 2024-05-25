<template>
    <div>
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
                    {{ new Date(calendarComp).toLocaleDateString(undefined, { year: 'numeric', month: 'long' }) }}
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
                    @click:date="setCalendarType('day')"
                    v-model="calendarComp" 
                />
            </v-sheet>
        </v-row>
    </div>
</template>
<script>
export default {
    props:{
        matchSummary: {type: Array},
        selectedCountry: {default: null},
        selectedLeagueId: {default: null},
        selectedSubLeagueId: {default: null},
        calendarType: {type: String},
        setCalendarType: {type: Function},
        calendarModel: {type: String},
        setCalendarModel: {type: Function},
        getChipColor: {type: Function}
    },
    computed:{
        calendarComp:{
            get(){
                return this.calendarModel;
            },
            set(val){
                this.setCalendarModel(val);
            }
        },
        filteredMatches() {
            if (!this.selectedCountry && !this.selectedLeagueId && !this.selectedSubLeagueId && this.calendarType === 'month') {
                return this.formatEvents(this.matchSummary);
            }

            if (this.calendarType === 'day') {
                const matchDay = this.matchSummary.find((day) => day.match_day === this.calendarComp);
                if (matchDay) {
                    return this.formatEvents([matchDay]);
                }
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
        }

    },
    methods:{
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
                } else if (this.calendarType === 'day') {
                    const matchDay = this.matchSummary.find((day) => day.match_day === this.calendarComp);
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
        }

    }
}
</script>