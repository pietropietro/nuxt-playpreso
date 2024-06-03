<template>
    <v-container fluid class="py-0 pr-0">
        <v-row
            v-for="match in selectedMatches"
            :key="match.id"
            align="center"
            dense
        >
            <v-col class="overline lh-1 mr-2" cols="auto">
                {{ match.home_id == selectedTeamId ? 'H' : 'A' }}
            </v-col>
            <v-col>
                <!-- <v-card class="pa-2"  outlined color="var(--v-background-lighten-2)"> -->
                    <match-info-short
                        :match="match"
                        class="overline lh-1"
                    />
                <!-- </v-card> -->
            </v-col>
            <v-col>
                <h1 class="text-center">
                    {{WDLforMatch(match)}}
                </h1>
            </v-col>
        </v-row>
        
    </v-container>
</template>
<script>
export default {
    props: {
        lastMatches: {type: Object},
        selectedTeamId: {type: Number}
    },
    computed: {
        selectedMatches() {
            // Count occurrences of selectedTeamId in home_id and away_id
            const homeMatches = this.lastMatches.home;
            const awayMatches = this.lastMatches.away;
            
            const homeCount = homeMatches.filter(match => match.home_id === this.selectedTeamId).length;
            const awayCount = awayMatches.filter(match => match.away_id === this.selectedTeamId).length;

            // Determine if the selected team is home or away in the majority of the matches
            if (homeCount === homeMatches.length) {
                return homeMatches;
            } else if (awayCount === awayMatches.length) {
                return awayMatches;
            } else {
                // Fallback logic: decide based on the majority or return an empty array if it's ambiguous
                return homeCount > awayCount ? homeMatches : awayMatches;
            }
        }
    },
    methods:{
        WDLforMatch(match){
            let scoreArr = match.home_id == this.selectedTeamId ? 
                [match.score_home,  match.score_away] : 
                [match.score_away, match.score_home];

            if(scoreArr[0] > scoreArr[1]) return 'W';
            if(scoreArr[0] == scoreArr[2]) return 'D';
            return 'L'
        }
    }
}
</script>