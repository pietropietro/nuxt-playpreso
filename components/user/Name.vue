<template>
    <v-row no-gutters 
        class="flex-nowrap" 
        :justify="center ? 'center' : 'start'" 
        align="center"
        v-if="user"
    >
            <v-col cols="auto" :class="current ? 'currentuser': ''">
                <nuxt-link :to="ROUTES.USER.DETAIL + user.username" class="no-decoration">
                    <h1 v-if="!small">
                        {{user.username}}
                    </h1>
                    <h3 v-else>{{user.username}}</h3>
                </nuxt-link>
            </v-col>
            <v-col cols="auto" v-if="user.trophies?.length">
                <v-row no-gutters align="center">
                    <template v-if="user.trophies.length > 9">
                        <em-emoji id="star" class="ml-1 mt-1"/>
                    </template>
                    <!-- <template>
                        <v-chip class="ml-1" 
                            label x-small  color="primary" 
                        >
                            <span class="overline lh-1 font-weight-bold">
                                {{user.trophies.length}}
                            </span>
                        </v-chip>
                    </template> -->
                </v-row>
            </v-col>
    </v-row>
    
</template>
<script>
export default {
    props:{
        user:   {type:Object},
        current: {type: Boolean},
        center: {type: Boolean},
        small:  {type: Boolean, default: false}
    },
}
</script>