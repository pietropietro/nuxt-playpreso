<template>
  <v-card class="white--text" :color="ppRGBA(up.ppLeagueType)" style="height=100%; width:200px; height: 60px;"> 
        <v-card-title>
            <v-row no-gutters justify="space-between">
                <h3>{{ppLeagueTypeTitle(up.ppLeagueType)}}</h3>
                <div>{{up.position}}</div>
            </v-row>
        </v-card-title>
    </v-card>
</template>

<script>
export default {
    name: "TrophyItem",
    props:{
        up: {type: Object, required: true}
    }
}
</script>
