const config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],

  // Tambahkan kunci konfigurasi DaisyUI
  daisyui: {
    themes: [
      'dark', 
      'light',
    ],
  },
};
export default config;