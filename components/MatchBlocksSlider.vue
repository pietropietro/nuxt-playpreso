<template>
    <div>
        <v-row>
            <h1>{{$t('app.round') + ' ' + selectedRound + '/' +rounds}}</h1>
        </v-row>
        <div v-for="(mbi,i) in matchBlocks[selectedRound - 1].matchBlockItems" :key="i">
            <v-row justify="space-between">
                <h1>{{mbi.match.hometeam_name}} - {{mbi.match.awayteam_name}}</h1>
                <h1>{{mbi.match.score_home}} - {{mbi.match.score_away}}</h1>
            </v-row>
        </div>
        <v-pagination
            v-model="selectedRound"
            :length="matchBlocks.length"
            circle
            class="pagination-fixed"
        />
    </div>
</template>
<script>
export default {
    name: "MatchBlocksSlider",
    props:{
        matchBlocks: {type: Array, required: true},
        rounds: {type: Number, required: true}
    },
    data(){
        return{
            selectedRound: this.matchBlocks.length
        }
    }
}
</script>