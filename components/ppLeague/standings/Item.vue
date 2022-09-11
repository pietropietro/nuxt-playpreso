<template>
    <v-row v-if="!showAll && index===(firstSize-(1+(firstSize/5))) && makeRoomForCurrentUser" no-gutters >
        <h1>...</h1>
    </v-row>
    <user-participation-standing v-else-if="!showAll && index===(firstSize-1) && makeRoomForCurrentUser" 
        :up="ups.filter((e)=>e.user_id === currentUser.id)[0]" 
    />
    <user-participation-standing 
        v-else-if="showAll || Array.from(Array(firstSize).keys()).includes(index)"
        :up="desktop ? ups[desktopActualIndex(index)] : ups[index]"  
    />
</template>
<script>
export default {
    props:{
        ups:{type: Array},
        index: {type: Number},
        showAll: {type: Boolean},
        desktop: {type: Boolean}
    },
    computed:{
        makeRoomForCurrentUser(){
            let currentUsrPosition = null;
            return this.ups.filter((e, i) => { 
                if(e.user_id === this.currentUser.id){
                    currentUsrPosition = e.position ?? i;
                    return true;
                } 
            }).length > 0 && currentUsrPosition > this.firstSize;
        },
        firstSize(){
            return this.desktop ? 10 : 5
        },
    },
    methods:{
        desktopActualIndex(index){
            let baseVal = this.showAll ? 10 : 5;
            return (index % 2 === 0) ? index / 2 : baseVal + Math.floor(index/ 2);
        }
    }
}
</script>