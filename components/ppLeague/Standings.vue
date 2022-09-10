<template >
    <div>
        <template v-if="!this.$vuetify.breakpoint.mobile">
            <v-row no-gutters >
                <v-col cols="6" v-for="(up, index) in ups" :key="up.id">
                    <v-row v-if="!showAll && index===7 && !userInFirst" no-gutters >
                        <h1>...</h1>
                    </v-row>
                    <user-participation-standing v-else-if="!showAll && index===9 && !userInFirst" 
                        :up="ups.filter((e)=>e.user_id === currentUser.id)[0]" 
                    />
                    <user-participation-standing 
                        v-else-if="showAll || Array.from(Array(firstSize).keys()).includes(index)"
                        :up="ups[desktopActualIndex(index)]"  
                    />
                </v-col>
            </v-row>
        </template>
        <template v-else>
            <div v-for="(up, index) in ups" :key="up.id">
                <v-row v-if="!showAll && index===3 && !userInFirst" no-gutters >
                    <h1>...</h1>
                </v-row>
                <user-participation-standing v-else-if="!showAll && index===4 && !userInFirst" 
                    :up="ups.filter((e)=>e.user_id === currentUser.id)[0]" 
                />
                <user-participation-standing 
                    v-else-if="showAll || Array.from(Array(firstSize).keys()).includes(index)"
                    :up="ups[index]"  
                />
            </div>
        </template>
        <v-row no-gutters class="pt-10" justify="center" @click="()=>showAll = !showAll">
            <div class="text-overline">{{showAll ? 'SHOW LESS' : 'SHOW ALL'}}</div>
        </v-row>
    </div>
</template>
<script>
export default {
    props: {
        ups: {type: Array}
    },
    data(){
        return{
            showAll: false
        }
    },
    computed:{
        userInFirst(){
            return this.ups.filter(
                (e, i) => { return e.user_id === this.currentUser.id && i < this.firstSize;}
            ).length > 0;
        },
        firstSize(){
            return this.$vuetify.breakpoint.mobile ? 5 : 10
        },
    },
    methods:{
        desktopActualIndex(index){
            let baseVal = this.showAll ? 10 : 5;
            return (index % 2 === 0) ? index / 2 : baseVal + Math.floor(index/ 2);
        }
    }
}
</script>