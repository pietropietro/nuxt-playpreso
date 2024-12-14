<template>
    <v-row justify="center" align="center" >
        <v-col
            cols="auto"
            class="d-flex justify-center align-center rounded-sm py-0"
        >
            <em-emoji native="👼" size="1.2em" />
        </v-col>
        <v-col class="font-weight-bold white--text custom-font-class ml-n1 px-0 py-0">
            {{ label }}
        </v-col>
        <v-spacer />
        <v-col cols="auto">
            <v-btn class="custom-font-class mr-n4" 
                style="font-size:20px;"
                text icon 
                @touchend.stop="doExit"        
                @click="doExit"            
            >
                X
            </v-btn>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props: {
        label: {
            type: String,
            default: "2024",
        },
        exit: {type: Function}
    },
    methods:{
        doExit(){
            setTimeout(() => {
                this.exit()
            }, 20);
        }
    }
};

</script>
<style>
.custom-font-class {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", 
        Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", 
        "Segoe UI Symbol", "Noto Color Emoji";
}
</style>