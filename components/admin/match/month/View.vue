<template>
	<loading-page v-if="loadingSummary" />
	<v-container fluid v-else>
		<v-row class="px-10">
			<v-col cols="6">
				<admin-match-month-calendar 
					:matchSummary="matchSummary"
					:calendarType="calendarType"
					:setCalendarType="(val)=> calendarType= val"
					:calendarModel="calendarValue"
					:setCalendarModel="(val)=> calendarValue = val"
					:selectedCountry="selectedCountry"
					:selectedLeagueId="selectedLeagueId"
					:selectedSubLeagueId="selectedSubLeagueId"
					:getChipColor="getChipColor"   
				/>
				<!-- <admin-motd
					class="mt-5"
					:calendarValue="calendarValue"
					v-if="calendarType=='day' && selectedCountry==null"
				/> -->
			</v-col>
			<v-col cols="6">
				<admin-match-month-filter 
					:calendarType="calendarType"
					:setCalendarType="(val)=> calendarType= val"
					:calendarValue="calendarValue"
					:selectedCountry="selectedCountry"
					:setSelectedCountry="(val)=>selectedCountry=val"
					:selectedLeagueId="selectedLeagueId"
					:setSelectedLeagueId="(val)=>selectedLeagueId=val"
					:selectedSubLeagueId="selectedSubLeagueId"
					:setSelectedSubLeagueId="(val)=>selectedSubLeagueId=val"
					:getChipColor="getChipColor"
					:matchSummary="matchSummary"
					class="mx-5"
				/>
				<admin-match-month-list 
					:calendarType="calendarType"
					:calendarValue="calendarValue"
					:country="selectedCountry"
					:leagueId="selectedLeagueId"
					:subLeagueId="selectedSubLeagueId"
					:getChipColor="getChipColor"
					class="mx-5 mt-5"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			calendarValue: new Date().toISOString().split('T')[0], // Set to today's date in 'YYYY-MM-DD' format
			loadingSummary: false,
			calendarType: 'month',
			matchSummary: [],
			selectedCountry: null,
			selectedLeagueId: null,
			selectedSubLeagueId: null,
			eventColors: {},
		};
	},
	watch: {
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
	methods:{
		async getMatchSummary() {
			this.loadingSummary = true;
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
			this.loadingSummary = false;
		},
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
		}
	},
	async mounted() {
		await this.getMatchSummary();
	},
};
</script>
