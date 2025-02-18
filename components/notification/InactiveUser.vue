<template>
    <v-chip
        color="brown"
        :class="['pa-0','o-100']"
    >
        <v-row align="center" no-gutters class="h-100" >
            <template v-if="!active">
                <v-col class="px-3 br-4 h-100" :style="{
                        backgroundColor: 'brown'
                    }"   
                >
                    <v-row no-gutters align="center" class="h-100">
                        <h1>💩</h1>
                    </v-row>
                </v-col>
                <v-col  class="pl-2 pr-4">
                    <div class="overline lh-08 text-center">
                        inactive<br>user
                    </div>
                </v-col>
            </template>
        </v-row>
    </v-chip>
</template>
<script>
    export default {
        props:{
            un: {type: Object},
            active: {type: Boolean}
        },
    }
</script>