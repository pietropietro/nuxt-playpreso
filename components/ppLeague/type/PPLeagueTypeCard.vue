<template>
    <v-card class="rounded-xl white--text " :color="'rgb(' + ppLT.red + ', ' + ppLT.green + ', ' + ppLT.blue + ')'">
        <v-card-title class="text-overline">{{ppLT.type}}</v-card-title>
        <v-row justify="center" class="pb-3">
            <div class="text-h6">{{ppLT.level}}</div>
        </v-row>
        <v-row justify="center" class="pb-3">
            <div class="subtitle-2">{{ppLT.cost}}</div>
        </v-row>
    </v-card>
</template>
<script>
export default {
    name: "PPLeagueTypeCard",
    props: {ppLT: {type: Object, required: true}},
}
</script>