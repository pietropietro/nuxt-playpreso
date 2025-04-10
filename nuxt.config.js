import { version } from './package.json';

export default {
	publicRuntimeConfig: {
		API_ENDPOINT: process.env.API_ENDPOINT,
		VERSION: version,
		DEBUG: process.env.DEBUG ?? false
	},

	ssr:false,
	target: "static",

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

	css: [
		{ src: '@/assets/utility.scss' },
		{ src: '@/assets/preso.scss' },
		{ src: '@/assets/font/fonts.css' },
	],

	plugins: [
		{ src: '@/plugins/notifier.js' },
		{ src: '@/plugins/user-mixin.js' },
		{ src: '@/plugins/playpreso-mixin.js'},
        { src: '@/plugins/constants.js'},
        { src: '@/plugins/date-format.js'},
		{ src: '@/plugins/logout.js' },
        { src: '@/plugins/api.js'},
		{ src: '@/plugins/vuex-persist.js'},
		{ src: '@/plugins/push-notifications.js'},
		{ src: '@/plugins/deeplink.js'}
	],

	router: {
		base: '/',
	},

	components: true,

	modules: [
		'@nuxtjs/sitemap',
		'vue-social-sharing/nuxt',
    ],


	build: {
		transpile: [/emoji-mart/, 'vue-demi'] // Transpile emoji-mart to ensure compatibility
	},
	

    buildModules: [
        '@nuxtjs/vuetify',
    ],

	sitemap: {
		hostname: 'https://www.playpreso.com',
	},

	// Vuetify module configuration 
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
		treeShake: true,
		defaultAssets: {
			icons: false // Disable Material Design Icons
		},
		theme: {
			dark: true,
			options: {
				customProperties: true,
			},
            themes: {
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
