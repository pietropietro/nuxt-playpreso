<template>
    <v-container fluid class="px-4">
        <v-row v-if="!loading">
            <v-col v-for="(matches, day) in week" :key="day">
                <h2 class="text-center">{{formatDate(day, false)}}</h2>
                <h2 class="my-3 text-center">{{matches.length}}</h2>
                <v-row >
                    <!-- <v-sheet color="primary lighten-1"> -->
                        <v-col cols="12" v-for="match in matches" :key="match.id">
                            <v-card>
                                <v-container>
                                   <v-row align="center">
                                       <span class="text-caption mx-3">{{formatTime(match.date_start)}}</span>
                                        <!-- <v-row no-gutters class="text-caption">{{formatDate(match.date_start)}}</v-row> -->
                                        <v-col>
                                            <v-row no-gutters>
                                                <v-col  cols="auto" class="mr-2">
                                                    <league-flag small :league="match.league" size="12"/>
                                                </v-col>
                                                <v-col class="text-overline">{{match.league.tag}}</v-col>
                                            </v-row>
                                        </v-col>
                                        <v-col cols="auto" v-if="match.score_home !== null">
                                            <div class="text-overline">{{match.score_home}} - {{match.score_away}}</div>
                                        </v-col>
                                   </v-row>
                                    <v-row no-gutters style="line-height:1rem;" class="text-overline">
                                        {{match.homeTeam.name}}
                                    </v-row>
                                    <v-row no-gutters style="line-height:1rem;" class="text-overline">
                                        {{match.awayTeam.name}}
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-col>
                    <!-- </v-sheet> -->
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    layout: "admin",
    data:()=>({
        week: null,
        loading: true
    }),
    async mounted(){
        await this.getMatches();
    },
    methods:{
        async getMatches(){
            let response = await this.$api.call(this.ADMIN_API_ROUTES.MATCHES);
            if(response && response.status === "success"){
                this.week = response.message;
            }
            this.loading = false;
        },
    }
}
</script>
