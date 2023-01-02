<template>
    <v-row>
        <v-col v-for="(up, index) in userParticipations" :key="index" cols="12">
            <nuxt-link class="no-decoration"
                :to="up.ppLeague_id ? ROUTES.PPLEAGUE.DETAIL + up.ppLeague_id
                    : ROUTES.PPCUP.DETAIL + up.ppCup_id + '/' + up.ppCupGroup_id
                " 
            >
                <user-participation-card :participation="up" />
            </nuxt-link>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        userParticipations: {type: Array}
    },
}
</script>