import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), svgr()],
	resolve: {
		alias: [
			{ find: "@", replacement: resolve(__dirname, "src") },
			{ find: "@assets", replacement: resolve(__dirname, "src/assets") },
			{
				find: "@components",
				replacement: resolve(__dirname, "src/components"),
			},
			{
				find: "@pages",
				replacement: resolve(__dirname, "src/pages"),
			},
		],
	},
	server: {
		proxy: {
			"/api": {
				target: "http://43.202.208.73:8080",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
