<template>
    <v-row no-gutters class="flex-nowrap" align="center">
            <h1 v-if="!small">
        <!-- <div class="text-h4 font-weight-bold" v-if="user"> -->
                {{user.username}}
            </h1>
            <h3 v-else>{{user.username}}</h3>
            <nuxt-link v-for="trophy in user.trophies"
                :key="trophy.id"
                class="no-decoration"
                :to="trophy.ppCup_id ? (ROUTES.PPCUP.DETAIL + trophy.ppCup_id) : (ROUTES.PPLEAGUE.DETAIL + trophy.ppLeague_id)"
            >
                <em-emoji v-if="trophy.ppTournamentType?.emoji" 
                    size="1.5rem" 
                    class="ml-1 pointer" 
                    :native="trophy.ppTournamentType.emoji" 
                />
            </nuxt-link>
    </v-row>
    
</template>
<script>
export default {
    props:{
        user:{type:Object},
        small:{type: Boolean, default: false}
    }
}
</script>