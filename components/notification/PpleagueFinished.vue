<template>
    <v-chip
        :color="ppRGBA(un.userParticipation.ppTournamentType.rgb, 0.4)"
        :class="['pa-0','o-100', (un.userParticipation.position == 1) ? 'brilliance2' : '']"
    >
        <v-row align="center" no-gutters class="h-100" >
            
                <v-col class="px-3 br-4 h-100" :style="{
                        backgroundColor: ppRGBA(un.userParticipation.ppTournamentType.rgb, 0.4)
                    }"   
                >
                    <v-row no-gutters align="center" class="h-100">
                        <h2>{{un.userParticipation.ppTournamentType.emoji }}</h2>
                    </v-row>
                    </v-col>
                    <template v-if="!active">
                    <v-col class="px-2">
                        <div class="overline lh-08">
                            {{un.userParticipation.ppTournamentType.name}}{{un.userParticipation.ppTournamentType.level}}
                            <br>
                            finished
                        </div>
                    </v-col>

                    <v-col class="pr-2">
                        <h4 class="text-center gold--text" v-if="un.userParticipation.position == 1">
                            winner
                        </h4>
                        <h2 v-else>{{ un.userParticipation.position }}°</h2>
                    </v-col>

                </template>
                <template v-else>
                    <v-col>
                        <div class="px-2 overline lh-08">see more</div>
                    </v-col>
                    <v-col class="pr-2">
                        <nuxt-link class="no-decoration" :to="ROUTES.PPLEAGUE.DETAIL + un.userParticipation.ppLeague_id">
                            <h2 class=" ocrastd">></h2>
                        </nuxt-link>
                    </v-col>
                </template>
        </v-row>
    </v-chip>
</template>
<script>
    export default {
        props:{
            un: {type: Object},
            active: {type: Boolean}
        },
    }
</script>