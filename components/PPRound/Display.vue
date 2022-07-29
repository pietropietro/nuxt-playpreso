<template>
    <p-p-scroll :infoCols="5" class="pa-0">
        <div slot="info">
            <v-row no-gutters class="text-overline font-weight-bold">
                {{ppRM.match.hometeam_name}} - {{ppRM.match.awayteam_name}}
            </v-row>
            <v-row no-gutters justify="center" class="text-overline font-weight-bold">
                {{ppRM.match.score_home}} - {{ppRM.match.score_away}}
            </v-row>
            <v-row no-gutters class="caption" >
                <span>{{ppRM.match.league_name}} {{formatDate(ppRM.match.date_start)}}</span>
            </v-row>
        </div>           
        <v-slide-item slot="slide-item" v-for="(guess,index) in ppRM.guesses" :key="index" class="mx-1">
            <guess-card :guess="guess"/>
        </v-slide-item>
    </p-p-scroll>
</template>
<script>
export default {
    props:{
        ppRM: {type: Object, required: true}
    }
}
</script>