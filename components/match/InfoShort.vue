<template>
    <v-container class="pa-0 lh-1">
        <p-p-emoji :model="match.league?.country" />
        <span class="overline lh-1">{{match.league.tag}}</span>
        <v-row>
            <v-col cols="auto">
                <h4>{{match.homeTeam?.name}}</h4>
                <h4>{{match.awayTeam?.name}}</h4>
            </v-col>
            <v-col v-if="match.verified_at" >
                <h4>{{match.score_home}}</h4>
                <h4>{{match.score_away}}</h4>
            </v-col>
        </v-row>
        <v-row no-gutters class="overline lh-1">{{formatDate(match.date_start, withTime)}}</v-row>
    </v-container>
</template>
<script>
export default {
    props:{
        match: {type: Object, required: true},
        withTime: {type: Boolean, default: true}
    }
}
</script>