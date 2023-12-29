<template>
<div class="outer-container">
	<div class="background-container"></div>
	<div class="layout-wrapper">
		<client-only>
			<v-app class="no-selection authenticated-layout" >
				<guard-logged-in v-if="!currentUser"/>
				<template v-else>
					<snackbar />
					<div class="app-bar-container">
						<p-p-header  v-if="!menuScreen" :menuScreen="menuScreen" :setMenu="(val)=>menuScreen=val"/>
					</div>
					<v-overlay class="content-h100" :value="menuScreen" color="var(--v-background-base)" opacity="1" :dark="false">
						<p-p-header :menuScreen="menuScreen" :setMenu="(val)=>menuScreen=val"/>
						<p-p-menu-brain class="pt-14 pt-md-16"/>
					</v-overlay>
					<v-main :style="menuScreen ? 'position: fixed' : ''" >
						<v-row no-gutters align="center" style="width:100%" class="marquee">
							<span
								:style="$vuetify.breakpoint.mdAndUp ? 'animation-duration: 10s;' : 'animation-duration: 7s;'"
								class="font-weight-bold ocrastd"
							>
								<share-network
									class="no-decoration mx-0 px-0"
									network="whatsapp"
									url="https://playpreso.com"
									:title="'JOIN ' + currentUser.username.toUpperCase() + ' ON PLAYPRESO'"
									hashtags="playpreso"
								>
									<b>tell a friend</b>
								</share-network>
							</span>
						</v-row>
						<nuxt />
					</v-main>
				</template>
			</v-app>
		</client-only>
	</div>
</div>
</template>
<script>

export default {
    mounted () {
        // setTimeout(()=>this.$vuetify.theme.dark = this.$store.state.user.darkMode ? true : false);
        setTimeout(()=>this.$vuetify.theme.dark =  true );
    },
	data(){
		return{
			menuScreen: false
		}
	}
}
</script>
<style lang="scss">
	.content-h100 .v-overlay__content{
		height: 100%;
		width:100%;
	}

	.outer-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh; /* Full height of the viewport */
		position: relative; /* Ensures proper stacking context */
	}

	.background-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -1; /* Ensure it stays behind the content */

		background-color: #00001a;/* Your desired background color */
		/* OR for a background image: */
		// background-image: url('path/to/your/image.jpg');
		// background-size: cover;
		// background-position: center;
	}

	.layout-wrapper {
		/* Your existing styles */
		position: relative; /* Make sure this is positioned above the background */
		z-index: 1;
	}

    @media (min-width: 768px) {
        .authenticated-layout {
            width: $pp-mobile-width;
            height: $pp-mobile-height; /* Fixed height */
            margin: 0 auto;
            position: relative;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional shadow */
            overflow: auto; /* Allow scrolling */
        }

        .authenticated-layout .app-bar-container {
            position: fixed; /* Fixed position at the top */
            top: calc(100vh - $pp-mobile-height);
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            max-width: $pp-mobile-width; /* Same width as authenticated-layout */
            z-index: 1000; /* Ensure it's above other content */
        }

        .authenticated-layout .app-bar-container .v-app-bar {
            width: 100%;
        }
    }
  
    .marquee {
    margin: 0 auto;
    white-space: nowrap;
    overflow: hidden;
    /* position: absolute; */
    }

    .marquee span {
        display: inline-block;
        padding-left: 100%;
        animation: marquee linear infinite;
    }


    @keyframes marquee {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(-100%, 0);
    }
    }
</style>