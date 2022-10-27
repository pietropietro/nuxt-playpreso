<template>
    <loading-page v-if="loading"/>
    <v-container class="mt-4 rounded" v-else style="background-color: var(--v-primary-base)">
        <v-row no-gutters>
            <h2 class="pointer" @click="close">X</h2>
        </v-row>
        <template v-if="league">
            <v-row align="center" no-gutters>
                <span class="ocrastd mr-4">#{{league.id}}</span>
                <h1>{{league.name}}</h1>
            </v-row>
            <v-row justify="end" no-gutters>
                <b>last_updated: </b><span> {{league.updated_at}}</span>
            </v-row>
            <v-row class="pa-4">
                <v-expansion-panels>
                    <v-row>
                        <v-col>
                            <h3>LAST MATCH</h3>
                            <template v-if="league.last_next_matches[0]">
                                <span>{{formatDate(league.last_next_matches[0].date_start)}}</span>
                                <admin-match-expansion-panel :match="league.last_next_matches[0]"/>
                            </template>
                            <div v-else>no data</div>
                        </v-col>
                        <v-col>
                            <h3>NEXT MATCH</h3>
                            <template v-if="league.last_next_matches[1]">
                                <span>{{formatDate(league.last_next_matches[1].date_start)}}</span>
                                <admin-match-expansion-panel :match="league.last_next_matches[1]"/>
                            </template>
                            <div v-else>no data</div>
                        </v-col>
                    </v-row>
                </v-expansion-panels>
            </v-row>
            <v-row class="pa-4">
                <p-p-input-text 
                    label="ls_suffix"
                    :value="league.ls_suffix" 
                    :setValue="(val)=>league.ls_suffix=val" 
                    :enter="async () => await update('ls_suffix', league.ls_suffix)"
                />
                <v-col>
                    <!-- <b>use_match_ls_suffix:</b>  -->
                    <p-p-input-bool 
                        label="use_match_ls_suffix"
                        :value="!!league.use_match_ls_suffix" 
                        :setValue="(val)=>league.use_match_ls_suffix=val"
                        :onChange="async () => await update('use_match_ls_suffix', league.use_match_ls_suffix)"
                    />
                </v-col>
            </v-row>
            <v-row justify="center" class="pa-4">
                <h1 class="pointer" @click="fetch">FETCH EXTERNAL DATA</h1>
            </v-row>
        </template>
        <error-wall v-else/>
    </v-container>
</template>
<script>
export default {
    props:{
        id: {type: Number},
        close: {type: Function}
    },
    data:()=>({loading: true, league: null}),
    async mounted(){
        await this.getLeague();
    },
    methods:{
        async getLeague(){
            let response = await this.$api.call(this.ADMIN_API_ROUTES.LEAGUE.GET + '/' + this.id);
            if(response && response.status === "success"){
                this.league = response.message;
            }
            this.loading = false;
        },
        async update(col, value){
            this.loading = true;
      
            let values = {};
            values[col] = value;

            let response = await this.$api.call(
                this.ADMIN_API_ROUTES.LEAGUE.UPDATE + this.id, values, 'POST'
            );     

            // if(response && response.status === "success"){
            //     this.league= response.message;
            // }

            this.loading = false;
        },
        async fetch(){
            this.loading = true;
            let values = {};
      
            // let values = { 
            //     "home": home,
            //     "away": away
            //     }            
            
            let response = await this.$api.call(
                this.ADMIN_API_ROUTES.LEAGUE.FETCH + this.id, values, 'POST'
            );     
            await this.getLeague();       
            this.loading = false;
        }
    }
}
</script>