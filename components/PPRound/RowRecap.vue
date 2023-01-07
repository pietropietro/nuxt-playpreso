<template>
    <div class="overline lh-1">
        R {{currentRound}}/{{rounds}} 
        <template v-if="playedInCurrentRound">
            P {{playedInCurrentRound[0]}}/{{playedInCurrentRound[1]}}
        </template>
    </div>
</template>
<script>
export default {
    props:{
        currentRound: {type: Number},
        rounds: {type: Number},
        playedInCurrentRound: {type: Array}
    }
}
</script>