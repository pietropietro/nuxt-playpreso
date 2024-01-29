<template>
  <v-toolbar-title>
    <template v-if="$route.path !== '/' && navigationTitle && navigationOverline">
        <div class="overline lh-1">{{ navigationOverline }}</div>
        <h1 class="mt-n4 mb-n2">{{ navigationTitle }}</h1>
    </template>

    <!-- if not loaded don't show -->
    <template v-else-if="$route.path !== '/'"></template>
    
    <!-- if no vuex title -->
    <template v-else>
        <nuxt-link class="no-decoration" to="/">
            <h1 class="ocrastd" style="line-height:1em; font-size:2 em">
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
        </nuxt-link>
    </template>
</v-toolbar-title>
</template>

<script>
export default {
   
}
</script>

<style scoped>
    .tilted-span {
      display: inline-block;
      transform: rotate(10deg);
    }
</style>>

