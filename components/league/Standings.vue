<template>
    <v-container>
        <v-row
          v-for="team in standings"
          :key="team.id"
          class="overline lh-1"
          align="center"
        >
            <v-col cols="auto">
                <v-chip v-if="highlightTeamIds.includes(team.id)" 
                    icon 
                    x-small 
                    color="red"
                />
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
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'LeagueStandings',
    props: {
      standings: {
        type: Array,
        required: true
      },
      highlightTeamIds: {
        type: Array,
        required: true
      }
    }
  }
  </script>
  
  