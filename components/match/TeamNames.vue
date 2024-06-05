<template>
    <div>
        <v-row v-for="i in 2" :key="i"
            align="center" 
            justify="center"
            :style="{
                height: '38px',
            }"
        >
        <!--                 background: i== 1 ? backgroundHome : backgroundAway -->
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
    props: {
        match: { type: Object },
        rgb: { type: String },
        selectedTeamId: { default: null }
    },
    computed: {
        backgroundHome() {
            if (!this.selectedTeamId || this.selectedTeamId == this.match.homeTeam.id) return this.ppRGBA(this.rgb);
            return 'transparent';
        },
        backgroundAway() {
            if (!this.selectedTeamId || this.selectedTeamId == this.match.awayTeam.id) return this.ppRGBA(this.rgb, 0.6);
            return 'transparent';
        }
    },
    methods: {
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

                // Reset any previous marquee span and class
                if (element.querySelector('span')) {
                    element.textContent = element.querySelector('span').textContent;
                }
                element.classList.remove('marquee-team-name');

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
        },
        applyMarqueeAnimation() {
            const marquees = document.querySelectorAll('.marquee-team-name span');

            marquees.forEach(marquee => {
                let parentWidth = marquee.parentElement.offsetWidth;
                let contentWidth = marquee.offsetWidth;
                let travelDistance = contentWidth - parentWidth + 10;

                if (travelDistance > 0) {
                    let keyframesName = `marquee-team-name-${marquee.textContent.trim().replace(/\s+/g, '-')}`;
                    let keyframes = `
                        @keyframes ${keyframesName} {
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

                    // Remove and re-add the animation class to restart the animation
                    marquee.style.animation = 'none';
                    marquee.offsetHeight; // Trigger a reflow
                    marquee.style.animation = `${keyframesName} 8s linear infinite`;
                }
            });
        },
        updateTeamNames() {
            for (let i = 1; i <= 2; i++) {
                let refName = `teamName${i}`;
                if (this.$refs[refName]) {
                    let element = this.$refs[refName];
                    if (Array.isArray(element)) {
                        element = element[0];
                    }
                    if (element) {
                        element.textContent = (i === 1) ? this.match.homeTeam.name : this.match.awayTeam.name;
                    }
                }
            }
        }
    },
    watch: {
        match: {
            deep: true,
            handler() {
                this.$nextTick(() => {
                    this.updateTeamNames();
                    this.$nextTick(() => {
                        this.checkWrapped();
                        this.$nextTick(() => {
                            this.applyMarqueeAnimation();
                        });
                    });
                });
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.checkWrapped();
            this.$nextTick(() => {
                this.applyMarqueeAnimation();
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