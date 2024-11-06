<template>
    <div>
        <v-row justify="center" align="start" 
            v-for="(chunk,i) in chunkedSummaries" 
            :key="i" 
        >
                <v-col cols="12"  align-self="center"
                    v-if="selectedSummary 
                        && chunk.map((ms)=>ms.match.id).includes(selectedMatchId) 
                        && selectedSummary.guesses.length > 1
                    "
                >
                    <v-row>
                        <v-slide-group
                            prev-icon="<"
                            next-icon=">"
                            id="slider"
                        >
                            <v-slide-item>
                                <h2 class="ocrastd mx-5" 
                                    @click="()=>selectedMatchId = null"
                                    style="align-self:center"
                                >
                                    X
                                </h2>
                            </v-slide-item>
                            <v-slide-item
                                v-for="(guess) in selectedSummary.guesses"
                                :key="guess.id"
                                class="mx-2"
                            >
                                <div>
                                    <guess-box-view
                                        :guess="guess"
                                        :match="selectedSummary.match"
                                        :rgb="guess.ppTournamentType.rgb"
                                        :open="secondLevelGuessId == guess.id"
                                        :setOpen="()=>selectSecondLevelGuessId(guess.id)"
                                    />
                                    <div>
                                        <user-name :user="guess.user" small center/>
                                    </div>
                                </div>
                            </v-slide-item>
                        </v-slide-group>
                    </v-row>
                </v-col>

            <template v-else>
                <template v-for="matchSummary in chunk" >
                    <v-col
                        v-if=" !selectedSummary
                            || matchSummary.match.id == selectedMatchId 
                            || !chunk.map((ms)=>ms.match.id).includes(selectedMatchId) 
                        "
                        :key="matchSummary.match.id"
                        :cols="selectedSummary?.match.id == matchSummary.match.id ? '12' : '4'"
                        class="py-2"
                    >
                        <v-row justify="center">
                            <!-- view 1 -->
                            <template >
                                <v-col cols="auto" >
                                    <guess-box-view
                                        :class="((matchSummary.guesses.length > 1)
                                            &&  selectedSummary?.match.id != matchSummary.match.id)
                                            ? 'card-wrapper'
                                            : ''"
                                        :guess="matchSummary.guesses[0]"
                                        :match="matchSummary.match"
                                        :rgb="matchSummary.guesses[0].ppTournamentType.rgb"
                                        :open="selectedSummary?.match.id == matchSummary.match.id"
                                        :setOpen="()=>selectSummary(matchSummary.match.id)"
                                    />
                                    <div>
                                        <template v-if="matchSummary.guesses.length == 1">
                                            <user-name :user="matchSummary.guesses[0].user" small center/>
                                        </template>
                                        <div v-else class="overline lh-1">{{ matchSummary.guesses.length }} users</div>
                                    </div>
                                </v-col>
                            </template>
                        </v-row>
                    </v-col>
                
                </template>
            </template>

        </v-row>
    </div>
</template>
<script>
export default {
    props:{
        presoMatches: {type: Array}
    },
    data() {
        return{
            selectedMatchId: null,
            secondLevelGuessId: null
        }
    },
    computed: {
        chunkedSummaries() {
            const chunkSize = 3;
            const chunks = [];
            for (let i = 0; i < this.presoMatches.length; i += chunkSize) {
                chunks.push(this.presoMatches.slice(i, i + chunkSize));
            }
            return chunks;
        },
        selectedSummary(){
            if(!this.selectedMatchId) return null;
            return this.presoMatches.filter((ms) => {
                return ms.match.id == this.selectedMatchId
            })[0];
        }
    },
    methods:{
        selectSummary(matchId){
            this.secondLevelGuessId = null;
            if(this.selectedMatchId == matchId){
                this.selectedMatchId = null;
                return;
            }
            this.selectedMatchId= matchId;
        },

        selectSecondLevelGuessId(id){
            if(this.secondLevelGuessId){
                this.secondLevelGuessId = null;
                return
            }
            this.secondLevelGuessId = id;
        }
    }
}
</script>

<style>
.card-wrapper {
    z-index:1;
    box-shadow: -7px 18px 0 rgba(0, 0, 255, 0.3);
    border-radius: 8px; /* Match the card's border radius */
}

</style>