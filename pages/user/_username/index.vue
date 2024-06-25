<template>
    <loading-page v-if="loading" />
    <error-wall v-else-if="!loading && !user" />
    <div v-else>
        <v-row class="mt-4">
            <v-col>
                <p-p-info 
                    label="member since" 
                    :value="formatMonthYear(user.created_at, 'short')" 
                    small
                />
            </v-col>
            <v-col>
                <p-p-info
                    label="trophies"
                    :value="trophyDisplay"
                    small
                />
            </v-col>
        </v-row>
        <user-view-selection 
            :selectedView="selectedView"
            :setSelectedView="(val)=>selectedView=val"
            class="my-2"
            :availableViews="['matches', 'p-tournaments','p-dex']"
        />
        <trophy-dex
            v-if="selectedView=='p-dex'"
            :ppDex="user.ppDex"
        />
        <user-last-verified 
            v-else-if="selectedView=='matches'"
            :guesses="user.verified_guesses"
            :userId="user.id"
            :setGuesses="(val)=>user.verified_guesses=val"
        />
        <user-participation-enrolled-list 
            v-else-if="selectedView=='p-tournaments'"
            :userId="user.id"
        />
    </div>
</template>
<script>
export default {
    layout: "authenticated",
    data(){
        return{
            loading: true,
            username: this.$route.params.username,
            user: null,
            selectedView: 'matches'
        }
    },
    computed: {
        trophyDisplay() {
            if(this.user.trophies.length == 0) return  '-';
            const starCount = Math.floor(this.user.trophies.length / 10);
            const remainder = this.user.trophies.length % 10;
            let display = '⭐'.repeat(starCount);
            if (remainder > 0) {
                display += `${remainder}`;
            }
            return display;
        },
    },
    methods:{
        async getUser(){
            let response = await this.$api.call(this.API_ROUTES.USER.GET + this.username, null, 'GET');
            if(response && response.status === "success"){
                this.user = response.message;
            }
            this.updateAppBarTitle();
            this.loading = false;
        },
        updateAppBarTitle(){
            this.$store.dispatch(
            'navigation/updateTitle', 
            {
                newTitle: this.user.username,
                newEmoji: null,
                newOverline: null
            }
        );
        }
    }, 
    async mounted(){
        await this.getUser();
    }
}
</script>