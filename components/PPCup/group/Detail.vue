<template>
    <v-row align="center">
        <v-col cols="6">
            <nuxt-link :to="{
                            path: ROUTES.PPCUP.DETAIL + ppCupGroup.ppCup_id,
                            query: { level: ppCupGroup.level }
                        }">
                <!-- <v-img contain style="max-height: 40px"
                    :src="require('@/assets/img/p-cup/' + (ppCupGroup.level - 1) + '.png')"
                /> -->
{{                ppCupGroup.level}}        
    </nuxt-link>
        </v-col>
        <v-col cols="6">
            <h1 class="text-center">{{ppCupGroup.tag}}</h1>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props: {
        ppCupGroup: {type: Object, required: true}
    }
}
</script>