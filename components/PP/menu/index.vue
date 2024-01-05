<template>
<v-overlay class="content-h100" :value="value" color="var(--v-background-base)" opacity="1" :dark="false">
    <p-p-header :menuScreen="value" :setMenu="setValue"/>
    <p-p-menu-brain class="pt-14 pt-md-16"/>
</v-overlay>
</template>

<script>
export default {
    props:{
        value: {type: Boolean},
        setValue: {type: Function}
    },
}
</script>

<style>
    .content-h100 .v-overlay__content{
		height: 100%;
		width:100%;
	}
</style>