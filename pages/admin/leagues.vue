<template>
    <v-container >
        <v-tabs
            v-model="selectedTab"
            fixed-tabs
            hide-slider
        >
            <v-tab key="table" ripple>
                table
            </v-tab>
            <v-tab key="need-data">
                need data
            </v-tab>
            <v-tab-item key="table">
                <admin-league-table />
            </v-tab-item>
            <v-tab-item key="need-data">
                <admin-league-need-data />      
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>
<script>
export default {
    layout: "admin",
    data(){
        return{
            selectedTab: 'table'
        }
    }
}
</script>

<style >
/* TODO check proper way to override vuetify values */
.theme--dark.v-tabs > .v-tabs-bar {
  background-color: transparent;
}
.theme--dark.v-tabs-items {
  background-color: transparent;
}
</style>