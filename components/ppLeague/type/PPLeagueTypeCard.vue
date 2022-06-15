<template>
    <v-card class="white--text" :color="ppRGBA(ppLT)"> 
        <v-card-title>
            {{ppLeagueTypeTitle(ppLT)}}
        </v-card-title>
        <!-- <v-row justify="end" align="center" :style="'background-color: ' + ppRGBA(ppLT,.6)">
            <v-col cols="6" class="mt-2">
                <p-p-numeric-info small label="cost" :value="ppLT.cost" />
            </v-col>
        </v-row> -->
    </v-card>
</template>
<script>
export default {
    name: "PPLeagueTypeCard",
    props: {
        ppLT: {type: Object, required: true},
    },
    data(){
        return {
            loading: true
        }
    },
}
</script>