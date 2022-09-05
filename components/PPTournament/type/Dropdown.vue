<template>
    <v-menu offset-y :close-on-content-click="false" :close-on-click="true">
        <template v-slot:activator="{ on, attrs }">
            <v-card class="white--text" :color="ppRGBA(ppTT)" v-bind="attrs" v-on="on">
                <v-card-title>
                    <h3>{{ppTournamentTypeTitle(ppTT)}}</h3>
                </v-card-title>
            </v-card>
        </template>
        <v-list class="pa-0">
            <v-list-item
            :style="'background-color:' + ppRGBA(ppTT,0.6) "
            v-for="(item, index) in 3"
            :key="index"
            
            >
            <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>
<script>
export default {
    props: {
        ppTT: {type: Object, required: true},
    },
    data(){
        return {
            loading: true
        }
    },
}
</script>