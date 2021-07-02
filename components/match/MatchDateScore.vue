<template>
    <!-- todo create plugin for matchNotStarted -->
    <span v-if="match.score_home === 222" class="caption">{{formatDate(match.date_start)}}</span>
    <v-chip v-else label outlined small color="primary">
        <span class="font-weight-bold caption">{{match.score_home}}-{{match.score_away}}</span>
    </v-chip>
</template>
<script>
export default {
    name:"MatchDateScore",
    props: {
        match:{ type: Object, reuired: true}
    }
}
</script>