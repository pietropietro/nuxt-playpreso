<template>
    <div v-if="league">
        
        <p-p-emoji flag :model="league?.country" 
            :class="sizeClass ?? ''"
        />
        <span class="overline lh-1">{{league.tag}}</span>
    </div>
</template>
<script>
export default {
    props: {
        league: {type: Object, required: true},
        sizeClass: {type: String}
    } 
}
</script>