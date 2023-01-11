<template>
    <v-container fill-height>
        <v-row justify="center" align="center">
            <half-circle-spinner :color="'var(--v-' + color + '-base)'" :size="80"/>
        </v-row>
    </v-container>
</template>
<script>
import 'epic-spinners/dist/lib/epic-spinners.min.css'
import {HalfCircleSpinner} from 'epic-spinners/dist/lib/epic-spinners.min.js'
export default {
    name: "LoadingPage",
    props:{
        color: {type: String}
    },
    components:{
        HalfCircleSpinner
    }
}
</script>