<template>
    <v-card flat class="transparent">
        <p-p-tournament-title :participation="participation" />
        <!-- <p-p-tournament-round :participation="participation" /> -->
    </v-card>
</template>
<script>
export default {
    props:{
        participation: {type: Object, required: true}
    },
}
</script>
