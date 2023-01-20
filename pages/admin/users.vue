<template>
    <loading-page v-if="loading"/>
    <v-container v-else-if="users">
        <div>
            <h1>USERS ({{users.length}})</h1>
            <v-data-table
                class="primary"
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
                <template v-slot:item.points="{ item }">
                    <h3>
                        {{ item.points }}
                    </h3>
                </template>
                <template v-slot:item.activeUserParticipations="{ item }">
                    <v-row dense v-if="item.activeUserParticipations?.length">
                        <v-col cols="auto">
                            <h4>({{item.activeUserParticipations.length}})</h4>
                        </v-col>
                        <v-col cols="auto" v-for="(up, i) in item.activeUserParticipations" :key="up.id">
                            <em-emoji :native="up.ppTournamentType.emoji" v-if="i<3" />
                        </v-col>
                    </v-row>
                </template>
                <template v-slot:item.lastVerifiedGuesses="{ item }">
                   <v-row dense>
                        <v-col cols="auto" v-for="g in item.lastVerifiedGuesses" :key="g.id">
                            <em-emoji id="x" v-if="!g.guessed_at"/>
                            <h4 v-else>{{g.points}}</h4>
                        </v-col>
                   </v-row>
                </template>
               
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">
                        <v-row align="center">
                            <v-col>{{item.email}}</v-col>
                            <v-col>
                                 <div class="overline lh-1">
                                    <div>member since </div>
                                    <div>{{formatDate(item.created_at).toLowerCase()}}</div>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row v-if="item.activeUserParticipations.length" align="center">
                            <v-col cols="auto">
                                <div class="overline lh-1">active participations</div>
                            </v-col>
                            <v-col cols="auto" v-for="up in item.activeUserParticipations" :key="up.id">
                                <div class="ocrastd"># {{up.ppLeague_id}}</div>
                                <em-emoji :native="up.ppTournamentType.emoji"/>
                            </v-col>
                        </v-row>
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
            { value: 'points'},
            { value: 'username'},
            { value: 'activeUserParticipations'},
            { value: 'lastVerifiedGuesses'},
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