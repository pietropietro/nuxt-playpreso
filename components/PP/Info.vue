<template>
    <div>
        <v-row justify="center">
            <h1 v-if="!small">{{value}}</h1>
            <h3 v-else>{{value}}</h3>
            <template v-if="!!value2">
                <div class="ml-2">
                    <h4 v-if="!small"
                        :class="value2.class ?? ''"
                        :style="value2.color ? 'color:' + value2.color : ''"
                    >
                        {{value2.text ?? value2}}
                    </h4>
                    <h6 v-else>{{value2}}</h6>
                </div>
            </template>
        </v-row>
        <v-row justify="center" 
            :class="'text-overline mt-0 ' + label?.class ?? ''" 
            :style="label?.color ? 'color:' + label.color : ''">
            {{label?.text ?? label}}
        </v-row>
    </div>
</template>
<script>
export default {
    props: {
        label: {required: false},
        value: {required: true},
        value2: {required: false},      
        small: {type: Boolean},
    }
}
</script>