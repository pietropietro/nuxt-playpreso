<template>
        <v-row no-gutters v-if="!loading">
            <v-slide-group
                v-model="model"
                ref="slider"
            >
                <v-slide-item
                    v-for="un in userNotifications"
                    :key="un.id"
                    class="mx-2"
                    v-slot="{ toggle, active }"
                >
                    <div v-if="un.event_type == 'guess_verified'"
                        @click="toggle"
                    >
                        <notification-guess-verified 
                            :un="un" 
                            :active="active"
                        />
                    </div>
                    <div v-else> {{ un.event_type }}</div>
                </v-slide-item>
            </v-slide-group>
        </v-row>
</template>

<script >
export default {
    watch:{
        async page(){
            console.log('watch notification page', this.page);
            await this.getUserNotifications();
        }
    },
    data:()=>({
        loading: false,
        limit: 10,
        page: 1,
        userNotifications: [],
        total: null,
        model: null
    }),
    methods:{
        async getUserNotifications(){
            this.loading=true;
            let response = await this.$api.call(this.API_ROUTES.USER_NOTIFICATION.GET_UNREAD + '?limit=' + this.limit + '&page=' + this.page);
            if(response && response.status === "success"){
                this.userNotifications = [...this.userNotifications, ...response.message]; 
            }
            this.loading = false;
        },
        clickUnlocked(guess){
            let list = [];
            this.userNotifications.map((un)=>{
                if(un.guess && !un.guess.guessed_at && !un.guess.verified_at){
                    list.push(un.guess);
                }
            }
            );
            this.$store.dispatch('openGuesses/update', {
                newGuess: guess,
                newList:  list
            });
        },        
        
    },
    async mounted(){
        await this.getUserNotifications();
    }
}
</script>