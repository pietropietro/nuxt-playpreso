<template>
    <v-row justify="center" class="overline lh-1">
        <table v-if="currentUser.emailPreferences">
            <tr v-for="item in emailPreferencesList" :key="item.key">
                <td class="px-5 caption">{{item.description}}</td>
                <td>
                    <v-switch inset 
						v-model="item.model" 
						@change="updateEmailReminder(item.key, $event)"
						:loading="loading"
					/>
                </td>
            </tr>
        </table>
        <div v-else>please log-out and in again to retrieve your preferences.</div>
    </v-row>
</template>
<script>
export default {
    data(){
        return {
            loading: false,
            emailPreferencesList:[
                {
                    description: 'daily reminder in case you have unlocked matches',
                    key: 'lock_reminder',
                },
            ],
        }
    },
	methods:{
		async updateEmailReminder(key, val){
			this.loading = true;
            let values = { 
                [key]: val,
            }
            
            let response = await this.$api.call(
                this.API_ROUTES.EMAIL_PREFERENCES.UPDATE, values, 'POST'
            );
            if(!response || response.status !== "success"){
                this.emailPreferencesList.map((e)=>{
                    e.model = this.currentUser.emailPreferences[e.key];
                });
            }else{
                let copy = JSON.parse(JSON.stringify(this.currentUser));
                copy.emailPreferences[key] = val;
                this.$store.commit('user/updateCurrentUser', {currentUser: copy});
            }
            this.loading = false;

        },
	},
    created(){
        this.emailPreferencesList.map((e)=>{
            e.model = this.currentUser.emailPreferences[e.key];
        });
    }
}
</script>



