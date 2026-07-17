import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 5173,
        open: true,
    },
    build: {
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    "react-vendor": ["react", "react-dom", "react-router-dom"],
                    "firebase-vendor": [
                        "firebase/app",
                        "firebase/auth",
                        "firebase/firestore",
                        "firebase/storage",
                    ],
                    icons: ["lucide-react"],
                },
            },
        },
    },
});
