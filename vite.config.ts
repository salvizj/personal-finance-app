/// <reference types="vitest/config" />
import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
	plugins: [tailwindcss(), !process.env.VITEST && reactRouter()],
	resolve: {
		tsconfigPaths: true,
	},
	optimizeDeps: {
		include: ["recharts", "es-toolkit"],
	},
	ssr: {
		noExternal: ["recharts"],
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./app/setupTests.ts",
	},
})
