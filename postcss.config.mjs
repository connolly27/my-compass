/** @type {import('postcss-load-config').Config} */
// PostCSS configuration
// Currently only using Tailwind CSS processor
// Other common plugins you might add:
// - autoprefixer
// - cssnano (for minification)
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;
