<template>
    <v-container>
        <v-row justify="center" align="center">
            <v-col v-for="guess in guesses" :key="guess.id" cols="4" class="">
                <guess-closed-box
                    style="min-width:100px; max-width:100px;"
                    :guess="guess"
                    :match="guess.match"
                    :rgb="guess.ppTournamentType?.rgb"
                    :afterLock="()=>null"
                    :onClick="()=>null"
                />
            </v-col>
            <v-col class="text-center">
                <v-btn outlined icon v-if="!loading" @click="loadMore">
                    <h1>+</h1>
                </v-btn>
                <loading-page v-else :size="20"/>
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
            page: 2
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
        }
    },
    mounted() {
        console.log('mountedd');
    },
}

</script>

