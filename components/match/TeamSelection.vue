<template>
    <v-row>
        <v-spacer />
        <v-col cols="auto">
            <div @click="setSelectedTeamId(match.homeTeam.id)">
                <team-logo
                    :id="match.homeTeam.id"
                    :country="showCountry ? match.homeTeam.country : null"
                    size="54"
                />
            </div>
            <v-card 
                :color="selectedTeamId==match.homeTeam.id ? ppRGBA(openPPTournamentType.rgb) : 'transparent'"
                height="12px"
                class="mt-6"
            />
        </v-col>
        <v-spacer />
        <v-col cols="6" sm="auto">
            <v-row class="rounded-lg" style="overflow:hidden">
                <v-col>
                    <match-team-names
                        :match="match"
                        :rgb="openPPTournamentType.rgb"
                        :selectedTeamId="selectedTeamId"
                    />
                </v-col>
            </v-row>
        </v-col>
        <v-spacer />
        <v-col cols="auto">
            <div @click="setSelectedTeamId(match.awayTeam.id)">
                <team-logo
                    :id="match.awayTeam.id"
                    :country="showCountry ? match.awayTeam.country : null"
                    size="54"
                />
            </div>
            <v-card 
                :color="selectedTeamId==match.awayTeam.id ? ppRGBA(openPPTournamentType.rgb, 0.6) : 'transparent'"
                height="12px"
                class="mt-6"
            />
        </v-col>
        <v-spacer />
    </v-row>
</template>
<script>
export default {
    props:{
        match: {type: Object},
        selectedTeamId: {default: null},
        setSelectedTeamId: {type:Function}
    },
    data(){
        return{
            logoSize: '54'
        }
    },
    computed:{
        showCountry(){
            return this.match.league.country != this.match.homeTeam.country;
        }
    }
}
</script>