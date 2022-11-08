<template>
    <v-menu offset-y v-if="currentUser">
        <template v-slot:activator="{ on }">
            <h4 v-on="on" class="pointer ocrastd">></h4>
        </template>
        <v-list role="menu" class="pb-0 text-center">
            <template >
                <v-list-item>
                        <v-list-item-title>
                            <!-- <nuxt-link class="no-decoration" :to="ROUTES.USER.DETAIL + currentUser.username"> -->
                                <h1>{{currentUser.username}}</h1>
                            <!-- </nuxt-link> -->
                        </v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-row no-gutters justify="end">
                        <v-col v-if="currentUser.admin" class="pr-2">
                            <nuxt-link :to="ADMIN_FEATURES.USERS.ROUTE" class="no-decoration">
                                <span class="ocrastd">ADMIN</span>
                            </nuxt-link>
                        </v-col>
                        <v-col class="px-4">
                            <p-p-info label="points" :value="currentPoints" small/>
                        </v-col>
                        <v-col><h5 class="text-caption">v{{VERSION}}</h5></v-col>
                    </v-row>
                </v-list-item>
                <!-- <v-list-item>
                    <v-list-item-title>
                            <h5 class="text-caption">v{{VERSION}}</h5>
                    </v-list-item-title>
                </v-list-item> -->
                <v-list-item class="pointer" style="background-color:var(--v-primary-base);" @click="$logout.logout()">
                    <v-btn block text>
                        <h3 class="ocrastd white--text">{{$t('app.logout')}}</h3>
                    </v-btn>
                </v-list-item>
            </template>
        </v-list>
    </v-menu>
</template>
<script>
export default {
    name: "UserMenu"
}
</script>