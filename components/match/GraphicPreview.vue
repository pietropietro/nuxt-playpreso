<template>
    <div>
        <v-row v-for="i in 2" :key="i"
            align="center" 
            justify="center"
            :style="{
                height: '49px',
                background: i== 2 ? ppRGBA(rgb) : ppRGBA(rgb, 0.6) 
            }"
        >
            <v-col cols="2" class="pa-0">
                <team-logo 
                    :id="i==1 ? match.homeTeam.id : match.awayTeam.id" 
                    :size="30"  
                />
            </v-col>
            <v-col cols="10" class="pa-0">
                <h3 class="ocrastd text-uppercase"
                    :ref="'teamName' + i"
                >
                    {{i == 1 ? match.homeTeam.name :  match.awayTeam.name}}
                </h3>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    props:{
        match: {type: Object},
        rgb: {type: String},
    },
    methods:{
        checkWrapped() {
            for (let i = 1; i <= 2; i++) { // Assuming you have 2 elements as per your `v-for`
                let refName = `teamName${i}`;
                if (!this.$refs[refName]) continue; // Skip if ref does not exist

                let element = this.$refs[refName];
                if (Array.isArray(element)) {
                    // If the ref is an array (multiple elements), access the first one
                    element = element[0];
                }
                if (!element) continue; // Skip if the element is not found

                const elementHeight = element.offsetHeight;
                const lineHeight = parseInt(window.getComputedStyle(element).lineHeight, 10);
                let isWrapped = elementHeight > lineHeight;
                // Apply logic here based on isWrapped value, e.g., setting a marquee-team-name
                if (isWrapped) {
                    this.applyMarquee(element);
                }
            }
        },
        applyMarquee(element) {
            if (!element.classList.contains('marquee-team-name')) {
                element.classList.add('marquee-team-name');
                // Create a span and append to the element for the animation
                const span = document.createElement('span');
                span.textContent = element.textContent;
                element.textContent = ''; // Clear the element's text
                element.appendChild(span); // Append the span with the text
            }
        }
    },
    mounted(){
        this.$nextTick(() => {
            this.checkWrapped();
        });
    }
}
</script>
<style>
.marquee-team-name {
        white-space: nowrap;
        overflow: hidden;
        box-sizing: border-box;
        position: relative; /* Set position relative to allow "left" to have an effect */
    }

    .marquee-team-name span {
        display: inline-block;
        animation: marquee-team-name 4s linear infinite;
    }

    @keyframes marquee-team-name {
        0%   { transform: translateX(0%); } /* Start outside the right edge */
        100% { transform: translateX(-100%); }
    }
</style>