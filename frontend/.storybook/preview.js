// frontend/.storybook/preview.js
import "../src/index.css"; // Your Tailwind directives
import "../src/runtime/Theme.css"; // Your Blue Lotus design tokens

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Updated backgrounds to match the "Elite" palette
    backgrounds: {
      default: "deep",
      values: [
        { name: "deep", value: "#0f172a" },
        { name: "surface", value: "#1e293b" },
        { name: "light", value: "#f8fafc" },
      ],
    },
    // Layout centering for better visual focus
    layout: "centered",
  },
};

export default preview;
