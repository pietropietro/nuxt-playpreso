<template>
    <v-app-bar 
        color="var(--v-background-base)"
        flat 
        app
        :hide-on-scroll="shouldHideOnScroll"
        scroll-threshold="150"
        ref="appBar"
    >
        <transition name="fade">
            <p-p-navigation-content 
                v-show="!appBarHidden"
            />
        </transition>
    </v-app-bar>
</template>
<script>
export default {
    data(){
        return{
            currentSection: "PLAYPRESO",
            justNavigatedBack: false,
            appBarHidden: false,
        }
    },
    computed: {
        computedMenu:{
            get(){
                return this.menu
            },
            set(val){
                this.setMenu(val);
            }
        },
        shouldHideOnScroll() {
            return this.$route.path === '/' && !this.justNavigatedBack;
        },
    },
    watch: {
        //when going to previous page from a scrolled page the app bar would not show.
        $route(to, from) {
            if (from.path !== '/' && to.path === '/') {
                console.log('just navigating baack')
                this.justNavigatedBack = true;
                setTimeout(() => {
                    this.justNavigatedBack = false;
                }, 500); // Reset after 300ms or a suitable delay
            }
        },
    },
    methods:{
        //
        updateToolbarContentStyle() {
            const toolbarContent = this.$el.querySelector('.v-toolbar__content');
            if (toolbarContent) {
                toolbarContent.style.backgroundColor = this.appBarHidden ? 'transparent' : 'var(--v-background-base)';
            }
        }
    },
    mounted(){
        //Set up a MutationObserver in the mounted hook to watch for changes in the class list of the app bar.
        this.$nextTick(() => {
            const appBarElement = this.$refs.appBar.$el;
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.type === "attributes" && mutation.attributeName === "class") {
                        const isScrolled = appBarElement.classList.contains('v-app-bar--is-scrolled');
                        const hideShadow = appBarElement.classList.contains('v-app-bar--hide-shadow');
                        this.appBarHidden = isScrolled && hideShadow;
                        this.updateToolbarContentStyle(); // Update the style
                    }
                });
            });
            
            observer.observe(appBarElement, { attributes: true });
        });
    }
}
</script>

<style>
    /* style to mimic vuetify's hide-on-scroll which we changed a bit (threshold, timeout) 
    and we are trying to reproduce */
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
        opacity: 0;
    }
</style>