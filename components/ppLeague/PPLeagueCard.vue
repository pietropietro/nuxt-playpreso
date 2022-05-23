<template>
    <div>
        <v-row class="white--text pa-1" :style="'backgroundColor: ' + rgbFromPPLT(ppL.ppLType)" v-if="ppL">
            <h2>{{ppL.ppLType.type}} {{ppL.ppLType.level}}</h2>
        </v-row>
        <v-row v-for="(position, index) in ppL.standings" :key="index">
            <h4>{{position.user.username}}</h4>
        </v-row>
    </div>
</template>
<script>
export default {
    name:"PPLeagueCard",
    props:{
        ppL: {type: Object, required: true}
    },
}
</script>