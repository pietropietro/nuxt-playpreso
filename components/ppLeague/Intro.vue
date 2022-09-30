<template>
    <v-row>
        <v-col cols="6" sm="3">
            <p-p-info 
                label="P-LEAGUE"
                :value="ppTournamentTypeTitle(ppTournamentType)"
            />
        </v-col>
        <v-col cols="6" sm="3">
           <p-p-info 
                v-if="ppTournamentType.next"
                label="qualifies to"
                :value="ppTournamentTypeTitle(ppTournamentType.next)"
            />
            <p-p-info v-else
                label="level"
                value="Last"
            />
        </v-col>
        <v-col cols="6" sm="3">
            <p-p-info 
                label="participants"
                :value="ppTournamentType.participants"
            />
        </v-col>
        <v-col cols="6" sm="3">
            <p-p-info 
                v-if="ppTournamentType.leagues.length == 1"
                label="league"
                :value="ppTournamentType.leagues[0].name"
            />
            <p-p-info 
                v-else
                label="leagues"
                :value="ppTournamentType.leagues.length"
            />
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        ppTournamentType: {type: Object}
    }
}
</script>