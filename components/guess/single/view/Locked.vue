<template>
    <v-row no-gutters 
        class="h-100"
        justify="center" align="center"
    >
        <v-container class="px-6" style="line-height:1.5rem;">
            <v-row justify="center" v-if="!guess.verified_at">
                <em-emoji id="lock" size="1.5em" />
            </v-row>
            <!-- <match-inner-values v-else :match="match" :guess="guess" /> -->
            <v-row justify="center">
                <h2 class="ocrastd"> {{guess.home}}-{{guess.away}}</h2>
            </v-row>
        </v-container>
    </v-row>
</template>
<script>
export default {
    props:{
        guess: {type:Object}
    }
}
</script>