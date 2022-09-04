<template>
    <p-p-scroll>
        <p-p-info slot="info" label="leagues" :value="leagues.length"/>
        <v-slide-item slot="slide-item" v-for="(league,index) in leagues" :key="index">
            <div>
                <league-detail :league="league" />
            </div>
        </v-slide-item>
    </p-p-scroll>
</template>
<script>
export default {
    props: {
        leagues: {type: Array, required: true}
    }
}
</script>