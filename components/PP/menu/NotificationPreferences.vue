<template>
    <loading-page v-if="loading" class="pt-10"/>
    <v-row v-else justify="center" class="overline lh-1">
        <table>
            <tr v-for="item in pushPreferencesList" :key="item.key">
                <td class="px-5 caption">{{item.description}}</td>
                <td>
                    <v-switch inset 
						v-model="item.model" 
						@change="updatePushPreference(item.key, $event)"
						:loading="loading"
					/>
                </td>
            </tr>
        </table>
    </v-row>
</template>
<script>
export default {
    data(){
        return {
            loading: true,
            pushPreferencesList:[
                {
                    description: 'Lock reminder a few hours before match starts.',
                    model:1,
                    key: 'guess_unlocked_starting',
                },
                {
                    description: 'Match has finished.',
                    model:1,
                    key: 'guess_verified',
                },
                {
                    description: 'P-League has finished',
                    model:1,
                    key: 'ppleague_finished',
                },
            ],
            userPushPreferencesRejected: []
        }
    },
	methods:{
		async updatePushPreference(key, val){
			this.loading = true;
            let values = { 
                eventType: key,
            }
            
            let response = await this.$api.call(
                this.API_ROUTES.PUSH_PREFERENCES.TOGGLE, values, 'POST'
            );
            //on error
            if(!response || response.status !== "success"){
               console.log('error');
            }
            this.loading = false;
        },
        async getUserPreferences(){
            this.loading = true;
            let response = await this.$api.call(this.API_ROUTES.PUSH_PREFERENCES.GET);
            if(response && response.status === "success"){

                this.userPushPreferencesRejected = response.message;

                // Iterate through pushPreferencesList and update the model
                this.pushPreferencesList.forEach(preference => {
                    const isRejected = this.userPushPreferencesRejected.some(
                    rejectedPref => rejectedPref.event_type_rejected === preference.key
                    );

                    // If rejected, set model to 0, otherwise keep it as 1
                    preference.model = isRejected ? 0 : 1;
                });            

            }
            this.loading = false;
        },
	},
    async mounted(){
        await this.getUserPreferences();
    }
}
</script>



