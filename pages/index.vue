<template>
    <v-container>
        <div>my public homepage</div>
        <nuxt-link :to="ROUTES.LOGIN">
            <div>LOGIN</div>
        </nuxt-link>
    </v-container>
</template>
<script>
export default {
    layout:'public',
}
</script>