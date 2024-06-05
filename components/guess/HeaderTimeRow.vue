<template>
    <div>
        <v-row align="center">
            <span class="overline lh-1 ml-4">
                {{formatDate(currentGuess?.match.date_start,true)}}
            </span>
            <v-spacer/>
            <div class="ocrastd font-weight-bold"
                @click="setExtraRow(!extraRow)"
            >
               {{extraRow ? '-' : '+'}}
            </div>
            <v-spacer />
            <em-emoji
                :native="currentGuess.ppTournamentType.emoji"
                size="5rem"
                class="lh-1"
                :style="{
                    rotate: extraRow ? '-8deg' : '-21deg'
                }"
            />
            <v-spacer/>
        </v-row>
        <v-row 
            v-if="extraRow" style="background-color:var(--v-primary-darken3);"
            class="my-4 py-2"
        >
            <v-slide-group
                prev-icon="<"
                next-icon=">"
                id="slider"
            >
                <v-slide-item style="width:70px;">
                    <div class="ocrastd text-center mt-3" @click="closeGuess">
                        <h2>X</h2>
                    </div> 
                </v-slide-item>
                <v-slide-item
                    v-for="(guess,i) in currentGuessList"
                    :key="guess.id"
                    class="mx-2"
                >
                    <!-- width is necessary for slider to work on page landing :( -->
                    <div style="min-width:50px; ">
                        <guess-closed-box
                            :guess="guess"
                            :match="guess.match"
                            :rgb="guess.ppTournamentType.rgb"
                            :afterLock="()=>null"
                            :onClick="()=>selectIndex(i)"
                            size="50px"
                        />
                    </div>
                </v-slide-item>
            </v-slide-group>
        </v-row>
    </div>
</template>

<script>
export default {
    props:{
        extraRow: {type: Boolean},
        setExtraRow: {type: Function}
    },
    methods:{
        async closeGuess(){
            this.$store.dispatch('openGuesses/clear');
        },
        selectIndex(i){
            this.$store.dispatch(
                'openGuesses/updateCurrentIndex', {newIndex: i,}
            );
            this.setExtraRow(false);
        }
    }
}
</script>
