<template>
    <v-container v-if="!currentUser" fluid fill-height  class="background-cover pa-0 ">
		<v-row style="height:100%;" justify="center" no-gutters>
			<v-col align-self="center" class="pa-4 mx-6" style="max-width:500px;">
                <v-row  no-gutters justify="center" class="px-5" style="background: var(--v-primary-darken2); width: inherit; border-radius: 25px 25px 0 0;">
                    <h1 class="ocrastd pt-4" style="line-height:1em; font-size:2 em">
                        <span class="tilted-span">P</span><!--
                        --><span class="tilted-span">L</span><!--
                        --><span class="tilted-span">A</span><!--
                        --><span class="tilted-span">Y</span><!--
                        --><span class="tilted-span">P</span><!--
                        --><span class="tilted-span">R</span><!--
                        --><span class="tilted-span">E</span><!--
                        --><span class="tilted-span">S</span><!--
                        --><span class="tilted-span">O</span>
                    </h1>
                </v-row>
                <div class="white--text px-10 pb-10 pt-6" style="background: var(--v-primary-darken2); width: inherit; border-radius: 0 0 25px 25px ;">
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
html, body {
  overflow: hidden;
  height: 100%; /* Ensure the body takes up full height */
  position: fixed;
  width: 100%;
}
</style>

