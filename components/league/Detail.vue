<template>
    <div>
        <p-p-emoji :model="league?.country" />
        <span class="overline lh-1">{{league.tag}}</span>
    </div>
</template>
<script>
export default {
    props: {
        league: {type: Object, required: true},
    } 
}
</script>