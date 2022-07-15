<template>
    <v-container>
        <div class="mb-10" v-for="(group,index) in level" :key="index">
            <h1 v-if="group.groupTag !== 'FINAL'" class="mb-5">{{group.groupTag}}</h1>
            <nuxt-link class="no-decoration"  :to="group.ppCup_id + '/' + group.id">
                <cup-users-standings 
                    :userParticipations="group.userParticipations" 
                    :size="group.participants" 
                    :pointsToPassThird="pointsToPassThird" 
                    :level="group.level"
                />
            </nuxt-link>
        </div>
    </v-container>
</template>
<script>
export default {
    name: "PPCupLevel",
    props:{
        level: {type: Array, required: true},
        pointsToPassThird: {type: Number}
    },
}
</script>