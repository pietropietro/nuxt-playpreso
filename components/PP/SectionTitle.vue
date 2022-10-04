<template>
    <v-row no-gutters><div class="text-overline">{{text}}</div></v-row>
</template>
<script>
export default {
    props: {
        text: {type: String}
    }
}
</script>