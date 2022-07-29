<template>
    <v-row class="py-2" align="center">
        <v-col :md="infoMd" :cols="infoCols">
            <slot name="info"/>
        </v-col>
        <v-col :md="12 - infoMd" :cols="12 - infoCols" :class="$vuetify.breakpoint.mobile ? 'px-0' : ''">
            <v-slide-group :show-arrows="!$vuetify.breakpoint.xs">
                <slot name="slide-item"/>
            </v-slide-group>
        </v-col>
    </v-row>
</template>
<script>
export default {
    name: "PPScroll",
    props:{
        infoCols: {type: Number, default: 3},
        infoMd: {type: Number, default: 2}
    }
}
</script>