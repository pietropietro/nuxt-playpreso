<template>

    
    <!-- <v-row no-gutters style="width:100%"> -->
        <v-slide-group
            :show-arrows="false"
            prev-icon="<"
            next-icon=">"
        >
            <div >
                <v-slide-item 
                    v-for="(up,index) in ups" 
                    :key="index"
                    class="mx-1"
                >
                    <user-trophy 
                    :trophy="up"
                    size="3em"
                />          
            </v-slide-item>
        </div>
        </v-slide-group>
    <!-- </v-row> -->

<!-- 
    <p-p-slider>
        <p-p-info slot="info" label="trophies" :value="ups.length"/>
        <v-slide-item 
        slot="slide-item" v-for="(up,index) in ups" :key="index" class="mx-2">
            <user-trophy 
                :trophy="up"
                size="3em"
            />
        </v-slide-item>
    </p-p-slider> -->
</template>

<script>
export default {
    props:{
        ups: {type: Array, required: true}
    }
}
</script>
