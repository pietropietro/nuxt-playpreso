<template>
  <v-card :color="ppRGBA(up.ppLeagueType)" style="height=100%; width:200px; height: 60px;"> 
        <nuxt-link class="no-decoration" :to="ROUTES.PPLEAGUE.DETAIL + up.ppLeague_id">
            <v-card-title class="white--text">
                <v-row no-gutters justify="space-between">
                    <h3>{{ppLeagueTypeTitle(up.ppLeagueType)}}</h3>
                    <div>{{up.position}}</div>
                </v-row>
            </v-card-title>
        </nuxt-link>
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
