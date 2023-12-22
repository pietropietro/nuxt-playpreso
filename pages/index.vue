<template>
    <v-container  class="pt-0" >
        <guess-home-scroll />
        <!-- <nuxt-link to="/p-cup/champions-league-23-24" class="no-decoration">
            <v-row class="pt-10" justify="center">
                <h1>CHAMPIONS</h1>
                <em-emoji id="dizzy" size="2em" class="mx-2"/>
                <h1>CUP</h1>
            </v-row>
        </nuxt-link> -->
        <nuxt-link to="/wrapped23" class="no-decoration" >
            <v-row class="pt-10" justify="center" style="position: relative; white-space:nowrap; overflow: hidden">
            <wrapped-snowflake v-for="n in 50" :key="n" :style="getSnowflakeStyle(n)" :size="Math.random() * 15 + 10"  />

                <h1>2023 WRAPPED</h1>
            </v-row>
        </nuxt-link>
        <v-row v-if="!$vuetify.breakpoint.mdAndUp">
            <v-col cols="12" md="6" >
                <p-p-counter />
            </v-col>
            <v-col class="pt-0 pt-md-3" cols="12" md="6" >
                <motd-home class="mt-n6 mt-md-5"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6" 
                class="pa-0"
            >
                <p-p-counter v-if="$vuetify.breakpoint.mdAndUp"/>
                <p-p-league-available-list class="px-2 mb-5"/>
                <user-participation-enrolled-list />
            </v-col>
            <v-col cols="12" md="6">
                <motd-home v-if="$vuetify.breakpoint.mdAndUp" class="mt-n6 mt-md-5"/>
                <stats-top-users class="mt-5"/>
                <stats-last-preso class="mt-8 pb-5"/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    layout: "authenticated",
    methods:{
		getSnowflakeStyle(index) {
			const duration = 5 + Math.random() * 10; // Duration between 5 and 15 seconds
			const delay = Math.random() * -20; // Start with a delay to stagger the snowflakes
			const xPos = Math.random() * 100; // Random horizontal position

			return {
                position: 'absolute',
					animation: `fall ${duration}s linear ${delay}s infinite`,
					left: `${xPos}vw`
			};
		}
	}
}
</script>
<style>
@keyframes fall {
  0% {
    transform: translateY(-100vh);
  }
  100% {
    transform: translateY(100vh);
  }
}
</style>