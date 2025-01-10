import type { Config } from "tailwindcss";

export default {
    content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                ocr: ["OCR A Extended", "monospace"],
                lato: ["Lato", "sans-serif"],
                inter: ["Inter", "sans-serif"],
            },
            colors: {
                dark: "#161616",
            },
        },
    },
    plugins: [],
} satisfies Config;
