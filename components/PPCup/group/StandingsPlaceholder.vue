<template>
    <v-row no-gutters>
        <h1 v-if="level===1">?</h1>

        <h1 v-else-if="level===2">
            {{position}}{{tag.slice(position-1, position)}}
        </h1>

        <h1 v-else class="text-lowercase">
            {{cupFormat[level - 2].name}} -
            {{cupFormat[level - 2].group_tags.
                indexOf(
                    position === 1 ? tag.slice(0, tag.length/2) 
                        : tag.slice(tag.length/2, tag.length)
                ) +1
            }} 
        </h1>
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