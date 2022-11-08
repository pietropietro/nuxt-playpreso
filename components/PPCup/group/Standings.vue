<template>
    <div class="white--text">
        <v-row no-gutters v-if="showDetailedStats" class="mb-2 pr-2 pr-sm-4">
            <user-participation-standing-labels 
                :totalCupLabel="!!group.userParticipations[0].tot_cup_points" 
            />
        </v-row>
        <v-row no-gutters v-else :class="'ml-2 mb-1 font-weight-bold caption'">
                {{cupGroupStageString(group, cupFormat)}}
        </v-row>
        <div>
            <div v-for="position in group.participants" :key="position"
                :class="colorForPosition(position)"
                :style="position === group.participants ? 'border-radius:0 0 20px 20px;' : 
                position === 1 ? 'border-radius:20px 20px 0 0;' : ''"
            >
                <user-participation-standing-item whiteText
                    v-if="
                        !placeholderFirst
                        && group.userParticipations.length >= position"
                    :up="group.userParticipations[position-1]"
                    :showDetails="showDetailedStats"
                />
                <user-participation-standing-item whiteText
                    v-else-if="
                        placeholderFirst &&
                        position===2 &&
                        group.userParticipations.length >= position-1"
                    :up="group.userParticipations[position-2]"
                    :showDetails="showDetailedStats"
                />
                <p-p-cup-group-standings-placeholder
                    v-else
                    :tag="group.tag" :level="group.level" :cupFormat="cupFormat" :position="position"
                />
            </div>
        </div>
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
            if(this.group.userParticipations.length === this.group.participants)return false;
            let fromtag = this.group.userParticipations[0]?.from_tag;
            if(!fromtag) return false;
            if(this.group.tag.substr(0,this.group.tag.length/2) === fromtag) return false;
            return true;
        },
        showDetailedStats(){
            return this.isDetailPage && 
                this.group.started_at && 
                this.group.ppRounds[0].ppRoundMatches.filter((e)=>e.match.verified_at).length > 0;
        }
    },
    methods:{
        colorForPosition(position){
            let classes = "px-4" ;
            if(position === this.group.participants){classes += " pb-1"}
            if( (!this.group.started_at || this.group.userParticipations[0]?.tot_points==null) || position-1 < (this.group.participants / 2)){
                classes += " primary"
            }
            // else if(position === 3 && 
            //     this.pointsToPassThird && 
            //     this.group.userParticipations?.length >= position && 
            //     this.group.userParticipations[position-1].points >= this.pointsToPassThird
            // ){classes += " deep-purple darken-3"}
            // else{
            //     classes += " primary_red"
            // }
            return classes;
        }
    }
}
</script>