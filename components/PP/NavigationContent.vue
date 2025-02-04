<template>
    <v-row v-if="$route.path !== '/' && navigationTitle"
        no-gutters align="center"
    >
        <div class="mx-4" @click="handleGoBack">
            <h2 class="ocrastd"><</h2>
        </div>
        <v-spacer/>
        <v-toolbar-title class="ml-n4">
            <!-- <div class="overline lh-1">{{ navigationOverline }}</div> -->
            <h2 class="ocrastd">{{ navigationTitle }}</h2>
        </v-toolbar-title>
        <v-spacer/>
    </v-row>
    
    <!-- homepage -->
    <v-row v-else align="center" no-gutters style="height:100%; width:100%">
        <template v-if="$store.getters['homepageApi/isLoading']">
            <v-col></v-col>
            <v-col>
                <v-toolbar-title>
                    <nuxt-link to="/">
                        <p-p-logo />
                    </nuxt-link>
                </v-toolbar-title>
            </v-col>
            <v-col />
        </template>
        <template v-else>
            <template v-if="!$store.getters['toolbarInfo/getDict'].unreadNotificationCount">
                <v-col cols="2" class="text-center">
                    <h1 class="ocrastd tilted-span"
                        @click="$store.dispatch('menu/updateMenu', { newVal: true });"
                    >
                        P
                    </h1>
                </v-col>
                <v-col cols="10">
                    <p-p-toolbar-info />
                </v-col>
            </template>

            <template v-else>
                <v-col cols="2" class="text-center">
                    <!-- <v-chip
                            disabled
                            :color="'red darken-2'"
                            class="o-100"
                        > -->
                        <h2 class="red--text">{{$store.getters['toolbarInfo/getDict'].unreadNotificationCount}}</h2>
                    <!-- </v-chip> -->
                </v-col>

                <v-col cols="10">
                    <p-p-toolbar-notifications />
                </v-col>
            </template>
        </template>
    </v-row>

</template>
<script>
export default {
    methods:{
        handleGoBack() {
            const referer = document.referrer;
            const isInternal = referer.includes(window.location.origin);

            if (isInternal) {
                this.$router.go(-1); // Go back if the referer was internal
            } else {
                this.$router.push('/'); // Go to homepage if there's no internal history
            }
        }
    },
   
}
</script>
