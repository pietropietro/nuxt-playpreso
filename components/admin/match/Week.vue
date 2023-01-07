<template>
    <v-container fluid class="px-4">
        <loading-page v-if="loading"/>
         <template v-if="!loading">
            <v-row no-gutters justify="space-between">
                <v-col cols="1">
                    <h1 class="pointer px-2" @click="changeDates(-7)">
                        <
                    </h1>
                </v-col>
                    <v-col cols="1">
                    <h1 class="px-2 pointer text-right" @click="changeDates(+7)">></h1>
                </v-col>
            </v-row>
            <v-row>
                <v-col v-for="(matches, day) in week" :key="day">
                    <h2 class="text-center">{{formatDate(day, false)}}</h2>
                    <h2 class="my-3 text-center">{{matches.length}}</h2>
                    <v-row>
                        <v-expansion-panels>
                            <v-col cols="12" v-for="match in matches" :key="match.id">
                                <admin-match-expansion-panel timeOnly :match="match"/>
                            </v-col>
                        </v-expansion-panels>
                    </v-row>
                </v-col>
            </v-row>
         </template>
    </v-container>
</template>
<script>
export default {
    data:()=>({
        week: null,
        loading: true,
        days_diff: 0
    }),
    async mounted(){
        await this.getMatches();
    },
    methods:{
        async getMatches(){
            this.loading=true;
            let response = await this.$api.call(this.ADMIN_API_ROUTES.MATCH.GET + '?days_diff=' + this.days_diff);
            if(response && response.status === "success"){
                this.week = response.message;
            }
            this.loading = false;
        },
        async changeDates(change){
            this.days_diff += change;
            await this.getMatches();
        },
    }
}
</script>
