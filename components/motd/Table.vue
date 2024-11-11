<template>
    <div style="width:100%">
        <v-container 
            v-for="(item,i) in chart" :key="item.user_id"
            :class="selectedId == item.user.id ? 'pa-0 my-4' : 'pa-0'" 
            :style="selectedId == item.user.id ?
                {
                    borderRadius: '10px'
                }
                : {}"
        >
            <v-row no-gutters align="center" @click="() => select(item.user.id)">
                <v-col cols="auto">
                    <div class="text-center" v-if="selectedId != item.user.id">
                        <v-chip x-small color="transparent">
                            # {{ i + 1 + ((page - 1) * 10) }}
                        </v-chip>
                    </div>
                </v-col>
                <v-col class="px-0"><user-name :user="item.user" /></v-col>
                <v-col cols="auto" class="text-center">
                    <div>
                        <h3>{{ item.tot_points }}</h3>
                    </div>
                </v-col>
                <v-col cols="1">
                    <div 
                        class="text-center font-weight-bold pointer"
                        style="font-size:10px;"
                    >
                        <h3>{{ selectedId == item.user.id ? '^' : 'v' }}</h3>
                    </div>
                </v-col>
            </v-row>
            <template v-if="selectedId == item.user.id && item.sparkline_data">

                <v-row justify="center">
                    <v-chip
                        v-for="g in 
                            [ 
                               'matches',
                               'graph',
                            ]
                        "
                        :key="g"
                        class="overline lh-1"
                        small
                        :outlined="selectedView==g"
                        :color="selectedView==g ? '' : 'transparent'"
                        :value="g"
                        @click="()=>selectedView=g"
                        style="min-width:50px; opacity: 1 !important"
                    >
                        <template v-if="g=='graph'">{{g}}</template>
                        <template v-else>
                         {{item.tot_locked + '-' + item.tot_preso + '-' + item.tot_unox2}}
                        </template>
                    </v-chip>
                </v-row>
                <v-container style="height: 170px;" class="px-0 pb-0">
                    <div class="px-2" v-if="selectedView=='graph'">
                        <v-sparkline
                            :value="Object.values(item.sparkline_data.cumulative)"
                            :height="$vuetify.breakpoint.smAndUp ? '70' : '120'"
                            stroke-linecap="round"
                            smooth
                            :color="'rgba('+rgb+')'"
                        />
                        <v-row class="text-center overline lh-1 mt-n1" no-gutters>
                            <v-col cols="3">W1</v-col>
                            <v-col cols="3">W2</v-col>
                            <v-col cols="3">W3</v-col>
                            <v-col cols="3">W4</v-col>
                        </v-row>
                        <v-row class="text-center overline lh-1" no-gutters>
                            <v-col cols="3">{{ Object.values(item.sparkline_data.single).splice(0,7).reduce((a,e)=>a+e) }}</v-col>
                            <v-col cols="3">{{ Object.values(item.sparkline_data.single).splice(7,7).reduce((a,e)=>a+e) }}</v-col>
                            <v-col cols="3">{{ Object.values(item.sparkline_data.single).splice(14,7).reduce((a,e)=>a+e) }}</v-col>
                            <v-col cols="3">{{ Object.values(item.sparkline_data.single).splice(21,7).reduce((a,e)=>a+e) }}</v-col>
                        </v-row>
                    </div>
                    <v-row no-gutters v-else align="center" style="height:100%">
                        <v-slide-group
                            prev-icon="<"
                            next-icon=">"
                            id="slider"
                        >
                            <v-slide-item
                                v-for="(guess) in item.guesses"
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
                    </v-row>
                </v-container>
                <!-- </v-row> -->
            </template>
        </v-container>
    </div>
</template>
<script>
export default {
    props:{
        chart: {type: Array},
        page: {type: Number},
        rgb: {type: String}
    },
    data() {
        return {
            selectedId: null,
            selectedView: 'matches',
            openId: null
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
    // mounted() {
        // this.selectedId = this.chart[0]?.user.id;
    // }
}
</script>