export default {
	
	// test for capacitor iOS app
	// ssr: false,
	// target: 'static',

	publicRuntimeConfig: {
		API_ENDPOINT: process.env.API_ENDPOINT,
		VERSION: '1.35.30',
		DEBUG: process.env.DEBUG ?? false
	},

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'PlayPreso',
		htmlAttrs: {
			lang: 'en'
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover' },
			{ hid: 'description', name: 'description', content: '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		{ src: '@/assets/utility.scss' },
		{ src: '@/assets/preso.scss' },
		{ src: '@/assets/font/fonts.css' },
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{ src: '@/plugins/notifier.js' },
		{ src: '@/plugins/user-mixin.js' },
		{ src: '@/plugins/playpreso-mixin.js' },
        { src: '@/plugins/constants.js'},
        { src: '@/plugins/date-format.js', ssr:false},
		{ src: '@/plugins/logout.js' },
        { src: '@/plugins/api.js', ssr: false },
		{ src: '@/plugins/vuex-persist.js', ssr: false },
		{ src: '@/plugins/push-notifications.js', ssr: false}
	],

	router: {
		base: '/',
	},

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	modules: [
		'@nuxtjs/sitemap',
		'vue-social-sharing/nuxt'
    ],


	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		transpile: [/emoji-mart/, 'vue-demi'] // Transpile emoji-mart to ensure compatibility
	},
	

	// Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

	sitemap: {
		hostname: 'https://www.playpreso.com',
	},

	// Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
		treeShake: true,
		theme: {
			dark: true,
			options: {
				customProperties: true,
			},
            themes: {
                light: {
                    primary: '#0000cc',
					background: '#ffffff',
					// all links
					anchor: '#000000',
					oppositeText: '#ffffff',
					text: '#000000',
					contrastOnDark: '#ffffff',
					// i.e. PRESO!
					accent: '#9900cc'
				},
				dark: {
                    primary: '#000066',
					background: '#00000f',
					anchor: '#ffffff',
					oppositeText: '#000000',
					contrastOnDark: '#ffffff',
					text: '#ffffff',
				}
			}
		}
    },
}
