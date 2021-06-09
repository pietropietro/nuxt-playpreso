<template>
    <loading-page v-if="!PCGroup"/>
    <v-container v-else>  
        <v-row justify="center">
            <h1>{{PCGroup.groupTag}}</h1>
        </v-row>
        <users-standings class="my-5 pa-2" :users="PCGroup.users"/>
        <get-round v-if="currentUser && (!PCGroup.matchBlocks || (PCGroup.matchBlocks[PCGroup.matchBlocks.length - 1].finished && PCGroup.rounds !== PCGroup.matchBlocks.length))" 
            :level="PCGroup.level" :groupId="PCGroup.id" class="my-5"
        />
        <match-blocks-slider class="pt-5" v-if="PCGroup.matchBlocks" 
            :matchBlocks="PCGroup.matchBlocks" :rounds="PCGroup.rounds" :users="PCGroup.users"
        />
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