<template>
    <div>
        <v-row justify="center">
            <h1 v-if="!small">{{value}}</h1>
            <h3 v-else>{{value}}</h3>
            <h4>{{value2}}</h4>
        </v-row>
        <v-row justify="center" class="text-overline mt-0">{{label}}</v-row>
    </div>
</template>
<script>
export default {
    name: "NumericInfo",
    props: {
        label: {type: String, required: true},
        value: {type: String, required: true},
        value2: {type: String},      
        small: {type: Boolean}  
    }
}
</script>