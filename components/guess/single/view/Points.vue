<template>
    <div>
        <v-row no-gutters class="h-100"
            v-if="guess.verified_at"
            justify="center" align="center"
        >
            
            <template>
                <em-emoji v-if="guess.verified_at=='toolate'" id="dash" size="2em"/>
                <em-emoji v-else-if="guess.verified_at=='toopoor'" id="money_with_wings" size="2em"/>
                <em-emoji v-else-if="isMissed(guess)" id="x" size="2em"/>
                <template v-else>
                    <template v-if="togglePreso">
                        <p-p-preso/>
                    </template>
                    <v-col v-else cols="12" class="px-2">
                        <v-row no-gutters justify="start"><h2>{{guess.points}}</h2></v-row>
                        <v-row class="mt-n4"  no-gutters  justify="end"><h4>🅿️</h4></v-row>
                        <!-- <span style="z-index:1; position:relative;">{{guess.points}}</span>
                        <h6 class="mt-n6 mr-n4" style="z-index:0; position:relative;">🅿️</h6> -->
                    </v-col>
                </template>
            </template>
        </v-row>
    </div>
</template>
<script>
export default {
    props:{
        guess: {type:Object}
    },
    data() {
        return {
            togglePreso: false,    // toggles true/false every second
            intervalId: null,
        };
    },
    mounted() {
        // If match is live, start toggling
        if (this.guess.PRESO === 1) {
            this.intervalId = setInterval(() => {
                this.togglePreso = !this.togglePreso;
            }, 2000);
        }
    },
    beforeDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    },
}
</script>
