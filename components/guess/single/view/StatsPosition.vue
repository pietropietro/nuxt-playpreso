<template>
    <div >
            <v-row justify="center"
                no-gutters
                :style="{height: rowHeight}"
            >
                    <h1>
                        {{standings[0].position}}°
                    </h1>
            </v-row>


            <v-row 
                justify="center" no-gutters class="rounded-br"
                :style="{
                    backgroundColor: 'rgb('+rgb+')',
                    height: rowHeight
                }"
            >
                <h1>
                    {{standings[1].position}}°
                </h1>
            </v-row>
    </div>
</template>
<script>
export default {
    props: {
        standings: {type: Array},
        rgb: {type: String},
        rowHeight: {type: String}
    }
}
</script>