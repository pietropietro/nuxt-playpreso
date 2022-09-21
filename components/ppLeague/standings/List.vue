<template >
    <div>
        <v-row no-gutters>
            <v-col cols="12" v-if="showAll">
                <user-participation-standing-labels />
            </v-col>
            <v-col cols="12" md="6" v-for="(up, index) in ups" :key="up.id">
                <div :class="!$vuetify.breakpoint.mdAndUp ? '' : index % 2 ? 'pl-5' : 'pr-5'">
                    <user-participation-standing-item 
                        v-if="ups.length < firstSize"
                        :up="ups[index]"
                    />
                    <user-participation-standing-item 
                        v-else-if="!showAll && index===firstSize-1 && makeRoomForCurrentUser"
                        :up="ups.filter((e)=>e.user_id === currentUser.id)[0]"
                    />
                    <user-participation-standing-item
                        v-else-if="showAll || Array.from(Array(firstSize).keys()).includes(index)"
                        :up="$vuetify.breakpoint.mdAndUp ? ups[desktopActualIndex(index)] : ups[index]"
                        :showDetails="showAll"
                    />
                </div>
            </v-col>
        </v-row>
        <v-row v-if="ups.length > firstSize" no-gutters class="pt-10" justify="center" @click="()=>showAll = !showAll">
            <div class="text-overline">{{showAll ? 'SHOW LESS' : 'SHOW ALL'}}</div>
        </v-row>
    </div>
</template>
<script>
export default {
    props: {
        ups: {type: Array}
    },
    data(){
        return{
            showAll: false
        }
    },
    computed:{
        firstSize(){
            return this.$vuetify.breakpoint.mdAndUp ? 10 : 5
        },
        makeRoomForCurrentUser(){
            let currentUsrPosition = null;
            return this.ups.filter((e, i) => { 
                if(e.user_id === this.currentUser.id){
                    currentUsrPosition = e.position ?? i;
                    return true;
                } 
            }).length > 0 && currentUsrPosition > this.firstSize;
        },
    },
    methods:{
        desktopActualIndex(index){
            let baseVal = this.showAll ? 10 : 5;
            return (index % 2 === 0) ? index / 2 : baseVal + Math.floor(index/ 2);
        },
    }
}
</script>
