<template>
    <div>
        <stats-best-list :items="best" :headers="headers" :currentUserStat="userStat">
            <template slot="headers">
                <th class="text-left">
                <v-row no-gutters>
                    <h1>
                        BEST USERS
                    </h1>
                    <h4>*</h4>
                    </v-row>
                </th>
                <th>
                    <em-emoji size="1.3rem" id="lock" />
                </th>
                <th class="text-right pr-4">
                    <em-emoji size="1.3rem" id="parking" />
                </th>
            </template>
        </stats-best-list>
        <!-- <stats-best-list :items="userBest" :headers="headers">
            <template slot="headers">
                <h1 class="ml-4 mt-n4 mb-n2">...</h1>
            </template>
        </stats-best-list> -->
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
            best: [],
            headers: [
                { value: 'username', sortable:false}, 
                { value: 'cnt', text:'a', sortable:false}, 
                { value: 'avg',  text:'a', sortable:false},
            ],
            userStat: null
        }
    },
    methods:{
        async getBest(){
            let response = await this.$api.call(this.API_ROUTES.STATS.BEST_USERS);
            if(response && response.status === "success"){
                this.best = response.message?.best;
                this.userStat = response.message?.currentUserStat;
            }
            this.loading = false;
        },
    },
    async mounted(){
        await this.getBest(); 
    }
}
</script>