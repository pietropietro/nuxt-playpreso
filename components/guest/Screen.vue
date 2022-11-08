<template>
    <v-container v-if="!currentUser" fluid fill-height  class="background pa-0 ">
		<v-row style="height:100%;" justify="center" no-gutters>
			<v-col align-self="center" class="pa-4 mx-6" style="max-width:500px;">
                <v-row  no-gutters justify="center" class="px-5" style="background: blue; width: inherit; border-radius: 25px 25px 0 0;">
                    <h1 class="white--text ocrastd">
                        PLAYPRESO
                    </h1>
                </v-row>
                <div class="pa-10" style="background: white; width: inherit; border-radius: 0 0 25px 25px ;">
                    <slot name="content" />
                </div>

            </v-col>
		</v-row>
	</v-container>
</template>
<script>
export default {
    name:"GuestScreen.vue",
    computed : {
        width:{
            get (){ return this.$vuetify.breakpoint.mobile ? '400px;' : '500px;'}
        }
    }
}
</script>
<style scoped>
	.background {
		background-image: url("assets/img/background.jpg");
        background-size: cover; 
	}
</style>
