import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileCountPlugin } from "./src/plugins/file-count-plugin.ts";
import { buildTimePlugin } from "./src/plugins/build-time-plug.ts";
import { removeConsolePlugin } from "./src/plugins/remove-console-plugin.ts";
import { testPlugin } from "./src/plugins/test-plug.ts";
import path from "path";

// import vueJsx from "@vue/babel-plugin-jsx";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname);
  console.log("env", env);

  return {
    base: "./",
    server: {
      port: env.VITE_PORT,
      proxy: {
        // "/api": {
        //   target: "https://kj.2dzm.com/",
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, ""),
        // },
        "/api": {
          changeOrigin: true,
          target: `http://127.0.0.1:10101`, //测试服
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      // removeConsolePlugin(),
      // fileCountPlugin(),
      // buildTimePlugin(),
      testPlugin(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      "process.env": {},
    },
  };
});
