import aspectRatio from '@tailwindcss/aspect-ratio';
import tailwindcssAnimate from 'tailwindcss-animate';
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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  // @ts-expect-error - corePlugins not typed in Config
  corePlugins: {
    aspectRatio: false, // ✅ disables the built-in one
  },
  plugins: [tailwindcssAnimate, aspectRatio],
};

export default config;

// import type { Config } from 'tailwindcss';
// import tailwindcssAnimate from 'tailwindcss-animate';

// const config: Config = {
//   content: [
//     './pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './components/**/*.{js,ts,jsx,tsx,mdx}',
//     './app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: 'var(--background)',
//         foreground: 'var(--foreground)',
//       },
//     },
//   },
//   plugins: [tailwindcssAnimate, require('@tailwindcss/aspect-ratio')],
// };

// export default config;
