<template>
    <v-row no-gutters align="center">
    <v-col>
        <v-chip-group
            mandatory
            class="h-100"
            active-class="white--text"
            v-model="computedModel"
            @change="onChange"
        >
            <div v-for="(s,i) in list" :key="i" class="mr-2">
                <v-chip
                    color="var(--v-background-lighten1)"
                    style="width:100%"
                    :value="s"
                />
            </div>
        </v-chip-group>
    </v-col>
</v-row>
</template>
<script>
export default {
    props:{
        // chip i.e. {text: 'lala', value: 'myVal'}
        model: {type: Object},
        list: {type: Array},
        onChange: {type: Function},
        setModel: {type: Function},
    },
    computed: {
        computedModel:{
            get(){return this.model ?? 0},
            set(val){this.setModel(val)}
        },
    }
}
</script>