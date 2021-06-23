<template>
    <loading-page v-if="!PCGroup"/>
    <div v-else style="height:100%">
        <v-container v-if="selectedPage === 1" class="mb-7">
            <v-row justify="center">
                <h1>{{PCGroup.groupTag}}</h1>
            </v-row>
            <users-standings class="my-5 pa-2" :users="PCGroup.users"/>
            <get-round
                v-if="canGetRound" :round="PCGroup.matchBlocks.length + 1"
                :groupId="PCGroup.id" class="my-7" :refresh="refresh"
            />
            <match-blocks-slider class="pt-5" v-if="PCGroup.matchBlocks"
                :matchBlocks="PCGroup.matchBlocks" :rounds="PCGroup.rounds" :users="PCGroup.users"
            />
        </v-container>
        <lock-guess v-else :guess="selectedGuess" :match="selectedMBI.match" :refresh="refresh" class="mb-7"/>
        <v-pagination
            v-if="userInGroup"
            v-model="selectedPage"
            :length="!PCGroup.matchBlocks ? 1 : 1 + lastMatchBlock.matchBlockItems.length"
            circle
            class="pagination-fixed no-arrows"
        />
    </div>
</template>
<script>
export default {
    data(){
        return {
            groupId: this.$route.params.groupId,
            PCGroup: null,
            selectedPage: 1,
        }
    },
    computed:{
        userInGroup(){
            if(!this.currentUser || !this.PCGroup.users)return false;
            return this.PCGroup.users.filter(u => {
                return u.user.user_id === this.currentUser.user_id;
            }).length > 0;
        },
        lastMatchBlock(){
            return this.PCGroup.matchBlocks[this.PCGroup.matchBlocks.length - 1];
        },
        lastMatchBlockFinished(){
            return this.lastMatchBlock.matchBlockItems.filter(mbi => mbi.match.score_away === 222).length === 0;
        },
        selectedMBI(){
            return this.lastMatchBlock.matchBlockItems[this.selectedPage -2]
        },
        selectedGuess(){
            return this.selectedMBI.guesses.filter(g => g.user_id === this.currentUser.user_id)[0];
        },
        canGetRound(){
            return this.userInGroup && this.groupFull && (!this.PCGroup.matchBlocks || (this.lastMatchBlockFinished && this.PCGroup.rounds !== this.PCGroup.matchBlocks.length));
        },
        groupFull(){
            return this.PCGroup.size === this.PCGroup.users.length;
        }
    },
    async mounted(){
        await this.getPCGroup();
    },
    methods:{
        async getPCGroup(){
            let values = [
                {'action' : "getPresoCupGroup"},
                {'PCGroup_id': this.groupId},
            ]
            this.PCGroup = await this.$api.call(values);
        },
        async refresh(){
            this.PCGroup = null;
            await this.getPCGroup();
        }
    }
}
</script>
<style>
    .no-arrows .v-pagination__navigation{
        display: none !important;
    }
</style>