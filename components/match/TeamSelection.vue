<template>
    <v-row>
        <v-spacer />
        <v-col cols="auto">
            <div @click="canSelect ? setSelectedTeamId(match.homeTeam.id) : null">
                <team-logo
                    :id="match.homeTeam.id"
                    :country="showCountry ? match.homeTeam.country : null"
                    :size="logoSize"
                />
            </div>
            <v-card 
                :color="colorHome"
                height="12px"
                class="mt-6"
            />
        </v-col>
        <v-spacer  v-if="$vuetify.breakpoint.smAndUp"/>
        <v-col cols="8" sm="auto">
            <v-row class="rounded-lg" style="overflow:hidden">
                <v-col>
                    <match-team-names
                        :match="match"
                        :rgb="currentGuess.ppTournamentType.rgb"
                        :selectedTeamId="selectedTeamId"
                    />
                </v-col>
            </v-row>
        </v-col>
        <v-spacer  v-if="$vuetify.breakpoint.smAndUp"/>
        <v-col cols="auto">
            <div @click="canSelect ? setSelectedTeamId(match.awayTeam.id) : null">
                <team-logo
                    :id="match.awayTeam.id"
                    :country="showCountry ? match.awayTeam.country : null"
                    :size="logoSize"
                />
            </div>
            <v-card 
                :color="colorAway"
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
        canSelect: {type: Boolean},
        selectedTeamId: {default: null},
        setSelectedTeamId: {type:Function}
    },
    data(){
        return{
            logoSize: '48'
        }
    },
    computed:{
        showCountry(){
            return this.match.league.country != this.match.homeTeam.country;
        },
        colorHome(){
            let color =  this.ppRGBA(this.currentGuess.ppTournamentType.rgb);
            if(!this.canSelect) return color;
            return this.selectedTeamId==this.match.homeTeam.id ? color : 'transparent' ;
        },
        colorAway(){
            let color =  this.ppRGBA(this.currentGuess.ppTournamentType.rgb, 0.6);
            if(!this.canSelect) return color;
            return this.selectedTeamId==this.match.awayTeam.id ? color : 'transparent' ;
        }
    }
}
</script>