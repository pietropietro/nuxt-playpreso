<template>
    <v-row justify="space-between" align="center">
        <v-col>
            <v-row justify="start">
                <v-chip-group
                    active-class="primary"
                    v-model="startedModel"
                    v-for="st in startedTypes" :key="st"
                >
                    <v-chip :disabled="loading" 
                        small 
                        :value="st"
                    >
                        {{st}}
                    </v-chip>
                </v-chip-group>
            </v-row>
        </v-col>
            <v-col cols="auto">
            <v-chip 
                @click="pausedModel = !pausedModel"
                :class="pausedModel ? 'primary' : ''"
                :disabled="loading"
                small
            >
                paused
            </v-chip>
        </v-col>
        <v-col>
            <v-row justify="end">
                <v-chip-group
                    active-class="primary"
                    v-model="finishedModel"
                    v-for="ft in finishedTypes" :key="ft"
                >
                    <v-chip 
                        small 
                        :value="ft"
                        :disabled="loading"
                    >
                        {{ft}}
                    </v-chip>
                </v-chip-group>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        started: {type: String},
        setStarted: {type: Function},
        finished: {type: String},
        setFinished: {type: Function},
        paused: {type: Boolean},
        setPaused: {type: Function},
        loading: {type: Boolean},
    },
    data(){
        return {
            finishedTypes: ['all', 'finished', 'not-finished'],
            startedTypes: ['all', 'started', 'not-started'],
        }
    },
    computed:{
        startedModel:{
            get(){return this.started;},
            set(val){this.setStarted(val);}
        },
        finishedModel:{
            get(){return this.finished;},
            set(val){this.setFinished(val);}
        },
        pausedModel:{
            get(){return this.paused;},
            set(val){this.setPaused(val);}
        },
    },
}
</script>