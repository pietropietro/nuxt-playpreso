<template>
    <v-row
        align="center"
        justify="center"
        class="ocrastd" 
    >
        <h1 v-if="!loading"
            class="white--text text-center py-2"
            @click="onclick"
        >
            LOCK
        </h1>
        <half-circle-spinner v-else color="white" :size="40"/>
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