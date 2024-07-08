<template>
    <v-container>
        <v-row justify="center" align="center" v-for="(chunk,i) in chunkedGuesses" :key="i">
            <template v-for="guess in chunk" >
                <v-col v-if="!chunk.map((g)=>g.id).includes(openId)  || openId == guess.id" :key="guess.id"
                    :cols="openId == guess.id ? '12' : '4'">
                    <guess-closed-box
                        :style="openId != guess.id ? {
                            minWidth:'100px',
                            maxWidth:'100px'
                        }: {
                            minWidth:'350px',
                            maxWidth:'350px'
                        }"
                        :guess="guess"
                        :match="guess.match"
                        :rgb="guess.ppTournamentType?.rgb"
                        :afterLock="()=>null"
                        :open="openId == guess.id"
                        :setOpen="setOpen"
                    />
                </v-col>
            </template>
            <v-col v-if="i === chunkedGuesses.length - 1" class="text-center">
                <v-btn outlined icon v-if="!loading" @click="loadMore">
                <h1>+</h1>
                </v-btn>
                <loading-page v-else :size="20" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props: {
        guesses: {type: Array},
        setGuesses: {type: Function},
        userId: {type: Number}
    },
    data() {
        return{
            size: '98px',
            loading: false,
            page: 2,
            openId: null
        }
    },
    computed: {
        chunkedGuesses() {
            const chunkSize = 3;
            const chunks = [];
            for (let i = 0; i < this.guesses.length; i += chunkSize) {
                chunks.push(this.guesses.slice(i, i + chunkSize));
            }
            return chunks;
        }
    },
    methods:{
        async loadMore(){
            this.loading = true;
            let response = await this.$api.call(
                this.API_ROUTES.GUESS.GET_FOR_USER + this.userId + '?page=' + this.page 
                , null, 'GET'
            );
            if(response && response.status === "success"){
                let extraGuesses = response.message;
                let updatedGuesses = [...this.guesses, ...extraGuesses];
                this.page ++;
                this.setGuesses(updatedGuesses);
            }
            this.loading = false;
        },
        setOpen(guess_id){
            console.log(guess_id, 'setttt')
            this.openId = guess_id;
        }
    },
}

</script>

