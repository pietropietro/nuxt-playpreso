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
                <v-col class="text-center">
                    <v-row>
                        <h2>
                            {{standings.position}}°
                        </h2>
                    </v-row>
                </v-col>
                <v-col cols="auto">
                    <v-row> 
                        <h4 class="px-2">{{standings.W}}-{{standings.D}}-{{standings.L}}</h4>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props:{
        standings: {type: Object},
        rgb: {type: String},
        opacity: {type: Number, default: 1.0}
    }
}
</script>

<style>

</style>