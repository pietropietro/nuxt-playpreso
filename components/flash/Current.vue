<template>
    <p-p-r-m-blue-print :pprm="current">
    </p-p-r-m-blue-print>
</template>
<script>
export default{
    props:{
        current: {type: Object, required:true}
    },
}
</script>