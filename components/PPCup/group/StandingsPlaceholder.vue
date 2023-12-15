<template>
    <v-row no-gutters class="font-italic">
        <h1 v-if="level===1 || cupFormat[level - 1].random_draw">?</h1>

        
        <h3 v-else-if="level===2">
            {{position}}{{tag.slice(position-1, position)}}
        </h3>

        <h3 v-else class="text-lowercase">
            winner {{cupFormat[level - 2].name}} -
            {{cupFormat[level - 2].group_tags.
                indexOf(
                    position === 1 ? tag.slice(0, tag.length/2) 
                        : tag.slice(tag.length/2, tag.length)
                ) +1
            }} 
        </h3>
    </v-row>
</template>
<script>
export default {
    props: {
        tag: {type: String},
        level: {type: Number},
        position: {type: Number},
        cupFormat: {type: Array}
    }
}
</script>