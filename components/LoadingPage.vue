<template>
    <v-container fill-height>
        <v-row justify="center" align="center">
            <half-circle-spinner :color="'var(--v-' + color + '-base)'" :size="size"/>
        </v-row>
    </v-container>
</template>
<script>
import 'epic-spinners/dist/lib/epic-spinners.min.css'
import {HalfCircleSpinner} from 'epic-spinners/dist/lib/epic-spinners.min.js'
export default {
    name: "LoadingPage",
    props:{
        color: {type: String},
        size: {type: Number, default: 80}
    },
    components:{
        HalfCircleSpinner
    }
}
</script>