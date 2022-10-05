<template>
    <v-app-bar
        flat dense app
        class="white--text noselection" 
        color="primary" 
    >
        <div @click.stop="()=>setDrawer(!drawer)" class="ocrastd"><h1>ADMIN</h1></div>
        <v-spacer/>
        <user-menu v-if="!$store.state.navigation.rgb"/>
    </v-app-bar>
</template>
<script>
export default {
    props:{
        drawer: {type :Boolean},
        setDrawer: {type: Function}
    },
}
</script>
