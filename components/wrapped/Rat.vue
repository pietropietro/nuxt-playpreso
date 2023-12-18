<template>
  <div class="rat">
    <div class="head">
        <div class="eye"></div>
        <div class="ear"></div>
        <div class="teeth"></div>
    </div>
    <div class="body">
        <div class="mustache"></div>
        <div class="mustache-two"></div>
    </div>
    <div class="tail"></div>
</div>
</template>

<script>
export default {

}
</script>

<style>
.rat {
    position: relative;
    width: 60px; /* Scaled down width */
    height: 30px; /* Height to fit in the row */
}

.head {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 15px; /* Scaled down */
    height: 15px; /* Scaled down */
    border-radius: 50%;
    background-color: gray;
}

.eye {
    position: absolute;
    top: 4px;
    left: 10px;
    width: 3px; /* Scaled down */
    height: 3px; /* Scaled down */
    border-radius: 50%;
    background-color: white;
}

.ear {
    position: absolute;
    top: 0;
    left: 0;
    width: 9px; /* Scaled down */
    height: 9px; /* Scaled down */
    border-radius: 50%;
    background-color: pink;
}

.teeth {
    position: absolute;
    bottom: 1px;
    left: 7px;
    width: 3px; /* Scaled down */
    height: 3px; /* Scaled down */
    background-color: white;
}

.body {
    position: absolute;
    top: 10px;
    left: 20px;
    width: 30px; /* Scaled down */
    height: 15px; /* Scaled down */
    border-radius: 50%;
    background-color: gray;
}

.mustache {
    position: absolute;
    top: -6px;
    left: -30px;
    width: 20px; /* Adjusted */
    height: 1px; /* Scaled down */
    background-color: white;
    transform: rotate(10deg); 
}
.mustache-two {
    position: absolute;
    top: 2px;
    left: -30px;
    width: 18px; /* Adjusted */
    height: 1px; /* Scaled down */
    background-color: white;
    transform: rotate(-10deg); 

}

.tail {
    position: absolute;
    top: 15px;
    left: 50px;
    width: 30px; /* Scaled down */
    height: 2px; /* Scaled down */
    background-color: pink;
    transform-origin: left;
    animation: wagTail 1s ease-in-out infinite;
}

/* Adjusted keyframes for right to left movement */
@keyframes moveRat {
    0% { right: -100%; }
    100% { right: 100%; }
}

/* Tail wagging animation */
@keyframes wagTail {
    0%, 100% { transform: rotate(-10deg); }
    50% { transform: rotate(10deg); }
}

.rat-slow { animation: moveRat 12s linear infinite; }
.rat-medium { animation: moveRat 8s linear infinite; }
.rat-fast { animation: moveRat 4s linear infinite; }

</style>