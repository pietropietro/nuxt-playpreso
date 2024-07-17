// composables/useMarquee.js

import { nextTick } from 'vue';

export default function useMarquee() {
    const checkWrapped = (element) => {
        if (!element) return; // Skip if element does not exist

        const container = element.parentElement;
        const content = element;

        // Reset any previous marquee span and class
		if (element.querySelector('span')) {
			element.textContent = element.querySelector('span').textContent;
		}
		element.classList.remove('marquee-content-active');

        const contentWidth = content.scrollWidth;
        const containerWidth = container.clientWidth;

        const elementHeight = element.offsetHeight;
		const lineHeight = parseInt(window.getComputedStyle(element).lineHeight, 10);

        let isWrapped = contentWidth > containerWidth || elementHeight > lineHeight;;

        // Apply logic here based on isWrapped value, e.g., setting a marquee-team-name
        if (isWrapped) {
            applyMarquee(element);
        }
    };

    const applyMarquee = (element) => {
        if (!element.classList.contains('marquee-content-active')) {
            element.classList.add('marquee-content-active');

            const span = document.createElement('span');
            span.className = 'marquee-content';
            span.textContent = element.textContent;
            element.textContent = ''; // Clear the element's text
            element.appendChild(span); // Append the span with the text
        }
    };

    const applyMarqueeAnimation = () => {
        const marquees = document.querySelectorAll('.marquee-content-active span');
        marquees.forEach(marquee => {
            const parentWidth = marquee.parentElement.offsetWidth;
            const contentWidth = marquee.offsetWidth;
            let travelDistance = contentWidth - parentWidth + 10;

            if (travelDistance > 0) {
                if(travelDistance < 15) travelDistance = 15;
                const keyframesName = `marquee-content-active-${marquee.textContent.trim().replace(/[\s\W]+/g, '-')}`;
                let keyframes = `
                    @keyframes ${keyframesName} {
                        0% { transform: translateX(0); }
                        50% { transform: translateX(-${travelDistance}px); }
                        100% { transform: translateX(0); }
                    }
                `;

                const styleSheet = document.createElement("style");
                styleSheet.type = "text/css";
                styleSheet.innerText = keyframes;
                document.head.appendChild(styleSheet);

                marquee.style.animation = 'none';
                marquee.offsetHeight; // Trigger a reflow
                marquee.style.animation = `${keyframesName} 8s linear infinite`;
			}
        });
    };

    const refreshMarquee = (element) => {
        nextTick(() => {
            checkWrapped(element);
            nextTick(() => {
                applyMarqueeAnimation();
            });
        });
    };

    return {
        refreshMarquee,
    };
}
