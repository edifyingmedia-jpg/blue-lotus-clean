// frontend/.storybook/main.js
module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions", // To test AI-driven clicks
    {
      name: "@storybook/addon-styling",
      options: {
        postCss: true, // This enables Tailwind support in Storybook
      },
    },
  ],
  framework: {
    name: "@storybook/react-vite", // Vite is standard for your 2026 stack
    options: {},
  },
  docs: {
    autodocs: true,
  },
};
