<template>
  <div>
    <canvas ref="canvas" width="70" height="70"></canvas>

    <!-- <canvas ref="canvas" width="500" height="500"></canvas> -->
  </div>
</template>

<script>
export default {
    props: {
        id: {type: Number}
    },

  async mounted() {
    // Load the image from the API
    // let response = await this.$api.getImage('/static/teams/' + this.id);
    let response = await this.$api.getImage('/static/teams/' + this.id);
    if (response.status == 200) {
      let blob = await response.blob();
      let url = URL.createObjectURL(blob);

      // Create a new image element and set its source to the loaded image URL
      let img = new Image();
      img.onload = () => {
        // Draw the image on the canvas
        let canvas = this.$refs.canvas;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Get the image data from the canvas
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;

        // Loop through the image data and set the red channel to 255 for all pixels
        for (let i = 0; i < data.length; i += 4) {
            let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];
         if (r !== 0 || g !== 0 || b !== 0) {
          data[i] = 255; // set red channel to 255 (full red)
          data[i + 1] = 255;
          data[i + 2] = 255;
          data[i + 3] = 255; // set alpha channel to 255 (full opacity)
        }
        }

        // Put the modified image data back on the canvas
        ctx.putImageData(imageData, 0, 0);
      };

      img.src = url;
    }
  }
};
</script>