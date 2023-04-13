<template>
    <v-container v-if="ups?.length">
        <v-row no-gutters>
            <h1>P-LEAGUES</h1>
        </v-row>
        <v-row no-gutters align="center">
            <v-chip-group
                mandatory
                class="h-100"
                active-class="primary"
                v-model="selectedStatus"
                @change="chipChange"
            >
                <div v-for="(status, i) in statusList" :key="i">
                    <v-chip small :value="status">
                        <div class="overline lh-1">
                            <template v-if="status==='notStarted'">
                                waiting ({{userParticipations.notStarted.length}})
                            </template>
                            <template v-else-if="status==='finished'">
                                finished
                            </template>
                            <template v-else>
                                {{status}} ({{userParticipations.active.length}})
                            </template>
                        </div>
                    </v-chip>
                </div>
            </v-chip-group>
        </v-row>
        <v-row no-gutters class="mb-4" align="end" justify="center">
            <v-col 
                v-for="(up, index) in ups" :key="index"
                class="text-center"
            >
                <div @click="selectedIndex = index" :class="selectedIndex == index ? 'mx-2' : ''">
                    <em-emoji
                        :native="up.ppTournamentType.emoji" 
                        :size="selectedIndex == index ? '2.5em' : '1.5em'" 
                    />
                </div>
            </v-col>
        </v-row>
        <nuxt-link class="no-decoration"
            :to="ups[selectedIndex].ppLeague_id ? 
                    ROUTES.PPLEAGUE.DETAIL + ups[selectedIndex].ppLeague_id
                    : ROUTES.PPCUP.DETAIL + ups[selectedIndex].ppCup_id + '/' + ups[selectedIndex].ppCupGroup_id
            "
        >
            <user-participation-card 
                :class="!ups[selectedIndex].started ? 'mb-4' : ''"
                :participation="ups[selectedIndex]"
            />
        </nuxt-link>
    </v-container>
</template>
<script>
export default {
    data(){
        return {
            userParticipations: null,
            selectedIndex: 0,
            selectedStatus: null,
            statusList: [],
            loading: true,
        }
    },
    computed: {
        ups(){
            if(!this.statusList.length) return null;
            return this.userParticipations[this.selectedStatus];
        }
    },
    methods:{
        async getParticipations(){
            let response = await this.$api.call(this.API_ROUTES.USER_PARTICIPATION.GET);
            if(response && response.status === "success"){
                this.userParticipations = response.message;
                if(this.userParticipations.active.length) this.statusList.push('active');
                if(this.userParticipations.notStarted.length) this.statusList.push('notStarted');
                if(this.userParticipations.finished.length) this.statusList.push('finished');
                this.selectedStatus = this.statusList[0];
            }
            this.loading = false;
        },
        chipChange(){
            this.selectedIndex=0;
        }
    },
    async mounted(){
        await this.getParticipations();
    },
}
</script>