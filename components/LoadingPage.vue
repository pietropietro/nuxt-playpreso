<template>
    <v-container fill-height>
        <v-row justify="center" align="center">
            <half-circle-spinner color="primary" :size="80"/>
        </v-row>
    </v-container>
</template>
<script>
import {HalfCircleSpinner} from 'epic-spinners'
export default {
    name: "LoadingPage",
    components:{
        HalfCircleSpinner
    }
}
</script>