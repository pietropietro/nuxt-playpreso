<template>
    <flash-blue-print :flashPPRM="current">
        <template slot="row2">
            <h3 class="ocrastd red--text" v-if="current.match.live">live</h3>
        </template>
    </flash-blue-print>
</template>
<script>
export default{
    props:{
        current: {type: Object, required:true}
    },
}
</script>