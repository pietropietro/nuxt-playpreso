<template>
    <v-row>
        <v-col v-for="up in trophies" :key="up.id" cols="12" sm="6">
            <v-row align="center">
                <v-col cols="auto">
                    <nuxt-link
                        class="no-decoration"
                        :to="up.ppCup_id ? 
                            (ROUTES.PPCUP.DETAIL + up.ppCup_id) : 
                            (ROUTES.PPLEAGUE.DETAIL + up.ppLeague_id)
                        "
                    >
                        <em-emoji v-if="up.ppTournamentType?.emoji || up.pptt_emoji"
                            size="2.2em"
                            class="pointer"
                            :native="up.ppTournamentType?.emoji ?? up.pptt_emoji"
                        />
                    </nuxt-link>
                </v-col>
                <v-col cols="auto">
                    <h2>{{ppTournamentTypeTitle(up.ppTournamentType)}}</h2>
                    <user-name small :user="up.user" />
                </v-col>
                <v-col >
                    <h4>{{ up.tot_points }} P</h4>
                    <div class="overline lh-1">{{ up.tot_locked }}-{{ up.tot_preso }}-{{ up.tot_unox2 }}</div>
                </v-col>
                <v-col cols="auto">
                    <div class="overline lh-1">
                        {{ formatMonthYear(up.updated_at, 'short') }}
                    </div>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        trophies: {type: Array}
    },
}
</script>