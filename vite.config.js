import {resolve} from "path";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "mpa",
  build: {
    target: "esnext", 
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        register: resolve(__dirname, "./auth/register/index.html"),
        login: resolve(__dirname, "./auth/login/index.html"),
        profile: resolve(__dirname, "./profile/index.html"),
        editProfile: resolve(__dirname, "./profile/edit/index.html"),
        post: resolve(__dirname, "./post/index.html"),
        createPost: resolve(__dirname, "./post/create/index.html"),
        editPost: resolve(__dirname, "./post/edit/index.html"),
      },
    },
  },
});