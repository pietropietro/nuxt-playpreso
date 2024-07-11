<template>
    <loading-page v-if="loading"/>
    <v-container v-else class="pt-0 px-0">
        <v-row no-gutters>
            <v-col>
                <v-slide-group
                    prev-icon="<"
                    next-icon=">"
                    ref="slider"
                >
                    <v-slide-item
                        v-for="str in ['allTime', 'lastMonth']"
                        :key="str"
                        class="mx-2"
                        ref="slideItem"
                    >
                        <v-chip
                            class="overline lh-1"
                            small
                            :outlined="selectedTimeFrame==str"
                            :color="selectedTimeFrame==str ? '' : 'transparent'"
                            :value="str"
                            @click="() => selectedTimeFrame=str"
                            style="min-width:50px; opacity: 1 !important"
                        >
                            {{str == 'allTime' ? 'all time' : 'last month'}}
                        </v-chip>
                    </v-slide-item>
                </v-slide-group>
            </v-col>
        </v-row>
        <template v-if="stats[selectedTimeFrame]?.mainStats">
            <div class="mx-4" style="background:linear-gradient(#000024, transparent); border-radius: 10px; margin-top:40px; margin-bottom:80px;">
                <v-row  class="ocrastd text-center mx-4" 
                    style="
                        font-size:30px; 
                        font-weight: bold;
                    "  
                    align="center"
                >
                    <v-col cols="auto">MAIN</v-col>
                    <!-- <em-emoji style="position:absolute; left:66%" id="jigsaw" size="3em"/> -->
                </v-row>
                <v-row class="mx-2">
                    <v-col cols="3">
                        <p-p-info small  label="locks" :value="stats[selectedTimeFrame].mainStats.tot_locks"/>
                    </v-col>
                    <v-col cols="3">
                        <p-p-info small  label="AVG" :value="stats[selectedTimeFrame].mainStats.avg_points"/>
                    </v-col>
                    <v-col cols="3">
                        <p-p-info small label="preso" :value="stats[selectedTimeFrame].mainStats.tot_preso"/>
                    </v-col>
                    <v-col cols="3">
                        <p-p-info small label="missed" :value="stats[selectedTimeFrame].mainStats.tot_missed"/>
                    </v-col>
                </v-row>
                <v-row class="py-2 mx-2">
                    <v-col cols="4">
                        <p-p-info small label="1X2" :value="formatPercentage(stats[selectedTimeFrame].mainStats.perc_unox2) + '%'"/>
                    </v-col>
                    <v-col cols="4">
                        <p-p-info small label="Gol-Nogol" :value="formatPercentage(stats[selectedTimeFrame].mainStats.perc_ggng) + '%'"/>
                    </v-col>
                    <v-col cols="4">
                        <p-p-info small label="Under-over" :value="formatPercentage(stats[selectedTimeFrame].mainStats.perc_uo25) + '%'"/>
                    </v-col>
                </v-row>
                <v-row class="mx-2">
                    <v-col cols="4" v-for="i in 3" :key="i">
                        <p-p-info
                            v-if="stats[selectedTimeFrame].mainStats.commonLock.length >= i"
                            small
                            :label="'#' + i +'🔒'"
                            :value="stats[selectedTimeFrame].mainStats.commonLock[i-1].most_lock_combination"
                            :value2="'('+stats[selectedTimeFrame].mainStats.commonLock[i-1].most_lock_combination_tot +')'"
                        />
                    </v-col>
                </v-row>
            </div>

            <div class="mx-4"
                style="background:linear-gradient(#000024, transparent); border-radius: 10px; margin-top:80px; margin-bottom:80px;"
            >
                <v-row  class="ocrastd text-center mx-4" 
                    style="
                        font-size:30px; 
                        font-weight: bold;
                    "  
                    align="center"
                >
                    <v-col cols="auto">LEAGUES</v-col>
                    <!-- <em-emoji style="position:absolute; left:66%" id="jigsaw" size="3em"/> -->
                </v-row>
                <div v-for="i in stats[selectedTimeFrame].leagues.best.length" :key="'bestleague'+i">
                    <v-row align="center" class="mt-4">
                        <v-col class="mx-10" cols="auto">
                            <p-p-info
                                small
                                :label="'#' + i +' league'"
                                :value="stats[selectedTimeFrame].leagues.best[i-1].name"
                                :value2="stats[selectedTimeFrame].leagues.best[i-1].avg_points + ' (' + stats[selectedTimeFrame].leagues.best[i-1].tot_locks +')'"
                            >
                                <emoji-flag
                                    class="mr-2"
                                    slot="valuezero" size="1em"
                                    :model="stats[selectedTimeFrame].leagues.best[i-1].country"
                                />
                            </p-p-info>
                        </v-col>
                    </v-row>
                    <v-row no-gutters class="my-4">
                        <v-col>
                            <v-container class="pa-0">
                                <v-slide-group
                                    prev-icon="<"
                                    next-icon=">"
                                >
                                    <v-slide-item
                                        v-for="guess in stats[selectedTimeFrame].leagues.best[i-1]?.guesses"
                                        :key="guess.id"
                                        class="mx-2"
                                    >
                                        <div>
                                            <guess-box-view
                                                :guess="guess"
                                                :match="guess.match"
                                                :rgb="guess.ppTournamentType.rgb"
                                                :afterLock="null"
                                                :onClick="null"
                                                :open="openId == guess.id"
                                                :setOpen="(val)=>openId=val"
                                            />
                                        </div>
                                    </v-slide-item>
                                </v-slide-group>
                            </v-container>
                        </v-col>
                    </v-row>
                </div>
            </div>
            
            <!-- TODO change with primary darken 2 -->
            <div class="mx-4" v-if="stats[selectedTimeFrame].teams.best.length > 0"
            style="background:linear-gradient(#000024, transparent); border-radius: 10px; margin-top:80px; margin-bottom:80px;">
                <v-row  class="ocrastd text-center mx-4" 
                    style="
                        font-size:30px; 
                        font-weight: bold;
                    "  
                    align="center"
                >
                    <v-col cols="auto">TEAMS</v-col>
                    <!-- <em-emoji style="position:absolute; left:66%" id="jigsaw" size="3em"/> -->
                </v-row>
                <div v-for="i in stats[selectedTimeFrame].teams.best.length" :key="'bestteam'+i">
                    <v-row align="center">
                        <v-col class="mx-10 mt-4" cols="auto">
                            <p-p-info
                                v-if="stats[selectedTimeFrame].teams.best.length >= i"
                                small
                                :label="'#' + i +' team'"
                                :value="stats[selectedTimeFrame].teams.best[i-1].name"
                                :value2="stats[selectedTimeFrame].teams.best[i-1].avg_points + ' (' + stats[selectedTimeFrame].teams.best[i-1].tot_locks +')'"
                            >
                                <emoji-flag
                                    class="mr-2"
                                    slot="valuezero" size="1em"
                                    :model="stats[selectedTimeFrame].teams.best[i-1].country"
                                />
                            </p-p-info>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-container class="pa-0">
                                <v-slide-group
                                    prev-icon="<"
                                    next-icon=">"
                                >
                                    <v-slide-item
                                        v-for="guess in stats[selectedTimeFrame].teams.best[i-1]?.guesses"
                                        :key="guess.id"
                                        class="mx-2"
                                    >
                                        <guess-box-view
                                            :guess="guess"
                                            :match="guess.match"
                                            :rgb="guess.ppTournamentType.rgb"
                                            :afterLock="null"
                                            :onUnlockedClick="null"
                                            :open="openId == guess.id"
                                            :setOpen="(val)=>openId=val"
                                        />
                                    </v-slide-item>
                                </v-slide-group>
                            </v-container>
                        </v-col>
                    </v-row>
                </div>
            </div>
        </template>

    </v-container>
</template>
<script>
export default {
    props: {
        userId: {type: Number},
    },
    data() {
        return{
            selectedTimeFrame: 'allTime',
            loading: true,
            openId: null
        }
    },
    methods:{
        async getStats(){
            this.loading = true;
            let response = await this.$api.call(
                this.API_ROUTES.STATS.USER + this.userId, null, 'GET');
            if(response && response.status === "success"){
                this.stats = response.message;
            }
            this.loading = false;
        },
        formatPercentage(value) {
            if (typeof value !== 'number') {
                value = parseFloat(value);
            }
            return (value == Math.floor(value)) ? value.toFixed(0) : value.toFixed(1);
        }
    },
    async mounted() {
        await this.getStats();
    },
}

</script>
