<template>
    <div>
		<div>
			<v-row v-if="id && !!imageSrc" :align="align" justify="center">
				<v-img :src="imageSrc" :width="size" :height="size" contain />
			</v-row>
				<v-row v-else justify="center" class="text-center ocrastd font-weight-bold">
					<span 
						:style="{
							fontSize: Math.round((size / 3) * 2).toString() + 'px'
						}
					">
						P
					</span>
				</v-row>
		</div>
		<div v-if="country"
			class="text-center"
		>
			<emoji-flag 
				:size="Math.round(size / 2).toString()"
				:style="{
					position: 'absolute',
					marginTop: '-' + size / 4 + 'px'
				}"
				:model="country" 
			/>
		</div>
	</div>
</template>
<script>

export default {
	props: {
		id: { type: Number },
		size: {type: String, default: '55'},
		align: {type: String, default: 'start'},
		country: {
			type: String
		},
		onClick: {type:Function}
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
			this.imageSrc = null;
           	await this.getLogo();
        },
    },
};
</script>