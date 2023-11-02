<template>
    <v-card color="primary" class="">
        <nuxt-link :to="ADMIN_FEATURES.PPLEAGUES.DETAIL.ROUTE + ppLeague.id" class="no-decoration">
            <v-container>
                <v-row>
                    <v-col>
                        <div class="ocrastd">
                            #{{ppLeague.id}}
                        </div>
                        <h2>{{ppTournamentTypeTitle(ppLeague.ppTournamentType)}}</h2>
                    </v-col>
                    <v-col class="overline lh-1">
                        users: {{ppLeague.user_count}}
                        <p-p-round-row-recap v-if="ppLeague.started_at"
                            :currentRound="ppLeague.currentRound" :rounds="ppLeague.ppTournamentType.rounds"
                            :playedInCurrentRound="ppLeague.playedInCurrentRound"
                        />
                    </v-col>
                </v-row>
                <v-container class="mx-2 overline lh-1">
                    <v-row>created_at: {{ppLeague.created_at}}</v-row>
                    <v-row>started: <emoji-flag :model="!!ppLeague.started_at ? 'green ok' :'red x'"/></v-row>
                    <v-row>finished: <emoji-flag :model="!!ppLeague.finished_at ? 'green ok' :'red x'"/></v-row>
                </v-container>
            </v-container>
        </nuxt-link>
        <v-row v-if="ppLeague.started_at" class="flex-nowrap" no-gutters>
            <v-col class="overline lh-1">
                last<br>match
                <v-expansion-panels v-if="ppLeague.lastMatch">
                    <v-col>
                        <admin-match-expansion-panel :match="ppLeague.lastMatch"/>
                    </v-col>
                </v-expansion-panels>
            </v-col>
            <v-col class="overline lh-1">
                next<br>match
                <v-expansion-panels v-if="ppLeague.nextMatch">
                    <v-col>
                        <admin-match-expansion-panel :match="ppLeague.nextMatch"/>
                    </v-col>
                </v-expansion-panels>
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
export default {
    props:{
        ppLeague:{type: Object}
    }
}
</script>