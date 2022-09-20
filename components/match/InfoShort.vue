<template>
    <v-row no-gutters class="text-caption font-weight-bold" align="center">
        <v-col cols="12">{{match.score_home}} {{match.homeTeam.name}}</v-col>
        <v-col cols="12">{{match.score_away}} {{match.awayTeam.name}}</v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        match: {type: Object, required: true}
    }
}
</script>