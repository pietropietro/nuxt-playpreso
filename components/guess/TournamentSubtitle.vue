<template>
    <v-row>
        <nuxt-link 
            v-if="ppTournamentType" 
            class="no-decoration"
            :to="ppTournamentType.tournament_id ? 
                (ROUTES.PPLEAGUE.DETAIL + ppTournamentType.tournament_id) 
                : '' 
            "
        >
            <h4 v-if="ppTournamentType">
                <em-emoji :native="ppTournamentType.emoji" />
                {{ppTournamentTypeTitle(ppTournamentType)}}
            </h4>
        </nuxt-link>
    </v-row>
</template>
<script>
export default {
    props:{
        ppTournamentType: {type:Object}
    }
}
</script>