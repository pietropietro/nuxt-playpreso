<template>
	<v-img :src="require('@/assets/img/snowflake.png')" 
		class="snowflake" 
		:style="{height: size + 'px', width: size + 'px'}"
	/>
</template>

<script>
export default {
	props: {
		size: {type: Number, default: 24}
	}
}
</script>

<style scoped>
.snowflake {
	position: absolute;

	opacity: 0.8;
	will-change: transform;
}
</style>