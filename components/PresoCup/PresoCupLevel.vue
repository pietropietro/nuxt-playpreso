<template>
    <v-container>
        <div class="mb-10" v-for="(group,index) in level.groups" :key="index">
            <h1 v-if="group.groupTag !== 'FINAL'" class="mb-5">{{group.groupTag}}</h1>
            <nuxt-link class="no-decoration" :to="group.presoCup_id + '/' + group.id">
                <v-card class="white--text rounded-xl">
                    <v-row v-for="(item,i) in group.users" :key="i" justify="space-between" 
                        :class="i < (group.users.length / 2) ? 'group-pass' : 'group-nopass'"
                    >
                        <h1 :class="currentUser && currentUser.user_id === item.user.user_id ? 'accent--text' : ''">{{item.user.username}}</h1>
                        <h1 :class="currentUser && currentUser.user_id === item.user.user_id ? 'accent--text' : ''">{{item.plPoints}}</h1>
                    </v-row>
                </v-card>
            </nuxt-link>
        </div>
    </v-container>
</template>
<script>
export default {
    name: "PresoCupLevel",
    props:{
        level: {type: Object, required: true},
    }
}
</script>