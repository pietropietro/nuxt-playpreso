<template>
    <loading-page />
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
