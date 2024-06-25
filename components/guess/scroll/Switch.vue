<template>
    <v-row align="center" justify="center" no-gutters @click="trySet" style="flex: 0 0 auto;">
        <v-col cols="auto">
            <v-row justify="center">
                <!-- <v-btn x-large outlined icon> -->
                    <em-emoji 
                        :id="emoji_id" 
                        size="2.5em"
                    />
                <!-- </v-btn> -->
            </v-row>
            <v-row no-gutters justify="center" class="mt-1">
                <div class="overline lh-1">
                    <b>{{state}}</b>
                </div>
            </v-row>
            <v-row no-gutters justify="center">
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
    computed:{
        emoji_id(){
            if(this.state == 'unlocked') return 'unlock';
            if(this.state == 'locked') return 'lock';
            if(this.state == 'finished') return 'checkered_flag';
        }
    },
    methods: {
        trySet(){
            if(this.availableStates.length == 1) return;
            let originalIndex = this.availableStates.findIndex(item => item === this.state);
            let nextIndex = (originalIndex + 1) % this.availableStates.length;
            this.setState(this.availableStates[nextIndex]);
        }
    }
}
</script>

<style>

</style>