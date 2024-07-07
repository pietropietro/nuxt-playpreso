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
                    {{ new Date(calendarComputedModel).toLocaleDateString(undefined, { year: 'numeric', month: 'long' }) }}
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
                    v-model="calendarComputedModel" 
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
        selectedLevel: {type: Number, default: null},
        selectedLeagueId: {default: null},
        selectedSubLeagueId: {default: null},
        calendarType: {type: String},
        setCalendarType: {type: Function},
        calendarModel: {type: String},
        setCalendarModel: {type: Function},
        getChipColor: {type: Function}
    },
    computed:{
        calendarComputedModel:{
            get(){
                return this.calendarModel;
            },
            async set(val){
                await this.setCalendarModel(val);
            }
        },
        filteredMatches() {
            if (!this.selectedCountry && !this.selectedLeagueId && !this.selectedSubLeagueId && this.calendarType === 'month') {
                return this.formatEvents(this.matchSummary);
            }

            if (this.calendarType === 'day') {
                let matchDay = this.matchSummary.find((day) => day.match_day === this.calendarComputedModel);

                return this.formatEvents([matchDay]);
            }
            return [];

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
                const matchCountry = this.selectedCountry ? daySummary.matches_from[this.selectedCountry] : null;

                if (this.selectedCountry && matchCountry) {
                    if (this.selectedLeagueId && this.selectedSubLeagueId) {
                        const matchLeague = matchCountry.find((league) => league.id === this.selectedLeagueId);
                        const matchSubLeague = matchLeague?.subLeagues?.find((subLeague) => subLeague.id === this.selectedSubLeagueId);

                        if (matchSubLeague) {
                            events.push(this.getEventFromSummary(daySummary, matchSubLeague));
                        }
                    } else if (this.selectedLeagueId) {
                        const matchLeague = matchCountry.find((league) => league.id === this.selectedLeagueId);

                        if (matchLeague) {
                            if (matchLeague.subLeagues?.length > 0) {
                                matchLeague.subLeagues.forEach((subLeague) => {
                                    events.push(this.getEventFromSummary(daySummary, subLeague));
                                });
                            } else {
                                events.push(this.getEventFromSummary(daySummary, matchLeague));
                            }
                        }
                    } else {
                        matchCountry.forEach((league) => {
                            events.push(this.getEventFromSummary(daySummary, league));
                        });
                    }
                } else if (this.calendarType === 'day') {
                    Object.keys(summary[0].matches_from).forEach((country) => {
                        summary[0].matches_from[country].forEach((league) => {
                            const leagueIdentifier = `${league.id}-${country}`; // Unique identifier for each league-country pair

                            if (!addedLeagues.has(leagueIdentifier) && (!this.selectedLevel || this.selectedLevel == league.level)) { // Check if this league has already been added
                                events.push(this.getEventFromSummary(summary[0], league));
                                addedLeagues.add(leagueIdentifier); // Mark this league as added
                            }
                        });
                    });
                } else {
                    events.push(this.getEventFromSummary(daySummary));
                }

                if(this.calendarType === 'month' && this.selectedCountry == null){
                    // Add yellow event if all_matches_verified is false and the date is in the past
                    const today = new Date();
                    const matchDayDate = new Date(daySummary.match_day);
                    if (!daySummary.all_matches_verified && matchDayDate < today) {
                        events.push({
                            name: '!',
                            start: daySummary.match_day,
                            end: daySummary.match_day,
                            color: 'light orange',
                        });
                    }
                }
            });

            return events;
        }
    }
}
</script>
