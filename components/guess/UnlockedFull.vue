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
            <v-col cols="9" sm="auto">
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
    }
}
</script>
