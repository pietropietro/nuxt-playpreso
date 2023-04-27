<template>
    <v-row v-if="id && imageSrc" :align="align" justify="center">
    	<v-img :src="imageSrc" :width="size" :height="size" contain />
    </v-row>
	<v-row v-else justify="center">
		<v-col
			class="text-center ocrastd font-weight-bold" 
			:style="{fontSize:size/1.2 + 'px', lineHeight:'0.5em'}"
		>
			P
		</v-col>
	</v-row>
</template>
<script>
import ColorThief from 'colorthief';

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
		let response = await this.$api.getImage('/static/teams/' + this.id);
		if (response.status == 200) {
			let blob = await response.blob();
			this.imageSrc = URL.createObjectURL(blob);
		}
	},
};
</script>