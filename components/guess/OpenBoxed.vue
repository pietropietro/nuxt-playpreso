<template>
    <v-container>
        <v-row align="center">
            <v-spacer/>
            <v-col cols="2" class="pa-0">
                <em-emoji
                    :native="ppTournamentType.emoji" 
                    size="50"
                />
            </v-col>
            <v-spacer/>
            <v-col cols="8" sm="auto">
                <match-graphic-preview
                    rounded
                    :match="match"
                    :rgb="ppTournamentType.rgb"
                    big
                />
            </v-col>
            <v-spacer />
            <v-spacer/>
            <v-col cols="1" sm="2" class="text-right">
                <div @click="close" class="ocrastd">
                    <h3>X</h3>
                </div>
            </v-col>
        </v-row>
        <v-row class="overline lh-1 pt-2">
            {{formatDate(match.date_start, true)}}
        </v-row>
        <v-row class="pt-2">
            <v-col
                class="rounded"
                :style="{
                    height: height,
                    backgroundColor: ppRGBA(ppTournamentType.rgb, 0.6) 
                }"
            >
            ciao   
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props:{
        guess: {type: Object},
        match: {type: Object, required: true},
        ppTournamentType: {type: Object, required: true},
        afterLock: {type: Function},
        close: {type: Function , required: true}
    },
    data(){
        return{
            height: '90px'
        }
    }
}
</script>

<style>
    .box-rounded{
        border-radius: 10px;
    }
</style>