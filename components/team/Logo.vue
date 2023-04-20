<template>
    <v-row style="width:300px;" v-if="id">
        <canvas id="image-canvas"></canvas>
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
  methods: {
    async createOutline() {
      let image = new Image();
      image.src = this.imageSrc;

      
      image.addEventListener('load', () => {
        // Create a canvas element and get its context
        let canvas = document.getElementById('image-canvas');
        canvas.setAttribute('willReadFrequently', 'true');
        canvas.style.border = "1px solid red";

        let ctx = canvas.getContext('2d');

        // Get the main color of the image using ColorThief
        const colorThief = new ColorThief();
        let color = colorThief.getColor(image);

        // Set the canvas dimensions to match the image dimensions
        canvas.width = image.width;
        canvas.height = image.height;

        // Draw the image on the canvas
        ctx.drawImage(image, 0, 0);

        // Get the image data from the canvas
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;

        // Loop through the image data and set the alpha channel to 0 for all pixels that don't match the main color
        for (let i = 0; i < data.length; i += 4) {
          let r = data[i];
          let g = data[i + 1];
          let b = data[i + 2];

          // If the pixel color doesn't match the main color, set the alpha channel to 0
          if (r !== color[0] || g !== color[1] || b !== color[2]) {
            data[i + 3] = 0;
          }
        }

        // Put the modified image data back on the canvas
        ctx.putImageData(imageData, 0, 0);

        // Set the image source to the canvas data URL
        this.newImageSrc = canvas.toDataURL();
      });
    },
  },
  async mounted() {
    if(!this.id)return;
    let response = await this.$api.getImage('/static/teams/' + this.id);
    if (response.status == 200) {
      let blob = await response.blob();
      this.imageSrc = URL.createObjectURL(blob);
      this.createOutline();
    }
  },
};
</script>