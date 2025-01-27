<template>
    <p-p-r-m-blue-print :pprm="verifiedFlash" verified>
        <template slot="row2">
        </template>
    </p-p-r-m-blue-print>
</template>
<script>
export default{
    props:{
        verifiedFlash: {type: Object, required:true}
    },
}
</script>