/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'primary': '#282A31',
        'secondary': '#1D2027',
        'ice': '#ACC4EA',
        'blue': {
          base: '#38A7D3',
          hover: '#54C6F3',
        },
        'red': {
          base: '#F04343',
          hover: '#F75757',
        },
        'gold': {
          base: '#F5B740',
          hover: '#F5C14D',
        },
      },
      fontFamily: {
        sans: ['proxima-nova', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
}

