<template>
    <v-row justify="center" v-show="loading">
        <v-btn icon loading color="primary" v-show="loading"/>
    </v-row>
</template>
<script>
export default {
    computed: { 
        loading: { 
            get() { 
                return setTimeout(() => !this.currentUser.admin ? this.$router.push(this.ROUTES.HOME) : "", 200);
            }
        } 
    },
}
</script>
