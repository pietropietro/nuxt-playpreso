<template>
    <div>
        <p-p-cup-group-standings-headers 
            :totalCupLabel="!!group.userParticipations[0]?.tot_cup_points"
            :showUpVerticalLabels="showUpVerticalLabels"
            :group="group" :cupFormat="cupFormat"
            :isDetailPage="isDetailPage"
        />
        <div v-for="position in group.participants" :key="position"
            :class="
                colorForPosition(position) + ' ' + (
                position === group.participants ? 'rounded-br-xl rounded-bl-xl' : 
                position === 1 ? 'rounded-tr-xl rounded-tl-xl' : ''
            )"
        >
            <user-participation-standing-item 
                v-if="
                    !placeholderFirst
                    && group.userParticipations.length >= position
                "
                :up="group.userParticipations[position-1]"
                :showDetails="showUpVerticalLabels"
            />
            <user-participation-standing-item 
                v-else-if="
                    placeholderFirst &&
                    position===2 &&
                    group.userParticipations.length >= position-1
                "
                :up="group.userParticipations[position-2]"
                :showDetails="showUpVerticalLabels"
            />
            <p-p-cup-group-standings-placeholder
                v-else
                :tag="group.tag" :level="group.level" :cupFormat="cupFormat" :position="position"
            />
        </div>
        <p-p-cup-group-standings-footer class="mx-2" :group="group" :isDetailPage="isDetailPage"/>
    </div>
</template>
<script>
export default {
    props: {
        group: {type: Object},
        cupFormat: {type: Array},
        isDetailPage: {type: Boolean}
    },
    computed: {
        placeholderFirst(){
            if(this.cupFormat[this.group.level - 1].random_draw) return false;
            if(this.group.userParticipations.length === this.group.participants)return false;
            let fromtag = this.group.userParticipations[0]?.from_tag;
            if(!fromtag) return false;
            
            let cleanTag = this.group.tag.replace('+', '');

            if(this.group.level == 2 && this.group.tag.startsWith('+')){
                //ex: grouptag, clean, fromtag, subst, returnval 
                //+DE DE E E true
                let subst= cleanTag.substr(1,1) ;
                let returnval = subst === fromtag;
                return returnval
            }

            if(cleanTag.substr(0,cleanTag.length/2) === fromtag) return false;
            return true;
        },
        showUpVerticalLabels(){
            return this.isDetailPage && 
                this.group.started_at && 
                this.group.ppRounds[0]?.ppRoundMatches.filter((e)=>e.match.verified_at).length > 0;
        },
        hasMatchLive(){
            return true;
        }
    },
    methods:{
        colorForPosition(position){
            let classes = "px-4" ;
            if(position === this.group.participants){classes += " pb-1"}
            if((!this.group.started_at || this.group.userParticipations[0]?.tot_points==null) 
                || position-1 < (this.group.participants / 2)
            ){
                classes += " primary pcup"
            }
            return classes;
        }
    }
}
</script>