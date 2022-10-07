<template>
    <div class="white--text" >
        <v-row no-gutters :class="colorForPosition(0)" style="border-radius:20px 20px 0 0;">
            <template v-if="group.level==1 && cupFormat[0].name=='GROUP_STAGE'">
                GROUP {{group.tag}}
            </template>  
            <template v-else>
                {{cupFormat[group.level - 1].name.replaceAll('_',' ')}} -
                {{cupFormat[group.level - 1].group_tags.indexOf(group.tag) +1 }}
            </template>  
        </v-row>
        <div v-for="i in group.participants" :key="i" 
            :class="colorForPosition(i)"
            :style="i === group.participants ? 'border-radius:0 0 20px 20px;' : ''"
        >
            <user-participation-standing-item
                v-if="group.userParticipations.length >= i"
                :up="group.userParticipations[i-1]"
                whiteText 
            />
            <v-row v-else no-gutters>
                <h2 v-if="group.level===1">?</h2>
                <h2 v-else>ciao</h2>
            </v-row>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        group: {type: Object},
        cupFormat: {type: Array}
    },
    methods:{
        colorForPosition(i){
            let classes = "px-4" ;
            if(i === 0){classes += " pt-1 font-weight-bold text-caption"}
            if(i === this.group.participants){classes += " pb-1"}
            if(this.currentUser && this.currentUser.id === this.group.userParticipations[i-1]?.id){
                classes += " yellow--text"
            }
            if(i-1 < (this.group.participants / 2)){
                classes += " primary"
            }
            // else if(i === 3 && 
            //     this.pointsToPassThird && 
            //     this.group.userParticipations?.length >= i && 
            //     this.group.userParticipations[i-1].points >= this.pointsToPassThird
            // ){
            //     classes += " deep-purple darken-3"
            // }
            else{
                classes += " primary_red"
            }
            return classes;
        }
    }
}
</script>