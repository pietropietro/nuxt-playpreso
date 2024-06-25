<template>
    <loading-page v-if="loading.leagues || loading.cups"/>
    <v-container  v-else-if="selectedStatus">
        <v-row justify="center" align="center" class="pb-4">
            <v-col v-for="status in availableStatus" :key="status" class="text-center">
                <div @click="selectedStatus = status">
                    <em-emoji
                        :size="status == selectedStatus ? '4em' : '2em'"
                        :id="status== 'active' ? 'firecracker' : status == 'waiting' ? 'zzz' : 'checkered_flag'"
                    />
                    <div class="overline lh-1">{{ status }}</div>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col :cols="$vuetify.breakpoint.smAndUp ? '6' : '12'"
                v-for="up in combinedUpsByStatus[selectedStatus]" :key="up.id" :class="$vuetify.breakpoint.smAndUp ? '' : 'my-2'"
            >
                <nuxt-link class="no-decoration" v-if="up"
                    :to="up.ppLeague_id ? 
                            ROUTES.PPLEAGUE.DETAIL + up.ppLeague_id
                            : ROUTES.PPCUP.DETAIL + up.ppCup_id + '/' + up.ppCupGroup_id
                    "
                >
                    <user-participation-card
                        :up="up" :status="selectedStatus"
                    />
                </nuxt-link>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    props:{
        userId: {type: Number}
    },
    data(){
        return {
            pplUpsByStatus: null,
            ppcUpsByStatus: null,
            selectedStatus: null,
            combinedUpsByStatus: {
                active: [],
                waiting: [],
                finished: []
            },  
            selectedUp: null,
            loading: {
                leagues: true,
                cups: true
            },
        }
    },
    computed:{
        availableStatus(){
            return Object.keys(this.combinedUpsByStatus).filter(key => this.combinedUpsByStatus[key].length > 0);
        }    
    },
    methods:{
        async getPPLeaguesParticipations(){
            this.loading.leagues = true;
            let response = await this.$api.call(this.API_ROUTES.USER_PARTICIPATION.PPLEAGUES + this.userId);
            if(response && response.status === "success"){
                this.pplUpsByStatus = response.message;
            }
            this.loading.leagues = false;
        },
        async getPPCupsParticipations(){
            this.loading.cups = true;
            let response = await this.$api.call(this.API_ROUTES.USER_PARTICIPATION.PPCUPGROUPS + this.userId);
            if(response && response.status === "success"){
                this.ppcUpsByStatus = response.message;
            }
            this.loading.cups = false;
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
        }
    },
    async mounted(){
        await this.getPPLeaguesParticipations();
        await this.getPPCupsParticipations();
        this.combineUpsByStatus();
        this.selectedStatus = this.availableStatus[0];
    },
}
</script>