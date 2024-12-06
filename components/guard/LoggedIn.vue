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
    async mounted() {
        setTimeout(() => {
            if (!this.currentUser) {
                this.$router.push(this.ROUTES.LOGIN);
            }
        });
    }

}
</script>
