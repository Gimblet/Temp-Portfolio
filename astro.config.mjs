// @ts-check
import {defineConfig, envField} from "astro/config";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(), react()],

    vite: {
        resolve: {
            alias: {
                "@": "/src",
                "@components": "/src/components",
            },
        },
    },

    output: "static",

    build: {
        inlineStylesheets: "auto",
    },

    server: {
        host: true,
        port: 4321,
    },

    i18n: {
        locales: ["en", "es"],
        defaultLocale: "es",
    },

    env: {
        schema: {
            SMTP_USERNAME: envField.string({context: "server", access: "secret", optional: true}),
            SMTP_PASSWORD: envField.string({context: "server", access: "secret", optional: true}),
            SMTP_FROM: envField.string({context: "server", access: "secret", optional: true}),
            SMTP_TO: envField.string({context: "server", access: "secret", optional: true}),
        }
    },

    adapter: cloudflare()
});