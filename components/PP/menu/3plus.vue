<template>
    <v-container class="mt-10">
        <v-row justify="center" class="overline lh-1">
           3+ is still the least likeble choice.
        </v-row>
        <v-row justify="center" class="text-center">
            <v-col cols="auto">
                <table>
                    <tr>
                        <td class="ocrastd">home</td>
                        <td class="overline lh-1 px-4">count</td>
                        <td class="overline lh-1">%</td>
                    </tr>
                    <tr v-for="(item,i) in homeData" :key="i">
                        <td class="ocrastd">{{item.score}}</td>
                        <td class="overline lh-1 px-4">{{item.count}}</td>
                        <td class="overline lh-1">{{item.percent}}</td>
                    </tr>
                </table>
            
                <table class="mt-5">
                    <tr>
                        <td class="ocrastd">away</td>
                        <td class="overline lh-1 px-4">count</td>
                        <td class="overline lh-1">%</td>
                    </tr>
                    <tr v-for="(item,i) in awayData" :key="i">
                        <td class="ocrastd">{{item.score}}</td>
                        <td class="overline lh-1 px-4">{{item.count}}</td>
                        <td class="overline lh-1">{{item.percent}}</td>
                    </tr>
                </table>
            </v-col>
        </v-row>
        <v-row justify="center">
            <div class="caption">
                from 13.906 matches, 11 leagues (2017-2020)
            </div>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data:()=>({
        headers: [
            { value: 'score', text:'score' }, 
            { value: 'count', text:'count'},
            { value: 'percent', text:'%' }, 
        ],
        homeData: [
            {score: 0, count: 3117, percent: 22.4 },
            {score: 1, count: 4479, percent: 32.4},
            {score: 2, count: 3168, percent: 22.8},
            {score: '3+', count: 2645, percent: 19},
        ],
        awayData: [
            {score: 0, count: 4350, percent: 31.3 },
            {score: 1, count: 4803, percent: 34.5},
            {score: 2, count: 2719, percent: 19.5},
            {score: '3+', count: 1537, percent: 11},
        ]
        
    })
}
</script>