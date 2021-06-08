<template>
    <loading-page v-if="!PCGroup"/>
    <v-container v-else>  
        <v-row justify="center">
            <h1>{{PCGroup.groupTag}}</h1>
        </v-row>
        <users-standings class="my-5 pa-2" :users="PCGroup.users"/>
        <match-blocks-slider class="pt-5" v-if="PCGroup.matchBlocks" :matchBlocks="PCGroup.matchBlocks" :rounds="PCGroup.rounds" :users="PCGroup.users"/>
        <!-- TODO ELSE get ROUND 1 -->
    </v-container>
</template>
<script>
export default {
    data(){
        return {
            groupId: this.$route.params.groupId,
            PCGroup: null
        }
    },
    async mounted(){
        let values = [
            {'action' : "getPresoCupGroup"},
            {'PCGroup_id': this.groupId},
        ]
        this.PCGroup = await this.$api.call(values);
    }
}
</script>