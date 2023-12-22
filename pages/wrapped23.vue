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
            <wrapped-story-header style="width:90vw;" :exit="allStoriesEnd"/>
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
        <template #teamLeague>
            <wrapped-slide-team-league :storyData="wrappedData"/>
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
            {template: "teamLeague"},
            {template: "months"},
            {template: "ppl"},
            {template: "enemy"},
            {template: "outro"},
        ]
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
    },
    async mounted(){
        await this.getWrappedData();
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