<template>
    <div>
        <v-row justify="space-between" class="mb-2 px-2">
            <h1>{{$t('app.round') + ' ' + selectedRound + '/' +rounds}}</h1>
            <v-pagination
                v-if="matchBlocks.length > 1"
                v-model="selectedRound"
                :length="matchBlocks.length"
                circle
                class="pagination-arrows-only"
            />
        </v-row>
        <div class="my-6" v-for="(mbi,i) in matchBlocks[selectedRound - 1].matchBlockItems" :key="i">
            <v-row no-gutters justify="space-between" align="center">
                <h3>{{mbi.match.hometeam_name}} - {{mbi.match.awayteam_name}}</h3>
                <match-date-score :match="mbi.match"/>
            </v-row>
            <v-row>
                <v-simple-table>
                    <tbody>
                        <tr>
                            <td v-for="(guess,index) in mbi.guesses" :key="index">
                                <guess-card :guess="guess" :username="usernameForId(guess.user_id)"/>
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
    name: "MatchBlocksSlider",
    props:{
        matchBlocks: {type: Array, required: true},
        rounds: {type: Number, required: true},
        //TODO remove this porcata
        users: {type: Array, required: true}
    },
    data(){
        return{
            selectedRound: this.matchBlocks.length
        }
    },
    methods:{
        //porcata, username deve essere ritornato in oggetto guess
        usernameForId(userId){
            let returnVal
            this.users.map(u => {
                if(u.user.user_id === userId){
                    returnVal = u.user.username;
                }
                return;
            });
            return returnVal;
        }
    }
}
</script>
<style>
    .pagination-arrows-only .v-pagination__item{
        display: none !important;
    }
    .pagination-arrows-only .v-pagination__more{
        display: none;
    }
</style>