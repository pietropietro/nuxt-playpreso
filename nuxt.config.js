export default {
	publicRuntimeConfig: {
		API_ENDPOINT: process.env.API_ENDPOINT,
		VERSION: '1.35.31',
		DEBUG: process.env.DEBUG ?? false
	},

	//index / public pages are ssr, app is SPA
	ssr:true,
	target: "server",

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
        { src: '@/plugins/date-format.js', ssr:false},
		{ src: '@/plugins/logout.js' },
        { src: '@/plugins/api.js', ssr: false },
		{ src: '@/plugins/vuex-persist.js', ssr: false },
		{ src: '@/plugins/push-notifications.js', ssr: false}
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
