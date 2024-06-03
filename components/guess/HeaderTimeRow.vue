<template>
    <div>
        <v-row align="center">
            <span class="overline lh-1 ml-4">
                {{formatDate(openGuess?.match.date_start,true)}}
            </span>
            <v-spacer/>
            <em-emoji
                :native="openGuess.ppTournamentType.emoji"
                size="7rem"
                class="lh-1"
                style="rotate: -21deg"
            />
            <!-- <v-spacer />
            <div class="ocrastd mr-4">
            <h2 @click="()=>additionalRow=!additionalRow">></h2>
            </div> -->
            <v-spacer />
            <div class="ocrastd mr-4" @click="closeGuess">
                <h2>X</h2>
            </div>
        </v-row>
        <v-row v-if="additionalRow" style="background-color:var(--v-primary-darken3);">
            <v-card height="50px" color="var(--v-primary-darken2)"></v-card>
        </v-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            additionalRow: false
        }
    },
   methods:{
        async closeGuess(){
            this.$store.dispatch(
                'openGuess/update', 
                {}
            );
        }
   }
}
</script>
