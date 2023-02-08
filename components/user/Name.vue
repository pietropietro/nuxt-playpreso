<template>
    <h1>
        {{user.username}}
        <nuxt-link v-for="trophy in user.trophies"
            :key="trophy.id"
            class="no-decoration"
            :to="trophy.ppCup_id ? (ROUTES.PPCUP.DETAIL + trophy.ppCup_id) : (ROUTES.PPLEAGUE.DETAIL + trophy.ppLeague_id)"
        >
            <em-emoji v-if="trophy.ppTournamentType?.emoji" size="1.5rem" class="pointer" :native="trophy.ppTournamentType.emoji" />
        </nuxt-link>
    </h1>
</template>
<script>
export default {
    props:{user:{type:Object}}
}
</script>