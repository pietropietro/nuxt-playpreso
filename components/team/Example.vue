<template>
  <div>
    <canvas :ref="'canvas-' + this.matchId + '- ' + id" :width="width" :height="height"></canvas>
  </div>
</template>
<script>
import ColorThief from 'colorthief';

export default {
  props: {
    id: { type: Number },
  },
  data(){
    return {
        width: 64,
        height: 64
    }
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
        // Get the dominant color and palette of the image using colorthief
        const colorThief = new ColorThief();
        const dominantColor = await colorThief.getColor(img, 4);
        const palette = await colorThief.getPalette(img, 3);

        // Draw the image on the canvas
        let canvasRefKey = 'canvas-' + this.matchId + '- ' + this.id;
        let canvas = this.$refs[canvasRefKey];
        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Get the image data from the canvas
        let imageData = ctx.getImageData(0, 0, this.width, this.height);
        let data = imageData.data;

        // Loop through the image data and set matching pixels to white
        for (let i = 0; i < data.length; i += 4) {
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];
            let a = data[i + 3];

            // Check if the pixel color is the same as the first item in the palette
            let match = false;
            let threshold = 100;
            for (let j = 0; j < 3; j++) {
            if (Math.abs(r - palette[0][0]) <= threshold && Math.abs(g - palette[0][1]) <= threshold && Math.abs(b - palette[0][2]) <= threshold) {
                match = true;
                break;
            }
            }

            // if (a !== 0 && match) {
            // data[i] = 255; // set red channel to 255 (full white)
            // data[i + 1] = 255; // set green channel to 255 (full white)
            // data[i + 2] = 255; // set blue channel to 255 (full white)
            // } else if (a !== 0) {
            data[i] = dominantColor[0]; // set red channel to dominant color
            data[i + 1] = dominantColor[1]; // set green channel to dominant color
            data[i + 2] = dominantColor[2]; // set blue channel to dominant color
            // }
        }

        // Put the modified image data back on the canvas
        ctx.putImageData(imageData, 0, 0);
        };

        img.src = url;
    }
  },
};
</script>