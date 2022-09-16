<template>
    <div class="pr-4 pt-4">
        <v-row no-gutters class="white--text font-weight-bold text-caption" 
            :style="'background-color: ' + ppRGBA($store.state.navigation.rgb)"
        >
            {{match.league.name.toUpperCase()}} - {{formatDate(match.date_start)}}
        </v-row>
        <div :style="'background-color: ' + ppRGBA($store.state.navigation.rgb)">
            <team-row :teamName="match.homeTeam.name" :teamStandings="homeStandings" />
            <team-row class="mt-0 pt-0" :teamName="match.awayTeam.name" :teamStandings="awayStandings" />
        </div>
    </div>
</template>
<script>
export default {
    props:{
        match: {type: Object}
    },
    computed:{
        homeStandings(){
            if(!this.match.league.standings)return;
            return this.match.league.standings.filter((e)=>e.id == this.match.homeTeam.id)[0];
        },
        awayStandings(){
            if(!this.match.league.standings)return;
            return this.match.league.standings.filter((e)=>e.id == this.match.awayTeam.id)[0];
        }
    }
}
</script>
