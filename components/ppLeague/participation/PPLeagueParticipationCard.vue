<template>
    <div>
        <v-row class="white--text pa-1" :style="'backgroundColor: ' + rgbFromPPLT(participation.ppLType)" v-if="participation">
            <h2>{{participation.ppLType.type}} {{participation.ppLType.level}}</h2>
        </v-row>
        <v-row>
            <h4>position: {{participation.position}}</h4>
        </v-row>
    </div>
</template>
<script>
export default {
    name:"PPLeagueParticipationCard",
    props:{
        participation: {type: Object, required: true}
    },
}
</script>