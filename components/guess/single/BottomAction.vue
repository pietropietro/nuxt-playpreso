<template>
    <v-row 
        justify="center"
        class="ocrastd text-center pb-10" 
    >
        <template v-if="!guess.verified_at && !guess.guessed_at">
            <h1 v-if="!loading"
                :style="'color: ' + $store.state.navigation.color"
                class="text-center"
                @click="onclick"
            >
                LOCK
            </h1>
            <half-circle-spinner v-else color="white" :size="40"/>
        </template>
        <h1 v-else-if="guess.verified_at && !guess.guessed_at">MISSED</h1>
        <h1 v-else-if="guess.verified_at">+{{guess.points}}</h1>
        <h1 v-else>LOCKED</h1>
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