<template>
        <nuxt-link
            class="no-decoration"
            :to="trophy.ppCup_id ? 
                (ROUTES.PPCUP.DETAIL + trophy.ppCup_id) : 
                (ROUTES.PPLEAGUE.DETAIL + trophy.ppLeague_id)
            "
        >
            <em-emoji v-if="trophy.ppTournamentType?.emoji || trophy.pptt_emoji"
                :size="size"
                class="pointer"
                :native="trophy.ppTournamentType?.emoji ?? trophy.pptt_emoji"
            />
        </nuxt-link>
</template>
<script>
export default {
    props:{
        trophy: {type: Object},
        size: {type: String, default: '1.5rem'}
    }
}
</script>