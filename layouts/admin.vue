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