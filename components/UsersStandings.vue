<template>
    <v-card :flat="flat" :class="flat ? 'white--text' : 'white--text rounded-xl'">
        <v-row v-for="(item,i) in users" :key="i" justify="space-between" 
            :class="i < (users.length / 2) ? 'group-pass' : 'group-nopass'"
        >
            <h1 :class="currentUser && currentUser.user_id === item.user.user_id ? 'accent--text' : ''">{{item.user.username}}</h1>
            <h1 :class="currentUser && currentUser.user_id === item.user.user_id ? 'accent--text' : ''">{{item.plPoints}}</h1>
        </v-row>
    </v-card>
</template>
<script>
export default {
    name: "UsersStandings",
    props: {
        users: {type: Array, required: true},
        flat: {type: Boolean}
    }
}
</script>