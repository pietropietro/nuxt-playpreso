export default {
	
	// test for capacitor iOS app
	// ssr: false,
	// target: 'static',

	publicRuntimeConfig: {
		API_ENDPOINT: process.env.API_ENDPOINT,
		DEBUG: process.env.DEBUG ?? false
	},

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'playpreso',
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
        { src: '@/plugins/version.js'},
        { src: '@/plugins/constants.js'},
        { src: '@/plugins/date-format.js', ssr:false},
		{ src: '@/plugins/logout.js' },
        { src: '@/plugins/api.js', ssr: false },
		{ src: '@/plugins/vuex-persist.js', ssr: false },
		{ src: '@/plugins/push-notifications.client.js', ssr: false},

	],

	router: {
		base: '/',
	},

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	modules: [
        [
            'nuxt-i18n', {
                locales: [
                    {
                        name: 'English',
                        code: 'en',
                        iso: 'en-EN',
                        file: 'en-EN.js'
                    },
                ],
                langDir: 'assets/lang/',
                defaultLocale: 'en',
                lazy: true,
                strategy: 'no_prefix',
            },
        ],
		'@nuxtjs/sitemap',
		'vue-social-sharing/nuxt'
    ],

    i18n: {
        vueI18n: {
            fallbackLocale: 'en',
            silentTranslationWarn: true
        }
    },

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		loaders: {
			vue: {
			  compiler: require('vue-template-babel-compiler')
			}
		},
		// so that admin.playpreso.com looks in playpreso.com/_nuxt
		// publicPath: process.env.DEBUG ? '/_nuxt/' : 'https://playpreso.com/_nuxt/',
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
					background: '#00001a',
					anchor: '#ffffff',
					oppositeText: '#000000',
					contrastOnDark: '#ffffff',
					text: '#ffffff',
				}
			}
		}
    },
}
