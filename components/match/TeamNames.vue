<template>
    <div>
        <v-row v-for="i in 2" :key="i"
            align="center" 
            justify="center"
            :style="{
                height: '38px',
                background: i== 1 ? backgroundHome : backgroundAway
            }"
        >
            <h3 class="ocrastd text-uppercase text-center px-2"
                :ref="'teamName' + i"
            >
                {{i == 1 ? match.homeTeam.name :  match.awayTeam.name}}
            </h3>
        </v-row>
    </div>
</template>
<script>
export default {
    props:{
        match: {type: Object},
        rgb: {type: String},
        selectedTeamId: {default:null}
    },
    computed:{
        backgroundHome(){
            if(!this.selectedTeamId || this.selectedTeamId == this.match.homeTeam.id) return this.ppRGBA(this.rgb);
            return 'transparent'
        },
        backgroundAway(){
            if(!this.selectedTeamId || this.selectedTeamId == this.match.awayTeam.id) return this.ppRGBA(this.rgb, 0.6);
            return 'transparent'
        }
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
            const marquees = document.querySelectorAll('.marquee-team-name span');

            marquees.forEach(marquee => {
                let parentWidth = marquee.parentElement.offsetWidth;
                let contentWidth = marquee.offsetWidth;
                let travelDistance = contentWidth - parentWidth;

                if (travelDistance > 0) {
                    let keyframes = `
                        @keyframes marquee-team-name-${marquee.textContent.trim().replace(/\s+/g, '-')} {
                            0% { transform: translateX(0); }
                            50% { transform: translateX(-${travelDistance}px); }
                            100% { transform: translateX(0); }
                        }
                    `;

                    // Inject the keyframes into a style element in the head of the document
                    let styleSheet = document.createElement("style");
                    styleSheet.type = "text/css";
                    styleSheet.innerText = keyframes;
                    document.head.appendChild(styleSheet);

                    marquee.style.animation = `marquee-team-name-${marquee.textContent.trim().replace(/\s+/g, '-')} 8s linear infinite`;
                }
            });
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
    }

</style>