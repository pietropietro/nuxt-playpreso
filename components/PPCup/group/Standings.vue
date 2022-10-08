<template>
    <div class="white--text" >
        <v-row no-gutters :class="colorForPosition(0)" style="border-radius:20px 20px 0 0;">
            <template v-if="group.level==1 && cupFormat[0].name=='GROUP STAGE'">
                GROUP {{group.tag}}
            </template>  
            <template v-else>
                {{cupFormat[group.level - 1].name}}
                {{cupFormat[group.level - 1].name==='FINAL' ? '' 
                    : (' - ' + (cupFormat[group.level - 1].group_tags.indexOf(group.tag) + 1))
                }}
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
                <h1 v-if="group.level===1">?</h1>
                <h1 v-else-if="group.level===2">
                    {{i}}{{group.tag.slice(i-1,i)}}
                </h1>
                <h1 v-else class="text-lowercase">
                    {{cupFormat[group.level - 2].name}} -
                    {{cupFormat[group.level - 2].group_tags.
                        indexOf(
                            i === 1 ? group.tag.slice(0, group.tag.length/2) 
                                : group.tag.slice(group.tag.length/2, group.tag.length)
                        ) +1
                    }} 
                </h1>
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