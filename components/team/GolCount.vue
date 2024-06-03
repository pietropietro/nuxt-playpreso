<template>
   <v-row class="rounded-lg ocrastd" style="overflow:hidden">
        <v-col>
            <v-row
                align="center" 
                justify="end"
                :style="{
                    background: ppRGBA(rgb, opacity) 
                }"
            >
                <v-col cols="auto">
                    <v-row>
                        <h2 class="px-2">{{gol}}</h2>
                        <h5>~{{(gol / standings.played).toFixed(2)}}</h5>
                    </v-row>
                </v-col>
                <!-- <v-col cols="auto">
                    <v-row>
                        <h2 class="px-2">{{standings.ga}}</h2>
                        <h5>~{{(standings.ga / standings.played).toFixed(2)}}</h5>
                    </v-row>
                </v-col> -->
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props:{
        standings: {type: Object},
        rgb: {type: String},
        opacity: {type: Number, default: 1.0},
        against: {type: Boolean}
    },
    computed:{
        gol(){
            return this.against ? this.standings.ga : this.standings.gf;
        }
    }
}
</script>

<style>

</style>