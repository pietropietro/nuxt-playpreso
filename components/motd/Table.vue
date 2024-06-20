<template>
    <v-container class="px-0">
        <v-row no-gutters v-for="(item,i) in chart" :key="item.user_id" align="center">
            <v-col>
                <v-row align="center">
                    <v-col cols="auto">
                        <v-chip x-small color="transparent">
                            # {{ i + 1 + ((page - 1) * 10) }}
                        </v-chip>                 
                    </v-col>
                    <v-col><user-name :user="item.user" /></v-col>
                </v-row>
            </v-col>
            <v-col cols="auto"><h3>{{ item.tot_points }}</h3></v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    props:{
        chart: {type: Array},
        page: {type: Number}
    },
}
</script>