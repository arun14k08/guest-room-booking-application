/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundColor: {
                primary: "#EB1A40",
            },
            fontFamily: {
                dance: "Dancing Script",
            },
        },
    },
    plugins: [],
};
