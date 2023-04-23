<template>
    <v-row v-if="id">
        <v-img v-if="imageSrc" :src="imageSrc" width="55" height="55" contain />
    </v-row>
</template>
<script>
import ColorThief from 'colorthief';

export default {
  props: { id: { type: Number } },
  data() {
    return {
      imageSrc: null,
    };
  },
  async mounted() {
    let response = await this.$api.getImage('/static/teams/' + this.id);
    if (response.status == 200) {
      let blob = await response.blob();
      this.imageSrc = URL.createObjectURL(blob);
    }
  },
};
</script>