<template>
    <v-container fluid>
        <v-container>
            <v-row>
                <v-col v-for="f in functions" :key="f">
                    <v-chip  large label color="primary" :outlined="f!=selected" @click="()=>{selected=f}">
                        <h3>{{f}}</h3>
                    </v-chip>
                </v-col>
            </v-row>
        </v-container>
        <admin-match-week v-if="selected==='week'" />
        <admin-match-picker  v-if="selected==='picker'" />
    </v-container>
</template>
<script>
export default {
    layout: "admin",
    data:()=>({selected:'week', functions:['week', 'picker']})
}
</script>
