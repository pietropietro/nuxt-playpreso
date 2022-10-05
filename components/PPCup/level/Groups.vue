<template>
    <v-row>
        <v-col cols="12" md="6" class="mb-5" v-for="(group,index) in level" :key="index">
            <h1 v-if="group.groupTag !== 'FINAL'" class="mb-5">{{group.groupTag}}</h1>
            <nuxt-link class="no-decoration"  :to="group.ppCup_id + '/' + group.id">
                <p-p-cup-group-standings 
                    :userParticipations="group.userParticipations" 
                    :participants="group.participants" 
                    :pointsToPassThird="pointsToPassThird" 
                />
            </nuxt-link>
        </v-col>
    </v-row>
</template>
<script>
export default {
    name: "CupLevelGroups",
    props:{
        level: {type: Array, required: true},
        pointsToPassThird: {type: Number}
    },
}
</script>