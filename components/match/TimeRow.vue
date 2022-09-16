<template>
    <v-row no-gutters class="white--text font-weight-bold text-caption pl-2">
        {{match.league.name.toUpperCase()}} - {{formatDate(match.date_start)}}
    </v-row>
</template>
<script>
export default {
    props:{
        match: {type: Object, required: true},
    },
}
</script>