<template>
    <loading-page v-if="loading"/>
    <v-container v-else-if="users">
        <div>
            <h1>USERS ({{users.length}})</h1>
            <v-data-table
                item-text="value"
                :items-per-page="-1" :items="users"
                :headers="headers"
                :expanded.sync="expanded"
                singleExpand
                hide-default-footer
                @click:row="(item)=>expandRow(item)"
            >
                <template v-slot:item.id="{ item }">
                    <div class="ocrastd">
                        #{{ item.id }}
                    </div>
                </template>
                <template v-slot:item.username="{ item }">
                    <h2>
                        {{ item.username }}
                    </h2>
                </template>
                <template v-slot:item.created_at="{ item }">
                    <div class="overline lh-1">
                        <div>{{formatMonthYear(item.created_at).toLowerCase()}}</div>
                    </div>
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">
                        <!-- <admin-p-p-tournament-type-detail :ppTournamentType="item" /> -->
                    </td>
                </template>
            </v-data-table>
        </div>
    </v-container>
    <error-wall v-else/>
</template>
<script>

export default {
    layout: "admin",
     data:()=>({
        users: null,
        loading: true,
        expanded: [],
        headers: [
            { value: 'id'},
            { value: 'username'},
            { value: 'points'},
            { value: 'email'},
            { value: 'created_at'}
        ]
    }),
    async mounted(){
        await this.getUsers();
    },
    methods:{
        async getUsers(){
            let response = await this.$api.call(this.ADMIN_API_ROUTES.USER.GET);
            if(response && response.status === "success"){
                this.users = response.message;
            }
            this.loading = false;
        },
        expandRow(item){
            if(this.expanded.length>0 && this.expanded[0].id==item.id){
                this.expanded = [];
                return;
            } 
            this.expanded = [];
            setTimeout(()=>{this.expanded.push(item);});
        }
    }
}
</script>