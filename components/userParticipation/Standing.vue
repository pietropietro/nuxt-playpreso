<template>
    <v-row no-gutters justify="space-between" align="center">
        <template v-if="up">
                <v-col>
                    <h1 v-if="up.user_id === currentUser.id"
                        class="currentuser"
                    >
                        {{up.username}}
                    </h1>
                    <nuxt-link class="no-decoration" :to="ROUTES.USER.DETAIL + up.username" v-else>
                        <h1 :class="whiteText ? 'white--text' : 'black--text'">{{up.username}}</h1>
                    </nuxt-link>
                </v-col>
                <v-col class="text-right mr-2" >
                    <v-row justify="end" align="end">
                        <h1>{{up.score}}</h1>
                        <div v-if="up.score_total != up.score" 
                            class="caption ml-2 mb-2">
                            {{up.score_total}}
                        </div>
                    </v-row>
                </v-col>
        </template>
        <h1 v-else>?</h1>
    </v-row>
</template>
<script>
export default {
    props:{
        up: {type: Object},
        whiteText: {type: Boolean}
    }
}
</script>
