/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        neon: '#39ff14',
        'os-black': '#050505',
      },
      fontFamily: {
				"pixel-header": ['"Press Start 2P"', 'cursive'],
				"pixel-body": ['"VT323"', 'monospace'],
			}
    },
  },
  plugins: [],
};
