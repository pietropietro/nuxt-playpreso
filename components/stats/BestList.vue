<template>
    <v-data-table
                class="transparent no-select"
                mobile-breakpoint="0"
                item-text="value"
                :items="items"
                :headers="headers"
                hide-default-footer
                hide-default-header
            >
        <template v-slot:header="{ props }">
            <slot name="headers" />
        </template>
        <template v-slot:item.username="{ item }">
            <user-name :user="item?.user" />
        </template>
        <template v-slot:item.cnt="{ item }">
            <div class="overline lh-1 text-center">{{item?.cnt_locked}}/{{item?.cnt}}</div>
        </template>
        <template v-slot:item.avg="{ item }">
            <h1 class="text-right">{{item?.avg}}</h1>
        </template>
    </v-data-table>
</template>
<script>
export default {
    props:{
        items:{type: Array, required: true}, 
        headers: {type: Array}
    }
}
</script>