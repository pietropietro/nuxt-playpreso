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
        @click.stop="preventClick"
        @mousedown.stop="preventClick"
        :disabled="disabled"
      >
        <template v-slot:thumb-label="{ value }">
          <div class="slider-thumb-container">
            <div class="slider-thumb">
                <em-emoji 
                    :native="sliderValue < lockThreshold ? '🔓' : '🔒'" 
                    size="3.5rem"
                />
            </div>
          </div>
        </template>
      </v-slider>
  </template>
  
  
  <script>
  export default {
    data() {
      return {
        lockThreshold: 75,
        sliderValue: 0,
        disabled: false
      };
    },
    methods: {
      onSlideEnd(value) {
        if (value > this.lockThreshold) {
          this.lock();
          return;
        }
        this.sliderValue=0;
      },
      lock() {
        setTimeout(()=>{
          // lock function here
          //i.e. if actual slide action has occurred
        }, 100)
      },
      preventClick(event) {
        this.sliderValue=0;
      },
    }
  };
  </script>
  
  
  <style>

  .lock-slider {
    width: 95%;
    height: 58px; /* Adjust the height to make it bold */
    /* background-color: var(--v-primary-darken1); */
    background-color: 'transparent';
    border-radius:12px; /* Make the track background invisible */
  }

  .lock-slider > .v-input__control {
    padding-left: 10px;
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
    transition: none !important; /* Disable the transition effect */
  }

  /* position thumb label where the actual slider should be */
  .v-slider__thumb-label {
    position: relative !important;
    margin-top:10px;
    transition: none !important; /* Disable the transition effect */
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
  