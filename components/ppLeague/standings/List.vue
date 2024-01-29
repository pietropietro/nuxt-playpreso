<template >
    <div>
        <v-row no-gutters>
            <v-col cols="12" v-if="showAll">
                <v-row no-gutters align="end">
                    <v-col cols="auto" class="ma-3">
                        <v-row align="center" v-if="ppTournamentType.promote">
                            <v-chip x-small label :color="ppRGBA(ppTournamentType.rgb)" style="height:12px;"/>                            
                            <div class="lh-1 ml-2 overline">{{ups[0].finished ? 'qualified' : 'qualify'}}</div>
                        </v-row>
                        <v-row align="center" v-if="ppTournamentType.rejoin">
                            <em-emoji id="repeat" />
                            <div class="lh-1 ml-2 overline">{{ups[0].finished ? 're-joined' : 're-join'}}</div>
                        </v-row>
                        <v-row align="center" v-if="ppTournamentType.relegate">
                            <em-emoji id="-1" />
                            <div class="lh-1 ml-2 overline">{{ups[0].finished ? 'relegated' : 'relegate'}}</div>
                        </v-row>
                    </v-col>
                    <user-participation-standing-labels />
                </v-row>
            </v-col>
            <v-col cols="12" v-for="(up, index) in ups" :key="up.id">
                <v-row align="center" no-gutters>
                    <v-col cols="auto"
                        v-if=" upForIndex(index) && upForIndex(index).finished && upForIndex(index).position <= 3"
                    >
                        <em-emoji v-if="upForIndex(index).position==1" size="2em" id="first_place_medal"/>
                        <em-emoji v-if="upForIndex(index).position==2" size="2em" id="second_place_medal"/>
                        <em-emoji v-if="upForIndex(index).position==3" size="2em" id="third_place_medal"/>
                    </v-col>
                    <v-col cols="auto" 
                        v-else-if="upForIndex(index) && upForIndex(index).ppLeague_id && upForIndex(index).position"
                    >
                        <span class="text-overline pr-2">
                            <v-chip  v-if="upForIndex(index).position <= ppTournamentType.promote"
                                x-small label :color="ppRGBA(ppTournamentType.rgb)" class="font-weight-bold contrastOnDark--text"
                            >
                                #{{upForIndex(index).position}}
                            </v-chip>
                            <em-emoji id="repeat" size="1.5em"
                                v-else-if="ppTournamentType.rejoin && 
                                    upForIndex(index).position <= (ppTournamentType.promote + ppTournamentType.rejoin)
                                "
                            />
                            <!-- using ups.length instead of ppTournamentType.participants 
                                to correctly show relegation postions in
                                old p-leagues with more participants. -->
                            <em-emoji id="-1" size="1.5em"
                                v-else-if="ppTournamentType.relegate && 
                                    upForIndex(index).position >  (ups.length - ppTournamentType.relegate)
                                "
                            />
                            <template v-else>#{{upForIndex(index).position}}</template>
                        </span>
                    </v-col>
                    <v-col>
                        <!-- <div :class="!$vuetify.breakpoint.mdAndUp ? '' : index % 2 ? 'pl-5' : 'pr-5'"> -->
                        <div>
                            <user-participation-standing-item
                                :showDetails="showAll"
                                :color="ppRGBA(ppTournamentType.rgb)"
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
        ppTournamentType: {type: Object}
    },
    data(){
        return{
            showAll: false
        }
    },
    computed:{
        firstSize(){
            // return this.$vuetify.breakpoint.mdAndUp ? 10 : 5
            return 5
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
                // return this.$vuetify.breakpoint.mdAndUp ? this.ups[this.desktopActualIndex(index)] : this.ups[index];
                return this.ups[index];
            }
        },
        desktopActualIndex(index){
            let baseVal = this.showAll ? Math.ceil(this.ups.length / 2) : 5;
            return (index % 2 === 0) ? index / 2 : baseVal + Math.floor(index/ 2);
        },
    }
}
</script>
