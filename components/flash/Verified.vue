<template>
    <flash-blue-print :flashPPRM="verifiedFlash">
        <template slot="row2">
            <h3 class="ocrastd" v-if="verifiedFlash.guess.guessed_at">{{verifiedFlash.guess.winner ? 'WIN!' : 'you lost'}}</h3>
        </template>
    </flash-blue-print>
</template>
<script>
export default{
    props:{
        verifiedFlash: {type: Object, required:true}
    },
}
</script>