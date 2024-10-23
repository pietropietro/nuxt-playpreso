<template>
    <v-toolbar-title>
        <nuxt-link to="/">
            <h1 
                :class="[
                    'ocrastd',
                    $config.DEBUG ? 'orange--text' : '',
                ]"
                style="line-height:1em; font-size:2 em"                    
            >

                <span :class="['tilted-span', (loading ? 'loading' : '')]" style="--index: 0">P</span><!--
            --><span :class="['tilted-span', (loading ? 'loading' : '')]" style="--index: 1">L</span><!--
            --><span :class="['tilted-span', (loading ? 'loading' : '')]" style="--index: 2">A</span><!--
            --><span :class="['tilted-span', (loading ? 'loading' : '')]" style="--index: 3">Y</span><!--
            --><span :class="['tilted-span', (loading ? 'loading' : '')]" style="--index: 4">P</span><!--
            --><span :class="['tilted-span', (loading ? 'loading' : '')]" style="--index: 5">R</span><!--
            --><span :class="['tilted-span', (loading ? 'loading' : '')]" style="--index: 6">E</span><!--
            --><span :class="['tilted-span', (loading ? 'loading' : '')]" style="--index: 7">S</span><!--
            --><span :class="['tilted-span', (loading ? 'loading' : '')]" style="--index: 8">O</span>
            </h1>
        </nuxt-link>
    </v-toolbar-title>
</template>

<script>
export default {
    computed:{
        loading(){
            return this.$store.getters['homepageApi/isLoading'] || !this.currentUser;
        }
    },
}
</script>

<style css scoped>

@keyframes shimmer {
  0%, 35% {
    color: rgba(255, 255, 255, 0.12);
    transform: rotate(10deg); /* Brighter phase */
  }
  50% {
    color: rgba(255, 255, 255, 0.30);
    transform: rotate(30deg); /* Brighter phase */
  }
  75%, 100% {
    color: rgba(255, 255, 255, 0.12);
    transform: rotate(10deg); /* Brighter phase */
  }
}

.loading{
  animation: shimmer 1.5s infinite;
  animation-delay: calc(var(--index) * 0.1667s);
  color: transparent; /* Start with the text fully transparent */
  font-weight: bold; /* Ensure the text remains bold */
}

</style>
