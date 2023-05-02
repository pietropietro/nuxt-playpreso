<template>
    <v-row no-gutters v-if="league">
        <emoji-flag  :model="league?.country ?? league?.area" 
            :size="big ? '1.5em' : sizeClass ?? ''" class="mr-1"
        />
        <h2 v-if="big">
            {{league.name}}
        </h2>
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