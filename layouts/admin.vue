<template>
	<client-only>
    <v-app>
        <guard-logged-in v-if="!currentUser"/>
        <guard-admin v-else-if="!currentUser.admin"/>
        <template v-else>
            <admin-header :drawer="drawer" :setDrawer="(val)=>drawer=val"/> 
            <snackbar />
            <v-main>
                <admin-navigation-drawer :drawer="drawer" :setDrawer="(val)=>drawer=val"/>
                <nuxt  />
            </v-main>
        </template>
    </v-app>
    </client-only>
</template>
<script>
export default {
    data: ()=>({
        drawer: false
    }),
    mounted () {
        setTimeout(()=>this.$vuetify.theme.dark = true);
    }
}
</script>

<style>
/* TODO check proper way to override vuetify values */
.theme--dark.v-tabs > .v-tabs-bar {
  background-color: transparent !important;
}
.theme--dark.v-tabs-items {
  background-color: transparent !important;
}
</style>