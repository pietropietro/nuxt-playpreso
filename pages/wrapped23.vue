<template>
    <loading-page v-if="loading" />
    <Stories
        v-else-if="wrappedData"
        :interval="6000"
        :stories="stories"
        @allStoriesEnd="allStoriesEnd"
        class="custom-story-container"
    >
        <template #header>
            <wrapped-story-header 
                :style="$vuetify.breakpoint.smAndUp ? 'width:400px;' : 'width: 90vw'" 
                :exit="allStoriesEnd"
            />
        </template>

        <template #intro>
            <wrapped-slide-intro  />
        </template>
        <template #thanks>
            <wrapped-slide-thank-you :storyData="wrappedData"/>
        </template>
        <template #summary>
            <wrapped-slide-summary :storyData="wrappedData"/>
        </template>
        <template #summaryTwo>
            <wrapped-slide-summary-two :storyData="wrappedData"/>
        </template>

        <template #highTeam>
            <wrapped-slide-team-league 
                label="best team"
                :name="wrappedData.high_team_name"
                color="#ff471a"
                :points="wrappedData.high_team_avg_points"
                :locks="wrappedData.high_team_tot_locks"
                :guesses="highTeamGuesses"
            >
                <team-logo :id="wrappedData.high_team_id" size="40" slot="icon"/>
            </wrapped-slide-team-league>
        </template>
        <template #lowTeam>
            <wrapped-slide-team-league 
                label="worst team"
                :name="wrappedData.low_team_name"
                color="#00994d"
                :points="wrappedData.low_team_avg_points"
                :locks="wrappedData.low_team_tot_locks"
                :guesses="lowTeamGuesses"
            >
                <team-logo :id="wrappedData.low_team_id" size="40" slot="icon"/>
            </wrapped-slide-team-league>
        </template>
        <template #highLeague>
            <wrapped-slide-team-league 
                label="best league"
                :name="wrappedData.high_league_name"
                color="#002db3"
                :points="wrappedData.high_league_avg_points"
                :locks="wrappedData.high_league_tot_locks"
                :guesses="highLeagueGuesses"
            >
                <v-row justify="center" slot="icon">
                    <emoji-flag size="2em" :model="wrappedData.high_league_country"/>
                </v-row>
            </wrapped-slide-team-league>
        </template>
        <template #lowLeague>
            <wrapped-slide-team-league 
                label="worst league"
                :name="wrappedData.low_league_name"
                color="#ff00bf"
                :points="wrappedData.low_league_avg_points"
                :locks="wrappedData.low_league_tot_locks"
                :guesses="lowLeagueGuesses"
            >
                <v-row justify="center" slot="icon">
                    <emoji-flag size="2em" :model="wrappedData.low_league_country"/>
                </v-row>
            </wrapped-slide-team-league>
        </template>

       

        <template #months>
            <wrapped-slide-months :storyData="wrappedData"/>
        </template>
        <template #ppl>
            <wrapped-slide-ppl :storyData="wrappedData"/>
        </template>
        <template #enemy>
            <wrapped-slide-enemy :storyData="wrappedData"/>
        </template>
         <template #outro>
            <wrapped-slide-outro :storyData="wrappedData"/>
        </template>

    </Stories>
    <go-home v-else />
</template>

<script>

import { Stories } from "vue-insta-stories";

// import StoryHeader from "./components/StoryHeader.vue";

export default {
    layout: "authenticatedSplash",
    components: { Stories  },
    data: () => ({
        loading:true,
        wrappedData: [],
        stories: [ 
            {template: "intro"},
            {template: "thanks"},
            {template: "summary"},
            {template: "summaryTwo"},
            {template: "highTeam"},
            {template: "lowTeam"},
            {template: "highLeague"},
            {template: "lowLeague"},
            {template: "months"},
            {template: "ppl"},
            {template: "enemy"},
            {template: "outro"},
        ],
        highTeamGuesses: [],
        lowTeamGuesses: [],
        highLeagueGuesses: [],
        lowLeagueGuesses: [],
    }),
    methods:{
        allStoriesEnd() {
            console.log('ciao');
            this.$router.push("/");
        },
        async getWrappedData(){
            let response = await this.$api.call(this.API_ROUTES.STATS.WRAPPED);
            if(response && response.status === "success"){
                this.wrappedData = response.message;
            }
            this.loading = false;
        },
        async getGuesses(url){
            let response = await this.$api.call(
               url
            );
            if(response && response.status === "success"){
                return response.message;
            }
        },
    },
    async mounted(){
        await this.getWrappedData();
        this.highTeamGuesses = await this.getGuesses(
            this.API_ROUTES.GUESS.GET_FOR_TEAM + this.wrappedData.high_team_id
                + '?before=2023-12-31&after=2023-01-01'
        );
        this.lowTeamGuesses = await this.getGuesses(
            this.API_ROUTES.GUESS.GET_FOR_TEAM + this.wrappedData.low_team_id
                + '?before=2023-12-31&after=2023-01-01'
        );
        this.highLeagueGuesses = await this.getGuesses(
            this.API_ROUTES.GUESS.GET_FOR_LEAGUE + this.wrappedData.high_league_id
                + '?before=2023-12-31&after=2023-01-01'
        );
        this.lowLeagueGuesses = await this.getGuesses(
            this.API_ROUTES.GUESS.GET_FOR_LEAGUE + this.wrappedData.low_league_id
                + '?before=2023-12-31&after=2023-01-01'
        );
    }
}

</script>

<style lang="scss">

.custom-story-container {
  position: absolute;
  top: 0;
  height: 100%; /* Equivalent to h-fill */
  width: 100vw;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25); /* Similar to shadow-lg */
}

@media (min-width: 768px) { /* This is a typical breakpoint for 'md' */
  .custom-story-container {
    height: 730px;
    width: 420px;
    position: relative; /* Change position at md breakpoint */
  }
}

.vue-insta-stories {
  background: var(--v-primary); /* or 'inherit' if you want to explicitly inherit from the parent */
}

</style>