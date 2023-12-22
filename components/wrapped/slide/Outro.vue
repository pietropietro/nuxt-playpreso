<template>
	<div class="intro-slide">
		<v-row no-gutters>
			<wrapped-snowflake v-for="n in 200" :key="n" :style="getSnowflakeStyle(n)" :size="Math.random() * 15 + 10" />
		</v-row>
		<v-container fluid fill-height  style="overflow:hidden; white-space: nowrap;">
			<v-row justify="center" class="ocrastd font-weight-bold" style="font-size:30px">
				SEE YOU <br> IN <br> 2024
			</v-row>
		</v-container>
	</div>
</template>

<script>
export default {
	props: {
		index: {type: Number},
	},
	methods:{
		getSnowflakeStyle(index) {
			const duration = 5 + Math.random() * 10; // Duration between 5 and 15 seconds
			const delay = Math.random() * -20; // Start with a delay to stagger the snowflakes
			const xPos = Math.random() * 100; // Random horizontal position

			return {
					animation: `fall ${duration}s linear ${delay}s infinite`,
					left: `${xPos}vw`
			};
		}
	}
};
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

.intro-slide {
  position: relative;
  width: 100%; /* or a specific width */
  height: 100vh; /* or a specific height */
  overflow: hidden;
}
</style>