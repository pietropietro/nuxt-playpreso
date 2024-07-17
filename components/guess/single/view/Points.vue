<template>
    <v-row no-gutters class="h-100"
        v-if="guess.verified_at"
        justify="center" align="center"
    >
        <!-- MOTD -->
        <em-emoji v-if="isMissed(guess) && (!guess.id || guess.id == 'dummy')" id="dash" size="2em"/>
        <em-emoji v-else-if="isMissed(guess)" id="x" size="2em"/>
        <template v-else>
            <p-p-preso v-if="guess.PRESO"/>
            <h2 v-else>
                {{guess.points > 0 ? '+' : ''}}{{guess.points}}
                <!-- <client-only>
                    <em-emoji id="parking" />
                </client-only> -->
            </h2>
        </template>
    </v-row>
</template>
<script>
export default {
    props:{
        guess: {type:Object}
    },
}
</script>