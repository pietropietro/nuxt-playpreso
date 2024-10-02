<template>
    <v-container fluid style="height:100%">
        <template v-if="standings">
          <v-row
            v-for="(team,i) in standings"
            :key="team.id"
            class="overline lh-1"
            align="center"
          >
              <v-col cols="auto">
                  <v-chip v-if="highlightTeamIds.includes(team.id)"
                      icon
                      x-small
                      :color="highlightTeamIds[0]==team.id ? ppRGBA(rgb) : ppRGBA(rgb, 0.6)"
                  >
                  {{highlightTeamIds[0]==team.id ? 'H' : 'A'}}</v-chip>
                  <template v-else>#{{ team.position }}</template>
              </v-col>
            <v-col>{{ team.name }}</v-col>
            <v-col
              v-if="highlightTeamIds.includes(team.id)"
              cols="auto"
            >
              {{ team.W }}-{{ team.D }}-{{ team.L }}
            </v-col>
            <v-col class="text-right" cols="auto">{{ team.points }}</v-col>
          </v-row>
        </template>
        <v-row v-else style="height:100%" align="center" justify="center">
          <em-emoji id="man-shrugging" size="5em" style="rotate:-18deg"/>
        </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'LeagueStandings',
    props: {
      standings: {
        type: Array,
      },
      highlightTeamIds: {
        type: Array,
        required: true
      },
      rgb:{type: String}
    }
  }
  </script>
  
  