<template>
    <v-row justify="space-between" align="center" class="my-2">
        <v-col cols="2">
            <v-btn text :disabled="value===1" @click="setValue(value - 1)">
                <h1><</h1>
            </v-btn>
        </v-col>
        <v-col cols="8">
            <slot name="selected-page"/>
        </v-col>
        <v-col cols="2">
            <v-row justify="end" no-gutters>
                <v-btn class="text-end" text :disabled="value===length" @click="setValue(value + 1)">
                    <h1 class="text-end">></h1>
                </v-btn>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        value: {type: Number, required: true},
        length: {type: Number, required: true},
        setValue: {type: Function, required: true}
    }
}
</script>