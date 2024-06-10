<template>
    <v-row >
        <v-col>
            <v-slide-group
                v-if="cupFormat"
                prev-icon="<"
                next-icon=">"
                ref="slider"
            >
                <v-slide-item
                    v-for="levelObj in cupFormat"
                    :key="levelObj.level"
                    class="mx-2"
                    ref="slideItem"
                    :ref-in-for="true"
                >
                    <v-chip
                        class="overline lh-1"
                        small
                        :outlined="selectedLevel==levelObj.level"
                        :color="selectedLevel==levelObj.level ? '' : 'transparent'"
                        :value="levelObj.level"
                        @click="()=>setSelectedLevel(levelObj.level)"
                        style="min-width:50px; opacity: 1 !important"
                    >
                        {{cupFormat[levelObj.level - 1].name}}
                    </v-chip>
                </v-slide-item>
            </v-slide-group>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        selectedLevel: {type: Number, required: true},
        setSelectedLevel: {type: Function, required: true},
        cupFormat: {type: Array, required:true}
    },
}
</script>