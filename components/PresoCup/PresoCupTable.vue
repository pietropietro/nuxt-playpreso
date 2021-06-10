<template>
    <loading-page v-if="!presoCup"/>
    <v-container v-else>
        <v-row justify="center" class="my-2">
            <v-img contain style="max-height: 80px" :src="require('@/assets/img/cup/' + (selectedLevel - 1) + '.png')"></v-img>
        </v-row>
        <template v-if="presoCup.levels && presoCup.levels.length > 0">
            <preso-cup-level class="mb-10" :level="presoCup.levels[selectedLevel - 1]"/>
            <div class="text-center">
                <v-pagination
                    v-model="selectedLevel"
                    :length="presoCup.levels.length"
                    circle
                    class="pagination-fixed"
                />
            </div>
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
            selectedLevel: 1
        }
    },
    async mounted(){
        let values = [
            {'action' : "loadSpecificPC"},
            {'presoCup_id': this.id},
        ]
        this.presoCup = await this.$api.call(values);
    }
}
</script>