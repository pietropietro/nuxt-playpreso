<template >
    <div>
        <v-row no-gutters>
            <v-col cols="12" v-if="showAll">
                <user-participation-standing-labels />
            </v-col>
            <v-col cols="12" md="6" v-for="(up, index) in ups" :key="up.id">
                <v-row align="center" no-gutters>
                    <v-col cols="auto" 
                        v-if="upForIndex(index) && upForIndex(index).ppLeague_id && upForIndex(index).position"
                    >
                        <span class="text-overline pr-2">
                            <v-chip  v-if="upForIndex(index).position<=promote"
                                x-small label :color="ppRGBA(rgb)" class="font-weight-bold"
                            >
                                #{{up.position}}
                            </v-chip>
                            <template v-else>#{{up.position}}</template>
                        </span>
                    </v-col>
                    <v-col>
                        <div :class="!$vuetify.breakpoint.mdAndUp ? '' : index % 2 ? 'pl-5' : 'pr-5'">
                            <user-participation-standing-item
                                :showDetails="showAll"
                                :color="ppRGBA(rgb)"
                                :up="upForIndex(index)"
                            />
                        </div>
                    </v-col>
                </v-row>
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
        ups: {type: Array},
        rgb: {type: String},
        promote: {type: Number}
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
        upForIndex(index){
            if(this.ups.length < this.firstSize){
                return this.ups[index];
            }
            if(!this.showAll && index===this.firstSize-1 && this.makeRoomForCurrentUser){
                return  this.ups.filter((e)=>e.user_id === this.currentUser.id)[0];
            }
            if(this.showAll || Array.from(Array(this.firstSize).keys()).includes(index)){
                return this.$vuetify.breakpoint.mdAndUp ? this.ups[this.desktopActualIndex(index)] : this.ups[index];
            }
        },
        desktopActualIndex(index){
            let baseVal = this.showAll ? Math.ceil(this.ups.length / 2) : 5;
            return (index % 2 === 0) ? index / 2 : baseVal + Math.floor(index/ 2);
        },
    }
}
</script>
