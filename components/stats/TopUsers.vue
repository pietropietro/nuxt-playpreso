<template>
    <div v-if="stats && stats.bestAverage">
        <!-- <v-row no-gutters>
            <h1>
                BEST USERS
            </h1>
            <h4>*</h4>
        </v-row> -->
        <stats-best-list :stats="stats[selectedStat]" :headers="headers">
            <template slot="headers">
                <th style="vertical-align:middle;" class="text-left lh-1">
                        <v-chip-group
                            mandatory
                            class="h-100"
                            active-class="primary"
                            v-model="selectedStat"
                        >
                            <v-chip 
                                small 
                                :value="s.value" 
                                v-for="(s,i) in statsList" 
                                :key="i"
                                color="transparent"
                            >
                                <div class="overline lh-1">{{s.text}}</div>
                            </v-chip>
                        </v-chip-group>
                </th>
                <th>
                    <em-emoji size="1.5rem" id="lock" />
                </th>
                <th class="text-right pr-4">
                    <em-emoji size="1.5rem" id="parking" />
                </th>
            </template>
        </stats-best-list>
        <v-row justify="end">
            <v-col cols="auto">
                <div class="caption lh-1">*last 30 days, at least 15 matches</div>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    data(){
        return {
            loading: true,
            stats: null,
            headers: [
                { value: 'username', sortable:false}, 
                { value: 'cnt', text:'a', sortable:false}, 
                { value: 'display_points',  text:'a', sortable:false},
            ],
            statsList: [{value: 'bestAverage', text: 'AVG'}, {value: 'mostPoints', text: 'TOT'}],
            selectedStat: 'bestAverage',
        }
    },
    methods:{
        async getBest(){
            let response = await this.$api.call(this.API_ROUTES.STATS.BEST_USERS);
            if(response && response.status === "success"){
                this.stats = response.message;
                // this.userStat = response.message?.currentUserStat;
            }
            this.loading = false;
        },
    },
    async mounted(){
        await this.getBest(); 
    }
}
</script>