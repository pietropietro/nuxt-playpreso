<template>
    <div>
        <div class="pr-2">
            <v-row justify="end" class="text-overline font-weight-bold">
                {{ppRM.match.hometeam_name}} - {{ppRM.match.awayteam_name}}
            </v-row>
            <v-row justify="end" class="caption" >
                <span>{{ppRM.match.league_name}} {{formatDate(ppRM.match.date_start)}}</span>
                </v-row>
        </div>
        <p-p-scroll class="pa-0">
            <h1 class="text-center" slot="info">{{ppRM.match.score_home}} - {{ppRM.match.score_away}}</h1>
            <v-slide-item slot="slide-item" v-for="(guess,index) in ppRM.guesses" :key="index" class="mx-1">
                <guess-card :guess="guess"/>
            </v-slide-item>
        </p-p-scroll>
    </div>
</template>
<script>
export default {
    name: "PPRoundMatch",
    props:{
        ppRM: {type: Object, required: true}
    }
}
</script>