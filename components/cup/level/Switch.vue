<template>
    <v-row justify="space-between" align="center" class="my-2">
        <v-col cols="2">
            <v-btn text :disabled="level===1" @click="setLevel(level - 1)">
                <h1><</h1>
            </v-btn>
        </v-col>
        <v-col cols="8">
            <v-img contain style="max-height: 80px"
                :src="require('@/assets/img/cup/' + (level - 1) + '.png')"
            />
        </v-col>
        <v-col cols="2">
            <v-row justify="end" no-gutters>
                <v-btn class="text-end" text :disabled="level===length" @click="setLevel(level + 1)">
                    <h1 class="text-end">></h1>
                </v-btn>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
export default {
    name: "CupLevelSwitch",
    props:{
        level: {type: Number, required: true},
        length: {type: Number, required: true},
        setLevel: {type: Function, required: true}
    }
}
</script>