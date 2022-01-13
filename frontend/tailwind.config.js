module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight:{
        "80": "320px",
        "96": "384px",
        "28": "112px"
      },
      maxHeight:{
        "100%": "100%"
      },
      height: {
        "631": "631px"
      },
      minWidth: {
        "60": "240px",
        "20": "80px",
        "96": "384px",
        "14": "56px",
        "16": "64px"

      },
      fontSize: {
        "10px": "10px"
      },
      maxWidth: {
        "1000": "1000px"
      },
    },
  },
  variants: {
    extend: {
      scale: ['group-hover'],
      fontSize: ['hover']
    },
    outline: ['hover', 'active', 'focus']
  },
  plugins: [require('@tailwindcss/forms')],
}
