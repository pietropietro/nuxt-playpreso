<template>
    <v-row class="py-2" align="center">
        <v-col md="2" cols="3">
            <slot name="info"/>
        </v-col>
        <v-col md="10" cols="9" :class="$vuetify.breakpoint.mobile ? 'px-0' : ''">
            <v-slide-group :show-arrows="!$vuetify.breakpoint.mobile">
                <slot name="slide-item"/>
            </v-slide-group>
        </v-col>
    </v-row>
</template>
<script>
export default {
    name: "PPScroll",
    props:{}
}
</script>