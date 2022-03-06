<template>
    <loading-page v-if="!ppCup"/>
    <v-container v-else>
        <v-row justify="center" class="my-2">
            <v-img contain style="max-height: 80px" :src="require('@/assets/img/cup/' + (selectedLevel - 1) + '.png')"></v-img>
        </v-row>
        <template v-if="ppCup.levels && ppCup.levels.length > 0">
            <cup-level class="mb-10" :level="ppCup.levels[selectedLevel - 1]" :pointsToPassThird="pointsToPassThird"/>
            <v-pagination
                v-model="selectedLevel"
                :length="ppCup.levels.length"
                circle
                class="pagination-fixed no-arrows"
            />
        </template>
    </v-container>
</template>
<script>
export default {
    name: "PPCupTable",
    props:{
        id: {type: String, required: true},
    },
    data(){
        return{
            ppCup: null,
            selectedLevel: 1,
            pointsToPassThird: null
        }
    },
    async mounted(){
        let values = [
            {'action' : "loadSpecificPC"},
            {'ppCup_id': this.id},
        ]
        this.ppCup = await this.$api.call(values);

        //show 3rd best users who pass
        if(this.ppCup.started && this.ppCup.pcType.participants === 24){
            let thirdPositionPoints = [];
            this.ppCup.levels[0].groups.map(group =>{
                thirdPositionPoints.push(group.users[2].plPoints);
            })
            this.pointsToPassThird = parseInt(thirdPositionPoints.sort((a,b) => b-a)[3]);
        }
    }
}
</script>
