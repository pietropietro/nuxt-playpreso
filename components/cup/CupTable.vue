<template>
    <loading-page v-if="!presoCup"/>
    <v-container v-else>
        <v-row justify="center" class="my-2">
            <v-img contain style="max-height: 80px" :src="require('@/assets/img/cup/' + (selectedLevel - 1) + '.png')"></v-img>
        </v-row>
        <template v-if="presoCup.levels && presoCup.levels.length > 0">
            <cup-level class="mb-10" :level="presoCup.levels[selectedLevel - 1]" :levelInt="selectedLevel" :pointsToPassThird="pointsToPassThird"/>
            <v-pagination
                v-model="selectedLevel"
                :length="presoCup.levels.length"
                circle
                class="pagination-fixed no-arrows"
            />
        </template>
    </v-container>
</template>
<script>
export default {
    name: "PresoCupTable",
    props:{
        id: {type: String, required: true},
    },
    data(){
        return{
            presoCup: null,
            selectedLevel: 1,
            pointsToPassThird: null
        }
    },
    async mounted(){
        let values = [
            {'action' : "loadSpecificPC"},
            {'presoCup_id': this.id},
        ]
        this.presoCup = await this.$api.call(values);

        //show 3rd best users who pass
        if(this.presoCup.started && this.presoCup.pcType.participants === 24){
            let thirdPositionPoints = [];
            this.presoCup.levels[0].groups.map(group =>{
                thirdPositionPoints.push(group.users[2].plPoints);
            })
            this.pointsToPassThird = parseInt(thirdPositionPoints.sort((a,b) => b-a)[3]);
        }
    }
}
</script>
