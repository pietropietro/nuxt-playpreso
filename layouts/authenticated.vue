<template>
    <div class="outer-container">
        <div class="background-container"></div>
        <div class="app-rectangle-wrapper">
            <v-app class="no-selection">
                <guard-logged-in v-if="!currentUser"/>
                <template v-else>
                    <snackbar />
                    <p-p-app-bar :appBarStyle="appBarStyle" />
                    <p-p-menu :value="menuScreen" :setValue="(val)=>menuScreen=val" />
                    <v-main :style="$vuetify.breakpoint.smAndUp ?  
                        { marginTop: '64px'} : {}" 
                    >
                        <p-p-share-marquee />
                        <nuxt />
                    </v-main>
                </template>
            </v-app>
        </div>
    </div>
</template>
<script>

export default {
    mounted () {
        setTimeout(()=>this.$vuetify.theme.dark =  true );
    },
	data(){
		return{
			menuScreen: false
		}
	},
    computed: {
        appBarStyle() {
            if (this.$vuetify.breakpoint.smAndUp) {
                    const ppMobileWidth = 420; // Replace with the actual value or import it
                    const leftPosition = `calc((100vw - ${ppMobileWidth}px) / 2 )`;
                return {
                    borderRadius: '50px 50px 0 0', 
                    borderTop: '3px solid white', // Border on top
                    borderRight: '3px solid white', // Border on right
                    borderLeft: '3px solid white', // Border on left
                    borderBottom: 'none', // No border at the bottom
                    zIndex: 1000,
                    position: 'fixed',
                    width: `calc(${ppMobileWidth}px )`,
                    left: leftPosition
                };
            }
            return {};
        }
    }
}
</script>

<style lang="scss" scoped>

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
		min-height: 100vh; // Use min-height to ensure it covers at least the full viewport height
		z-index: -1; /* Ensure it stays behind the content */
		background-color: #00001a;
	}
	
    .app-rectangle-wrapper {
        position: relative; // Ensure this div is positioned relative
        overflow-x: hidden;
        overflow-y: auto;
        
        @media (min-width: 600px) {
            width: $pp-mobile-width;
            height: $pp-mobile-height;
            border-top:none; // Border on top
            border-right: 3px solid white; // Border on right
            border-left: 3px solid white; // Border on left
            border-bottom:  3px solid white; // No border at the bottom
            border-radius: 50px;
        }
    }


</style>
