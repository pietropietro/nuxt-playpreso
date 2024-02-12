<template>
    <v-container>
        <v-row align="center">
            <v-col>
                <team-logo 
                    :id="openMatch.homeTeam.id" 
                    :size="44"  
                />
            </v-col>
            <v-col cols="6" sm="auto">
                <v-row class="rounded-lg" style="overflow:hidden">
                    <v-col>
                        <match-graphic-preview
                            :match="openMatch"
                            :rgb="openPPTournamentType.rgb"
                        />
                    </v-col>
                </v-row>
            </v-col>
            <v-col>
                <team-logo 
                    :id="openMatch.awayTeam.id" 
                    :size="44"  
                />
            </v-col>
        </v-row>
        <!-- ROW 2 -->
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
}
</script>
