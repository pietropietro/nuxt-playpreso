<template>
    <div class="white--text" >
        <v-row no-gutters :class="colorForPosition(0)" style="border-radius:20px 20px 0 0;">
            {{cupGroupStageString(group, cupFormat)}}
        </v-row>
        <div v-for="position in group.participants" :key="position" 
            :class="colorForPosition(position)"
            :style="position === group.participants ? 'border-radius:0 0 20px 20px;' : ''"
        >            
            <user-participation-standing-item whiteText
                v-if="
                    !placeholderFirst 
                    && group.userParticipations.length >= position
                "
                :up="group.userParticipations[position-1]"
            />
            <user-participation-standing-item whiteText
                v-else-if="
                    placeholderFirst && 
                    position===2 && 
                    group.userParticipations.length >= position-1
                "
                :up="group.userParticipations[position-2]"
            />
            <p-p-cup-group-standings-placeholder
                v-else
                :tag="group.tag" :level="group.level" :cupFormat="cupFormat" :position="position"
            />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        group: {type: Object},
        cupFormat: {type: Array},
    },
    computed: {
        placeholderFirst(){
            if(this.group.userParticipations.length === this.group.participants)return false;
            let fromtag = this.group.userParticipations[0]?.from_tag;
            if(!fromtag) return false;
            if(this.group.tag.substr(0,this.group.tag.length/2) === fromtag) return false;
            return true;
        }
    },
    methods:{
        colorForPosition(position){
            let classes = "px-4" ;
            if(position === 0){classes += " pt-1 font-weight-bold text-caption"}
            if(position === this.group.participants){classes += " pb-1"}
            if(this.currentUser && this.currentUser.id === this.group.userParticipations[position-1]?.id){
                classes += " yellow--text"
            }
            if( !this.group.started_at || position-1 < (this.group.participants / 2)){
                classes += " primary"
            }
            // else if(position === 3 && 
            //     this.pointsToPassThird && 
            //     this.group.userParticipations?.length >= position && 
            //     this.group.userParticipations[position-1].points >= this.pointsToPassThird
            // ){classes += " deep-purple darken-3"}
            else{
                classes += " primary_red"
            }
            return classes;
        }
    }
}
</script>