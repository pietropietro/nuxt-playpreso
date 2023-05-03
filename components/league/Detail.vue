<template>
    <v-row no-gutters v-if="league" align="center">
        <emoji-flag  :model="league?.country ?? league?.area" 
            :size="big ? '1.5em' : sizeClass ?? ''" class="mr-1"
        />
        <div v-if="big" 
            style="line-height:1; display: contents"
            v-html="nameToCompactHtml(league.name, 'h4', 'h2', 7, 8,true)" 
        />
        <span v-else class="overline lh-1">
            {{league.tag}}
        </span>
    </v-row>
</template>
<script>
export default {
    props: {
        league: {type: Object, required: true},
        sizeClass: {type: String},
        big: {type: Boolean}
    } 
}
</script>