<template>
    <v-row>
        <v-col cols="12" class="mb-5" 
            v-for="(group,index) in levelGroups" :key="index"
        >
            <nuxt-link class="no-decoration"  
                :to="group.ppCup_id + '/' + group.id"
            >
                <p-p-cup-group-standings 
                    :group="group"
                    :cupFormat="cupFormat"
                />
            </nuxt-link>
        </v-col>
    </v-row>
</template>
<script>
export default {
    name: "CupLevelGroups",
    props:{
        levelGroups: {type: Array, required: true},
        cupFormat: {type: Array}
    },
}
</script>