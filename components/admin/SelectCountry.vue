<template>
    <v-select label="country" v-model="computedModel" :items="countryList">
        <template slot="item" slot-scope="data">
            <emoji-flag :model="data.item" size="2em"/><div class="overline ml-2">{{ data.item }}</div>
        </template>
        <template slot="selection" slot-scope="data">
            <emoji-flag :model="data.item" size="2em"/><div class="overline ml-2">{{ data.item }}</div>
        </template>
    </v-select>
</template>
<script>
import { getNames,getNameList, overwrite } from 'country-list';
    overwrite([
        {
            code: 'AW',
            name: 'England'
        },
        {
            code: 'AX',
            name: 'Scotland'
        },
        {
            code: 'TR',
            name: 'Turkey'
        },
        {
            code: 'US',
            name: 'US'
        },
        {
            code: 'KR',
            name: 'South Korea'
        }
    ]);

export default {
    props:{
        model: {type: String},
        setModel: {type: Function}
    },
    computed:{
        computedModel: {
            get(){return this.model},
            set(val){this.setModel(val)}
        }
    },
    data(){
        return {
            countryList: getNames(),
        }
    },
    mounted(){
        console.log(getNameList());
    }
}
</script>