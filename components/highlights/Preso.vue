<template>
    <div>
        <v-row justify="center" align="center" v-for="(chunk,i) in chunkedGuesses" :key="i">
            <template v-for="guess in chunk" >
                <v-col v-if="!chunk.map((g)=>g.id).includes(openId)  || openId == guess.id" :key="guess.id"
                    :cols="openId == guess.id ? '12' : '4'">
                    <v-row justify="center">
                        <v-col cols="auto">
                            <guess-box-view
                                :guess="guess"
                                :match="guess.match"
                                :rgb="guess.ppTournamentType.rgb"
                                :afterLock="()=>null"
                                :onUnlockedClick="()=>null"
                                :open="openId == guess.id"
                                :setOpen="()=>openId = (openId == guess.id) ? null : guess.id"
                            />
                            <div>
                                <user-name :user="guess.user" small center/>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </template>
        </v-row>
    </div>
</template>
<script>
export default {
    props:{
        presos: {type: Array}
    },
    data() {
        return{
            openId: null
        }
    },
    computed: {
        chunkedGuesses() {
            const chunkSize = 3;
            const chunks = [];
            for (let i = 0; i < this.presos.length; i += chunkSize) {
                chunks.push(this.presos.slice(i, i + chunkSize));
            }
            return chunks;
        }
    },
}
</script>