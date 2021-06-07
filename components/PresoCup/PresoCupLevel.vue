<template>
    <v-container>
        <div class="mb-10" v-for="(group,index) in level.groups" :key="index">
            <h1 v-if="group.groupTag !== 'FINAL'" class="mb-5">{{group.groupTag}}</h1>
            <nuxt-link class="no-decoration" :to="group.presoCup_id + '/' + group.id">
                <users-standings :users="group.users"/>
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