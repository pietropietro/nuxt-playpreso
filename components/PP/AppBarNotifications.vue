<template>
    <nuxt-link class="no-decoration" :to="ROUTES.NOTIFICATIONS" >
        <!-- <div class="ocrastd" v-if="notifications && notifications.length > 0">
            <h1>{{notifications.length}}^</h1>
        </div> -->
        <em-emoji size="1.5em" v-if="notifications && notifications.length > 0"
            id="envelope_with_arrow"
        />
    </nuxt-link>
</template>

<script>
export default {
    data(){
        return{
            loading: false,
            notifications: []
        }
    },
    methods:{
        async getNotifications(){
            this.loading = true;
            let response = await this.$api.call(this.API_ROUTES.NOTIFICATIONS.GET);
            if(response && response.status === "success"){
                this.notifications = response.message;
            }
            this.loading = false;
        }
    },
    async mounted(){
        await this.getNotifications();
    }
}
</script>

<style>

</style>