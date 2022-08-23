<template>
    <div slot="info">
        <v-row no-gutters class="text-caption font-weight-bold">
            {{match.homeTeam.name}} - {{match.awayTeam.name}}
        </v-row>
        <v-row no-gutters align="center">
            <v-col cols="6">
                <v-chip label outlined small :color="$store.state.navigation.color">{{match.league.name}}</v-chip>
            </v-col>
            <v-col cols="6">
                <span class="pl-2 text-overline font-weight-bold">{{match.score_home}} - {{match.score_away}}</span>
            </v-col>
        </v-row>
        <v-row no-gutters class="text-caption" >
            <span>{{formatDate(match.date_start)}}</span>
        </v-row>
    </div> 
</template>
<script>
export default {
    props:{
        match: {type: Object, required: true}
    }
}
</script>