/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'postcss-import': {},
    // 'postcss-nesting': {},
    'tailwindcss/nesting': {},

    tailwindcss: {},
    autoprefixer: {},
    cssnano: {
      preset: 'default',
    },
  },
};

export default config;
