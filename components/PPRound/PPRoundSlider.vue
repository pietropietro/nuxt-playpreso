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
        <div class="my-6" v-for="(mbi,i) in ppRounds[selectedRound - 1].matchBlockItems" :key="i">
            <v-row no-gutters justify="space-between" align="center">
                <h3>{{mbi.match.hometeam_name}} - {{mbi.match.awayteam_name}}</h3>
                <match-date-score :match="mbi.match"/>
            </v-row>
            <v-row>
                <v-simple-table>
                    <tbody>
                        <tr>
                            <td v-for="(guess,index) in mbi.guesses" :key="index">
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
    // methods:{
    //     //TODO porcata, username deve essere ritornato in oggetto guess
    //     usernameForId(userId){
    //         let returnVal
    //         this.users.map(u => {
    //             if(u.user.user_id === userId){
    //                 returnVal = u.user.username;
    //             }
    //             return;
    //         });
    //         return returnVal;
    //     }
    // }
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