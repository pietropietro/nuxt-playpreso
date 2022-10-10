<template>
    <v-menu offset-y v-if="currentUser">
        <template v-slot:activator="{ on }">
            <h1 v-on="on" class="pointer ocrastd">></h1>
        </template>
        <v-list role="menu" class="pb-0 text-right">
            <template >
                <v-list-item>
                        <v-list-item-title>
                            <nuxt-link class="no-decoration" :to="ROUTES.USER.DETAIL + currentUser.username">
                                <h1>{{currentUser.username}}</h1>
                            </nuxt-link>
                        </v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-row no-gutters justify="space-between">
                        <nuxt-link v-if="currentUser.admin" :to="ADMIN_FEATURES.USERS.ROUTE" class="no-decoration">
                            <span class="ocrastd">ADMIN</span>
                        </nuxt-link>
                        <p-p-info label="points" :value="currentPoints" small/>
                    </v-row>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>
                            <h5 class="text-caption">v{{VERSION}}</h5>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item class="pointer" style="background-color:blue;" @click="$logout.logout()">
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