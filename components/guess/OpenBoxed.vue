<template>
    <v-container>
        <v-row align="center">
            <v-col  cols="auto">
                <match-graphic-preview
                    rounded
                    :match="match"
                    :rgb="rgb"
                    big
                />
            </v-col>
            <v-spacer />
            <v-col cols="auto">
                <div @click="close" class="ocrastd">
                    <h3>X</h3>
                </div>
            </v-col>
        </v-row>
        <v-row class="pt-2">
            <v-col
                class="rounded"
                :style="{
                    height: height,
                    backgroundColor: ppRGBA(rgb, 0.6) 
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
        rgb: {type: String, required: true},
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