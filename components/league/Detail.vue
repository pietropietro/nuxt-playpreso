<template>
    <v-row no-gutters v-if="league && !big" align="center">
        <emoji-flag  :model="league?.country ?? league?.area" 
            :size="sizeClass" class="mr-1"
        />
        <span class="overline lh-1">
            {{league.tag}}
        </span>
    </v-row>
    <v-row no-gutters v-else align="center" justify="center">
        <v-spacer />
        <v-col cols="auto" class="mr-2">
            <emoji-flag size="1.5rem" :model="league?.country ?? league?.area"/>
        </v-col>
        <v-col> 
            <div class="overline lh-1 text-wrap font-weight-bold">
                {{league.name}}
            </div>
        </v-col>
        <v-spacer />
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