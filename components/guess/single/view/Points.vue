<template>
    <div class="position relative">
        <v-row no-gutters class="h-100"
            v-if="guess.verified_at"
            justify="center" align="center"
        >
            <em-emoji v-if="isMissed(guess) && (!guess.id || ['motd','flash'].includes(guess.id))" id="dash" size="2em"/>
            <em-emoji v-else-if="isMissed(guess)" id="x" size="2em"/>
            <template v-else>
                <p-p-preso v-if="guess.PRESO"/>
                <h2 v-else>
                    {{guess.points}}
                </h2>
            </template>
        </v-row>
    </div>
</template>
<script>
export default {
    props:{
        guess: {type:Object}
    },
}
</script>
