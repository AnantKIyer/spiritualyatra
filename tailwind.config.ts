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
                // Material Design 60-30-10 Color System
                // 60% - Dominant (Neutral/White)
                'primary': {
                    '50': '#FAFAFA',   // Dominant background
                    '100': '#F5F5F5',
                    '200': '#EEEEEE',
                    '300': '#E0E0E0',
                    '400': '#BDBDBD',
                    '500': '#9E9E9E',
                    '600': '#757575',
                    '700': '#616161',
                    '800': '#424242',
                    '900': '#212121',
                },
                // 30% - Secondary (Light Orange/Yellow)
                'secondary': {
                    '50': '#FFF8E1',
                    '100': '#FFECB3',
                    '200': '#FFE082',
                    '300': '#FFD54F',
                    '400': '#FFCA28',
                    '500': '#FFC107',   // Secondary accent
                    '600': '#FFB300',
                    '700': '#FFA000',
                },
                // 10% - Accent (Orange)
                'accent': {
                    '50': '#FFF3E0',
                    '100': '#FFE0B2',
                    '200': '#FFCC80',
                    '300': '#FFB74D',
                    '400': '#FFA726',
                    '500': '#FF9800',   // Accent color (Orange)
                    '600': '#FB8C00',
                    '700': '#F57C00',
                },
                // Red for buttons
                'red': {
                    '50': '#FEF2F2',
                    '100': '#FEE2E2',
                    '200': '#FECACA',
                    '300': '#FCA5A5',
                    '400': '#F87171',
                    '500': '#EF4444',   // Primary red button color
                    '600': '#DC2626',
                    '700': '#B91C1C',
                    '800': '#991B1B',
                    '900': '#7F1D1D',
                },
                // Legacy support
                'airbnb-red': '#FF9800',
                'airbnb-red-hover': '#FB8C00',
                'airbnb-black': '#212121',
                'airbnb-gray': '#757575',
                'airbnb-border': '#E0E0E0',
                'airbnb-surface': '#FAFAFA',
            },
            boxShadow: {
                'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                'elevation-1': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
                'elevation-2': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
                'elevation-3': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
                'elevation-4': '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
            },
            fontFamily: {
                sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
                mono: ['var(--font-geist-mono)', 'monospace'],
                display: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
};

export default config;

