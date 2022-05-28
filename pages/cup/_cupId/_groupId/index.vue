<template>
    <loading-page v-if="!PCGroup"/>
    <p-p-tournament-pagination v-else/>
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
                {'action' : "getPPCupGroup"},
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