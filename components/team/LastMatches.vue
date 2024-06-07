<template>
        <v-container fluid class="py-0 pr-0" v-if="lastMatches[side]?.length">
            <v-row
                v-for="match in lastMatches[side]"
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
        <v-row v-else style="height:100%" align="center" justify="center">
            <em-emoji id="man-shrugging" size="5em" style="rotate:-18deg"/>
        </v-row>
</template>
<script>
export default {
    props: {
        lastMatches: {type: Object},
        side: {type: String},
        selectedTeamId: {type: Number}
    },
    methods:{
        WDLforMatch(match){
            let scoreArr = match.home_id == this.selectedTeamId ? 
                [match.score_home,  match.score_away] : 
                [match.score_away, match.score_home];

            if(scoreArr[0] > scoreArr[1]) return 'W';
            if(scoreArr[0] == scoreArr[1]) return 'D';
            return 'L'
        }
    }
}
</script>