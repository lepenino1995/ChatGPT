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
          dest: ".", 
        },
        {
          src: "politicas",
          dest: ".", 
        },
        {
          src: "individual",
          dest: ".", 
        },
        {
          src: "setup",
          dest: ".", 
        },
        {
          src: "libs",
          dest: ".", 
        },
        {
          src: "newall",
          dest: ".", 
        },
      ],
    }),
  ],
});
