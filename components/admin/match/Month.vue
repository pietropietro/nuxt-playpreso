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
            <h2 class="text-center">{{ monthLabel }}</h2>
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
              :type="type"
              :events="filteredMatches"
              :event-color="getEventColor"
              @click:date="viewDay"
              @change="updateRange"
              v-model="value"
            />
          </v-sheet>
        </v-row>
      </v-col>
      <v-col cols="6">
        <v-row class="px-5">

          <!-- SELECTED LIST -->
          <v-col  cols="auto" v-if="selectedCountry">
            <v-card color="primary" rounded="lg" class="pa-2">
              <v-row align="center">
                <v-col v-if="selectedCountry">
                  <v-chip x-large outlined @click="selectedCountry = null" :value="selectedCountry">
                    <!-- <h4>{{ selectedCountry }}</h4> -->
                    <emoji-flag class="pl-2 pt-4" :model="selectedCountry" size="4rem" />
                  </v-chip>
                </v-col>
                <v-col v-if="selectedLeagueObj" class="py-2">
                  <v-chip outlined @click="selectedLeague = null" :value="selectedLeague">
                    <h4>{{ selectedLeagueObj.name }}</h4>
                  </v-chip>
                </v-col>
                <v-col v-if="selectedSubLeagueObj">
                  <v-chip outlined @click="selectedSubLeague = null" :value="selectedSubLeague">
                    <h4>{{ selectedSubLeagueObj.name }}</h4>
                  </v-chip>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <!-- SELECTION -->
          <v-col v-if="!selectedCountry || !selectedLeague || (!selectedSubLeague && subLeagues.length > 0)">
            <v-card flat color="primary" rounded="lg" class="pa-2">
              <v-chip-group v-model="selectedCountry" column v-if="!selectedCountry">
                <v-row no-gutters>
                  <v-col cols="auto" v-for="country in uniqueCountries" :key="country">
                    <v-chip :outlined="selectedCountry != country" @click="selectedCountry = country" :value="country">
                      <h4>{{ country }}</h4>
                      <emoji-flag class="pl-2" :model="country" size="1.5rem" />
                    </v-chip>
                  </v-col>
                </v-row>
              </v-chip-group>

              <v-chip-group v-model="selectedLeague" column v-else-if="selectedCountry && !selectedLeague">
                  <div class="ml-2" v-for="league in sortedUniqueLeagues" :key="league.id">
                    <v-sheet :color="getChipColor(league.id)" class="text-center"><b>LVL {{ league.level }}</b></v-sheet>
                    <v-chip
                      outlined
                      :color="getChipColor(league.id)"
                      @click="onLeagueSelect(league)"
                      :value="league.id"
                      class="ma-2"
                    >
                      {{ league.name }}
                    </v-chip>
                  </div>
                </v-chip-group>


                <v-chip-group v-else-if="selectedLeague && subLeagues.length > 0 && !selectedSubLeague"
                 v-model="selectedSubLeague" column>
                  <v-chip
                    :color="getChipColor(subLeague.id)"
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
      type: 'month',
      value: '',
      focus: '',
      matchSummary: [],
      monthModel: 0,
      loading: false,
      selectedCountry: null,
      selectedLeague: null,
      selectedSubLeague: null,
      subLeagues: [],
      eventColors: {},
      colors: [
        'red', 'blue', 'green', 'purple', 'orange', 'brown', 'cyan', 'magenta', 'yellow',
        'deep-purple', 'indigo', 'teal', 'pink', 'lime', 'amber', 'deep-orange', 'blue-grey', 'light-green', 'grey'
      ],
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
        Object.keys(daySummary.matches_from).forEach((country) => {
          countries.add(country);
        });
      });
      return Array.from(countries);
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
    sortedUniqueLeagues() {
      return this.uniqueLeagues.sort((a, b) => a.level - b.level);
    },
    selectedLeagueObj() {
      if (!this.selectedLeague) return null;
      return this.uniqueLeagues.find((league) => league.id === this.selectedLeague);
    },
    selectedSubLeagueObj() {
      if (!this.selectedSubLeague || !this.selectedLeagueObj) return null;
      return this.subLeagues.find((league) => league.id === this.selectedSubLeague);
    },
    filteredMatches() {
      if (!this.selectedCountry && !this.selectedLeague && !this.selectedSubLeague) {
        return this.formatEvents(this.matchSummary);
      }

      const filteredSummary = this.matchSummary.filter((daySummary) => {
        if (this.selectedCountry) {
          const matchCountry = daySummary.matches_from[this.selectedCountry];
          if (!matchCountry) return false;

          if (this.selectedLeague) {
            const matchLeague = matchCountry.find((league) => league.id === this.selectedLeague);
            if (!matchLeague) return false;

            if (this.selectedSubLeague) {
              const matchSubLeague = matchLeague.subLeagues?.find(
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

      return this.formatEvents(filteredSummary, this.selectedCountry, this.selectedLeague, this.selectedSubLeague);
    },
  },
  watch: {
    selectedCountry() {
      this.selectedLeague = null;
      this.selectedSubLeague = null;
      this.subLeagues = [];
    },
    selectedLeague() {
      this.selectedSubLeague = null;
      this.subLeagues = this.getSubLeaguesForLeague(this.selectedLeague);
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
    formatEvents(summary, selectedCountry = null, selectedLeague = null, selectedSubLeague = null) {
      const events = [];
      summary.forEach((daySummary) => {
        if (selectedCountry && selectedLeague && selectedSubLeague) {
          const matchCountry = daySummary.matches_from[selectedCountry];
          const matchLeague = matchCountry.find((league) => league.id === selectedLeague);
          const matchSubLeague = matchLeague.subLeagues?.find((subLeague) => subLeague.id === selectedSubLeague);

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
        } else if (selectedCountry && selectedLeague) {
          const matchCountry = daySummary.matches_from[selectedCountry];
          const matchLeague = matchCountry.find((league) => league.id === selectedLeague);

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
    viewDay({ date }) {
      this.focus = date;
      this.type = 'day';
    },
    getEventColor(event) {
      return event.color || 'primary';
    },
    getChipColor(id) {
      if (!this.eventColors[this.selectedCountry]) {
        this.eventColors[this.selectedCountry] = {};
      }

      const colors = [
        'red lighten-1', 'blue lighten-1', 'green lighten-1', 'purple lighten-1',
        'orange lighten-1', 'brown lighten-1', 'cyan lighten-1', 'magenta lighten-1',
        'yellow lighten-1', 'deep-purple lighten-1', 'indigo lighten-1', 'teal lighten-1',
        'pink lighten-1', 'lime lighten-1', 'amber lighten-1', 'deep-orange lighten-1',
        'blue-grey lighten-1', 'light-green lighten-1', 'grey lighten-1'
      ];

      if (!this.eventColors[this.selectedCountry][id]) {
        const availableColors = colors.filter(
          (color) => !Object.values(this.eventColors[this.selectedCountry]).includes(color)
        );
        this.eventColors[this.selectedCountry][id] = availableColors[0] || 'grey lighten-1';
      }

      return this.eventColors[this.selectedCountry][id];
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
