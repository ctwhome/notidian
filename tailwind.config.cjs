const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	mode: 'jit',
	theme: {
		extend: {}
	},
	darkMode: 'class',
	plugins: [require('@tailwindcss/forms'), require('daisyui')],
};

module.exports = config;
