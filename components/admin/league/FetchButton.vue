<template>
    <v-btn @click="fetch" 
        :disabled="!ls_suffix" 
        outlined 
        :loading="loading"
        @click.stop.native
    >
        FETCH EXTERNAL DATA
    </v-btn>
</template>
<script>
export default {
    props:{
        id: {type: Number},
        ls_suffix: {type: String},
        onSuccess: {type: Function}
    },
    data:()=>({loading: false}),
    methods:{
        async fetch(){
            this.loading = true;
            let values = {};
            
            let response = await this.$api.call(
                this.ADMIN_API_ROUTES.LEAGUE.FETCH + this.id, values, 'POST'
            );  
               
            await this.onSuccess();
            this.loading = false;
        }
    }
}
</script>