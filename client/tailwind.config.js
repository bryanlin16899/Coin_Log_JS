module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#FBBD23',

					secondary: '#1FB2A6',

					accent: '#1FB2A6',

					neutral: '#191D24',

					'base-100': '#2A303C',

					info: '#3ABFF8',

					success: '#36D399',

					warning: '#FBBD23',

					error: '#F87272',
				},
			},
		],
	},
	theme: {
		extend: {},
	},
	plugins: [require('daisyui'), require('flowbite/plugin')],
}
