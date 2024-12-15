<template>
    <v-container fluid fill-height style="  overflow:hidden; white-space: nowrap;"  class="py-0">
        <v-row style="height:20vh;">
            <wrapped-car :speed="3" :start-delay="0"/>
        </v-row>
            <v-row align="center" style="background:#330066">
            <v-col cols="3" class="pb-5" >
                <div class="caption">BEST MONTH</div>
            </v-col>
            <v-col cols="6">
                <h2 class="text-center">{{getMonthName(storyData.best_month)}}</h2>
            </v-col>
            <v-col cols="3">
                <v-row align="center">
                     <v-col cols="auto" class="mx-2">
                        <p-p-info
                            
                            class="px-0"
                            label="avg🅿️"
                            :value="storyData.best_month_avg_points"
                            :value2="'(' +storyData.best_month_tot_locks + ')'"
                        />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <v-row style="height:15vh;">
            <wrapped-car :speed="2" :start-delay="0"/>
        </v-row>

         <v-row align="center" style="background:#330066">
            <v-col cols="3" class="pb-5" >
                <div class="caption">WORST MONTH</div>
            </v-col>
            <v-col cols="6">
                <h2 class="text-center">{{getMonthName(storyData.worst_month)}}</h2>
            </v-col>
            <v-col cols="3">
                <v-row align="center">
                     <v-col cols="auto" class="mx-2">
                        <p-p-info
                            
                            class="px-0"
                            label="avg🅿️"
                            :value="storyData.worst_month_avg_points"
                            :value2="'(' +storyData.worst_month_tot_locks + ')'"
                        />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row style="height:20vh;">
            <wrapped-car :speed="4" :start-delay="0"/>
        </v-row>
    </v-container>
</template>
<script>
export default {
    props:{
        storyData: {type: Object}
    },
    methods:{
        getMonthName(monthNum) {
            const date = new Date(2020, monthNum - 1); // Year is arbitrary
            return date.toLocaleString('en-US', { month: 'long' });
        }
    }
}
</script>

<style scoped>

</style>



