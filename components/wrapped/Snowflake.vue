<template>
  <v-img :src="require('@/assets/img/snowflake.png')" class="snowflake" />
</template>

<script>
export default {
}
</script>

<style scoped>
.snowflake {
  position: absolute;
  width: 40px;
  height: 40px;
  opacity: 0.8;
  will-change: transform;
}
</style>