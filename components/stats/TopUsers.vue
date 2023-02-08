<template>
    <div>
        <v-data-table
            class="transparent no-select"
            mobile-breakpoint="0"
            item-text="value"
            :items-per-page="-1" :items="best"
            :headers="headers"
            hide-default-footer
            hide-default-header
        >
            <template v-slot:header="{ props }">
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
            <template v-slot:item.username="{ item }">
                <user-name :user="item.user" />
            </template>
            <template v-slot:item.cnt="{ item }">
                <div class="overline lh-1 text-center">{{item.cnt_locked}}/{{item.cnt}}</div>
            </template>
            <template v-slot:item.avg="{ item }">
                <h1 class="text-right">{{item.avg}}</h1>
            </template>
        </v-data-table>
        <v-row justify="end">
            <v-col cols="auto">
                <div class="caption lh-1">*last 30 days, at least 10 matches</div>
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
            ]
        }
    },
    methods:{
        async getBest(){
            let response = await this.$api.call(this.API_ROUTES.STATS.BEST_USERS);
            if(response && response.status === "success"){
                this.best = response.message;
            }
            this.loading = false;
        },

    },
    async mounted(){
        await this.getBest(); 
    }
}
</script>