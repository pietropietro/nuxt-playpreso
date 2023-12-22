<template>
    <v-row v-if="id && !!imageSrc" :align="align" justify="center">
    	<v-img :src="imageSrc" :width="size" :height="size" contain />
    </v-row>
	<v-row v-else justify="center" class="text-center ocrastd font-weight-bold">
		<h2>P</h2>
	</v-row>
</template>
<script>

export default {
	props: {
		id: { type: Number },
		size: {type: Number, default: 55},
		align: {type: String, default: 'start'}
	},
	data() {
		return {
			imageSrc: null,
		};
	},
	async mounted() {
		await this.getLogo();
	},
	methods:{
		async getLogo(){
			let response = await this.$api.getImage('/static/teams/' + this.id);
			if (response && response.status == 200) {
				let blob = await response.blob();
				this.imageSrc = URL.createObjectURL(blob);
			} 
		}
	},
	//needed when used in slot (i.e. wrapped slide team/league)
	watch: {
        async id (newId, oldId) {
           await this.getLogo();
        },
    },
};
</script>