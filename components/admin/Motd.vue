<template>
    <v-container>
        <v-row>{{ calendarValue }}</v-row>
    </v-container>
</template>
<script>
export default {
    props:{
        calendarValue:{type: String}
    }
}
</script>