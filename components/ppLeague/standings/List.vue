<template >
    <div>
        <template v-if="!this.$vuetify.breakpoint.mobile">
            <v-row no-gutters >
                <v-col cols="6" v-for="(up, index) in ups" :key="up.id">
                    <p-p-league-standings-item :ups="ups" :index="index" :showAll="showAll" desktop/>
                </v-col>
            </v-row>
        </template>
        <template v-else>
            <div v-for="(up, index) in ups" :key="up.id">
                <p-p-league-standings-item :ups="ups" :index="index" :showAll="showAll"/>
            </div>
        </template>
        <v-row no-gutters class="pt-10" justify="center" @click="()=>showAll = !showAll">
            <div class="text-overline">{{showAll ? 'SHOW LESS' : 'SHOW ALL'}}</div>
        </v-row>
    </div>
</template>
<script>
export default {
    props: {
        ups: {type: Array}
    },
    data(){
        return{
            showAll: false
        }
    }
}
</script>