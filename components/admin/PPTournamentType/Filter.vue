<template>
    <v-row align="center" class="overline" v-if="!ppttloading">
        <v-col>
            <v-chip-group
                column
                v-model="nameModel"
                active-class=""
            >
                <v-chip
                    :disabled="loading"
                    small
                    :value="el.name"
                    v-for="(el,i) in compactList" :key="i"
                    :color="el.name === nameModel ? ppRGBA(el.rgb) : ppRGBA(el.rgb, 0.4)"
                >
                    {{el.name}}
                </v-chip>
            </v-chip-group>
        </v-col>
        <v-col cols="auto">
            <v-chip-group
                column
                v-model="levelModel"
            >
                <v-chip
                    large
                    :disabled="loading"
                    v-for="el in (nameModel ? compactList.filter(e=>e.name == nameModel)[0].level : [1,2,3,4])" 
                    :key="el"
                    :value="el"
                >
                    {{el}}
                </v-chip>
            </v-chip-group>
        </v-col>
        <v-col cols="auto">
            <v-chip
                small
                :disabled="loading"
                @click="clear"
            >
                    x
            </v-chip>
            <em-emoji v-if="nameModel && levelModel" size="3em"
                :native="ppttList.filter(e => e.name == nameModel && e.level == levelModel)[0]?.emoji" 
            /> 
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        name: {type: String},
        level: {type: Number},
        setName: {type: Function},
        setLevel: {type: Function},
        loading: {type: Boolean},
        onClear: {type: Function}
    },
    data:()=>({
        ppttList: [], 
        ppttloading: true,
    }),
    computed:{
        nameModel:{
            get(){return this.name;},
            set(val){this.setName(val);}
        },
        levelModel:{
            get(){return this.level;},
            set(val){this.setLevel(val);}
        },
        compactList() {
            return Object.values(this.ppttList.reduce((acc, item) => {
                const { name, level, rgb } = item;
                if (!acc[name] || level > acc[name].level) {
                    acc[name] = { name, level, rgb };
                }
            return acc;},{}));
        }
    },
    methods:{
        async getPPtts(){
            let response = await this.$api.call(this.ADMIN_API_ROUTES.PPTOURNAMENTTYPES.GET);
            if(response && response.status === "success"){
                this.ppttList = response.message;
            }
            this.ppttloading = false;
        },
        clear(){
            this.nameModel = this.levelModel = null;
            if(!!this.onClear)this.onClear();
        }
    },
    async mounted(){
        await this.getPPtts();
    }
}
</script>