<template>
    <div>
        <v-container v-for="ranking in ppRankings" :key="ranking.id" 
            :class="selectedId == ranking.user_id ? 'pa-0 my-4' : 'pa-0'" 
            :style="selectedId == ranking.user_id ?
                {
                    background: 'var(--v-primary-darken2)',
                    borderRadius: '10px'
                }
                : {}"
            >
            <v-row no-gutters align="center" @click="() => select(ranking.user_id)">
                <v-col>
                    <v-row align="center" :class="selectedId == ranking.user_id ? 'px-4' : ''">
                        <v-col cols="auto" v-if="selectedId != ranking.user_id">
                            <v-chip 
                                x-small color="transparent"
                            >
                                # {{ ranking.position }}
                            </v-chip>
                        </v-col>
                        <v-col><user-name :user="ranking.user" /></v-col>
                    </v-row>
                </v-col>
                <v-col class="pr-2" cols="auto">
                    <h3>{{ ranking.tot_points }}</h3>
                </v-col>
            </v-row>
            <template v-if="selectedId == ranking.user_id">
                <v-row no-gutters>
                    <v-container class="pt-2 px-0">
                        <v-slide-group prev-icon="<" next-icon=">" id="slider">

                            <v-slide-item style="width:275px; height:70px" class="ml-2">
                                <v-container fill-height class="rounded-lg"
                                    style="background: var(--v-background-base)"
                                >
                                    <v-row style="width:125px;" align="end" no-gutters>
                                        <v-col cols="auto">
                                            <div class="overline lh-1">FROM<br>MATCHES</div>
                                        </v-col>
                                        <v-col class="ml-2">
                                            <div class="caption">+ {{ ranking.from_guesses?.tot_points }}</div>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-slide-item>

                            <v-slide-item 
                                v-for="(up, i) in ranking.from_ppCups?.userParticipations" :key="i"
                                class="mx-2"
                                :style="{
                                    minWidth:'250px',
                                    height: '70px'
                                }"
                            >
                                <v-container class="rounded-lg" :style="{
                                    overflow: 'hidden',
                                    background: 'var(--v-background-base)',
                                }">
                                    <v-row align="center">
                                        <v-col cols="auto">
                                            <em-emoji :native="up.ppTournamentType.emoji" size="2em" />
                                        </v-col>
                                        <v-col :style="{
                                            height: '100%',
                                            overflow: 'hidden',
                                        }" class="mr-2">
                                            <v-row no-gutters>
                                                <h4>{{ up.ppTournamentType.name }}</h4>
                                            </v-row>
                                            <v-row no-gutters align="center" style="flex-wrap: nowrap">
                                                <v-col>
                                                    <div class="overline lh-1">
                                                        {{ (up.ppTournamentType.levelFormat.name == 'FINAL' &&
                                                            up.position == 1) ?
                                                            'WINNER' : up.ppTournamentType.levelFormat.name
                                                        }}
                                                    </div>
                                                </v-col>
                                                <v-col cols="auto" class="pl-2">
                                                    <div class="caption">+{{ up.ppRanking_points }}</div>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-slide-item>
                            <v-slide-item v-for="(up, i) in ranking.from_ppLeagues?.userParticipations"
                                :key="ranking.user_id + i" class="mx-2">
                                <v-container class="rounded-lg" :style="{
                                    height: '70px',
                                    overflow: 'hidden',
                                    background: 'var(--v-background-base)'
                                }">
                                    <v-row align="center">
                                        <v-col cols="auto">
                                            <em-emoji :native="up.ppTournamentType.emoji" size="2em" />
                                        </v-col>
                                        <v-col :style="{
                                            height: '100%',
                                            overflow: 'hidden',
                                        }" class="mr-2">
                                            <v-row no-gutters>
                                                <h4>{{ up.ppTournamentType.name }} {{ up.ppTournamentType.level }}</h4>
                                            </v-row>
                                            <v-row no-gutters align="center" style="flex-wrap: nowrap">
                                                <v-col>
                                                    <div class="overline lh-1">
                                                        <template v-if="up.position == 1">winner</template>
                                                        <template v-else>{{ up.position + (up.position == 1 ? 'st' :
                                                            (up.position == 2 ? 'nd' : 'rd')) }}</template>
                                                    </div>
                                                </v-col>
                                                <v-col cols="auto" class="pl-2">
                                                    <div class="caption">+{{ up.ppRanking_points }}</div>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-slide-item>
                        </v-slide-group>
                    </v-container>
                </v-row>
            </template>
        </v-container>
    </div>
</template>
<script>
export default {
    props: {
        ppRankings: { type: Array }
    },
    data() {
        return {
            selectedId: null
        }
    },
    methods: {
        select(userId) {
            if (userId == this.selectedId) {
                this.selectedId = null;
                return;
            }
            this.selectedId = userId;
        }
    },
    mounted() {
        this.selectedId = this.ppRankings[0]?.user_id;
    }
}
</script>