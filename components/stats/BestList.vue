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
        <template v-slot:body.append v-if="currentUserStat">
            <h1 class="px-4 lh-1">...</h1>
            <tr>
                <td><user-name :user="currentUserStat?.user" /></td>
                <td>
                    <div class="overline lh-1 text-center">{{currentUserStat?.cnt_locked}}/{{currentUserStat?.cnt}}</div>
                </td>
                <td>
                    <h1 class="text-right">{{currentUserStat?.avg}}</h1>
                </td>
            </tr>
      </template>
    </v-data-table>
</template>
<script>
export default {
    props:{
        items:{type: Array, required: true}, 
        currentUserStat:{type: Object}, 
        headers: {type: Array}
    }
}
</script>