<template>
    <v-row >
        <v-col>
            <v-slide-group
                prev-icon="<"
                next-icon=">"
                ref="slider"
            >
                <v-slide-item
                    v-for="str in ['locks','ppdex']"
                    :key="str"
                    class="mx-2"
                    ref="slideItem"
                    :ref-in-for="true"
                >
                    <v-chip
                        class="overline lh-1"
                        small
                        :outlined="selectedView==str"
                        :color="selectedView==str ? '' : 'transparent'"
                        :value="str"
                        @click="()=>setSelectedView(str)"
                        style="min-width:50px; opacity: 1 !important"
                    >
                        {{str}}
                    </v-chip>
                </v-slide-item>
            </v-slide-group>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        selectedView: {type: String, required: true},
        setSelectedView: {type: Function, required: true},
    },
}
</script>