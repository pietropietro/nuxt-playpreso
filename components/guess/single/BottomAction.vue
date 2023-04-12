<template>
    <v-row
        align="center"
        justify="center"
        class="ocrastd" 
        style="height:30px; min-width:30px"
    >
        <half-circle-spinner v-if="loading" color="white" :size="15"/>
        <h4 
            class="white--text text-center py-1"
            @click="onclick"
            v-else
        >
            LOCK
        </h4>
    </v-row>
</template>

<script>
import 'epic-spinners/dist/lib/epic-spinners.min.css'
import {HalfCircleSpinner} from 'epic-spinners/dist/lib/epic-spinners.min.js'

export default {
    props: {
        guess: {type: Object},
        onclick: {type: Function},
        loading: {type: Boolean},
        color: {type: String}
    },
    components:{
        HalfCircleSpinner
    }
}
</script>