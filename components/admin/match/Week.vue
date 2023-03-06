<template>
    <v-container fluid class="px-4">
        <loading-page v-if="loading"/>
        <template v-if="!loading">
            <v-row justify="center">
                <v-chip-group
                    active-class="primary"
                    v-model="selectedLeague"
                    v-for="la in leaguesAggregate" :key="la.league.id"
                >
                    <v-chip small :value="la.league.id"><league-detail :league="la.league"/>
                        <div class="ml-2">{{la.count}}</div>
                    </v-chip>
                </v-chip-group>
            </v-row>
            <v-row justify="center">
                <v-spacer />
                <v-col cols="auto">
                    <v-switch inset v-model="hasGuessModel" label="w/guess"/>
                </v-col>
                <v-col cols="auto">
                    <v-switch inset v-model="motdModel" label="motd"/>
                </v-col>
                <v-spacer />
            </v-row>
            <v-row class="flex-nowrap">
                 <v-col cols="auto">
                    <h1 class="pointer px-2" @click="changeDates(-7)">
                        <
                    </h1>
                </v-col>
                <v-col v-for="(matches, day) in week" :key="day">
                    <h2 class="text-center">{{formatDate(day, false)}}</h2>
                    <h2 class="my-3 text-center">{{filterMatches(matches).length}}</h2>
                    <v-row>
                        <v-expansion-panels>
                            <v-col cols="12" 
                                v-for="match in filterMatches(matches)" 
                                :key="match.id"
                            >
                                <admin-match-expansion-panel 
                                    timeOnly :match="match" 
                                    :onChange="getMatches"
                                />
                            </v-col>
                        </v-expansion-panels>
                    </v-row>
                </v-col>
                <v-col cols="auto">
                    <h1 class="px-2 pointer text-right" @click="changeDates(+7)">></h1>
                </v-col>
            </v-row>
        </template>
    </v-container>
</template>
<script>
export default {
    data:()=>({
        week: null,
        loading: true,
        hasGuessModel: false,
        motdModel: false,
        days_diff: 0,
        selectedLeague: null,
    }),
    computed:{
        leaguesAggregate(){
            let uniqueLeagues = {};

            Object.values(this.week).forEach(dateEntry => {
                dateEntry.forEach(match => {
                if (!uniqueLeagues.hasOwnProperty(match.league_id)) {
                    uniqueLeagues[match.league_id] = {'league': match.league, 'count': 1};
                } else {
                    uniqueLeagues[match.league_id].count += 1;
                }
                });
            });
            return Object.values(uniqueLeagues).sort((a, b) => b.count - a.count);
        }
    },
    async mounted(){
        await this.getMatches();
    },
    methods:{
        async getMatches(){
            this.loading=true;
            let response = await this.$api.call(this.ADMIN_API_ROUTES.MATCH.GET + '?days_diff=' + this.days_diff);
            if(response && response.status === "success"){
                this.week = response.message;
            }
            this.loading = false;
        },
        filterMatches(matches){
            let filtered = this.selectedLeague ? (matches.filter((m)=>m.league_id == this.selectedLeague)) : matches;
            if(this.hasGuessModel){
                filtered = filtered.filter(m => m.aggregateGuesses);
            }
            if(this.motdModel){
                filtered = filtered.filter(m => m.motd);
            }
            return filtered;
        },
        async changeDates(change){
            this.days_diff += change;
            await this.getMatches();
        },
    }
}
</script>
