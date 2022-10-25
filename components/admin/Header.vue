<template>
    <v-app-bar
        flat dense app
        class="no-selection" 
        color="primary"
    >
        <div @click.stop="()=>setDrawer(!drawer)" class="ocrastd"><h1>ADMIN</h1></div>
        <v-spacer/>
        <span class="ocrastd">{{new Date().toDateString()}}-</span>
        <digital-clock class="ocrastd" :blink="true" />
        <v-spacer/>
        <user-menu v-if="!$store.state.navigation.rgb"/>
    </v-app-bar>
</template>
<script>
import DigitalClock from "vue-digital-clock";
export default {
    components: {
        DigitalClock
    },
    props:{
        drawer: {type :Boolean},
        setDrawer: {type: Function}
    },
}
</script>
