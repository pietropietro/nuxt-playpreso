<template>
  <loading-page v-if="loading" />
  <v-container v-else-if="!loading">
    <v-row align="center">
      <v-col cols="auto">
        <v-btn @click="prevMonth">
          < </v-btn>
      </v-col>
      <v-col cols="auto">
        <h2>{{ monthModel }}</h2>
        value: {{ value }}
        focus: {{ focus }}
      </v-col>
      <v-col cols="auto">
        <v-btn @click="nextMonth">
          >
        </v-btn>
      </v-col>
    </v-row>
    <v-calendar ref="calendar" color="primary" :weekdays="[1, 2, 3, 4, 5, 6, 0]" :type="type" :events="matches"
      :event-color="getEventColor" @click:date="viewDay" @change="updateRange" v-model="value" />
  </v-container>
</template>
  
<script>
export default {
  data() {
    return {
      type: 'month',
      value: '',
      focus: '',
      matches: [],
      monthModel: 0,
      loading: false,
    };
  },

  async mounted() {
    this.$refs.calendar.checkChange()
    await this.getMatches();
  },

  methods: {
    async getMatches() {
      if (this.loading == true) return;
      this.loading = true;
      try {
        const response = await this.$api.call(this.ADMIN_API_ROUTES.MATCH.GET_MONTH + '?month_diff=' + this.monthModel);
        if (response && response.status === 'success') {
          this.updateMatches(response.message);
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
      this.loading = false;
    },

    updateMatches(matches) {
      this.matches = [];
      // Clear the current matches array and push new events
      matches.forEach(match => {
        this.matches.push({
          name: `${match.match_count}`,
          start: match.match_day,
          end: match.match_day,
          match_count: match.match_count,
        });
      });
    },

    viewDay({ date }) {
      this.focus = date;
      this.type = 'day';
    },
    getEventColor(event) {
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
        return 'transparent';
      }
    },
    async prevMonth() {
      this.monthModel--;
      this.$refs.calendar.prev();
      await this.getMatches();
    },
    async nextMonth() {
      this.monthModel++;
      this.$refs.calendar.next();
      await this.getMatches();
    },

    async updateRange({ start, end }) {
      // Ensure your matches API call aligns with the visible range
      const startDate = new Date(`${start.date}T00:00:00`);
      const endDate = new Date(`${end.date}T23:59:59`);

      const startMonth = startDate.getMonth();
      const endMonth = endDate.getMonth();

    },
  },
};
</script>
  