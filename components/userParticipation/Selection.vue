<template>
  <div>
    <v-row no-gutters align="center" :justify="inverted ? 'end' : 'start'">
        <v-chip-group
            mandatory
            class="h-100"
            active-class="primary"
            v-model="selectedStatus"
            @change="statusChange"
        >
            <div v-for="(status, i) in statusList" :key="i">
                <v-chip
                    small
                    :value="status"
                    color="var(--v-background-lighten1)">
                    <div class="overline lh-1">
                        <template v-if="status==='waiting'">
                            waiting ({{statusUserParticipations.waiting.length}})
                        </template>
                        <template v-else-if="status==='finished'">
                            finished
                        </template>
                        <template v-else>
                            {{status}} ({{statusUserParticipations.active.length}})
                        </template>
                    </div>
                </v-chip>
            </div>
        </v-chip-group>
    </v-row>
    <v-row no-gutters class="mb-4" align="end" justify="center">
        <v-col
            v-for="(up, index) in statusUserParticipations[selectedStatus]" :key="index"
            class="text-center"
        >
            <div @click="select(index)" :class="selectedIndex == index ? 'mx-2' : ''">
                <em-emoji
                    :native="up.ppTournamentType.emoji"
                    :size="selectedIndex == index ? '2.5em' : '1.5em'"
                />
            </div>
        </v-col>
    </v-row>
</div>
</template>

<script>
export default {
    props:{
        statusUserParticipations: {type: Object},
        selected: {type: Object},
        setSelected: {type: Function},
        inverted: {type: Boolean}
    },
    data(){
        return {
            selectedIndex: 0,
            selectedStatus: null,
        }
    },
    computed:{
        statusList(){
            return Object.keys(this.statusUserParticipations);
        },
        ups(){
            return this.statusUserParticipations[this.selectedStatus];
        }
    },
    methods:{
        select(index){
            this.selectedIndex=index;
        },
        statusChange(){
            this.selectedIndex=0;
        },
    },
    watch: {
        selectedIndex (newIndex){
            this.setSelected(this.ups[this.selectedIndex]);
        },
        statusList(newVal){
            this.selectedIndex=0;
            this.selectedStatus = this.statusList[0];
            this.setSelected(this.ups[this.selectedIndex]);
        },
        selectedStatus(newstat){
            this.selectedIndex=0;
            this.setSelected(this.ups[this.selectedIndex]);
        }
    },
    mounted(){
        this.setSelected(this.ups[this.selectedIndex]);
    }
}
</script>
