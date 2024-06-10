<template>
    <div>
        <v-row v-for="i in 2" :key="i"
            align="center" 
            justify="center"
            class="text-center"
            :style="{
                height: size + 'px',
                background: i == 2 ? ppRGBA(rgb) : ppRGBA(rgb, 0.6) 
            }"
        >
            <v-col :class="colClassList" v-if="i===1">
                <em-emoji
                    native="alarm_clock"
                    :size="size + 10"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    props:{
        rgb: {type: String},
        size: {type: Number, default: 49}
    },
    computed:{
        colClassList(){
            if(this.size >40) return 'pa-0 mt-2';
            return 'pa-0 mt-1'
        }
    }
}
</script>

<style>

</style>