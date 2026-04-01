// frontend/.storybook/manager.js
import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

addons.setConfig({
  theme: create({
    base: "dark",
    brandTitle: "Blue Lotus Storybook",
    brandUrl: "https://bluelotusapp.netlify.app",
    brandImage: null,
    colorPrimary: "#06b6d4",
    colorSecondary: "#0ea5e9",
    appBg: "#0b1220",
    appContentBg: "#111827",
    appBorderColor: "#1f2937",
    textColor: "#e6eef2",
    barBg: "#111827"
  })
});
