<template>
    <v-skeleton-loader
        class="py-2 safe-area"
        height="90vh"
        type="table-heading, list-item-two-line, table-tfoot,  card-heading, list-item-avatar-three-line, 
            card-heading, table-tfoot, table-heading, list-item-two-line, table-tfoot,  card-heading, 
            list-item-avatar-three-line, card-heading, table-tfoot"
    />
</template>

<script>
export default {
    async beforeMount() {
        const maxRetries = 20; // Maximum attempts (e.g., 20 * 100ms = 2 seconds)
        let attempts = 0;

        while (!this.currentUser && attempts < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, 100)); // Check every 100ms
            attempts++;
        }
        if (!this.currentUser) {
            this.$router.push(this.ROUTES.LOGIN);
        }
    }

}
</script>
