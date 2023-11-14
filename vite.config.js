import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  base: "/ChatGPT/",
  // base: '/',
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "pro",
          dest: "pro", 
        },
        {
          src: "politicas",
          dest: "politicas", 
        },
        {
          src: "individual",
          dest: "individual", 
        },
      ],
    }),
  ],
});
