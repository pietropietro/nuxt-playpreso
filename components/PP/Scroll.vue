<template>
    <v-row class="py-2" :align="infoAlign">
        <v-col :md="infoMd" :cols="infoCols">
            <slot name="info"/>
        </v-col>
        <v-col :md="12 - infoMd" :cols="12 - infoCols" :class="$vuetify.breakpoint.mobile ? 'px-0' : ''">
            <v-slide-group 
                :show-arrows="!$vuetify.breakpoint.xs"
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
    name: "PPScroll",
    props:{
        infoAlign: {type: String, default: "center"},
        infoCols: {type: Number, default: 3},
        infoMd: {type: Number, default: 2}
    }
}
</script>

