<template>
    <v-container>
        <v-row align="center">
            <v-spacer/>
            <v-col cols="2" class="pa-0 text-center">
                <em-emoji
                    :native="openPPTournamentType.emoji" 
                    size="50"
                />
            </v-col>
            <v-spacer/>
            <v-col :cols="teamNamesCols" sm="auto">
                <v-row class="rounded-lg" style="overflow:hidden">
                    <v-col>
                        <match-graphic-preview
                            :match="openMatch"
                            :rgb="openPPTournamentType.rgb"
                        />
                    </v-col>
                </v-row>
            </v-col>
            <v-spacer />
        </v-row>
        <v-row class="pa-2">
            <v-col
                class="rounded-lg"
                :style="{
                    height: height,
                    backgroundColor: ppRGBA(openPPTournamentType.rgb, 0.6) 
                }"
            >
                ciao   
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            height: '90px'
        }
    },
    computed:{
        teamNamesCols(){
            const longestNameLength = Math.max(
                this.openMatch.homeTeam.name.length,
                this.openMatch.awayTeam.name.length
            );

            // Return the appropriate cols value based on the longest name
            if (longestNameLength > 14) {
            return 9; // Use maximum space
            } else if (longestNameLength > 11) {
            return 8;
            } else if (longestNameLength > 7) {
            return 7;
            } else if (longestNameLength > 5) {
            return 6;
            }
            return 'auto'; // Use minimum space necessary
        }
    }
}
</script>
