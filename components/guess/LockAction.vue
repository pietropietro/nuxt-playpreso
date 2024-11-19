<template>
	<!-- <div class="lock-slider-wrapper" style="width:100%"> -->

	<v-slider 
		v-if="!disabled"
		v-model="sliderValue" 
		:max="100" :min="0" step="1" 
		hide-details color="transparent" 
		class="lock-slider"
		@change="onSlideEnd" thumb-label 
		@click.stop="preventClick" @mousedown.stop="preventClick" 
	>
		<template v-slot:thumb-label="{ value }">
			<div class="slider-thumb-container">
				<div class="slider-thumb">
					<em-emoji :native="sliderValue < lockThreshold ? '🔓' : '🔒'" size="3rem" />
				</div>
			</div>
		</template>
	</v-slider>
	<loading-page v-else-if="loading" :size="30" />
	<em-emoji v-else-if="!error" native="🔒" size="3rem" />
	<em-emoji v-else native="🐛" size="3rem" />
	<!-- </div> -->
</template>
  
  
<script>
export default {
	props:{
		score: {type: Array},
		guess_id: {type: Number},
		afterLock: {type: Function},
		disabled: {type: Boolean},
		setDisabled: {type: Function}
	},
	data() {
		return {
			lockThreshold: 75,
			sliderValue: 0,
			loading: false,
			error: false
		};
	},
	watch: {
        guess_id(newval,oldval) {
			this.error = this.loading = false;
			this.setDisabled(false);
			this.sliderValue=0;
        }
    },
	methods: {
		onSlideEnd(value) {
			if (value > this.lockThreshold) {
				this.lock();
				this.setDisabled(true);
				return;
			}
			this.sliderValue = 0;
		},
		lock() {
			this.loading = true;
			//i.e. if actual slide action has occurred
			setTimeout(async() => {
				await this.doLockHttpRequest();
				this.loading = false;
			}, 100)
		},
		preventClick(event) {
			if (this.disabled) return;
			this.sliderValue = 0;
		},

		async doLockHttpRequest() {
			await this.triggerHapticFeedback();

			//NOTIFICATION REQUEST
			let notificationToken = this.$store.state.notification.pushToken;
            console.log('notification token from store is ', notificationToken);
            if (!notificationToken){
				console.log('let s set it up');
				await this.$pushNotificationsPlugin.requestPushNotifications();
			}

			let home = this.score[0];
			let away = this.score[1];

			let values = {
				"home": home,
				"away": away
			}

			let route = (this.guess_id && this.guess_id != 'dummy') ? this.API_ROUTES.GUESS.LOCK + this.guess_id : this.API_ROUTES.MOTD.LOCK;
			let response = await this.$api.call(
				route, values, 'POST'
			);
			if(response.code == 200){
				this.afterLock();
				return;
			}
			this.error=true;
		},
	}
};
</script>
  
  
<style>
.lock-slider {
	width: 95%;
	height: 58px;
	/* Adjust the height to make it bold */
	/* background-color: var(--v-primary-darken1); */
	background-color: 'transparent';
	border-radius: 12px;
	/* Make the track background invisible */
}

.lock-slider>.v-input__control {
	padding-left: 10px;
	padding-right: 30px;
}

/* .theme--dark.v-slider .v-slider__track-fill */

.v-slider__track-background {
	background: transparent !important;
}

/* Ensure the thumb label is always visible */
.v-slider__thumb-label-container {
	display: flex !important;
	align-items: center;
	justify-content: center;
	transition: none !important;
	/* Disable the transition effect */
}

/* position thumb label where the actual slider should be */
.v-slider__thumb-label {
	position: relative !important;
	margin-top: 10px;
	transition: none !important;
	/* Disable the transition effect */
}

.slider-thumb {
	/* background: yellow; */
	border-radius: 16px;
	display: flex !important;
	align-items: center;
	justify-content: center;
	height: 32px;
	width: 32px;
}



.lock-slider::before {
	content: '>>';
	position: absolute;
	top: 42%;
	transform: translateY(-50%);
	font-family: 'OCR_A_Std';
	font-size: 1.5rem;
	font-weight: 900;
	z-index: 0;
	color: var(--arrow-color);
	/* Arrow color using CSS variable */
	left: 73%;
	/* Adjust to position both arrows */
}
</style>
  