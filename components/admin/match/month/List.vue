<template>
    <loading-page v-if="loading" />
    <v-row v-else-if="matches && matches.length > 0">
        <v-card color="primary" rounded="lg" class="pa-2">
            <v-expansion-panels >
                <v-row dense>
                    <v-col
                        v-for="match in matches"
                        :key="match.id"
                        cols="auto"
                    >
                        <admin-match-expansion-panel
                            :match="match"
                            :onChange="getMatches"
                        />
                    </v-col>
                </v-row>
            </v-expansion-panels>
        </v-card>
    </v-row>
</template>

<script>
export default {
    props:{
        country: {type: String, default: null},
        leagueId: {type: Number, default: null},
        subLeagueId: {type: Number, default: null},
        calendarValue: {type: String},
        calendarType: {type: String}
    },
    data() {
		return {
			loading: false,
            matches: []
		};
	},
    watch: {
        async country() {
            await this.getMatches();
        },
        async leagueId() {
            await this.getMatches();
        },
        async subLeagueId() {
            await this.getMatches();
        },
        async calendarValue() {
            await this.getMatches();
        },
        async calendarType() {
            await this.getMatches();
        }
    },
    methods: {
        async getMatches() {
            if(this.loading)return;
            this.matches= null;
            // do not fetch for whole month without filters
            if(!this.country && this.calendarType=='month'){
                return;
            }
            this.loading = true;
            console.log('insideee');
            let params = {};

            if (this.subLeagueId) {
                params.leagueId = this.subLeagueId;
            } else if (this.leagueId) {
                params.leagueId = this.leagueId;
            } else if (this.country) {
                params.country = this.country;
            }

            if (this.calendarType === 'day') {
                const startOfDay = `${this.calendarValue}T00:00:00`;
                const endOfDay = `${this.calendarValue}T23:59:59`;
                params.from = startOfDay;
                params.to = endOfDay;
            } else if (this.calendarType === 'month') {
                const date = new Date(this.calendarValue);
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const startOfMonth = `${year}-${month}-01T00:00:00`;
                const endOfMonth = new Date(year, month, 0).toISOString().replace(/T.*$/, 'T23:59:59');
                params.from = startOfMonth;
                params.to = endOfMonth;
            }

            try {

                // Construct the query string
                const queryString = Object.keys(params)
                    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
                    .join('&');

                const response = await this.$api.call(
                    `${this.ADMIN_API_ROUTES.MATCH.GET}?${queryString}`,
                );

                if (response && response.status === 'success') {
                    this.matches = response.message;
                }
            } catch (error) {
                console.error('Error fetching matches:', error);
            }

            this.loading = false;
        }
    },
}
</script>