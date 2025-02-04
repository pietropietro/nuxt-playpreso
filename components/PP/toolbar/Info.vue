<template>
    <v-row no-gutters>
        <v-slide-group
            ref="slider"
        >
            <v-slide-item
                class="mx-1"
                v-if="$store.getters['toolbarInfo/getDict']?.inactive"
            >
                <div>
                    <v-chip
                        disabled
                        :color="'transparent'"
                        class="o-100"
                    >
                    <div v-if="showText" class="overline lh-1 text-center">inactive</div>
                    <h1 style="font-size:2em;">💩</h1>
                    </v-chip>
                </div>
            </v-slide-item>
            <v-slide-item
                v-if="currentUser"
                class="mx-1"
            >
                <div>
                    <v-chip
                        disabled
                        :color="'primary darken-2'"
                        class="o-100"
                    >
                    <div v-if="showText" class="overline lh-1 text-center">points</div>
                    <h2>{{currentUser.points.toString()}} 🅿️</h2>
                    </v-chip>
                </div>
            </v-slide-item>
            <v-slide-item
                v-if="$store.getters['toolbarInfo/getDict']?.ppRanking"
                class="mx-1"
            >
                <div>
                    <v-chip
                        disabled
                        :color="'primary darken-2'"
                        class="o-100"
                        >
                    <div v-if="showText" class="overline lh-1 text-center">ranking</div>
                        <h2>{{$store.getters['toolbarInfo/getDict'].ppRanking}}° 👑</h2>
                    </v-chip>
                </div>

            </v-slide-item>
            <v-slide-item
                class="mx-1"
                v-if="$store.getters['toolbarInfo/getDict']?.trophies?.length"
            >
                <div>
                    <v-chip
                        disabled
                        :color="'primary darken-2'"
                        class="o-100"
                        >
                    <div v-if="showText" class="overline lh-1 text-center">trophies</div>
                        <h2>{{ $store.getters['toolbarInfo/getDict']?.trophies.length }} 🏆</h2>
                    </v-chip>
                </div>

            </v-slide-item>
            <v-slide-item
                class="mx-1"
                v-if="$store.getters['toolbarInfo/getDict']?.avg"
            >
                <div>
                    <v-chip
                        disabled
                        :color="'primary darken-2'"
                        class="o-100"
                        >
                        <div v-if="showText" class="overline lh-1 text-center">30D avg</div>
                        <h2>{{$store.getters['toolbarInfo/getDict'].avg}} 🎯</h2>
                    </v-chip>
                </div>
            </v-slide-item>
        </v-slide-group>
    </v-row>
</template>

<script>

export default {
    data() { 
        return{
            showText: false,
        }
    },
}
</script>