<template>
    <div>
        <v-row justify="center">
            <h1 class="pr-2" v-if="wide">{{label}}</h1>
            <h1 v-if="!small">{{value}}</h1>
            <h3 v-else>{{value}}</h3>
            <template v-if="!!value2">
                <h4 v-if="!small" 
                    :class="value2.class ?? ''" 
                    :style="value2.color ? 'color:' + value2.color : ''"
                >
                    {{value2.text ?? value2}}
                </h4>
                <h6 v-else>{{value2}}</h6>
            </template>
        </v-row>
        <v-row v-if="!wide" justify="center" class="text-overline mt-0">
            {{label.text ?? label}}
        </v-row>
    </div>
</template>
<script>
export default {
    props: {
        label: {type: String, required: true},
        value: {required: true},
        value2: {required: false},      
        small: {type: Boolean},
        wide: {type: Boolean} 
    }
}
</script>