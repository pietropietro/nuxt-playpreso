<template>
    <div>
        <!-- <v-row no-gutters class="overline lh-1 mt-1">
            <v-spacer />
            <em-emoji size="1.5em" id="soccer"/>
            <v-spacer />
        </v-row> -->
        <v-row no-gutters  justify="center" align="center"
            v-for="(s,i) in standings" :key="i"
            :style="{
                    height: rowHeight,
                    backgroundColor: i == 1 ? 'rgb('+rgb+')' : ''
            }"
        >
            <v-col cols="auto" 
                class="mx-1"
            >
                <h2>+{{s.gf}}</h2>
            </v-col>
            <v-col cols="auto" 
                class="mx-1"
            >
                <h2>-{{s.ga}}</h2>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    props:{
        standings: {type: Array},
        rgb: {type: String},
        rowHeight: {type: String}
    }
}
</script>