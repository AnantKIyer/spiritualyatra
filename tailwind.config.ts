import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'airbnb-red': '#FF385C',
                'airbnb-red-hover': '#E61E4D',
                'airbnb-black': '#222222',
                'airbnb-gray': '#717171',
                'airbnb-border': '#dddddd',
                'airbnb-surface': '#f7f7f7',
            },
            fontFamily: {
                sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
                mono: ['var(--font-geist-mono)', 'monospace'],
            },
        },
    },
    plugins: [],
};

export default config;

