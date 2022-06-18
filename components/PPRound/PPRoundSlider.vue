<template>
    <div>
        <v-row justify="space-between" class="mb-2 px-2">
            <h1>{{$t('app.round') + ' ' + selectedRound + '/' + rounds}}</h1>
            <v-pagination
                v-if="ppRounds.length > 1"
                v-model="selectedRound"
                :length="ppRounds.length"
                circle
                class="pagination-arrows-only"
            />
        </v-row>
        <div class="my-6" v-for="(ppRM,i) in ppRounds[selectedRound - 1].ppRoundMatches" :key="i">
            <v-row no-gutters justify="space-between" align="center">
                <h3>{{ppRM.match.hometeam_name}} - {{ppRM.match.awayteam_name}}</h3>
                <match-date-score :match="ppRM.match"/>
            </v-row>
            <v-row>
                <v-simple-table>
                    <tbody>
                        <tr>
                            <td v-for="(guess,index) in ppRM.guesses" :key="index">
                                <guess-card :guess="guess"/>
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-row>
        </div>
        
    </div>
</template>
<script>
export default {
    name: "PPRoundSlider",
    props:{
        ppRounds: {type: Array, required: true},
        rounds: {type: Number, required: true},
    },
    data(){
        return{
            selectedRound: this.ppRounds.length
        }
    },
}
</script>
<style>
    .pagination-arrows-only .v-pagination__item{
        display: none !important;
    }
    .pagination-arrows-only .v-pagination__more{
        display: none;
    }
    .v-pagination__navigation{
        box-shadow: none !important;
    }
</style>