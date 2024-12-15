<template>
	<div class="intro-slide">
		<v-row no-gutters>
			<wrapped-snowflake v-for="n in 200" :key="n" :style="getSnowflakeStyle(n)" :size="Math.random() * 15 + 10" />
		</v-row>
		<v-container fluid fill-height  style="overflow:hidden; white-space: nowrap;">
			<v-row justify="center" class="ocrastd font-weight-bold" style="font-size:30px">
				SEE YOU <br> IN <br> 2025
			</v-row>
		</v-container>
	</div>
</template>

<script>
import { useSnowflakeStyle } from '~/composables/useSnowFlakes';

export default {
	props: {
		index: {type: Number},
	},
	methods:{
        getSnowflakeStyle(index) {
            const { getSnowflakeStyle } = useSnowflakeStyle(); // Use the composable
            return getSnowflakeStyle(index);
        },
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