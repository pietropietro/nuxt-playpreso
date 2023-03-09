<template>
    <v-data-table
                class="transparent no-select"
                mobile-breakpoint="0"
                item-text="value"
                :items="stats?.best"
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
        <template v-slot:item.display_points="{ item }">
            <h1 class="text-right">{{item?.display_points}}</h1>
        </template>
        <template v-slot:body.append v-if="stats?.currentUserStat">
            <h1 class="px-4 lh-1">...</h1>
            <tr>
                <td><user-name :user="stats.currentUserStat?.user" /></td>
                <td>
                    <div class="overline lh-1 text-center">{{stats.currentUserStat?.cnt_locked}}/{{stats.currentUserStat?.cnt}}</div>
                </td>
                <td>
                    <h1 class="text-right">{{stats.currentUserStat?.display_points}}</h1>
                </td>
            </tr>
      </template>
    </v-data-table>
</template>
<script>
export default {
    props:{
        stats:{type: Object, required: true}, 
        headers: {type: Array}
    }
}
</script>