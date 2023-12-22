<template>
    <div class="police-car-container">
        <div class="police-car"  :style="carAnimationStyle">
        <div class="lightbar">
            <div class="light police-red"></div>
            <div class="light police-blue"></div>
        </div>
        <div class="car-body">
            <div class="car-top"></div>
        </div>
        <div class="police-wheels">
            <div class="police-wheel"></div>
            <div class="police-wheel"></div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
 props: {
    speed: {
      type: Number,
      default: 3 // Default speed if not provided
    },
    startDelay: {
      type: Number,
      default: 0 // Default delay if not provided
    }
  },
  computed: {
    carAnimationStyle() {
      return {
        animation: `drive ${this.speed}s linear infinite`,
        animationDelay: `${this.startDelay}s`
      };
    }
  }

}
</script>

<style>
.police-car-container {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.police-car {
  position: absolute;
  width: 200px; /* Adjusted for a better car shape */
  height: 80px; /* Adjusted for a better car shape */
  bottom: 10px;
}

@keyframes drive  { 
  from {
    right: -200px; /* Adjusted width */
  }
  to {
    right: 200%;
  }
}

.lightbar {
  width: 60px; /* Adjusted for visibility */
  height: 15px; /* Adjusted for visibility */
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}

.light {
  width: 50%;
  height: 100%;
  opacity: 0.7;
}

.police-red {
  background-color: red;
  animation: flashing 0.5s linear infinite;
}

.police-blue {
  background-color: blue;
  animation: flashing 0.5s linear infinite 0.25s; /* Adjusted timing for alternate flashing */
}

@keyframes flashing {
  50% {
    opacity: 0;
  }
}

.car-body {
  width: 100%;
  height: 25px;
  top:55%;
  background-color: #1a0033;
  position: relative;
  border-radius: 10px;
  z-index: 1;
}

.car-top {
  background-color: #1a0033;
  width: 70%;
  height: 20px;
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
}

.police-wheels {
  position: absolute;
  width: 100%;
  bottom: -15px;
  display: flex;
  justify-content: space-around;
}

.police-wheel {
  width: 30px;
  height: 30px;
  background-color: #6600cc;
  border-radius: 50%;
  z-index: 2;
}
</style>