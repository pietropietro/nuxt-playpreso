<template>
  <v-row no-gutters align="center" style="width:100%" class="marquee">
        <span
            :style="$vuetify.breakpoint.mdAndUp ? 'animation-duration: 10s;' : 'animation-duration: 7s;'"
            class="font-weight-bold ocrastd"
        >
            <share-network
                class="no-decoration mx-0 px-0"
                network="whatsapp"
                url="https://playpreso.com"
                :title="'JOIN ' + currentUser.username.toUpperCase() + ' ON PLAYPRESO'"
                hashtags="playpreso"
            >
                <b>tell a friend</b>
            </share-network>
        </span>
    </v-row>
</template>

<script>
export default {

}
</script>

<style>
    /* .marquee {
        margin: 0 auto;
        white-space: nowrap;
        overflow: hidden;
    }

    .marquee span {
        display: inline-block;
        padding-left: 100%;
        animation: marquee linear infinite;
    }


    @keyframes marquee {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(-100%, 0);
    }
    } */

</style>