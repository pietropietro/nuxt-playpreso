<template>
  <v-card :color="ppRGBA(up.ppTournamentType.rgb)" style="height=100%; width:200px; height: 60px;"> 
        <nuxt-link class="no-decoration" :to="ROUTES.PPLEAGUE.DETAIL + up.ppLeague_id">
            <v-card-title class="white--text">
                <v-row no-gutters justify="space-between">
                    <h3>{{ppTournamentTypeTitle(up.ppTournamentType)}}</h3>
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
