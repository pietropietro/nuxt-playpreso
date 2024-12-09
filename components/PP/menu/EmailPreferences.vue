<template>
    <loading-page v-if="loading" />
    <v-row v-else-if="emailPreferences" justify="center" class="overline lh-1">
        <table>
            <tr v-for="item in emailPreferencesList" :key="item.key">
                <td class="px-5 caption">{{item.description}}</td>
                <td>
                    <v-switch inset 
						v-model="emailPreferences[item.key]" 
						@change="updateEmailReminder(item.key, $event)"
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
            loading: false,
            emailPreferences: null,
            emailPreferencesList:[
                {
                    description: 'daily email in case you have unlocked matches',
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
            this.loading = false;

        },
        async getEmailPreferences(){
            this.loading = true;
            let response = await this.$api.call(this.API_ROUTES.EMAIL_PREFERENCES.GET);
            if(response && response.status == "success"){
                this.emailPreferences = {...response.message};
            }
            this.loading = false;
        }
	},
    async mounted(){
        await this.getEmailPreferences();
    }
}
</script>



