<template>
    <div>
        <v-row 
            align="center" 
            justify="center"
            class="text-center"
            :style="{
                height: height,
                borderRadius: borderRadiusValue,
                background:ppRGBA(rgb) 
            }"
        >
            <v-col class="pa-0">
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