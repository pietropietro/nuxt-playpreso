<template>
    <v-img v-if="imageSrc" :src="imageSrc" width="50" height="50" contain />
</template>
<script>
export default {
    props:{id: {type:String}},
    data(){
        return{
            imageSrc: null
        }
    },
    async mounted() {
        let response = await this.$api.getImage('/static/teams/' + this.id);
        if (response.status==200) {
            let blob = await response.blob();
            this.imageSrc = URL.createObjectURL(blob);
        }
    }
}
</script>