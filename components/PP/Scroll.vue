<template>
    <v-row class="py-2" align="center">
        <v-col :md="infoCols-1" :cols="infoCols">
            <slot name="info"/>
        </v-col>
        <v-col :md="12 - infoCols + 1" :cols="12 - infoCols" :class="$vuetify.breakpoint.mobile ? 'px-0' : ''">
            <v-slide-group :show-arrows="!$vuetify.breakpoint.mobile">
                <slot name="slide-item"/>
            </v-slide-group>
        </v-col>
    </v-row>
</template>
<script>
export default {
    name: "PPScroll",
    props:{
        infoCols: {type: Number, default: 3}
    }
}
</script>