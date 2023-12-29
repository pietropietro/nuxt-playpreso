<template>
    <v-row class="no-selection" :align="infoAlign">
        <v-col :cols="infoCols">
            <slot name="info"/>
        </v-col>
        <v-col  :cols="12 - infoCols" class="px-0">
            <v-slide-group 
                :show-arrows="false"
                prev-icon="<"
                next-icon=">"
            >
                <slot name="slide-item"/>
            </v-slide-group>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        infoAlign: {type: String, default: "center"},
        infoCols: {type: Number, default: 3},
        infoMd: {type: Number, default: 2}
    }
}
</script>

