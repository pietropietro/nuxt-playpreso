<template>
    <loading-page v-if="loading"/>
    <v-container v-else>
        <v-tabs
            v-model="selectedTab"
            fixed-tabs
            hide-slider
        >
            <v-tab key="table" ripple>
                table
            </v-tab>
             <v-tab key="create" ripple>
                create
            </v-tab>
            <v-tab-item key="table">
                <admin-p-p-area-table 
                    :ppAreas="ppAreas" 
                />
            </v-tab-item>
             <v-tab-item key="create">
                <h1>CREATE P-AREAS</h1>
                <v-card>
                    <v-container>
                        <admin-p-p-area-detail :onCreate="getPPAreas"/>
                    </v-container>
                </v-card>
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>
<script>
export default {
    layout: "admin",
    data:()=>({
        ppTournamentTypes: null,
        loading: true,
        selectedTab: 'table'
    }),
    async mounted(){
        await this.getPPAreas();
    },
    methods:{
        async getPPAreas(){
            let response = await this.$api.call(this.ADMIN_API_ROUTES.PPAREA.GET);
            if(response && response.status === "success"){
                this.ppAreas = response.message;
            }
            this.loading = false;
        },
    }
}
</script>