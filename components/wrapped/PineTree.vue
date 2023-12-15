<template>
    <div class="pine-tree">
        <div class="layer"></div>
        <div class="layer"></div>
        <div class="layer"></div>
        <div class="trunk"></div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.pine-tree {
    position: relative;
    display: inline-block;
}

.layer {
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 40px solid green;
    position: relative;
    top: -30px;
}

.layer::after, .layer::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 40px solid green;
}

.layer::before {
    top: -20px;
    left: -20px;
}

.layer::after {
    top: -20px;
    right: -20px;
}

.trunk {
    width: 20px;
    height: 40px;
    background-color: brown;
    position: relative;
    top: -30px;
    left: 10px; /* Adjust based on the size of the layers */
}
</style>