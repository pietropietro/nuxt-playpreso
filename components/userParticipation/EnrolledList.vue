<template>
    <v-container  v-if="selectedStatus" class="pt-0 px-0">
        <v-row no-gutters>
            <v-col>
                <v-slide-group
                    prev-icon="<"
                    next-icon=">"
                    ref="slider"
                >
                    <v-slide-item
                        v-for="status in availableStatus"
                        :key="status"
                        class="mx-2"
                        ref="slideItem"
                    >
                        <v-chip
                            class="overline lh-1"
                            small
                            :outlined="selectedStatus==status"
                            :color="selectedStatus==status ? '' : 'transparent'"
                            :value="status"
                            @click="()=>changeStatus(status)"
                            style="min-width:50px; opacity: 1 !important"
                        >
                            {{status}} ({{ combinedUpsByStatus[status].length }})
                        </v-chip>
                    </v-slide-item>
                </v-slide-group>
            </v-col>
        </v-row>

        <v-row no-gutters class="mt-2" align="end" justify="center">
            <v-col>
                <v-slide-group
                    prev-icon="<"
                    next-icon=">"
                    ref="slider"
                >
                    <v-slide-item
                        v-for="(up, index) in combinedUpsByStatus[selectedStatus]" :key="index"
                        class="mx-4"
                        ref="slideItem"
                    >
                        <div @click="selectUp(index)" :class="selectedIndex == index ? 'mx-4' : 'mx-2'">
                            <em-emoji
                                :native="up.ppTournamentType.emoji"
                                :size="selectedIndex == index ? '2.8em' : '1.8em'"
                            />
                        </div>
                    </v-slide-item>
                </v-slide-group>
            </v-col>
        </v-row>

        <v-container>
            <v-row>
                <v-col :cols="$vuetify.breakpoint.smAndUp ? '12' : '12'"
                    class="mt-n1"
                >
                    <nuxt-link class="no-decoration" 
                        :to="combinedUpsByStatus[selectedStatus][selectedIndex].ppLeague_id ?
                                ROUTES.PPLEAGUE.DETAIL + combinedUpsByStatus[selectedStatus][selectedIndex].ppLeague_id
                                : ROUTES.PPCUP.DETAIL + combinedUpsByStatus[selectedStatus][selectedIndex].ppCup_id 
                                + '/' + combinedUpsByStatus[selectedStatus][selectedIndex].ppCupGroup_id
                        "
                    >
                        <user-participation-card
                            :up="combinedUpsByStatus[selectedStatus][selectedIndex]"
                        />
                    </nuxt-link>
                </v-col>
            </v-row>
            <v-row v-if="selectedStatus != 'waiting'">
                <loading-page v-if="loading.round == true" />
                <guess-user-round 
                    v-else-if="pptLastRound"
                    :ppRMs="pptLastRound" 
                    :rgb="combinedUpsByStatus[selectedStatus][selectedIndex].ppTournamentType.rgb" 
                    class="mx-2"
                />
            </v-row>
        </v-container>
    </v-container>
</template>
<script>
import useHomepageApi from '~/composables/useHomepageApi';

export default {
    props:{
        userId: {type: Number},
        setEmptyFlag: {type: Function, required: false}
    },
    data(){
        return {
            pplUpsByStatus: null,
            ppcUpsByStatus: null,
            selectedStatus: null,
            pptLastRound: null,
            combinedUpsByStatus: {
                active: [],
                waiting: [],
                finished: []
            },  
            loading: {
                round: false
            },
            selectedIndex: 0
        }
    },
    computed:{
        availableStatus(){
            return Object.keys(this.combinedUpsByStatus).filter(key => this.combinedUpsByStatus[key].length > 0);
        },
        selectedUp(){
            if(!this.combinedUpsByStatus[this.selectedStatus] || this.combinedUpsByStatus[this.selectedStatus].length <= 0 )return null;
            return this.combinedUpsByStatus[this.selectedStatus][this.selectedIndex];
        }
    },
    methods:{
        async getPPLeaguesParticipations(){
            let response = await this.$api.call(this.API_ROUTES.USER_PARTICIPATION.PPLEAGUES + (this.userId ?? this.currentUser.id));
            if(response && response.status === "success"){
                this.pplUpsByStatus = response.message;
            }
        },
        async getPPCupsParticipations(){
            let response = await this.$api.call(this.API_ROUTES.USER_PARTICIPATION.PPCUPGROUPS + (this.userId ?? this.currentUser.id));
            if(response && response.status === "success"){
                this.ppcUpsByStatus = response.message;
            }
        },

        async getLastRoundForSelectedUp(){
            if(this.selectedStatus == 'waiting') return;
            if(!this.selectedUp) return ;
            this.loading.round = true;

            let upId =  this.selectedUp.id;

            let response = await this.$api.call(
                this.API_ROUTES.PPROUND.GET_FOR_UP + upId
            );

            if(response && response.status === "success"){
                this.pptLastRound = response.message;
                
                //if currentuser is owner
                //got to add pptt + match to each guess 
                //in order to make the open guess + logo in box work
                this.pptLastRound.forEach(element => {
                    element.guess.ppTournamentType = this.selectedUp.ppTournamentType;
                    element.guess.match = element.match;
                }); 
            }
            this.loading.round = false;
        },  

        combineUpsByStatus() {
            const combineArrays = (arr1, arr2) => [...(arr1 || []), ...(arr2 || [])];

            this.combinedUpsByStatus.active = combineArrays(
                this.ppcUpsByStatus?.active,
                this.pplUpsByStatus?.active

            );
            this.combinedUpsByStatus.waiting = combineArrays(
                this.ppcUpsByStatus?.waiting,
                this.pplUpsByStatus?.waiting
            );
            this.combinedUpsByStatus.finished = combineArrays(
                this.ppcUpsByStatus?.finished,
                this.pplUpsByStatus?.finished
            );

            if(this.availableStatus.length == 0){
                if(this.setEmptyFlag){
                    this.setEmptyFlag();
                }
                return;
            }
            this.selectedStatus = this.availableStatus[0];

        },

        async selectUp(index){
            if(index!=this.selectedIndex)await this.triggerHapticFeedback();
            this.selectedIndex=index;
            this.getLastRoundForSelectedUp();
        },
        async changeStatus(status){
            this.selectedIndex=0;
            this.selectedStatus=status;
            await this.getLastRoundForSelectedUp();
        }
    },

    async mounted(){
        // Combine API calls into a single function.
        const fetchAllEnrolled = async () => {
            await this.getPPLeaguesParticipations();
            await this.getPPCupsParticipations();
            this.combineUpsByStatus();
        };
        const { fetchData } = useHomepageApi(this.$store, 'enrolled-tournaments', fetchAllEnrolled);
        await fetchData();
        await this.getLastRoundForSelectedUp();
    },

}
</script>