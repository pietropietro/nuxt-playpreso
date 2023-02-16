<template>
    <nuxt-link to="/p-cup/mundial-22" class="no-decoration">
        <div class="no-selection">
            <v-row no-gutters align="center" class="highlight-row marquee">
                <span :style="$vuetify.breakpoint.mdAndUp ? 'animation-duration: 7s;' : 'animation-duration: 4s;'"
                class="yellow--text font-weight-bold  ocrastd">{{bannerText}}</span>
            </v-row>
            <v-row no-gutters align="center" class="highlight-row marquee marquee2">
                <span :style="$vuetify.breakpoint.mdAndUp ? 'animation-duration: 9s;' : 'animation-duration: 6s;'"
                    class="yellow--text font-weight-bold  ocrastd">{{bannerText}}</span>
            </v-row>
            <v-row no-gutters align="center" class="highlight-row marquee">
                <span
                    :style="$vuetify.breakpoint.mdAndUp ? 'animation-duration: 8s;' : 'animation-duration: 5s;'"
                    class="yellow--text font-weight-bold  ocrastd">
                        {{bannerText}}
                </span>
            </v-row>
        </div>
    </nuxt-link>
</template>
<script>
export default {
    data(){
        return{
            bannerText: "PLAYPRESO WORLD CUP"
        }
    },
}
</script>
<style>
    .highlight-row{
        min-height: 10px;
        font-size:10px;
        width: 100%
    }

    .marquee {
    margin: 0 auto;
    white-space: nowrap;
    overflow: hidden;
    /* position: absolute; */
    }

    .marquee span {
        display: inline-block;
        padding-left: 100%;
        animation: marquee linear infinite;
    }

    .marquee2 span {
    animation-delay: 3.5s;
    }
    .marquee3 span {
    animation-delay: 1.5s;
    }

    

    @keyframes marquee {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(-100%, 0);
    }
    }
</style>