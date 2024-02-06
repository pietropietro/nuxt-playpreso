<template>
    <div>
        <v-row v-for="i in 2" :key="i"
            align="center" 
            justify="center"
            class="text-center"
            :style="{
                height: '49px',
                background: i== 2 ? ppRGBA(rgb) : ppRGBA(rgb, 0.6) 
            }"
        >
            <v-col class="pa-0 mt-2" v-if="i===1">
                <em-emoji
                    native="alarm_clock"
                    size="55"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    props:{
        rgb: {type: String},
        height: {type: String}
    }

}
</script>

<style>

</style>