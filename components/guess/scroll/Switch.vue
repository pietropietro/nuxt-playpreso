<template>
    <v-row align="center" justify="center" no-gutters @click="trySet" style="flex: 0 0 auto;">
        <v-col cols="auto">
            <!-- <v-row justify="center">
                <em-emoji :native="state == 'unlocked' ? '🔓' : '🔒'" size="1.6em"/>
            </v-row> -->
            <v-row justify="center" class="">
                <div class="overline lh-1">
                    <b>{{state == 'unlocked' ? 'unlocked' : 'locked'}}</b>
                </div>
            </v-row>
            <v-row justify="center">
                <div class="overline lh-1">
                    <b>matches</b>
                </div>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props:{
        state: {type: String},
        setState: {type: Function},
        availableStates: {type: Array}
    },
    methods: {
        trySet(){
            if(this.availableStates.length == 1) return;
            this.setState(this.state === 'locked' ? 'unlocked' : 'locked');
        }
    }
}
</script>

<style>

</style>