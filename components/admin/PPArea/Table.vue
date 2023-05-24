<template>
    <div>
        <h1>P-AREAS</h1>
        <v-data-table
            class="primary"
            item-text="value"
            :items-per-page="-1" :items="ppAreas"
            :headers="headers"
            :expanded.sync="expanded"
            singleExpand
            hide-default-footer
            @click:row="(item)=>expandRow(item)"
        >
            <template v-slot:item.id="{ item }">
                <div class="ocrastd">#{{item.id}}+</div>
            </template>
            <!-- <template v-slot:item.emoji="{ item }">
                <h1>
                    {{ item.emoji }}
                </h1>
            </template> -->
            <template v-slot:item.name="{ item }">
                <h2>
                    {{ item.name }}
                </h2>
            </template>
            <template v-slot:item.countries="{ item }">
                <template v-if="item.countries?.length">
                    <div class="overline lh-1">
                        {{item.countries.length}} countries
                    </div>
                </template>
            </template>
            <template v-slot:item.extra_tournaments="{ item }">
                <template v-if="item.extra_tournaments?.length">
                    <div class="overline lh-1">
                        {{item.extra_tournaments.length}} extra
                    </div>
                </template>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                    <admin-p-p-area-detail 
                        :ppArea="item" 
                    />
                </td>
            </template>
        </v-data-table>
    </div>
</template>
<script>
export default {
    props:{
        ppAreas: {type: Array},
    },
    data(){
        return{
            expanded: [],
            headers: [
                { value: 'id' },
                { value: 'name' },
                { value: 'countries' },
                { value: 'extra_tournaments' },
            ]
        }
    },
    methods:{
        expandRow(item){
            if(this.expanded.length>0 && this.expanded[0].id==item.id){
                this.expanded = [];
                return;
            } 
            this.expanded = [];
            setTimeout(()=>{this.expanded.push(item);});
        },
    }
}
</script>