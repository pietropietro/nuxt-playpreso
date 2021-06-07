<template>
    <v-container>
        <div class="mb-10" v-for="(group,index) in level.groups" :key="index">
            <h1 v-if="group.groupTag !== 'FINAL'" class="mb-5">{{group.groupTag}}</h1>
            <v-card class="white--text rounded-xl">
                <v-row v-for="(item,i) in group.users" :key="i" justify="space-between" :class="i < (group.users.length / 2) ? 'group-pass' : 'group-nopass'">
                    <h1>{{item.user.username}}</h1>
                    <h1>{{item.plPoints}}</h1>
                </v-row>
            </v-card>
        </div>
    </v-container>
</template>
<script>
export default {
    name: "PresoCupLevel",
    props:{
        level: {type: Object, required: true}
    }
}
</script>
