<template>
    <div>
        <v-row no-gutters justify="center" align="center" class="ml-1 lh-1" v-if="guess.guessed_at">
            <v-col cols="auto" class="mr-1">
                <em-emoji id="lock"  size="0.6em"/>
            </v-col>
            <v-col class="pt-1">
                <v-row no-gutters justify="center" align="center">
                    <select-integer
                        @click.native.stop
                        justify="end"
                        :disabled="true"
                        :model="guess.home"
                        :setModel="null"
                        small
                    />
                    <v-col cols="auto"
                        :style="guess.home==3 ? 'margin-left:-2px' : '' "
                    >
                        <h4 class="text-center" style="user-select: none;">-</h4>
                    </v-col>
                    <select-integer
                        @click.native.stop
                        justify="start"
                        :disabled="true"
                        :model="guess.away"
                        :setModel="null"
                        small
                    />
                </v-row>
            </v-col>                            
        </v-row>
        <v-row no-gutters justify="center" class="lh-1 ml-1" align="center" v-if="match.verified_at">
            <v-col cols="auto" class="mr-1">
                <em-emoji id="checkered_flag" size="0.6em"/>
            </v-col>
            <v-col>
                <h4>{{ match.score_home  }}-{{ match.score_away }}</h4>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    props:{
        guess: {type: Object},
        match: {type: Object},
    }
}
</script>