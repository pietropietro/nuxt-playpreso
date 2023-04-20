<template>
  <div>
    <canvas ref="canvas" width="70" height="70"></canvas>
  </div>
</template>
<script>
import ColorThief from 'colorthief';

export default {
  props: {
    id: { type: Number },
  },

  async mounted() {
    // Load the image from the API
    let response = await this.$api.getImage('/static/teams/' + this.id);
    if (response.status == 200) {
      let blob = await response.blob();
      let url = URL.createObjectURL(blob);

      // Create a new image element and set its source to the loaded image URL
      let img = new Image();
      img.onload = async () => {
        // Get the dominant color of the image using colorthief
        const colorThief = new ColorThief();
        const dominantColor = await colorThief.getColor(img);


        // Check if the dominant color is white
        if (dominantColor.join() !== '255,255,255') {
          // Draw the image on the canvas
          let canvas = this.$refs.canvas;
          let ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          // Get the image data from the canvas
          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          let data = imageData.data;

          // Loop through the image data and set the red, green, and blue channels to 255 for all non-transparent pixels
          for (let i = 0; i < data.length; i += 4) {
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];
            let a = data[i + 3];
            if (a !== 0) {
              data[i] = dominantColor[0]; // set red channel to 255 (full red)
              data[i + 1] = dominantColor[1]; // set green channel to 255 (full green)
              data[i + 2] = dominantColor[2]; // set blue channel to 255 (full blue)
            }
          }

          // Put the modified image data back on the canvas
          ctx.putImageData(imageData, 0, 0);
        } else {
          // Draw the original image on the canvas
          let canvas = this.$refs.canvas;
          let ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
        }
      };

      img.src = url;
    }
  },
};
</script>