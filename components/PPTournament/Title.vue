<template>
    <v-row class="white--text pa-2" :style="'background-color: ' + ppRGBA(ppTournamentType)">
        <h2>{{ppTournamentTypeTitle(ppTournamentType)}}</h2>
    </v-row>
</template>
<script>
export default {
    props:{
        ppTournamentType: {type: Object, required: true}
    }
}
</script>
