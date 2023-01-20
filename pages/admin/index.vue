<template>
    <v-container>
        <v-row>admin index!</v-row>
    </v-container>
</template>
<script>
export default {
    layout: "admin",
    created(){
        this.$router.push(this.ADMIN_FEATURES.USERS.ROUTE);
    }
}
</script>
