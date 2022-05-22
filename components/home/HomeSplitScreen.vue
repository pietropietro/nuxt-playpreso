<template>
    <v-row justify="center" style="height:100%" no-gutters>
            <v-col cols="12" md="6">
                    <nuxt-link :to="ROUTES.PPLEAGUES" class="no-decoration"> 
                            <v-card tile elevation="0" height="100%">
                                    <v-container fill-height>
                                            <v-row justify="center" align="center">
                                                    <div class="text-h2 text-md-h1 primary--text">{{$t('app.ppLeagues')}}</div>
                                            </v-row>
                                    </v-container>
                            </v-card>
                    </nuxt-link>
            </v-col>
            <v-col cols="12" md="6">
                    <nuxt-link :to="ROUTES.PPCUPS"> 
                            <v-card color="primary" tile elevation="0" height="100%"> 
                                    <v-container fill-height>
                                            <v-row justify="center" align="center">
                                                    <div class="text-h2 text-md-h1 white--text">{{$t('app.ppCups')}}</div>
                                            </v-row>
                                    </v-container>
                            </v-card>
                    </nuxt-link>
            </v-col>
    </v-row>
</template>