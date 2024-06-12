<template>
    <v-row v-if="$route.path !== '/' && navigationTitle"
        no-gutters align="center"
    >
        <div class="mx-4" @click="$router.go(-1)">
            <h2><</h2>
        </div>
        <v-spacer/>
        <v-toolbar-title class="ml-n4">
            <!-- <div class="overline lh-1">{{ navigationOverline }}</div> -->
            <h2 class="ocrastd">{{ navigationTitle }}</h2>
        </v-toolbar-title>
        <v-spacer/>
    </v-row>

    <!-- if not loaded don't show -->
    <v-row v-else-if="$route.path !== '/'"></v-row>
    
    <!-- if no vuex title -->
    <v-row v-else >
        <v-spacer/>
            <v-toolbar-title>
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
            </v-toolbar-title>
        <v-spacer/>
    </v-row>
</template>

<style scoped>
    .tilted-span {
      display: inline-block;
      transform: rotate(10deg);
    }
</style>>

