<template>
    <v-row
        align="center"
        justify="center"
        class="ocrastd" 
    >
        <half-circle-spinner v-if="loading" color="white" :size="40"/>
        <!-- <v-col v-else class="pa-0"> -->
            <h4 
                class="white--text text-center py-1"
                @click="onclick"
            >
                LOCK
            </h4>
        <!-- </v-col> -->
    </v-row>
</template>
<script>
export default {
    props: {
        guess: {type: Object},
        onclick: {type: Function},
        loading: {type: Boolean}
    },
}
</script>