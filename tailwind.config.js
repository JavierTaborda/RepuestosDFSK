/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false, // Desactiva el reinicio de estilos por defecto
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

