import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  theme: {
    extend: {
      animation: {
        "boat-video-intro": "boat-video-fade 700ms ease-out forwards",
      },
      keyframes: {
        "boat-video-fade": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
});
