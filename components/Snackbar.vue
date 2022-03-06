<template>
	<v-snackbar top v-model="show" :color="color">
		<v-btn text @click="show = false">{{ message }}</v-btn>
	</v-snackbar>
</template>

<script>
export default {
    name: "Snackbar",
	data() {
		return {
			show: false,
			message: '',
			color: ''
		}
	},

	created() {
		this.$store.subscribe((mutation, state) => {
			if (mutation.type === 'snackbar/showMessage') {
				this.message = state.snackbar.content;
				this.color = state.snackbar.color
				this.show = true
			}
		});
	}
}
</script>
