<template>
	<client-only>
		<v-app class="no-selection" >
			<guard-logged-in v-if="!currentUser"/>
			<template v-else>
				<snackbar />
				<!-- <p-p-header v-if="!menuScreen" :menuScreen="menuScreen" :setMenu="(val)=>menuScreen=val"/>   -->
				<!-- <v-overlay class="content-h100" :value="menuScreen" color="var(--v-background-base)" opacity="1" :dark="false">
					<p-p-header :menuScreen="menuScreen" :setMenu="(val)=>menuScreen=val"/>  
					<p-p-menu-brain class="pt-14 pt-md-16"/>
				</v-overlay> -->
				<v-main >
					<!-- <v-row no-gutters align="center" style="width:100%" class="marquee">
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
					</v-row> -->
					<nuxt />
				</v-main>
			</template>
		</v-app>
	</client-only>
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
<style>
	.content-h100 .v-overlay__content{
		height: 100%;
		width:100%;
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