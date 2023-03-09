<template>
    <v-container class="pa-0 lh-1">
        <league-detail :league="match.league" />
        <v-row class="flex-nowrap">
            <v-col cols="auto">
                <h4>{{match.homeTeam?.name}}</h4>
                <h4>{{match.awayTeam?.name}}</h4>
            </v-col>
            <v-col cols="auto" class="pl-0" v-if="match.verified_at" >
                <h4>{{match.score_home}}</h4>
                <h4>{{match.score_away}}</h4>
            </v-col>
        </v-row>
        <v-row v-if="showDateTime" class="overline lh-1 flex-nowrap" no-gutters>
            {{formatDate(match.date_start, withTime)}}
        </v-row>
    </v-container>
</template>
<script>
export default {
    props:{
        match: {type: Object, required: true},
        showDateTime: {type:Boolean, default: true},
        withTime: {type: Boolean, default: true}
    }
}
</script>