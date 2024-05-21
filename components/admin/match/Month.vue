<template>
  <loading-page v-if="loading" />
  <v-container v-else>
    <v-row align="center">
      <v-col cols="auto">
        <v-btn @click="prevMonth">
          < </v-btn>
      </v-col>
      <v-col>
        <h2 class="text-center">{{ monthLabel }}</h2>
      </v-col>
      <v-col cols="auto">
        <v-btn @click="nextMonth">
          >
        </v-btn>
      </v-col>
    </v-row>

    
      <v-row>
        <v-chip-group v-model="selectedCountry" column v-if="!selectedCountry">
          <v-row no-gutters >
            <v-col  cols="auto"
                v-for="country in uniqueCountries"
                :key="country"
            >
              <v-chip
                :outlined="selectedCountry != country"
                @click="selectedCountru = country"
                :value="country"
              >
                <h4>{{country}}</h4>
                <emoji-flag class="pl-2" :model="country" size="1.5rem" />
              </v-chip>
            </v-col>
          </v-row>
        </v-chip-group>

        <v-col v-if="selectedCountry" cols="auto">
          <v-chip
              outlined
              @click="selectedCountry = null"
              :value="selectedCountry"
            >
              <h4>{{selectedCountry}}</h4>
              <emoji-flag class="pl-2" :model="selectedCountry" size="1.5rem" />
            </v-chip>
        </v-col>

        <v-col v-if="selectedCountry">
          <v-row justify="center">
            <v-chip-group v-model="selectedLeague" column>
              <v-chip
                outlined
                v-for="league in uniqueLeagues"
                :key="league.id"
                @click="onLeagueSelect(league)"
                :value="league.id"
                class="ma-2"
              >
                {{ league.name }}
              </v-chip>
            </v-chip-group>
          </v-row>
        </v-col>
        <v-col v-if="selectedLeague && subLeagues.length > 0" cols="auto">
          <v-row>
            <v-chip-group v-model="selectedSubLeague" column>
              <v-chip
                outlined
                v-for="subLeague in subLeagues"
                :key="subLeague.id"
                @click="onSubLeagueSelect(subLeague)"
                :value="subLeague.id"
                class="ma-2"
              >
                {{ subLeague.name }}
              </v-chip>
            </v-chip-group>
          </v-row>
        </v-col>
      </v-row>

      

    <v-row >
        <v-sheet
          height="500"
          width="50%"
        >
          <v-calendar
            color="primary"
            ref="calendar"
            :weekdays="[1, 2, 3, 4, 5, 6, 0]"
            :type="type"
            :events="filteredMatches"
            :event-color="getEventColor"
            @click:date="viewDay"
            @change="updateRange"
            v-model="value"
          />
        </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      type: 'month',
      value: '',
      focus: '',
      matchSummary: [],
      matches: [],
      monthModel: 0,
      loading: false,
      selectedCountry: null,
      selectedLeague: null,
      selectedSubLeague: null,
      subLeagues: [],
    };
  },
  computed: {
    monthLabel() {
      const date = new Date();
      date.setMonth(date.getMonth() + this.monthModel);
      return date.toLocaleString('default', { month: 'long', year: 'numeric' });
    },
    uniqueCountries() {
      const countries = new Set();
      this.matchSummary.forEach((daySummary) => {
        Object.keys(daySummary.match_from).forEach((country) => {
          countries.add(country);
        });
      });
      return Array.from(countries);
    },
    uniqueLeagues() {
      if (!this.selectedCountry) return [];
      const leagues = new Map();
      this.matchSummary.forEach((daySummary) => {
        if (daySummary.match_from[this.selectedCountry]) {
          daySummary.match_from[this.selectedCountry].forEach((league) => {
            if (league && typeof league === 'object') {
              leagues.set(league.id, league);
            }
          });
        }
      });
      return Array.from(leagues.values());
    },
    filteredMatches() {
      // Return full matchSummary if no filters are selected
      if (!this.selectedCountry && !this.selectedLeague && !this.selectedSubLeague) {
        return this.formatEvents(this.matchSummary);
      }

      // Filter matches based on selected filters
      const filteredSummary = this.matchSummary.filter((daySummary) => {
        if (this.selectedCountry) {
          const matchCountry = daySummary.match_from[this.selectedCountry];
          if (!matchCountry) return false;

          if (this.selectedLeague) {
            const matchLeague = matchCountry.find((league) => league.id === this.selectedLeague);
            if (!matchLeague) return false;

            if (this.selectedSubLeague) {
              const matchSubLeague = matchLeague.subLeagues.find(
                (subLeague) => subLeague.id === this.selectedSubLeague
              );
              return !!matchSubLeague;
            }

            return true;
          }

          return true;
        }

        return true;
      });

      return this.formatEvents(filteredSummary, this.selectedCountry);
    },
  },
  watch: {
    selectedCountry() {
      this.selectedLeague = null;
      this.selectedSubLeague = null;
    },
    selectedLeague() {
      this.selectedSubLeague = null;
    },
  },
  methods: {
    async getMatchSummary() {
      if (this.loading) return;
      this.loading = true;
      try {
        const response = await this.$api.call(this.ADMIN_API_ROUTES.MATCH.GET_MONTH + '?month_diff=' + this.monthModel);
        if (response && response.status === 'success') {
          this.matchSummary = response.message;
        }
      } catch (error) {
        console.error('Error fetching match summary:', error);
      }
      this.loading = false;
    },
    formatEvents(summary, selectedCountry = null) {
      const events = [];
      summary.forEach((daySummary) => {
        const eventName = selectedCountry ? selectedCountry : `${daySummary.match_count}`;
        events.push({
          name: eventName,
          start: daySummary.match_day,
          end: daySummary.match_day,
          match_count: daySummary.match_count,
          id: Math.random() * (2000000 - 0) + 0,
        });
      });
      return events;
    },
    onLeagueSelect(league) {
      this.selectedLeague = league.id;
      this.subLeagues = this.getSubLeaguesForLeague(league.id);
    },
    onSubLeagueSelect(subLeague) {
      this.selectedSubLeague = subLeague.id;
    },
    getSubLeaguesForLeague(leagueId) {
      const subLeagues = new Map();
      this.matchSummary.forEach((daySummary) => {
        if (daySummary.match_from[this.selectedCountry]) {
          daySummary.match_from[this.selectedCountry].forEach((league) => {
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
    viewDay({ date }) {
      this.focus = date;
      this.type = 'day';
    },
    getEventColor(event) {

      if (this.selectedCountry || this.selectedLeague || this.selectedSubLeague) {
        return 'primary';
      }

      const matchCount = event.match_count;
      if (matchCount > 100) {
        return 'primary darken-3';
      } else if (matchCount > 40) {
        return 'primary';
      } else if (matchCount > 10) {
        return 'primary lighten-1';
      } else if (matchCount > 0) {
        return 'primary lighten-3';
      } else {
        return 'red';
      }
    },
    async prevMonth() {
      this.monthModel--;
      this.$refs.calendar.prev();
      await this.getMatchSummary();
    },
    async nextMonth() {
      this.monthModel++;
      this.$refs.calendar.next();
      await this.getMatchSummary();
    },
    async updateRange({ start, end }) {
      console.log('updaterange called');
      // Ensure your matches API call aligns with the visible range
      const startDate = new Date(`${start.date}T00:00:00`);
      const endDate = new Date(`${end.date}T23:59:59`);

      const startMonth = startDate.getMonth();
      const endMonth = endDate.getMonth();
    },
  },
  async mounted() {
    this.$refs.calendar.checkChange();
    await this.getMatchSummary();
  },
};
</script>
