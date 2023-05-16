<template>
        <nuxt-link
            class="no-decoration"
            :to="trophy.ppCup_id ? 
                (ROUTES.PPCUP.DETAIL + trophy.ppCup_id) : 
                (ROUTES.PPLEAGUE.DETAIL + trophy.ppLeague_id)
            "
        >
            <em-emoji v-if="trophy.ppTournamentType?.emoji"
                size="1.5rem"
                class="ml-1 pointer"
                :native="trophy.ppTournamentType.emoji"
            />
        </nuxt-link>
</template>
<script>
export default {
    props:{
        trophy: {type: Object},
    }
}
</script>