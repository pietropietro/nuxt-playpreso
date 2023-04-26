<template>
    <v-row v-if="id" :align="align">
        <v-img v-if="imageSrc" :src="imageSrc" :width="size" :height="size" contain />
    </v-row>
</template>
<script>
import ColorThief from 'colorthief';

export default {
  props: {
    id: { type: Number },
    size: {type: Number, default: 55},
    align: {type: String, default: 'start'}
  },
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