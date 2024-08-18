const { addIconSelectors } = require("@iconify/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    darkMode: ["selector", '[data-color-mode="dark"]'],
    theme: {
        container: {
            screens: {
                xl: "1024px",
                "2xl": "1024px",
            },
        },
    },
    plugins: [addIconSelectors(["fa6-brands", "fa6-solid"])],
};
