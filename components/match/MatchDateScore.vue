<template>
    <!-- todo create plugin for matchNotStarted -->
    <span class="caption">{{formatDate(match.date_start)}}</span>
    <!-- <v-chip v-else label outlined small color="primary"> -->
        <!-- <h3  class="font-weight-bold">{{match.score_home}}-{{match.score_away}}</h3> -->
    <!-- </v-chip> -->
</template>
<script>
export default {
    name:"MatchDateScore",
    props: {
        match:{ type: Object, reuired: true}
    }
}
</script>