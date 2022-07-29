<template>
    <p-p-scroll>
        <p-p-info slot="info" label="trophies" :value="ups.length"/>
        <v-slide-item slot="slide-item" v-for="(up,index) in ups" :key="index">
            <!-- TODO distinguish cups -->
            <trophy-item :up="up" class="mx-1" />
            <!-- {{up.position}}
            {{up.id}} -->
        </v-slide-item>
    </p-p-scroll>
</template>

<script>
export default {
    name: "TrophyScroll",
    props:{
        ups: {type: Array, required: true}
    }
}
</script>
