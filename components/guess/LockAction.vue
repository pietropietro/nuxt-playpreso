<template>
      <v-slider
        v-model="sliderValue"
        :max="100"
        :min="0"
        step="1"
        hide-details
        color="transparent"
        class="lock-slider"
        @change="onSlideEnd"
        thumb-label
      >
        <template v-slot:thumb-label="{ value }">
          <div class="slider-thumb-container">
            <div class="slider-thumb">
                {{ sliderValue }}
              <em-emoji native='🔓' size="3.5rem"/>
            </div>
          </div>
        </template>
      </v-slider>
  </template>
  
  

  <script>
  export default {
    data() {
      return {
        sliderValue: 0
      };
    },
    methods: {
      onSlideEnd(value) {
        if (value === 100) {
          this.onUnlock();
        }
      },
      onUnlock() {
        console.log('Unlocked!');
      }
    }
  };
  </script>
  
  
  <style>

  .lock-slider {
    width: 95%;
    height: 50px; /* Adjust the height to make it bold */
    background-color: #ccc;
    border-radius:25px; /* Make the track background invisible */
  }

  .lock-slider > .v-input__control {
    padding-left: 30px;
    padding-right: 30px;
  }
  
  .v-slider__track-background {
    background: transparent !important;
  }

   /* Ensure the thumb label is always visible */
  .v-slider__thumb-label-container {
    display: flex !important;
    align-items: center;
    justify-content: center;
  }

  /* position thumb label where the actual slider should be */
  .v-slider__thumb-label {
    position: relative !important;
    margin-top:10px;
  }
  
  .slider-thumb {
    /* background: yellow; */
    border-radius:16px;
    display: flex !important;
    align-items: center;
    justify-content: center;
    height: 32px;
    width: 32px;
  }
  </style>
  